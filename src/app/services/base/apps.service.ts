import { HostListener, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private dialog:MatDialog,
    ) {}

    private objDialog = []
    private dialogRef;
    public configDialog = {
        id: null,
        autoFocus: null,
        disableClose: null,
        width: null,
        height: null,
        data: null,
        hasBackdrop: null,
        position: null
    }

    // @HostListener('document:keydown', ['$event'])
    // onKeyDown(e: KeyboardEvent) {
    //     if (!!this.dialogRef) return;        
    //     if (e.key == "Escape")
    //         console.log(e)
    //         // this._closeDialog(e)
    // }

    _openDialog(component) {
        var componentName = component.name
        if (this.objDialog.filter(x => x.componentName == componentName).length > 0) return;
        this.dialogRef = this.dialog.open(component, {
            id: !!this.configDialog.id ? this.configDialog.id : null,
            autoFocus: !!this.configDialog.autoFocus ? this.configDialog.autoFocus : true,
            disableClose: !!this.configDialog.disableClose ? this.configDialog.disableClose : true,
            width: !!this.configDialog.width ? this.configDialog.width : "380px",
            height: !!this.configDialog.height ? this.configDialog.height : "330px",
            data: !!this.configDialog.data ? this.configDialog.data : null,
            hasBackdrop: !!this.configDialog.hasBackdrop ? this.configDialog.hasBackdrop : true,
            position: !!this.configDialog.position ? this.configDialog.position : true,
        })
        
        this.dialogRef['componentName'] = componentName
        this.objDialog.push(this.dialogRef)

        this.dialogRef.afterOpened().subscribe(() => {
            console.log("test")
        })
    }

    _closeDialog(componentName) {
        if (!!componentName) {
            var _dialog = this.objDialog.filter(x => x.componentName == componentName)
            if (_dialog.length > 0) {
                _dialog[0].close()
                this.dialogRef.afterClosed().subscribe(() => {
                    this.configDialog = { id: null, autoFocus: null, disableClose: null, width: null, height: null, data: null, hasBackdrop: null, position: null }
                    this.objDialog = this.objDialog.filter(x => x.componentName != componentName)
                })
            }
        }
    }
}