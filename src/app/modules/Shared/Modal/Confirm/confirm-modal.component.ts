import { Component } from '@angular/core';
import { AppService } from '@services/base/apps.service';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.css']
})

export class ConfirmModalComponent {

    constructor(
       public baseService: AppService,
    ){ }
}