import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductModel } from './product.model';

@Component({
    selector: 'product-modal',
    templateUrl: './product-modal.component.html',
    styleUrls: ['./product-modal.component.css']
})

export class ProductModalComponent {
    FormData:ProductModel;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef:MatDialogRef<ProductModalComponent>
    ) {}

    ngOnInit() {
        this.FormData = {
            goodsID: null,
            goodsNo: '',
            goodsCode: '',
            goodsName: this.data.goodsName,
            goodsNameEng: '',
            goodsCost: 0,
            goodsSalePrice: 0,
            goodsPurchasePrice: 0,
            companyID: ''
        }
    }
}