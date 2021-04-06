import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
        private fb: FormBuilder,
        private dialog:MatDialog,
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
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "1200px";
        dialogConfig.height = "600px";

        if (this.productID == null) {
            await this.productService.newProduct().then(res => (
                dialogConfig.data = {
                    headerText: "เพิ่มสินค้า",
                    objProduct : { 
                        runningFormatID: this.productService.runningFormatID, 
                        productNo: this.productService.runningNumber 
                    }
                },
                this.dialog.open(ProductModalComponent, dialogConfig)
            ));
        }
        else
        {
            let productModel = null;
            await this.productService.getProduct(this.productID).then(res => (
                productModel = this.productService.productModel,
                dialogConfig.data = {
                    headerText: "แก้ไขสินค้า",
                    objProduct: productModel
                },
                this.dialog.open(ProductModalComponent, dialogConfig)
            ));
        }
    }

    bindDeleteMulti() {

    }
}