import { Component, HostListener } from '@angular/core';
import { POSService } from './Shared/pos.service';
import { cartModel } from './Shared/pos.model';
import { PaymentModalComponent } from './Shared/Payment/payment-modal.component'
import { AppService } from '../Shared/ts/apps';

@Component({
    selector: 'app-pos',
    templateUrl: './pos.component.html',
    styleUrls: ['./pos.component.css']
})

export class POSComponent {
    constructor(
        public baseService: AppService,
        public posService: POSService,
    ) {}

    cartModel: cartModel;
    textSearch: string;
    
    ngOnInit(): void {
        this.posService.getPaymentType();
        this.cartModel = {
            summary: { paymentSeleted: this.posService.paymentModel[0].paymentType, subTotal: 0, discount: 0, totalAmnt: 0 }
        }
    }

    getProductByBarcode_text = async() => {
        var product = await this.posService.getProductByBarcode_text(this.textSearch);
        if (product.length > 0) {
            this.setProductToCart(product[0]);
        }

        this.textSearch = ''
    }

    setProductToCart(product) {
        if (!!this.cartModel.products) {
            var currentProduct = this.cartModel.products.filter(x => { return x.productID == product.productID; });
            if (currentProduct.length > 0)
                this.manageQuatity(true.valueOf, currentProduct[0].productID, false)
            else
                this.cartModel.products.push(product);
        }
        else
        {
            this.cartModel.products = [product];
        }

        this.cartModel.products.sort((a, b) => {
            return <any>new Date(b.added_on) - <any>new Date(a.added_on);
        })

        this.calSummary();
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

                    _product.added_on = new Date().getTime();
                }
                
                if (isCal)
                    this.calSummary();
            }
        }
    }

    calSummary() {
        // console.log(this.cartModel)
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
        if (e.keyCode == 27) 
            this.clearCart();
    }

    clearCart() {
        if (!!this.cartModel.products.length) {
            this.cartModel = {
                summary: { paymentSeleted: this.posService.paymentModel[0].paymentType, subTotal: 0, discount: 0, totalAmnt: 0 }
            }
        }
    }

    callPaymentModal() {
        if (this.cartModel.products.length > 0) {                
            /*await this.service.newProduct().then(res => (*/
                this.baseService._openDialog(PaymentModalComponent, this.cartModel.summary.totalAmnt);
            //));
        }
        else
        {
            console.log("No !!!")
        }
    }
}