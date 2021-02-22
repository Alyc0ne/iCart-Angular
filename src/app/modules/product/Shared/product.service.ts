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
    productModel: ProductModel[];

    refreshList = async () => {
        this.http.get(this.baseUrl + 'Products')
        .toPromise()
        .then(res => this.list = res as ProductModel[]);
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

    getProduct = async (productID) => {
        await this.http.get(this.baseUrl + 'Products/' + productID)
        .toPromise()
        .then(res => (this.productModel = res as ProductModel[], this.getUnit()))
    }

    bindSave = async (ProductModel) => {
        if (!!ProductModel) {
            await this.http.post(this.baseUrl + 'Products', ProductModel)
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