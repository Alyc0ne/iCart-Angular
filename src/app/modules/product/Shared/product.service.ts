import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../Shared/product.model';
import { UnitModel } from '../Shared/unit.model';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    constructor(private http: HttpClient) {}

    readonly baseUrl = 'http://localhost:6969/api/'
    //formData: ProductModel = new ProductModel();
    list: ProductModel[];
    runningNumber: string;
    listUnit: UnitModel[];

    refreshList() {
        this.http.get(this.baseUrl + 'Unit')
        .toPromise()
        .then(res => this.list = res as ProductModel[]);
    }

    getRunning() {
        this.http.get(this.baseUrl + 'Product/getRunningNumber')
        .toPromise()
        .then(res => console.log(res));
    }

    getUnit() {
        this.http.get(this.baseUrl + 'Unit')
        .toPromise()
        .then(res => this.listUnit = res as UnitModel[]);
    }

    getPrepareData = async () => {
        await this.http.get('/api/Product/getRunningNumber', {responseType: 'text'}).subscribe( result => { this.runningNumber = result} );
        await this.getUnit();

        //console.log(this.runningNumber)
    }

    bindSave = async (ProductModel) => {
        await this.http.post('/api/Product', ProductModel)
        .toPromise()
        .then(res => console.log(res))
    }

    // async getPrepareData() {
    //     
    // }

    // getPrepareData() {
    //     this.http.get(this.baseUrl + '/prepareData')
    //     .toPromise()
    //     .then(
    //         res => this.listUnit = res[0].listUnit as UnitModel[]
    //     );
    // }
}