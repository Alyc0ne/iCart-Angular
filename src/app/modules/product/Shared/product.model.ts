export class ProductModel {
    productID:string;
    productNo:string;
    productName:string;
    productNameEng:string;
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