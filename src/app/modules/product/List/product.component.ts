import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../Shared/product.service';
import { ProductModalComponent } from '../Shared/modal/product-modal.component'
import { ProductModel } from '../Shared/product.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { AppService } from '@services/base/apps.service';
import { Products } from '@interfaces/products';
import { initColumns } from '../Shared/initColumns';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
    exportAs: 'myExport'
})

export class ProductListComponent {
    constructor(
        public baseService: AppService,
        public productService: ProductService,
        private fb: FormBuilder,
    ) { }

    initColumns = initColumns

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
        this.searchFilterForm = this.fb.group({ productFilters: [null] })
        this.searchFilterForm.get('productFilters').setValue(['all'])
    }

    // ngAfterViewInit() {
    //     setTimeout(() => {
    //         this.fetchData()
    //     }, 0);
    // }

    // fetchData() {
    //     this.productService.getProducts().then(res => {
    //         this.productTable.initColumns = initColumns
    //         this.productTable.displayedColumns = initColumns.map(col => col.field)
    //         this.productTable.dataSource = res
    //     })
    // }

    selectAll() {

    }

    select() {
        
    }

    manageProduct = async (productID) => {  
        // this.baseService.configDialog.default.width = "1200px"
        // this.baseService.configDialog.default.height = "500px"

        if (productID == null) {
            await this.productService.newProduct().then(res => {
                this.baseService.callBack = "fetchData"
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
            await this.productService.getProduct(productID).then(value => (
                this.baseService.configDialog.default.data = { 
                    textHeader: "แก้ไขสินค้า",
                    objProduct: value
                }
            ));
        }
        this.baseService._openDialog(ProductModalComponent, "default")
        this.baseService.dialogRef.afterClosed().subscribe((callback, c3) => {
            //this.fetchData()
        })
    }

    bindDeleteMulti() {

    }
}