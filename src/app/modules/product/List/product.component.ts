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

    callProductModal() {
        const temp1 = "parameter1";
        const temp2 = "parameter2";

        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "60%";
        dialogConfig.height = "80%";

        dialogConfig.data = { temp1, temp2 };

        this.dialog.open(ProductModalComponent, dialogConfig);
    }

    share() {
        window.alert('The product has been shared!')
    }
}