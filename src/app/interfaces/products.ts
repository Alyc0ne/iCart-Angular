export interface Products {
    runningFormatID:string;
    productID:string;
    productNo:string;
    productName:string;
    productNameEng:string;
    productQuantity:number;
    productDesc:string;
    productSalePrice:number;
    productPurchasePrice:number;
    productUnits: [{
        uid:string;
        isFocus:boolean;
        barcode:string;
        unitID:string;
        isBaseUnit:boolean;
    }];
}
