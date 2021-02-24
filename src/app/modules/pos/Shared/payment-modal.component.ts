import { Component, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'payment-modal',
    templateUrl: './payment-modal.component.html',
    styleUrls: ['./payment-modal.component.css']
})

export class PaymentModalComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef:MatDialogRef<PaymentModalComponent>,
    ) {}

    public totalAmnt: number;
    public amntReceived: number;
    public balanceAmnt: number;
    private isCloseDialog = false;

    ngOnInit(): void {
        this.totalAmnt = this.data;
        this.amntReceived = 0;
    }

    onAmntReceivedChange(amntReceived: number) {
        this.balanceAmnt = this.totalAmnt - amntReceived;
    }

    @HostListener('document:keydown', ['$event'])
    onKeyDown(e: KeyboardEvent) {
        if (e.key == "Escape")
            this.isCloseDialog = true;

        if (e.key == "Enter") {
            if (this.amntReceived >= this.totalAmnt) {
                console.log('Call Payment')
            }
            
        }

        if (this.isCloseDialog) {
            this.dialogRef.close();
        }

        console.log(e.keyCode)
    }
}