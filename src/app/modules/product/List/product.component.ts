import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductService } from '../Shared/product.service';
import { ProductModalComponent } from '../Shared/product-modal.component'

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
                    runningNumber : this.service.runningNumber
                },
                this.dialog.open(ProductModalComponent, dialogConfig)
            ));
        }
        else
        {
            let objProduct = null;
            await this.service.getProduct(productID).then(res =>(
                objProduct = this.service.editProduct,
                dialogConfig.data = {
                    objProduct: objProduct,
                    productUnits: objProduct.productUnits
                },
                this.dialog.open(ProductModalComponent, dialogConfig)
            ));
        }
    }

    share() {
        window.alert('The product has been shared!')
    }
}