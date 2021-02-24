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
    // [
    //     { paymentType: 1, paymentName: 'เงินสด' },
    //     { paymentType: 2, paymentName: 'เงินโอน / พร้อมเพย์' },
    //     { paymentType: 3, paymentName: 'คนละครึ่ง / เราชนะ' }
    // ];

    getPaymentType = async () => {
        this.paymentModel = [
            { paymentType: '1', paymentName: 'เงินสด' },
            { paymentType: '2', paymentName: 'เงินโอน / พร้อมเพย์' },
            { paymentType: '3', paymentName: 'คนละครึ่ง / เราชนะ' }
        ];
    }

    getProductByBarcode_text = async () => {
        // await this.http.get(this.baseUrl + 'Products/getProductByBarcode_text')
        // .toPromise()
        // .then(res => this.product = res);

        return { productID: '1', productName: 'Dr Nice Kim So Hyun My Girl Friend', productQuantity: 1, productPrice: 100, productTotalPrice: 100 }
    }
}