import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../Shared/product.model';
import { UnitModel } from '../Shared/unit.model';
import { AppService } from '@services/base/apps.service';
import { Products } from '@interfaces/products';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    constructor(
        private baseService: AppService,
        private http: HttpClient
        ) {}

    readonly baseUrl = this.baseService.baseURL
    list: ProductModel[];
    runningNumber: string;
    runningFormatID: string;
    listUnit: UnitModel[];
    
    products: Products[]

    getProducts = async () => {
        this.baseService.setIsLoading(true)
        return await this.http.get<Products[]>(this.baseUrl + 'Products')
        .toPromise()
        .then(res => { 
            this.baseService.setIsLoading(false)
            return res
        });
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
        await this.getRunning()
        //await this.getUnit()
    }

    getProduct = async (productID) => {
        //await this.getUnit()
        return await this.http.get(this.baseUrl + 'Products/' + productID)
        .toPromise()
        .then(res => { return res })
    }

    bindSave = async (ProductModel) => {
        if (!!ProductModel) {
            await this.http.post(this.baseUrl + 'Products/CreateProduct', ProductModel)
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