import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentModel } from './pos.model';
// import { pro } from '../../product/Shared/product.model';

@Injectable({
    providedIn: 'root'
})

export class POSService {
    constructor(private http: HttpClient) {}
    readonly baseUrl = 'http://localhost:5000/api/'

    product: any;
    paymentModel: PaymentModel[];

    objProduct = [
        { productID: '1', productName: 'Dr Nice Kim So Hyun My Girl Friend11111111111111111111111111111', productQuantity: 1, productPrice: 100, productTotalPrice: 100, added_on: null },
        { productID: '2', productName: 'Narco', productQuantity: 1, productPrice: 200, productTotalPrice: 200, added_on: null },
        { productID: '3', productName: 'Bombasto', productQuantity: 1, productPrice: 300, productTotalPrice: 300, added_on: null },
        { productID: '4', productName: 'Celeritas', productQuantity: 1, productPrice: 400, productTotalPrice: 400, added_on: null },
        { productID: '5', productName: 'Magneta', productQuantity: 1, productPrice: 500, productTotalPrice: 500, added_on: null },
        { productID: '6', productName: 'RubberMan', productQuantity: 1, productPrice: 600, productTotalPrice: 600, added_on: null },
        { productID: '7', productName: 'Dynama', productQuantity: 1, productPrice: 700, productTotalPrice: 700, added_on: null },
        { productID: '8', productName: 'Dr IQ', productQuantity: 1, productPrice: 800, productTotalPrice: 800, added_on: null },
        { productID: '9', productName: 'Magma', productQuantity: 1, productPrice: 900, productTotalPrice: 900, added_on: null },
        { productID: '10', productName: 'Singha', productQuantity: 1, productPrice: 1000, productTotalPrice: 1000, added_on: null },
        { productID: '11', productName: 'Drinking', productQuantity: 1, productPrice: 1100, productTotalPrice: 1100, added_on: null },
        { productID: '12', productName: 'Water', productQuantity: 1, productPrice: 1200, productTotalPrice: 1200, added_on: null }
    ]

    getPaymentType = async () => {
        this.paymentModel = [
            { paymentType: '1', paymentName: 'เงินสด' },
            { paymentType: '2', paymentName: 'เงินโอน / พร้อมเพย์' },
            { paymentType: '3', paymentName: 'คนละครึ่ง / เราชนะ' }
        ];
    }

    getProductByBarcode_text = async (textSearch) => {
        // await this.http.get(this.baseUrl + 'Products/getProductByBarcode_text')
        // .toPromise()
        // .then(res => this.product = res);
        var product = this.objProduct.filter(x => { return x.productID == textSearch });
        product[0].added_on = new Date().getTime()
        return product;
         

        //return { productID: '1', productName: 'Dr Nice Kim So Hyun My Girl Friend', productQuantity: 1, productPrice: 100, productTotalPrice: 100 }
    }
}