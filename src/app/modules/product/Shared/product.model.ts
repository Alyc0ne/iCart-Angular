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
        uid:string;
        isFoucs:boolean;
        barcode:string;
        unitID:string;
        // unitObj:[{
        //     unitID:string;
        //     unitNo:string;
        //     unitName:string;
        //     unitNameEng:string;
        // }]
        isBaseUnit:boolean;
    }];
}