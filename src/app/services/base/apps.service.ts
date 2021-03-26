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
    public dialogRef;
    public configDialog = {
        default: { id: null, autoFocus: null, disableClose: null, width: null, height: null, data: null, hasBackdrop: null, position: null },
        confirm: {
            id: "confirm-modal",
            autoFocus: true,
            disableClose: true,
            width: "350px",
            height: "300px",
            data: null,
            hasBackdrop: true,
            position: null,
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

    _openDialog(component, type) {
        var componentName = component.name

        if (this.objDialog.filter(x => x.componentName == componentName).length > 0) return;
        this.dialogRef = this.dialog.open(component, this.configDialog[type])
        
        this.dialogRef['componentName'] = componentName
        this.objDialog.push(this.dialogRef)

        this.dialogRef.afterOpened().subscribe(() => {
            this.configDialog['default'] = { id: null, autoFocus: null, disableClose: null, width: null, height: null, data: null, hasBackdrop: null, position: null }
        })

        if (type == "alert" || type =="success") {
            setTimeout(() => {
                this._closeDialog(componentName, null)
            }, 1500);
        }
    }

    _closeDialog(componentName, action) {
        if (!!componentName && typeof componentName == "string") {
            var _dialog = this.objDialog.filter(x => x.componentName == componentName)
            if (_dialog.length > 0) {                             
                _dialog[0].close(action)
                this.dialogRef.afterClosed().subscribe(() => {                    
                    this.objDialog = this.objDialog.filter(x => x.componentName != componentName) 
                })                
            }
        }
    }



    getIdFromFocus = async (gridID) => {
        if(gridID === undefined || gridID === null) return

        var objTables = []
        var ids = []
        var _class = "grid-inline-row"

        var tables = document.querySelectorAll('.table');
        if (tables.length == 0) return

        tables.forEach(x => {
            if (!!objTables[x['dataset']['gridid']]) {

            } else {
                objTables[x['dataset']['gridid']] = [{ 
                    'gridType': x['dataset']['gridtype'],
                    'classList': x.classList,
                    'rowHover': Array.prototype.slice.call(x.getElementsByClassName('grid-inline-row rowHover'))
                }]
            }
        })

        var table_classList = tables
        var selectOne = document.querySelector('div.gridSelectOne')
        if (selectOne) {
            
        }

        const currentGrid = objTables[gridID][0]
        currentGrid['rowHover'].forEach(x => {
            ids.push(x['dataset']['id'])
        })

        return ids
    }
}