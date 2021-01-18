import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';
import { AlertModalComponent } from '../../Shared/Modal/Alert/alert-modal.component';

@Component({
    selector: 'product-modal',
    templateUrl: './product-modal.component.html',
    styleUrls: ['./product-modal.component.css']
})

export class ProductModalComponent {
    formData:ProductModel;
    public unitList: Array<any> = [];
    public states: Array<any> = [];
    public test:any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef:MatDialogRef<ProductModalComponent>,
        private dialog:MatDialog,
        public service: ProductService
    ) {}

    ngOnInit(): void {
        this.service.newProduct()
        //this.states = this.service.listUnit;

        this.formData = {
            productID: null,
            productNo: null,
            productCode: '',
            productName: this.data.goodsName,
            productNameEng: '',
            productDesc: '',
            productSalePrice: 0,
            productPurchasePrice: 0,
            unitModel: null
        }
    }

    addUnit() {
        if (!!this.formData.unitModel) {
            var isFoucs = this.formData.unitModel.filter(e => e.isFoucs == true);
            if (isFoucs.length == 0) {
                this.formData.unitModel.push({
                    uid: Math.random().toString(16).slice(2),
                    isFoucs: true,
                    barcode: '',
                    unitID: null,
                    isBaseUnit: false
                });
            }
            else 
            {
                const dialogConfig = new MatDialogConfig();                
                dialogConfig.disableClose = true;
                dialogConfig.width = "600px";
                dialogConfig.height = "80px";
                dialogConfig.id = "AlertModal"
                // dialogConfig.position = {top: '80px'}

                //dialogConfig.data = { temp1, temp2 };

                this.dialog.open(AlertModalComponent, dialogConfig);            
            }
        }
        else
        {
            this.formData.unitModel = [{
                uid: Math.random().toString(16).slice(2),
                isFoucs: true,
                barcode: '',
                unitID: null,
                isBaseUnit: false
            }];
        }

        //this.unitList.push({});
        var table = document.getElementsByClassName('styled-table');
        //document.getElementsByClassName('modal-content');
        if (table.length > 0) {
            var tbody = table[0].querySelector('tbody');
            if (!!tbody) {
                setTimeout(() => { 
                    tbody.scrollTo(0, 50000);
                }, 100);
            }
        }

        console.log(this.service.runningNumber)
    }

    changeisFoucs(uid, value) {
        if (!!this.formData.unitModel) {
            var currentData = this.formData.unitModel.filter(e => e.uid == uid);
            if (!!currentData) {
                currentData[0].isFoucs = value;
            }
        }
    }

    bindSave() {
        this.formData.productNo = this.service.runningNumber; 
        this.service.bindSave(this.formData);       
        this.closeDialog();
    }

    closeDialog() {
        this.dialogRef.close();
    }

    isBaseUnitClick(uid, value) {
        var currentData = this.formData.unitModel.filter(e => e.uid == uid);
        if (!!currentData) {
            currentData[0].isBaseUnit = value;
        }
    }
}