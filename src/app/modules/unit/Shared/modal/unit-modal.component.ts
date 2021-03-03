import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UnitService } from '../unit.service';
import { AlertModalComponent } from '../../../Shared/Modal/Alert/alert-modal.component';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'unit-modal',
    templateUrl: './unit-modal.component.html',
    styleUrls: ['./unit-modal.component.css']
})

export class UnitModalComponent {
    unitForm: FormGroup;
    modalHeaderText: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef:MatDialogRef<UnitModalComponent>,
        private dialog:MatDialog,
        public unitService: UnitService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        let objUnit = this.data.objUnit;
        //if (!!objProduct) {
            this.unitForm = this.fb.group({
                runningFormatID: [objUnit.runningFormatID],
                unitID: [objUnit.unitID],
                unitNo: [{ value: objUnit.unitNo, disabled:true }],
                unitName: [objUnit.unitName, Validators.required],
            })
        //}

        this.modalHeaderText = this.data.headerText;
        

        this.unitForm.valueChanges.subscribe(console.log); 
    }

    get unit() {
        return this.unitForm.controls;
    }

    manageUnit(unitID) {
        if (!!unitID) 
            this.bindEdit()
        else
            this.bindSave()
    }

    bindSave = async () => {
        if (this.unitForm.valid) {
            await this.unitService.bindSave(this.unitForm.getRawValue()).then(res => this.closeDialog(true));
        } 
        else
        {
            this.validateAllFormFields(this.unitForm);
        }            
    }

    bindEdit = async () => {
        if (this.unitForm.valid) {
            await this.unitService.bindEdit(this.unitForm.getRawValue()).then(res => this.closeDialog(true));
        } 
        else
        {
            this.validateAllFormFields(this.unitForm);
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
            await this.unitService.refreshList().then(res => isClose = true);
        else
            isClose = true;
        if (isClose)
            (this.dialogRef.close(), console.log(this.unitForm))
    }
}