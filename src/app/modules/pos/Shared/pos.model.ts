export class cartModel {
    products?: [{
        productID: string;
        productName: string;
        productQuantity: number;
        productPrice: number;
        productTotalPrice: number;
    }]
    summary: {
        paymentSeleted: string;
        subTotal: number;
        discount: number;
        totalAmnt: number;
    }
}

export class PaymentModel {
     paymentType: string;
     paymentName: string;
}