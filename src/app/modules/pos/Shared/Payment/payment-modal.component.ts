import { Component, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReceiptModalComponent } from '../Receipt/receipt-modal.component';
import { AppService } from '@services/base/apps.service';

@Component({
    selector: 'app-payment-modal',
    templateUrl: './payment-modal.component.html',
    styleUrls: ['./payment-modal.component.css']
})

export class PaymentModalComponent {
    constructor(
        public baseService: AppService,
        @Inject(MAT_DIALOG_DATA) public dataRef
    ) {}

    public totalAmnt: number;
    public amntReceived: number;
    public balanceAmnt: number; 

    ngOnInit(): void {
        this.totalAmnt = this.dataRef;
        this.amntReceived = this.dataRef;
    }

    @HostListener('document:keydown', ['$event'])
    onKeyDown(e: KeyboardEvent) {
        if (e.key == "Enter") {
            if (this.amntReceived >= this.totalAmnt) {
                this.payment();
                console.log('Call Payment')
            }
        }
    }

    payment() {
        this.baseService._openDialog(ReceiptModalComponent);
    }
}