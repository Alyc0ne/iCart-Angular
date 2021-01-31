export class ProductModel {
    runningFormatID:string;
    productID:string;
    productNo:string;
    productName:string;
    productNameEng:string;
    productQuantity:number;
    productDesc:string;
    productSalePrice:number;
    productPurchasePrice:number;
    ProductUnit: [{
        uid:string;
        isFoucs:boolean;
        barcode:string;
        unitID:string;
        isBaseUnit:boolean;
    }];
}