import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductService } from '../Shared/product.service';
import { ProductModalComponent } from '../Shared/modal/product-modal.component'
import { ProductModel } from '../Shared/product.model';
import { FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})

export class ProductListComponent {

    constructor(
        public service: ProductService,
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
        this.service.refreshList()
    }

    callProductModal = async () => {        
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "1200px";
        dialogConfig.height = "600px";

        if (this.productID == null) {
            await this.service.newProduct().then(res => (
                dialogConfig.data = {
                    headerText: "เพิ่มสินค้า",
                    objProduct : { 
                        runningFormatID: this.service.runningFormatID, 
                        productNo: this.service.runningNumber 
                    }
                },
                this.dialog.open(ProductModalComponent, dialogConfig)
            ));
        }
        else
        {
            let productModel = null;
            await this.service.getProduct(this.productID).then(res => (
                productModel = this.service.productModel,
                dialogConfig.data = {
                    headerText: "แก้ไขสินค้า",
                    objProduct: productModel
                },
                this.dialog.open(ProductModalComponent, dialogConfig)
            ));
        }
    }

    share() {
        window.alert('The product has been shared!')
    }
}