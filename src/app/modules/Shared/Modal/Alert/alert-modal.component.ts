import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-alert-modal',
    templateUrl: './alert-modal.component.html'
})

export class AlertModalComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public dataRef
    ){ }

}