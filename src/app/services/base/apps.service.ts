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
    public configDialog = {
        autoFocus: true,
        disableClose: true,
        width: "380px",
        height: "380px",
        data: null
    }

    _openDialog(component) {
        if (!!this.dialogRef) return;        
        this.dialogRef = this.dialog.open(component, this.configDialog)
        this.dialogRef.afterClosed().subscribe(() => {
            this.dialogRef = undefined;
        })
    }

    _closeDialog() {
        this.dialogRef.close()
    }

    getConfigModal(type, data) {
        var config = {};

        if (type == "confirm") {
           
        } else {
            config = {
                autoFocus: true,
                disableClose: true,
                width: "380px",
                height: "380px",
                data: !!data ? data : null
            }
        }

        return config;
    }

    showKuy() {
        console.log('boho')
    }
}