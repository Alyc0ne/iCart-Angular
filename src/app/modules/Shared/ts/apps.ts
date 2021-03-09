import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private dialog:MatDialog,
    ) {}

    private dialogRef;

    _openDialog(component, _data) {
        if (!!this.dialogRef) return;        
        this.dialogRef = this.dialog.open(component, {
            autoFocus: true,
            disableClose: true,
            width: "500px",
            height: "250px",
            data: !!_data ? _data : null
        })
      
        this.dialogRef.afterClosed().subscribe(() => {
            this.dialogRef = undefined;
        })
    }

    showKuy() {
        console.log('boho')
    }
}