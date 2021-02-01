import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-alert',
    templateUrl: './alert-modal.component.html'
})

export class AlertModalComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef:MatDialogRef<AlertModalComponent>
    ){ }

    closeDialog() {
        this.dialogRef.close();
    }
}