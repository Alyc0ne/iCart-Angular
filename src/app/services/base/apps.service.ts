import { HostListener, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private dialog:MatDialog,
    ) {}
    
    public isLoading: Subject<boolean> = new BehaviorSubject(false)
    private objDialog = []
    private dialogRef;
    public configDialog = {
        default: {
            id: null,
            autoFocus: null,
            disableClose: null,
            width: null,
            height: null,
            data: null,
            hasBackdrop: null,
            position: null 
        },
        alert: {
            id: "alert-modal",
            autoFocus: true,
            disableClose: true,
            width: "500px",
            height: "50px",
            data: null,
            hasBackdrop: false,
            position: { right: '50px', top: '10px' },
        },
        success: {
            id: "success-modal",
            autoFocus: true,
            disableClose: true,
            width: "500px",
            height: "50px",
            data: null,
            hasBackdrop: false,
            position: { right: '50px', top: '10px' },
        }
    }

    getIsLoading() : Observable<boolean> {
        return this.isLoading
    }

    setIsLoading(value:boolean) : void {
        this.isLoading.next(value)
    }

    //this.baseService.configDialog.data = { message: "ระบบทำงานผิดพลาดไม่สามารถบันทึกหน่วยนับได้" }

    // @HostListener('document:keydown', ['$event'])
    // onKeyDown(e: KeyboardEvent) {
    //     if (!!this.dialogRef) return;        
    //     if (e.key == "Escape")
    //         console.log(e)
    //         // this._closeDialog(e)
    // }

    _openDialog(component, type) {
        var componentName = component.name
        type = type == null ? 'default' : type

        if (this.objDialog.filter(x => x.componentName == componentName).length > 0) return;
        this.dialogRef = this.dialog.open(component, this.configDialog[type])
        
        this.dialogRef['componentName'] = componentName
        this.objDialog.push(this.dialogRef)

        this.dialogRef.afterOpened().subscribe(() => {
            this.configDialog['default'] = { id: null, autoFocus: null, disableClose: null, width: null, height: null, data: null, hasBackdrop: null, position: null }
        })

        if (type == "alert" || type =="success") {
            setTimeout(() => {
                this._closeDialog(componentName)
            }, 1500);
        }
    }

    _closeDialog(componentName) {
        if (!!componentName && typeof componentName == "string") {
            var _dialog = this.objDialog.filter(x => x.componentName == componentName)
            if (_dialog.length > 0) {                             
                _dialog[0].close()
                this.dialogRef.afterClosed().subscribe(() => {
                    //this.configDialog = { id: null, autoFocus: null, disableClose: null, width: null, height: null, data: null, hasBackdrop: null, position: null }
                    this.objDialog = this.objDialog.filter(x => x.componentName != componentName) 
                })                
            }
        }
    }
}