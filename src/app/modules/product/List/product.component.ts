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
        private dialog:MatDialog
    ) { }

    ngOnInit(): void {
        this.service.refreshList()
    }

    //products = products;
    calSummary = 10 * 20;

    states: string[] = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
        'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
        'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ];

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