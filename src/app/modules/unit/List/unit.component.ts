import { Component } from '@angular/core';
import { UnitService } from '../Shared/unit.service';
import { UnitModel } from '../Shared/unit.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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
        this.baseService.setIsLoading(true)
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
            await this.unitService.getRunning().then(res => {
                this.unitForm = this.fb.group({
                    runningFormatID: [this.unitService.runningFormatID],
                    unitID: [null],
                    unitNo: [{ value: this.unitService.runningNumber, disabled:true }],
                    unitName: ['', Validators.required],
                    unitNameEng: [''],
                    createdDate: [{ value: '17 มีนาคม 264', disabled: true }]
                })
    
                this.unitService.units.push({ isAdd: true, added_on: 0 })
                this.unitService.units.sort((a, b) => { 
                    return <any>new Date(a.added_on) - <any>new Date(b.added_on);
                })
            })
        }

        setTimeout(() => { 
            document.getElementById("unitName").focus();
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

    deleteUnit = async (unitID) => {
        this.baseService._openDialog(ConfirmModalComponent, "confirm");
        //this.confirmDelete([unitID])
        //const unitID = await this.baseService.getIdFromFocus('gridUnit')
    }

    confirmDelete = async (unitIDs, obj) => {
        try {
            if (unitIDs.length > 0) {
                await this.unitService.bindDelete(unitIDs)
                this.unitService.refreshList();
                this.baseService.configDialog.success.data = { message: { header: "ยืนยันการลบหน่วยนับ + " + obj.unitName + " ?", confirmText: "ต้องการลบหน่วยนับนี้ หรือไม่" } }
                this.baseService._openDialog(SuccessModalComponent, "success")
            }
        } catch (error) {
            this.baseService.configDialog.alert.data = { message: "ระบบทำงานผิดพลาดไม่สามารถลบหน่วยนับได้" }
            this.baseService._openDialog(AlertModalComponent, "alert")
        }
    }

    cancelUnit() {
        var _unit = this.unitService.units.filter(x => x.isAdd == true);
        if (!!_unit[0].unitID)
            _unit.map(x => x.isAdd = false)
        else
            this.unitService.units.splice(0, 1)
    }


        // this.units.sort((a, b) => {
        //     return <any>new Date(b.added_on) - <any>new Date(a.added_on);
        // })

        // console.log(this.units)

        // const dialogConfig = new MatDialogConfig();
        // dialogConfig.autoFocus = true;
        // dialogConfig.disableClose = true;
        // dialogConfig.width = "650px";
        // // dialogConfig.height = "400px";

        // if (unitID == null) {
        //     //await this.unitService.newUnit().then(res => (
        //         dialogConfig.data = {
        //             headerText: "เพิ่มหน่วยนับ",
        //             objUnit : {
        //                 runningFormatID: this.unitService.runningFormatID, 
        //                 unitNo: this.unitService.runningNumber 
        //             }
        //         },
        //         this.dialog.open(UnitModalComponent, dialogConfig)
        //     //));
        // }
        // else
        // {
        //     let productModel = null;
        //     await this.service.getProduct(productID).then(res => (
        //         productModel = this.service.productModel,
        //         dialogConfig.data = {
        //             objProduct: productModel
        //         },
        //         this.dialog.open(ProductModalComponent, dialogConfig)
        //     ));
        // }
    //}
}