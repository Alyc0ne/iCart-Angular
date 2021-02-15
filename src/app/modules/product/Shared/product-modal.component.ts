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

    get productUnits() {
        return this.productForm.get('productUnits')['controls'];
    }

    // get productUnits(): FormArray {
    //     return this.productForm.get('productUnits') as FormArray;
    // }

    addUnit() {
        var productUnitFG = this.fb.group({
            uid: [Math.random().toString(16).slice(2)],
            isFocus: [false],
            barcode: [ { value: 'fff', disabled: false }, Validators.required],
            unitID: [''],
            isBaseUnit: [false]
        });

        if (this.productUnits.length == 0) {
            this.productForm.setControl('productUnits', this.fb.array([productUnitFG]));
        }
        else
        {
            this.productUnits.push(productUnitFG);
        }

        //this.productUnits.push([this.fb.group({
            // uid: [Math.random().toString(16).slice(2)],
            // isFoucs: [true],
            // barcode: [ { value: 'fff', disabled: false }, Validators.required],
            // unitID: [''],
            // isBaseUnit: [false]
        //})]);




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

    changeisFocus(uid, value) {
        if (!!this.productUnits) {
            this.product.productUnits.value.forEach((data, index) => {
                let myForm = (<FormArray>this.productForm.controls['productUnits']).at(index);
                //const myForm = (<FormArray>this.productForm.get('productUnits')).at(index);
                // console.log(myForm);
                myForm.patchValue({
                    isFocus: false,
                    unitID: 1
                })

                myForm.disable();
            });

            // this.productForm.productUnits.value.forEach((data, index)=>{

            //     if(this.f.itemId.value == this.f.credentials.value[index].itemId){
            //         this.PushVaribaleCheck = this.f.credentials.value[index].itemName;
            //         const addValue = qty +this.f.credentials.value[index].qty;
            
            //         const myForm = (<FormArray>this.purchaseOrderGroup.get("credentials")).at(index);
            //         myForm.patchValue({
            //         qty:addValue
            //         })
            
            //     }
            // })


            // var currentData = this.productUnits.filter(e => e.uid == uid);
            // if (!!currentData) { 
            //     console.log(this.productForm.get('productUnits').at(0))
            // }
            //currentData[0].isFoucs = value;
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