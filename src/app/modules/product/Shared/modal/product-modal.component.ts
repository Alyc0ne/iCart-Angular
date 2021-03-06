import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductModel } from '../product.model';
import { ProductService } from '../product.service';
import { AlertModalComponent } from '../../../Shared/Modal/Alert/alert-modal.component';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '@services/base/apps.service';
import { UnitService } from 'app/modules/unit/Shared/unit.service';
import { SuccessModalComponent } from 'app/modules/Shared/Modal/Success/success-modal.component';

declare function SetNumberFormat(data): any;

@Component({
    selector: 'product-modal',
    templateUrl: './product-modal.component.html',
    styleUrls: ['./product-modal.component.css']
})

export class ProductModalComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public dataDialogRef,
        public baseService: AppService,
        public productService: ProductService,
        public unitService: UnitService,
        private fb: FormBuilder
    ) {}

    productForm: FormGroup;

    ngOnInit(): void {
        let objProduct = this.dataDialogRef.objProduct;
        if (!!objProduct) {
            this.productForm = this.fb.group({
                runningFormatID: [{ value: objProduct.runningFormatID, disabled:true }],
                productID: [{ value: objProduct.productID, disabled:true }],
                productNo: [{ value: objProduct.productNo, disabled:true }],
                productName: [objProduct.productName, Validators.required],
                productNameEng: [objProduct.productNameEng],
                productDesc: [objProduct.productDesc],
                productSalePrice: [ SetNumberFormat(objProduct.productSalePrice), Validators.required],
                productPurchasePrice: [SetNumberFormat(objProduct.productPurchasePrice)],
                productUnits: this.genProductUnits(objProduct.productUnits)
            })
        }

        // this.productForm.valueChanges.subscribe(console.log); 
        this.unitService.refreshList()
        // console.log('product modal ngoninit')
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
                    productUnitID: [element.productUnitID],
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
            barcode: [{ value: null, disabled: false }],
            unitID: [this.unitService.units[0].unitID],
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
                this.baseService.configDialog.alert.position = null
                this.baseService.configDialog.alert.hasBackdrop = true
                this.baseService.configDialog.alert.data = { message: "ไม่สามารภดำเนินการได้ กรุณาบันทึกหน่วยนับ" }
                this.baseService._openDialog(AlertModalComponent, "alert")
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

        setTimeout(() => { 
            const field = document.getElementById("barcode")
            if (!!field) field.focus();
        }, 100);
    }

    changeisFocus = async (uid, isFocus, index) => {
        if (!!this.productUnits) {            
            let myForm = (<FormArray>this.productForm.controls['productUnits']).at(index);
            if (!!myForm) {                          
                if (myForm.value.uid == uid) {
                    if (isFocus ? true : await this.validateAllFormFields(<FormGroup>myForm)) {
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
            if (await this.validateProductUnit()){
                await this.productService.bindSave(this.productForm.getRawValue()).then(res => {
                    this.baseService._closeDialog('ProductModalComponent', null)
                    this.productService.refreshList();
                    this.baseService.configDialog.success.data = { message: "ระบบบันทึกข้อมูลสินค้าเรียบร้อยแล้ว" }
                    this.baseService._openDialog(SuccessModalComponent, "success", true)
                });
            }
            else  document.getElementsByClassName('mat-tab-label')[1]['click']()
        } 
        else
        {
            this.validateAllFormFields(this.productForm);
        }            
    }

    bindEdit = async () => {
        if (this.productForm.valid){
            console.log(this.productForm.getRawValue())
            // if (await this.validateProductUnit())
            //     await this.productService.bindEdit(this.productForm.getRawValue()).then(res => this.closeDialog(true));
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

    // closeDialog = async (isSave) => {
    //     let isClose = false;
    //     if (isSave)
    //         await this.productService.refreshList().then(res => isClose = true);
    //     else
    //         isClose = true;
    //     if (isClose)
    //         (this.dialogRef.close(), console.log(this.productForm))
    // }

    validateProductUnit = async () => {
        if (this.productUnits.length == 0 || this.productUnits.filter(e => {  return e.value.isFocus == true; }).length > 0) {
            this.baseService.configDialog.alert.position = null
            // this.baseService.configDialog.alert.position.right = "500px"
            this.baseService.configDialog.alert.width = null
            this.baseService.configDialog.alert.hasBackdrop = true
            this.baseService.configDialog.alert.data = { message: "ไม่สามารภดำเนินการได้ กรุณาบันทึกหน่วยนับ" }
            this.baseService._openDialog(AlertModalComponent, "alert")   
        }
        else
        {
            if (this.productUnits.filter(e => {  return e.value.isBaseUnit == true; }).length == 0) {
                this.baseService.configDialog.alert.position = null
                this.baseService.configDialog.alert.width = null
                this.baseService.configDialog.alert.hasBackdrop = true
                this.baseService.configDialog.alert.data = { message: "ไม่สามารภดำเนินการได้ กรุณาบันทึกหน่วยนับ" }
                this.baseService._openDialog(AlertModalComponent, "alert")      
            }
            else
            {
                return true;
            }
        }
    }
}