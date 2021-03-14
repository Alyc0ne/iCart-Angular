import { Component, HostListener } from '@angular/core';
import { POSService } from './Shared/pos.service';
import { cartModel } from './Shared/pos.model';
import { PaymentModalComponent } from './Shared/Payment/payment-modal.component';
import { ConfirmModalComponent } from '../Shared/Modal/Confirm/confirm-modal.component';
import { AppService } from '@services/base/apps.service';

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
        if (!!product) {
            this.manageQuatity("plus", product)

        }
    }

    manageQuatity(type, objProduct) {
        if (!!objProduct) {
            objProduct['added_on'] = new Date().getTime();
            if (!!this.cartModel.products) {
                var product = this.cartModel.products.filter(x => { return x.productID == objProduct.productID; })
                if (product != null && product.length > 0) {
                    const _product = product[0];
                    if (type == "plus") {
                        _product.productQuantity += 1;
                        _product.productTotalPrice = (_product.productTotalPrice + _product.productPrice);
                    }
                    else if (type == "minus")
                    {
                        _product.productQuantity -= 1;
                        _product.productTotalPrice = (_product.productTotalPrice - _product.productPrice);
                    }
                } else {
                    this.cartModel.products.push(objProduct);
                }
            } else {
                this.cartModel.products = [objProduct];
            }

            this.cartModel.products.sort((a, b) => {
                return <any>new Date(b.added_on) - <any>new Date(a.added_on);
            })

            this.calSummary();
        }
    }

    calSummary() {
        if (!!this.cartModel.products.length) {
            var subTotal = this.cartModel.products.reduce((sum, obj) => { return sum + obj.productTotalPrice; }, 0);
            this.cartModel.summary.subTotal = subTotal;
            this.cartModel.summary.totalAmnt = (subTotal - this.cartModel.summary.discount);
        }    
    }

    @HostListener('document:keydown', ['$event'])
    onKeyDown(e: KeyboardEvent) {
        console.log(e.keyCode)
        if (e.keyCode == 32)
            this.callPaymentModal();
        if (e.keyCode == 46) 
            this.clearCart();
    }

    clearCart() {
        if (!!this.cartModel.products.length) {
            this.baseService._openDialog(ConfirmModalComponent);
            // this.cartModel = {
            //     summary: { paymentSeleted: this.posService.paymentModel[0].paymentType, subTotal: 0, discount: 0, totalAmnt: 0 }
            // }
        }
    }

    callPaymentModal() {
        if (this.cartModel.products.length > 0) {                
            /*await this.service.newProduct().then(res => (*/
                this.baseService.configDialog.height = "200px";
                this.baseService.configDialog.width = "400px"
                this.baseService.configDialog.data = this.cartModel.summary.totalAmnt
                this.baseService._openDialog(PaymentModalComponent);
                //, null, t
            //));
        }
        else
        {
            console.log("No !!!")
        }
    }
}