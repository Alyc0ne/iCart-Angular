import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from './product.model';
import { UnitModel } from './unit.model';
import { AppService } from '@services/base/apps.service';

@Injectable({
    providedIn: 'root'
})

export class UnitService {
    constructor(
        private baseService: AppService,
        private http: HttpClient,
    ) {}

    readonly baseUrl = this.baseService.baseURL
    units: UnitModel[]
    runningNumber: string;
    runningFormatID: string;
    listUnit: UnitModel[];
    productModel: ProductModel[];

    refreshList = async () => {
        this.baseService.setIsLoading(true)
        this.http.get(this.baseUrl + 'Units')
        .toPromise()
        .then(res => {
            this.units = res as UnitModel[]
            this.units.forEach((x, index) => {
                x.createdDate = new Date(x.createdDate).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                });
                x.added_on = (index + 1)
            });
            this.baseService.setIsLoading(false)
        });
    }
    
    getRunning = async () => {
        await this.http.get(this.baseUrl + 'Units/GetrunningNumber')
        .toPromise()
        .then(res => (this.runningNumber = res['lastestNo'], this.runningFormatID = res['runningFormatID']));
    }

    bindSave = async (UnitModel) => {
        if (!!UnitModel) {
            await this.http.post(this.baseUrl + 'Units/CreateUnit', UnitModel)
            .toPromise()
            .catch(error => { throw new Error(error) } )
        }
    }

    bindEdit = async (UnitModel) => {
        if (!!UnitModel) {
            await this.http.post(this.baseUrl + 'Units/UpdateUnit', UnitModel)
            .toPromise()
            .catch(error => { throw new Error(error) } )
        }
    }

    bindDelete = async (unitIDs) => {        
        await this.http.post(this.baseUrl + 'Units/DeleteUnit', unitIDs)
            .toPromise()
            .catch(error => { throw new Error(error) } )
    }
}