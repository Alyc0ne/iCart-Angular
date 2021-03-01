import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductModel } from '../product.model';
import { ProductService } from '../product.service';
import { AlertModalComponent } from '../../../Shared/Modal/Alert/alert-modal.component';
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
    public count = 1;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef:MatDialogRef<ProductModalComponent>,
        private dialog:MatDialog,
        public service: ProductService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        console.log(this.data)

        let objProduct = this.data.objProduct;
        if (!!objProduct) {
            this.productForm = this.fb.group({
                runningFormatID: [objProduct.runningFormatID],
                productID: [objProduct.productID],
                productNo: [{ value: objProduct.productNo, disabled:true }],
                productName: [objProduct.productName, Validators.required],
                productNameEng: [objProduct.productNameEng],
                productDesc: [objProduct.productDesc],
                productSalePrice: [objProduct.productSalePrice, Validators.required],
                productPurchasePrice: [objProduct.productPurchasePrice],
                productUnits: this.genProductUnits(objProduct.productUnits)
            })
        }
        

        this.productForm.valueChanges.subscribe(console.log); 
    }

    get product() {
        return this.productForm.controls;
    }

    get productUnits() {
        return this.productForm.get('productUnits')['controls'];
    }

    genProductUnits(productUnits) {
        var productUnitAR = this.fb.array([]);
        if (!!productUnits) {
            productUnits.forEach(element => {
                productUnitAR.push(this.fb.group({
                    uid: [Math.random().toString(16).slice(2)],
                    isFocus: [false],
                    barcode: [{ value: element.barcode, disabled: true }],
                    unitID: [element.unitID, Validators.required],
                    isBaseUnit: [{ value: element.isBaseUnit, disabled: true }]
                }))
                console.log(element)
            });
        }

        return productUnitAR;
    }

    addUnit() {
        var productUnitFG = this.fb.group({
            uid: [Math.random().toString(16).slice(2)],
            isFocus: [true],
            barcode: [{ value: 'fff' + this.count, disabled: false }],
            unitID: ['', Validators.required],
            isBaseUnit: [false]
        });

        var len = this.productUnits.length;
        if (len == 0) {
            this.productForm.setControl('productUnits', this.fb.array([productUnitFG]));
        }
        else
        {   
            var controls = this.productUnits[len - 1];
            if (controls.get('isFocus').value) {
                const dialogConfig = new MatDialogConfig();                
                dialogConfig.disableClose = true;
                dialogConfig.width = "600px";
                dialogConfig.height = "100px";
                dialogConfig.id = "AlertModal";
                dialogConfig.data = { 
                    txtAlertHeader: "ไม่สามารถดำเนินการได้", 
                    txtAlertContent: "กรุณาบันทึกหน่วยนับ" //"เนื่องจากสินค้าต้องมีหน่วยนับอย่างน้อย 1 หน่วยนับ" 
                }
                //dialogConfig.position= { top: '50px' }
    
                this.dialog.open(AlertModalComponent, dialogConfig);       
            }
            else
            {
                this.productUnits.push(productUnitFG);

                var table = document.getElementsByClassName('unit-info');
                if (table.length > 0) {
                    var tbody = table[0].querySelector('tbody');
                    if (!!tbody) {
                        setTimeout(() => { 
                            tbody.scrollTo(0, 50000);
                            tbody.querySelector('input').focus();
                        }, 100);
                    }
                }
            }
                
        }

        this.count++;
    }

    changeisFocus = async (uid, isFocus, index) => {
        if (!!this.productUnits) {            
            let myForm = (<FormArray>this.productForm.controls['productUnits']).at(index);
            if (!!myForm) {                          
                if (myForm.value.uid == uid) {
                    if (await this.validateAllFormFields(<FormGroup>myForm)) {
                        myForm.patchValue({ isFocus: isFocus })
                        if (isFocus)
                            myForm.enable();
                        else
                            myForm.disable();
                    }
                }
            }
        }
    }

    manageProduct(productID) {
        if (!!productID) 
            this.bindEdit()
        else
            this.bindSave()
    }

    bindSave = async () => {
        if (this.productForm.valid){
            if (await this.validateProductUnit())
                await this.service.bindSave(this.productForm.getRawValue()).then(res => this.closeDialog(true));
        } 
        else
        {
            this.validateAllFormFields(this.productForm);
        }            
    }

    bindEdit = async () => {
        if (this.productForm.valid){
            if (await this.validateProductUnit())
                await this.service.bindEdit(this.productForm.getRawValue()).then(res => this.closeDialog(true));
        } 
        else
        {
            this.validateAllFormFields(this.productForm);
        }            
    }

    validateAllFormFields = async (formGroup: FormGroup) => {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormArray) {
                this.validateAllFormArrayFields(control);
            }
        });

        if (formGroup.valid)
            return true;
        else
            return false;
    }

    validateAllFormArrayFields(formArray: FormArray) {   
        Object.keys(formArray.controls).forEach(index => {
            var formGroup = formArray.controls[index];
            Object.keys(formGroup.controls).forEach(field => {
                const control = formGroup.get(field);
                control.markAsTouched({ onlySelf: true });
            });
        });
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
        if (this.productUnits.length == 0 || this.productUnits.filter(e => {  return e.value.isFocus == true; }).length > 0) {
                const dialogConfig = new MatDialogConfig();                
                dialogConfig.disableClose = true;
                dialogConfig.width = "600px";
                dialogConfig.height = "100px";
                dialogConfig.id = "AlertModal";
                dialogConfig.data = { 
                    txtAlertHeader: "ไม่สามารถดำเนินการได้", 
                    txtAlertContent: "กรุณาบันทึกหน่วยนับ"
                }
                dialogConfig.position= { top: '50px' }

                this.dialog.open(AlertModalComponent, dialogConfig);      
        }
        else
        {
            if (this.productUnits.filter(e => {  return e.value.isBaseUnit == true; }).length == 0) {
                const dialogConfig = new MatDialogConfig();                
                dialogConfig.disableClose = true;
                dialogConfig.width = "600px";
                dialogConfig.height = "100px";
                dialogConfig.id = "AlertModal";
                dialogConfig.data = { 
                    txtAlertHeader: "ไม่สามารถดำเนินการได้", 
                    txtAlertContent: "ต้องมีหน่วยนับหลักอย่างน้อย 1 หน่วยนับหลัก"
                }
                dialogConfig.position= { top: '50px' }

                this.dialog.open(AlertModalComponent, dialogConfig);      
            }
            else
            {
                return true;
            }
        }
    }
}