export class ProductModel {
    productID:string;
    productNo:string;
    productCode:string;
    productName:string;
    productNameEng:string;
    productDesc:string;
    productSalePrice:number;
    productPurchasePrice:number;
    unitModel: [{
        isFoucs:boolean;
        barcode:string;
        unitID:string;
        isBaseUnit:boolean;
    }];
}