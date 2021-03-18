import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from './product.model';
import { UnitModel } from './unit.model';

@Injectable({
    providedIn: 'root'
})

export class UnitService {
    constructor(
        private http: HttpClient,
    ) {}

    readonly baseUrl = 'http://localhost:5000/api/'
    units: UnitModel[]
    runningNumber: string;
    runningFormatID: string;
    listUnit: UnitModel[];
    productModel: ProductModel[];

    refreshList = async () => {
        this.http.get(this.baseUrl + 'Units')
        .toPromise()
        .then(res => {
            this.units = res as UnitModel[]
            this.units.forEach(x => {
                x.createdDate = new Date(x.createdDate).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                });
            });

        });
    }
    
    getRunning = async () => {
        await this.http.get(this.baseUrl + 'Units/GetrunningNumber')
        .toPromise()
        .then(res => (this.runningNumber = res['lastestNo'], this.runningFormatID = res['runningFormatID']));
    }

    bindSave = async (UnitModel) => {
        console.log("UnitModel : " + UnitModel)
        if (!!UnitModel) {
            await this.http.post(this.baseUrl + 'Units', UnitModel)
            .toPromise()
            .then(res => console.log(res))
            .catch(res => console.log("catch"))
        }
    }

    bindEdit = async (ProductModel) => {
        if (!!ProductModel) {
            console.log(ProductModel)
            // await this.http.post(this.baseUrl + 'Products', ProductModel)
            // .toPromise()
            // .then(res => console.log(res))
            // .catch(res => console.log("catch"))
        }
    }

    bindDelete = async (productID) => {
        if (!!productID) {
            
        }
    }
}