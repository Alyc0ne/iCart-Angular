import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../Shared/product.model';
import { UnitModel } from '../Shared/unit.model';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    constructor(private http: HttpClient) {}

    readonly baseUrl = 'http://localhost:5000/api/'
    //formData: ProductModel = new ProductModel();
    list: ProductModel[];
    runningNumber: string;
    runningFormatID: string;
    listUnit: UnitModel[];

    refreshList = async () => {
        this.http.get(this.baseUrl + 'Products')
        .toPromise()
        .then(res => (this.list = res as ProductModel[], console.log(res)));
    }

    getRunning = async () => {
        await this.http.get(this.baseUrl + 'Products/GetrunningNumber')
        .toPromise()
        .then(res => (this.runningNumber = res['lastestNo'], this.runningFormatID = res['runningFormatID']));
    }

    getUnit = async () => {
        await this.http.get(this.baseUrl + 'Units')
        .toPromise()
        .then(res => this.listUnit = res as UnitModel[]);
    }

    newProduct = async () => {
        await this.getRunning();
        await this.getUnit();
    }

    bindSave = async (ProductModel) => {
        await this.http.post(this.baseUrl + 'Products', ProductModel)
        .toPromise()
        .then(res => console.log(res))
    }
}