import { Component } from '@angular/core';

@Component({
    selector: 'app-pos',
    templateUrl: './pos.component.html',
    styleUrls: ['./pos.component.css']
})

export class POSComponent {
    constructor() {}
    fakeModel = [
        { id: 11, name: 'Dr Nice Kim So Hyun My Girl Friend', totalPrice: '200' },
        { id: 12, name: 'Narco', totalPrice: '250' },
        { id: 13, name: 'Bombasto', totalPrice: '630' },
        { id: 14, name: 'Celeritas', totalPrice: '4350' },
        { id: 15, name: 'Magneta', totalPrice: '400' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' }
    ]; 

    foods = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
      ];

    paymentModel = [
        { paymentType: 1, paymentName: 'เงินสด' },
        { paymentType: 2, paymentName: 'เงินโอน / พร้อมเพย์' },
        { paymentType: 3, paymentName: 'คนละครึ่ง / เราชนะ' }
    ]

    paymentSeleted = this.paymentModel[0].paymentType


    ngOnInit(): void {
        this.showHee();
    }

    showHee() {
        console.log(this.fakeModel)
    }

    callPaymentModal(e) {
        
    }
}