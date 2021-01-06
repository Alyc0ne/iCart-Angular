import { Injectable } from '@angular/core';
import { ProductModel } from '../Shared/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    constructor(private http: HttpClient) {}

    readonly baseUrl = 'http://localhost:69/api/Goods'
    //formData: ProductModel = new ProductModel();
    list: ProductModel[];

    refreshList() {
        this.http.get(this.baseUrl)
        .toPromise()
        .then(res => this.list = res as ProductModel[]);
    }
}