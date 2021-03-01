import { Component, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'receipt-modal',
    templateUrl: './receipt-modal.component.html',
    styleUrls: ['./receipt-modal.component.css']
})

export class ReceiptModalComponent {
    constructor(
        // @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef:MatDialogRef<ReceiptModalComponent>,
    ) {}

    ngOnInit(): void {}

    @HostListener('document:keydown', ['$event'])
    onKeyDown(e: KeyboardEvent) {
        //if (e.key == "Escape") {}
            //this.isCloseDialog = true;

        if (e.key == "Enter") {
            //if (this.amntReceived >= this.totalAmnt) {
                console.log('กด Enter เร็วไปไอ่ควาย')
            //}
            this.manageReceipt(false);            
        }

        if (e.keyCode == 32)
            this.manageReceipt(true);
    }

    manageReceipt(needRecept) {
        if (needRecept) {
            
        }

        this.dialogRef.close();
    }
}