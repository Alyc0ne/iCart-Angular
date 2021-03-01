import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductService } from '../Shared/product.service';
import { ProductModalComponent } from '../Shared/modal/product-modal.component'
import { ProductModel } from '../Shared/product.model';

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
    
    ngOnInit(): void {
        this.service.refreshList()
    }

    callProductModal = async (productID) => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "1200px";
        dialogConfig.height = "600px";

        if (productID == null) {
            await this.service.newProduct().then(res => (
                dialogConfig.data = {
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
            await this.service.getProduct(productID).then(res => (
                productModel = this.service.productModel,
                dialogConfig.data = {
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