import { Component } from '@angular/core';
import { POSModel } from './Shared/pos.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PaymentModalComponent } from './Shared/payment-modal.component'

@Component({
    selector: 'app-pos',
    templateUrl: './pos.component.html',
    styleUrls: ['./pos.component.css']
})

export class POSComponent {
    constructor(
        private dialog:MatDialog,
    ) {}

    paymentModel = [
        { paymentType: 1, paymentName: 'เงินสด' },
        { paymentType: 2, paymentName: 'เงินโอน / พร้อมเพย์' },
        { paymentType: 3, paymentName: 'คนละครึ่ง / เราชนะ' }
    ]

    totalAmnt = "25450";

    paymentSeleted = this.paymentModel[0].paymentType

    cartProduct = {
        products: [
            { id: 1, name: 'Dr Nice Kim So Hyun My Girl Friend', quantity: 1, price: 100, totalPrice: 100 },
            { id: 2, name: 'Narco', quantity: 1, price: 200, totalPrice: 200 },
            { id: 3, name: 'Bombasto', quantity: 1, price: 300, totalPrice: 300 },
            { id: 4, name: 'Celeritas', quantity: 1, price: 400, totalPrice: 400 },
            { id: 5, name: 'Magneta', quantity: 1, price: 500, totalPrice: 500 },
            { id: 6, name: 'RubberMan', quantity: 1, price: 600, totalPrice: 600 },
            { id: 7, name: 'Dynama', quantity: 1, price: 700, totalPrice: 700 },
            { id: 8, name: 'Dr IQ', quantity: 1, price: 800, totalPrice: 800 },
            { id: 9, name: 'Magma', quantity: 1, price: 900, totalPrice: 900 },
            { id: 10, name: 'Singha', quantity: 1, price: 1000, totalPrice: 1000 },
            { id: 11, name: 'Drinking', quantity: 1, price: 1100, totalPrice: 1100 },
            { id: 12, name: 'Water', quantity: 1, price: 1200, totalPrice: 1200 }
        ],
        summary : 
        {   
            paymentSeleted: this.paymentModel[0].paymentType,
            subTotal: 0,
            discount: 500,
            totalAmnt: 0
        }
    }

    looper = [
        {},{},{},{},
        {},{},{},{}
    ]

    // ,{},{},{},{},{},{}


    ngOnInit(): void {
        this.calSummary();
    }

    manageQuatity(type, productID) {
        if (!!productID) {
            if (!!this.cartProduct.products) {
                var product = this.cartProduct.products.filter(x => { return x.id == productID; })
                if (product != null && product.length > 0) {
                    const _product = product[0];
                    if (type) {
                        _product.quantity += 1;
                        _product.totalPrice = (product[0].totalPrice + product[0].price);
                    }
                    else
                    {
                        _product.quantity -= 1;
                        _product.totalPrice = (product[0].totalPrice - product[0].price);
                    }
                }

                this.calSummary();
            }
        }
    }

    calSummary() {
        if (this.cartProduct.products.length > 0) {
            var subTotal = this.cartProduct.products.reduce((sum, obj) => { return sum + obj.totalPrice; }, 0);
            console.log(subTotal);
            this.cartProduct.summary.subTotal = subTotal;

            this.cartProduct.summary.totalAmnt = (subTotal - this.cartProduct.summary.discount);
        }    
    }

    callPaymentModal() {
        if (this.cartProduct.products.length > 0) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.autoFocus = true;
            dialogConfig.disableClose = true;
            dialogConfig.width = "500px";
            dialogConfig.height = "200px";

                /*await this.service.newProduct().then(res => (
                    dialogConfig.data = {
                        objProduct : { 
                            runningFormatID: this.service.runningFormatID, 
                            productNo: this.service.runningNumber 
                        }
                    },*/
                    this.dialog.open(PaymentModalComponent, dialogConfig)
                //));
            
        }
        else
        {
            console.log("No !!!")
        }
    }
}