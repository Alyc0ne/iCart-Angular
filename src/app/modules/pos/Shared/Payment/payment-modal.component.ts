import { Component, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ReceiptModalComponent } from '../Receipt/receipt-modal.component';

@Component({
    selector: 'app-payment-modal',
    templateUrl: './payment-modal.component.html',
    styleUrls: ['./payment-modal.component.css']
})

export class PaymentModalComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef:MatDialogRef<PaymentModalComponent>,
        public dialog:MatDialog
    ) {}

    public totalAmnt: number;
    public amntReceived: number;
    public balanceAmnt: number;
    private isCloseDialog = false;
    
    private dialogOpen;
    private _openDialog(component, _data) {
        if (!!this.dialogOpen) return;        
        this.dialogOpen = this.dialog.open(component, {
            autoFocus: true,
            disableClose: true,
            width: "500px",
            height: "250px",
            data: !!_data ? _data : null
        })
      
        this.dialogOpen.afterClosed().subscribe(() => {
            this.dialogOpen = undefined;
        })
    }

    ngOnInit(): void {
        this.totalAmnt = this.data;
        this.amntReceived = this.data;
    }

    @HostListener('document:keydown', ['$event'])
    onKeyDown(e: KeyboardEvent) {
        if (e.key == "Escape")
            this.isCloseDialog = true;

        if (e.key == "Enter") {
            if (this.amntReceived >= this.totalAmnt) {
                this.payment();
                console.log('Call Payment')
            }
            
        }

        if (this.isCloseDialog) {
            this.dialogRef.close();
        }

        console.log(e.keyCode)
    }

    onAmntReceivedChange(amntReceived: number) {
        this.balanceAmnt = amntReceived - this.totalAmnt;
    }

    payment() {
        this._openDialog(ReceiptModalComponent, null);
    }
}