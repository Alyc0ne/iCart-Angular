import { Component, HostListener } from '@angular/core';
import { POSService } from './Shared/pos.service';
import { cartModel } from './Shared/pos.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PaymentModalComponent } from './Shared/payment-modal.component'

@Component({
    selector: 'app-pos',
    templateUrl: './pos.component.html',
    styleUrls: ['./pos.component.css']
})

export class POSComponent {
    constructor(        
        public POSservice: POSService,
        private dialogPayment:MatDialog,
    ) {}

    private dialogRef;

    private _openDialog(component, _data) {
        if (!!this.dialogRef) return;        
        this.dialogRef = this.dialogPayment.open(component, {
            autoFocus: true,
            disableClose: true,
            width: "500px",
            height: "250px",
            data: !!_data ? _data : null
        })
      
        this.dialogRef.afterClosed().subscribe(() => {
            this.dialogRef = undefined;
        })
    }

    cartModel: cartModel;

    looper = [
        {},{},{},{},
        {},{},{},{}
    ]

    objProduct = [
        { productID: '1', productName: 'Dr Nice Kim So Hyun My Girl Friend', productQuantity: 1, productPrice: 100, productTotalPrice: 100 },
        { productID: '2', productName: 'Narco', productQuantity: 1, productPrice: 200, productTotalPrice: 200 },
        { productID: '3', productName: 'Bombasto', productQuantity: 1, productPrice: 300, productTotalPrice: 300 },
        { productID: '4', productName: 'Celeritas', productQuantity: 1, productPrice: 400, productTotalPrice: 400 },
        { productID: '5', productName: 'Magneta', productQuantity: 1, productPrice: 500, productTotalPrice: 500 },
        { productID: '6', productName: 'RubberMan', productQuantity: 1, productPrice: 600, productTotalPrice: 600 },
        { productID: '7', productName: 'Dynama', productQuantity: 1, productPrice: 700, productTotalPrice: 700 },
        { productID: '8', productName: 'Dr IQ', productQuantity: 1, productPrice: 800, productTotalPrice: 800 },
        { productID: '9', productName: 'Magma', productQuantity: 1, productPrice: 900, productTotalPrice: 900 },
        { productID: '10', productName: 'Singha', productQuantity: 1, productPrice: 1000, productTotalPrice: 1000 },
        { productID: '11', productName: 'Drinking', productQuantity: 1, productPrice: 1100, productTotalPrice: 1100 },
        { productID: '12', productName: 'Water', productQuantity: 1, productPrice: 1200, productTotalPrice: 1200 }
    ]


    ngOnInit(): void {
        this.POSservice.getPaymentType();
        console.log(this.cartModel)
        console.log(this.POSservice.paymentModel)
        this.cartModel = {
            //products: [{ productID: null, productName: null, productQuantity: null, productPrice: null, productTotalPrice: null}],
            summary: { paymentSeleted: this.POSservice.paymentModel[0].paymentType, subTotal: 0, discount: 0, totalAmnt: 0 }
        }
        
        // this.cartModel = {
        //     products: [{productID: '1', productName: 'Dr Nice Kim So Hyun My Girl Friend', productQuantity: 1, productPrice: 100, productTotalPrice: 100}],
        //     //products: this.objProduct
        //     summary: { paymentSeleted: this.POSservice.paymentModel[0].paymentType, subTotal: 0, discount: 0, totalAmnt: 0 }
        // }
           
        // this.cartModel.products.push(
        //     { productID: '1', productName: 'Dr Nice Kim So Hyun My Girl Friend', productQuantity: 1, productPrice: 100, productTotalPrice: 100 },
        //     { productID: '2', productName: 'Narco', productQuantity: 1, productPrice: 200, productTotalPrice: 200 },
        //     { productID: '3', productName: 'Bombasto', productQuantity: 1, productPrice: 300, productTotalPrice: 300 },
        //     { productID: '4', productName: 'Celeritas', productQuantity: 1, productPrice: 400, productTotalPrice: 400 },
        //     { productID: '5', productName: 'Magneta', productQuantity: 1, productPrice: 500, productTotalPrice: 500 },
        //     { productID: '6', productName: 'RubberMan', productQuantity: 1, productPrice: 600, productTotalPrice: 600 },
        //     { productID: '7', productName: 'Dynama', productQuantity: 1, productPrice: 700, productTotalPrice: 700 },
        //     { productID: '8', productName: 'Dr IQ', productQuantity: 1, productPrice: 800, productTotalPrice: 800 },
        //     { productID: '9', productName: 'Magma', productQuantity: 1, productPrice: 900, productTotalPrice: 900 },
        //     { productID: '10', productName: 'Singha', productQuantity: 1, productPrice: 1000, productTotalPrice: 1000 },
        //     { productID: '11', productName: 'Drinking', productQuantity: 1, productPrice: 1100, productTotalPrice: 1100 },
        //     { productID: '12', productName: 'Water', productQuantity: 1, productPrice: 1200, productTotalPrice: 1200 }
        // )

        // this.calSummary();
    }

    getProductByBarcode_text = async(event) => {
        var product = await this.POSservice.getProductByBarcode_text();
        if (!!product) {
            if (!!this.cartModel.products) {
                var currentProduct = this.cartModel.products.filter(x => { return x.productID == product.productID; });
                if (currentProduct.length > 0) {
                    this.manageQuatity(true.valueOf, currentProduct[0].productID, false)
                }
            }
            else
            {
                this.cartModel.products = [product];
            }

            this.calSummary();
        }

        console.log(event)
    }

    manageQuatity(type, productID, isCal = true) {
        if (!!productID) {
            if (!!this.cartModel.products) {
                var product = this.cartModel.products.filter(x => { return x.productID == productID; })
                if (product != null && product.length > 0) {
                    const _product = product[0];
                    if (type) {
                        _product.productQuantity += 1;
                        _product.productTotalPrice = (product[0].productTotalPrice + product[0].productPrice);
                    }
                    else
                    {
                        _product.productQuantity -= 1;
                        _product.productTotalPrice = (product[0].productTotalPrice - product[0].productPrice);
                    }
                }
                
                if (isCal)
                    this.calSummary();
            }
        }
    }

    calSummary() {
        console.log(this.cartModel)
        if (!!this.cartModel.products.length) {
            var subTotal = this.cartModel.products.reduce((sum, obj) => { return sum + obj.productTotalPrice; }, 0);
            this.cartModel.summary.subTotal = subTotal;
            this.cartModel.summary.totalAmnt = (subTotal - this.cartModel.summary.discount);
        }    
    }

    @HostListener('document:keydown', ['$event'])
    onKeyDown(e: KeyboardEvent) {
        if (e.keyCode == 32)
            this.callPaymentModal();
    }

    callPaymentModal() {
        if (this.cartModel.products.length > 0) {                
            /*await this.service.newProduct().then(res => (*/
                this._openDialog(PaymentModalComponent, this.cartModel.summary.totalAmnt);
            //));
        }
        else
        {
            console.log("No !!!")
        }
    }
}