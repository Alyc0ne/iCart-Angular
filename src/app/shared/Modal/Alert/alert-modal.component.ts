import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '@services/base/apps.service';

@Component({
    selector: 'app-alert-modal',
    templateUrl: './alert-modal.component.html'
})

export class AlertModalComponent {

    constructor(
        public baseService: AppService,
        @Inject(MAT_DIALOG_DATA) public dataRef
    ){ }

}