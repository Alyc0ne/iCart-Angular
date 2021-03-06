import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '@services/base/apps.service';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.css']
})

export class ConfirmModalComponent {

    constructor(
       public baseService: AppService,
       @Inject(MAT_DIALOG_DATA) public dataDialogRef
    ){ }
}