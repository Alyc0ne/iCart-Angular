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

    _openDialog(component, customConfig, _data) {
        if (!!this.dialogRef) return;        

        var defaultConfig = {
            autoFocus: true,
            disableClose: true,
            width: "380px",
            height: "380px",
            data: !!_data ? _data : null
        }

        if (!!customConfig)
            defaultConfig = customConfig

        this.dialogRef = this.dialog.open(component, defaultConfig)
      
        this.dialogRef.afterClosed().subscribe(() => {
            this.dialogRef = undefined;
        })
    }

    showKuy() {
        console.log('boho')
    }
}