import { Component } from '@angular/core';
import { UnitService } from '../Shared/unit.service';
import { UnitModel } from '../Shared/unit.model';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AppService } from '@services/base/apps.service';
import { SuccessModalComponent } from 'app/modules/Shared/Modal/Success/success-modal.component';
import { AlertModalComponent } from 'app/modules/Shared/Modal/Alert/alert-modal.component';
import { ConfirmModalComponent } from 'app/modules/Shared/Modal/Confirm/confirm-modal.component';

@Component({
    selector: 'app-unit',
    templateUrl: './unit.component.html',
    styleUrls: ['./unit.component.css']
})

export class UnitListComponent {

    constructor(
        public baseService: AppService,
        public unitService: UnitService,
        private fb: FormBuilder
    ) { }

    unitForm: FormGroup;
    units: UnitModel[]
    addUnit: UnitModel[]
    unitNo: any
    unitName: any
    createdDate: any

    toppings = new FormControl();
    toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    
    ngOnInit(): void {
        this.unitService.refreshList()
    }

    showDetail(event ,unitID, isCheck) {
        if (!!unitID) {
            var unit = this.units.filter(x => {
                return x.unitID == unitID && x.isCheck == false;
            })

            const localName = event.target.localName;
            if (localName != "button" && localName != "mat-icon")
                this.units.map(x => x.isCheck = false);
            
            if (unit.length > 0) {
                unit[0].isCheck = !isCheck
                this.unitNo = unit[0].unitNo
                this.unitName = unit[0].unitName
                this.createdDate = unit[0].createdDate
            }
            else
            {
                this.unitNo = ''
                this.unitName = ''
                this.createdDate = ''
            }
        }
    }

    get _unit() {
        return this.unitForm.controls;
    }

    manageUnit = async (unitID) => {        
        if (!!unitID) {
            var units = this.unitService.units
            if (!!units) {
                units.filter(x => x.unitID == unitID).map(x => x.isAdd = true)
                this.unitForm = this.fb.group({
                    runningFormatID: [''],
                    unitID: [units[0].unitID],
                    unitNo: [{ value: units[0].unitNo, disabled:true }],
                    unitName: [units[0].unitName, Validators.required],
                    unitNameEng: [units[0].unitNameEng]
                })
            }
        }
        else
        {
            if (this.validateNewUnit()) {
                this.baseService.setIsLoading(true)
                await this.unitService.getRunning().then(res => {
                    this.unitForm = this.fb.group({
                        runningFormatID: [this.unitService.runningFormatID],
                        unitID: [null],
                        unitNo: [{ value: this.unitService.runningNumber, disabled:true }],
                        unitName: ['', Validators.required],
                        unitNameEng: [''],
                    })
        
                    this.unitService.units.push({ isAdd: true, added_on: 0 })
                    this.unitService.units.sort((a, b) => { 
                        return <any>new Date(a.added_on) - <any>new Date(b.added_on);
                    })
                })
            }                    
        }

        setTimeout(() => { 
            const field = document.getElementById("unitName")
            if (!!field) field.focus();
            this.baseService.setIsLoading(false)
        }, 100);
    }

    acceptUnit = async (unitID) => {
        if (this.unitForm.valid) {
            try {
                let isResult = false
                if (!!unitID)
                    await this.unitService.bindEdit(this.unitForm.getRawValue()).then(res => isResult = true)
                else
                    await this.unitService.bindSave(this.unitForm.getRawValue()).then(res => isResult = true)

                if (isResult) {
                    this.unitService.refreshList();
                    this.baseService.configDialog.success.data = { message: "ระบบบันทึกข้อมูลหน่วยนับเรียบร้อยแล้ว" }
                    this.baseService._openDialog(SuccessModalComponent, "success")
                }
            } catch (error) {
                this.baseService.configDialog.alert.data = { message: "ระบบทำงานผิดพลาดไม่สามารถบันทึกหน่วยนับได้" }
                this.baseService._openDialog(AlertModalComponent, "alert")
            }
        }
    }

    deleteUnit = async (unitID, unitName) => {
        this.baseService.configDialog.confirm.data = { 
            message: { header: "ยืนยันการลบหน่วยนับ " + unitName + " ?", confirmText: "ต้องการลบหน่วยนับนี้ หรือไม่" },
            action: this.confirmDelete
        }
        this.baseService._openDialog(ConfirmModalComponent, "confirm");
        this.baseService.dialogRef.afterClosed().subscribe(callback => {
            if (typeof callback == "function")
                callback([unitID])
        })
    }

    cancelUnit() {
        var _unit = this.unitService.units.filter(x => x.isAdd == true);
        if (!!_unit[0].unitID)
            _unit.map(x => x.isAdd = false)
        else
            this.unitService.units.splice(0, 1)
    }

    bindDeleteMulti = async () => {
        const unitIDs = await this.baseService.getIdFromFocus('gridUnit')
        if (unitIDs.length > 0) {
            this.baseService.configDialog.confirm.data = { 
                message: { header: "ยืนยันการลบหน่วยนับ " + unitIDs.length + " หน่วยนับ ?", confirmText: "ต้องการรายการลบหน่วยนับนี้ หรือไม่" },
                action: this.confirmDelete
            }
            this.baseService._openDialog(ConfirmModalComponent, "confirm");
            this.baseService.dialogRef.afterClosed().subscribe(callback => {
                if (typeof callback == "function")
                    callback(unitIDs)
            })
        } else {
            this.baseService.configDialog.alert.data = { message: "ไม่สามารถดำเนินการได้ กรุณาทำการเลือกหน่วยนับ" }
            this.baseService._openDialog(AlertModalComponent, "alert")
        }
    }

    confirmDelete = async (unitIDs) => {
        try {
            if (unitIDs.length > 0) {
                await this.unitService.bindDelete(unitIDs)
                this.unitService.refreshList();
                this.baseService.configDialog.success.data = { message: "ระบบทำการลบหน่วยนับเรียบร้อยแล้ว" }
                this.baseService._openDialog(SuccessModalComponent, "success")
            }
        } catch (error) {
            this.baseService.configDialog.alert.data = { message: "ระบบทำงานผิดพลาดไม่สามารถลบหน่วยนับได้" }
            this.baseService._openDialog(AlertModalComponent, "alert")
        }
    }

    validateNewUnit() {
        if (this.unitService.units.filter(x => x.isAdd == true).length == 0) return true
        this.baseService.configDialog.alert.data = { message: "ไม่สามารภดำเนินการได้ กรุณาบันทึกหน่วยนับ" }
        this.baseService._openDialog(AlertModalComponent, "alert")
    }
}