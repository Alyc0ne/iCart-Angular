import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductModel, ProductUnit } from './product.model';
import { ProductService } from './product.service';
import { AlertModalComponent } from '../../Shared/Modal/Alert/alert-modal.component';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

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
    productForm: FormGroup;
    //productUnitFG: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef:MatDialogRef<ProductModalComponent>,
        private dialog:MatDialog,
        public service: ProductService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        let objProduct = this.data.objProduct;
        this.productForm = this.fb.group({
            productNo: [{ value: objProduct.productNo, disabled:true }],
            productName: ['', Validators.required],
            productNameEng: [''],
            productDesc: [''],
            productSalePrice: ['', Validators.required],
            productPurchasePrice: [''],
            productUnits: this.fb.array([])
        })

        this.productForm.valueChanges.subscribe(console.log); 

        this.formData = {
            runningFormatID: objProduct.runningFormatID,
            productID: objProduct.productID,
            productNo: objProduct.productNo,
            productName: objProduct.productName,
            productNameEng: objProduct.productNameEng,
            productQuantity: null,
            productDesc: objProduct.productDesc,
            productSalePrice: objProduct.productSalePrice,
            productPurchasePrice: objProduct.productPurchasePrice,
            productUnits: this.data.productUnits
        }
    }

    get product() {
        return this.productForm.controls;
    }

    get productUnits(): FormArray {
        return this.productForm.get('productUnits') as FormArray;
    }

    addUnit() {
        // const productUnitFG = this.ProductUnit.map(e => this.fb.group(e));
        this.productForm.setControl('productUnits', this.fb.array([this.fb.group({
            uid: [Math.random().toString(16).slice(2)],
            isFoucs: [true],
            barcode: ['', Validators.required],
            unitID: [''],
            isBaseUnit: [false]
        })]));


        // if (!!this.formData.productUnits) {
        //     var isFoucs = this.formData.productUnits.filter(e => e.isFoucs == true);
        //     if (isFoucs.length == 0) {
        //         this.formData.productUnits.push({
        //             uid: Math.random().toString(16).slice(2),
        //             isFoucs: true,
        //             barcode: '',
        //             unitID: null,
        //             isBaseUnit: false
        //         });
        //     }
        //     else 
        //     {
        //         const dialogConfig = new MatDialogConfig();                
        //         dialogConfig.disableClose = true;
        //         dialogConfig.width = "600px";
        //         dialogConfig.height = "80px";
        //         dialogConfig.id = "AlertModal";
   
        //         this.dialog.open(AlertModalComponent, dialogConfig);            
        //     }
        // }
        // else
        // {
        //     this.formData.productUnits = [{
        //         uid: Math.random().toString(16).slice(2),
        //         isFoucs: true,
        //         barcode: '',
        //         unitID: null,
        //         isBaseUnit: false
        //     }];
        // }

        // var table = document.getElementsByClassName('unit-info');
        // if (table.length > 0) {
        //     var tbody = table[0].querySelector('tbody');
        //     if (!!tbody) {
        //         setTimeout(() => { 
        //             tbody.scrollTo(0, 50000);
        //             tbody.querySelector('input').focus();
        //         }, 100);
        //     }
        // }
    }

    changeisFoucs(uid, value) {
        if (!!this.formData.productUnits) {
            var currentData = this.formData.productUnits.filter(e => e.uid == uid);
            if (!!currentData) {
                currentData[0].isFoucs = value;
            }
        }
    }

    bindSave = async () => {
        console.log(this.formData)
        if (await this.validateProductUnit())
            await this.service.bindSave(this.formData).then(res => this.closeDialog(true));
    }

    closeDialog = async (isSave) => {
        let isClose = false;
        if (isSave)
            await this.service.refreshList().then(res => isClose = true);
        else
            isClose = true;
        if (isClose)
            (this.dialogRef.close(), console.log(this.productForm))
    }

    validateProductUnit = async () => {
        if (!!this.formData.productUnits && this.formData.productUnits.filter(e => { return e.isFoucs == false}).length > 0)
            return true;
        else
        {
            const dialogConfig = new MatDialogConfig();                
            dialogConfig.disableClose = true;
            dialogConfig.width = "600px";
            dialogConfig.height = "100px";
            dialogConfig.id = "AlertModal";
            dialogConfig.data = { 
                txtAlertHeader: "ไม่สามารถดำเนินการได้", 
                txtAlertContent: "กรุณาบันทึกหน่วยนับ" //"เนื่องจากสินค้าต้องมีหน่วยนับอย่างน้อย 1 หน่วยนับ" 
            }
            dialogConfig.position= { top: '50px' }

            this.dialog.open(AlertModalComponent, dialogConfig);      
        }
    }

    isBaseUnitClick(uid, value) {
        var currentData = this.formData.productUnits.filter(e => e.uid == uid);
        if (!!currentData && currentData[0].isFoucs) {
            currentData[0].isBaseUnit = value;
        }
    }
}