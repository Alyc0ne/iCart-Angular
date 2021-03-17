import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UnitService } from '../Shared/unit.service';
import { UnitModel } from '../Shared/unit.model';
import { UnitModalComponent } from '../Shared/modal/unit-modal.component'
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
        private dialog:MatDialog,
        private fb: FormBuilder
    ) { }

    unitForm: FormGroup;
    units: UnitModel[]
    addUnit: UnitModel[]
    public unitNo:any
    public unitName:any
    public createdDate:any
    
    //productModel: ProductModel[];
    
    ngOnInit(): void {
        //this.service.refreshList()
        this.units = [
            { isCheck: false, unitID: '1', unitNo: 'UN-25641020-001', unitName: 'ชิ้น', createdDate: '22 ตุลาคม 2564', added_on: new Date().getTime()},
            { isCheck: false, unitID: '2', unitNo: 'UN-25640910-002', unitName: 'ขวด', createdDate: '10 กันยายน 2564', added_on: new Date().getTime()},
            { isCheck: false, unitID: '3', unitNo: 'UN-25640902-003', unitName: 'อัน', createdDate: '02 กันยายน 2564', added_on: new Date().getTime()},
            { isCheck: false, unitID: '4', unitNo: 'UN-25640206-004', unitName: 'แพ๊ค', createdDate: '06 กุมภาพันธ์ 2564', added_on: new Date().getTime()},
            { isCheck: false, unitID: '5', unitNo: 'UN-25640122-001', unitName: 'กล่อง', createdDate: '22 มกราคม 2564', added_on: new Date().getTime()},
            { isCheck: false, unitID: '6', unitNo: 'UN-25640122-002', unitName: 'ซอง', createdDate: '22 มกราคม 2564', added_on: new Date().getTime()},
            { isCheck: false, unitID: '7', unitNo: 'UN-25640122-003', unitName: 'ถุง', createdDate: '22 มกราคม 2564', added_on: new Date().getTime()},
            { isCheck: false, unitID: '8', unitNo: 'UN-25640122-004', unitName: 'มัด', createdDate: '22 มกราคม 2564', added_on: new Date().getTime()},
            { isCheck: false, unitID: '9', unitNo: 'UN-25640122-005', unitName: 'เครื่อง', createdDate: '22 มกราคม 2564', added_on: new Date().getTime()},
            { isCheck: false, unitID: '10', unitNo: 'UN-25640122-006', unitName: 'หน่วย', createdDate: '22 มกราคม 2564', added_on: new Date().getTime()},
        ]
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

    callUnitModal = async (unitID) => {
        await this.unitService.getRunning().then(res => {
            this.unitForm = this.fb.group({
                runningFormatID: [this.unitService.runningFormatID],
                unitID: [''],
                unitNo: [{ value: this.unitService.runningNumber, disabled:true }],
                unitName: ['', Validators.required],
                createdDate: [{ value: '17 มีนาคม 264', disabled: true }]
            })

            this.addUnit = [{ isAdd: true, isCheck: false, unitID: null, unitNo: 'UN-25641020-001', unitName: null, added_on: new Date().getTime() }]

            setTimeout(() => { 
                document.getElementById("unitName").focus();
            }, 100);
            
        })
    }

    get _unit() {
        return this.unitForm.controls;
    }

    acceptAddUnit = async () => {
        if (this.unitForm.valid) {
            //await this.unitService.bindSave(this.unitForm.getRawValue()).then(res => this.addUnit = null);
            // this.baseService.configDialog.height
            this.baseService.configDialog.height = "50px";
            // this.baseService.configDialog.
            this.baseService._openDialog(SuccessModalComponent)
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