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

    //products = products;
    calSummary = 10 * 20;

    callProductModal = async () => {
        const temp1 = "parameter1";
        const temp2 = "parameter2";

        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "1200px";
        dialogConfig.height = "600px";

        dialogConfig.data = { temp1, temp2 };

        await this.service.newProduct();
        await this.dialog.open(ProductModalComponent, dialogConfig);
    }

    share() {
        window.alert('The product has been shared!')
    }
}