import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../Shared/product.service';
import { ProductModalComponent } from '../Shared/modal/product-modal.component'
import { ProductModel } from '../Shared/product.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { AppService } from '@services/base/apps.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})

export class ProductListComponent {
    constructor(
        public baseService: AppService,
        public productService: ProductService,
        private fb: FormBuilder
    ) { }

    productModel: ProductModel[];
    productID: string;
    totalPages: any;

    @ViewChild('allSelected') private allSelected: MatOption;
    filterSeleted: string[]
    searchFilterForm: FormGroup;
    filters = [
        { key: 'productNo', value: 'รหัสสินค้า' },
        { key: 'productName', value: 'ชื่อสินค้า' },
        { key: 'productNameEng', value: 'ชื่อสินค้าภาษาอังกฤษ' },
        { key: 'createdDate', value: 'วันที่สร้าง' }
    ];
    
    ngOnInit(): void {
        this.totalPages = Array(6);
        this.productService.refreshList()
        this.searchFilterForm = this.fb.group({ productFilters: [null] })
        this.searchFilterForm.get('productFilters').setValue(['all'])
    }

    selectAll() {

    }

    select() {
        
    }

    manageProduct = async (productID) => {  
        this.baseService.configDialog.default.width = "1200px"
        this.baseService.configDialog.default.height = "500px"

        if (this.productID == null) {
            await this.productService.newProduct().then(res => {
                this.baseService.configDialog.default.data = { 
                    textHeader: "เพิ่มสินค้า",
                    objProduct: { 
                        runningFormatID: this.productService.runningFormatID, 
                        productNo: this.productService.runningNumber 
                    }
                }
            });
        }
        else
        {
            let productModel = null;
            await this.productService.getProduct(this.productID).then(res => (
                this.baseService.configDialog.default.data = { 
                    textHeader: "แก้ไขสินค้า",
                    objProduct: null
                }
            ));
        }
        this.baseService._openDialog(ProductModalComponent, "default")
    }

    bindDeleteMulti() {

    }
}