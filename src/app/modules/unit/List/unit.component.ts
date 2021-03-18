import { Component } from '@angular/core';
import { UnitService } from '../Shared/unit.service';
import { UnitModel } from '../Shared/unit.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '@services/base/apps.service';
import { SuccessModalComponent } from 'app/modules/Shared/Modal/Success/success-modal.component';

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
    UnitID: string
    unitNo: any
    unitName: any
    createdDate: any
    
    ngOnInit(): void {
        this.UnitID = "bc778400-e31f-4d49-b47b-05cad6a73e30"
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

    callUnitModal = async () => {
        console.log(this.UnitID)
        if (!!this.UnitID) {
            var units = this.unitService.units
            if (!!units) {
                units.filter(x => x.unitID == this.UnitID).map(x => x.isAdd == true)
            }
        }
        else
        {
            await this.unitService.getRunning().then(res => {
                this.unitForm = this.fb.group({
                    runningFormatID: [this.unitService.runningFormatID],
                    unitID: [''],
                    unitNo: [{ value: this.unitService.runningNumber, disabled:true }],
                    unitName: ['', Validators.required],
                    unitNameEng: [''],
                    createdDate: [{ value: '17 มีนาคม 264', disabled: true }]
                })
    
                this.addUnit = [{ isAdd: true }]
    
                setTimeout(() => { 
                    document.getElementById("unitName").focus();
                }, 100);
            })
        }
    }

    get _unit() {
        return this.unitForm.controls;
    }

    acceptAddUnit = async () => {
        if (this.unitForm.valid) {
            await this.unitService.bindSave(this.unitForm.getRawValue()).then(res => {
                this.addUnit = null

                this.baseService.configDialog.id = "success-modal";
                this.baseService.configDialog.height = "50px";
                this.baseService.configDialog.width = "500px";
                this.baseService.configDialog.data = { message: "บันทึกข้อมูลหน่วยนับสำเร็จ" }
                this.baseService.configDialog.position = { right: '50px', top: '10px' }
                this.baseService.configDialog.hasBackdrop = false
                this.baseService._openDialog(SuccessModalComponent)

                setTimeout(() => {
                    this.baseService._closeDialog("SuccessModalComponent")
                }, 1500);

                this.unitService.refreshList();
            });

            

            // this.baseService.configDialog.id = "alert-modal";
            // this.baseService.configDialog.height = "50px";
            // this.baseService.configDialog.width = "500px";
            // this.baseService.configDialog.data = { message: "ระบบทำงานผิดพลาดไม่สามารถบันทึกหน่วยนับได้" }
            // this.baseService.configDialog.position = { right: '50px', top: '10px' }
            // this.baseService.configDialog.hasBackdrop = false
            // this.baseService._openDialog(AlertModalComponent)

            // setTimeout(() => {
            //     this.baseService._closeDialog("AlertModalComponent")
            // }, 1500);
        }
    }

    cancelAddUnit() {
        this.addUnit = null
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