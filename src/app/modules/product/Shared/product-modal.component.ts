import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductModel } from './product.model';

@Component({
    selector: 'product-modal',
    templateUrl: './product-modal.component.html',
    styleUrls: ['./product-modal.component.css']
})

export class ProductModalComponent {
    formData:ProductModel;
    public unitList: Array<any> = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef:MatDialogRef<ProductModalComponent>
    ) {}

    ngOnInit() {
        this.formData = {
            productID: null,
            productNo: '',
            productCode: '',
            productName: this.data.goodsName,
            productNameEng: '',
            productDesc: '',
            productSalePrice: 0,
            productPurchasePrice: 0,
            unitModel: null
        }
    }

    states: string[] = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
        'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
        'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ];

      addUnit() {
        var obj = []

        if (!!this.formData.unitModel) {
            this.formData.unitModel.push({
                isFoucs: true,
                barcode: '',
                unitID: '',
                isBaseUnit: false
            });
        }
        else
        {
            this.formData.unitModel = [{
                isFoucs: true,
                barcode: '',
                unitID: '',
                isBaseUnit: false
            }];
        }
        
        
        //this.unitList.push({});
        var table = document.getElementsByClassName('styled-table');
        //document.getElementsByClassName('modal-content');
        if (table.length > 0) {
            var tbody = table[0].querySelector('tbody');
            if (!!tbody) {
                setTimeout(() => { 
                    tbody.scrollTo(0, 50000);
                }, 100);
            }
        }
      }
}