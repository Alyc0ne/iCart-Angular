import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { ProductService } from '../Shared/product.service';
// import { ProductModalComponent } from '../Shared/modal/product-modal.component'
// import { ProductModel } from '../Shared/product.model';

@Component({
    selector: 'app-unit',
    templateUrl: './unit.component.html',
    styleUrls: ['./unit.component.css']
})

export class UnitListComponent {

    constructor(
        // public service: ProductService,
        private dialog:MatDialog,
    ) { }

    public units:any
    //productModel: ProductModel[];
    
    ngOnInit(): void {
        //this.service.refreshList()

        this.units = [
            { unitID: 1, unitNo: 'UN-001', unitName: 'ชิ้น', createdDate: '22 ตุลาคม 2564'},
            { unitID: 2, unitNo: 'UN-002', unitName: 'ขวด', createdDate: '10 กันยายน 2564'},
            { unitID: 3, unitNo: 'UN-003', unitName: 'อัน', createdDate: '02 กันยายน 2564'},
            { unitID: 4, unitNo: 'UN-004', unitName: 'แพ๊ค', createdDate: '06 กุมภาพันธ์ 2564'},
            { unitID: 5, unitNo: 'UN-005', unitName: 'กล่อง', createdDate: '22 มกราคม 2564'},
        ]
    }

    callProductModal = async (productID) => {
        // const dialogConfig = new MatDialogConfig();
        // dialogConfig.autoFocus = true;
        // dialogConfig.disableClose = true;
        // dialogConfig.width = "1200px";
        // dialogConfig.height = "600px";

        // if (productID == null) {
        //     await this.service.newProduct().then(res => (
        //         dialogConfig.data = {
        //             objProduct : { 
        //                 runningFormatID: this.service.runningFormatID, 
        //                 productNo: this.service.runningNumber 
        //             }
        //         },
        //         this.dialog.open(ProductModalComponent, dialogConfig)
        //     ));
        // }
        // else
        // {
        //     let productModel = null;
        //     await this.service.getProduct(productID).then(res => (
        //         productModel = this.service.productModel,
        //         dialogConfig.data = {
        //             objProduct: productModel
        //         },
        //         this.dialog.open(ProductModalComponent, dialogConfig)
        //     ));
        // }
    }
}