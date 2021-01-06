import { Component, OnInit } from '@angular/core';
//import { products } from '../../../products';
import { ProductService } from '../Shared/product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})

export class ProductListComponent {

    constructor(public service: ProductService) { }

    ngOnInit(): void {
        this.service.refreshList()
    }

    //products = products;
    calSummary = 10 * 20;


    share() {
        window.alert('The product has been shared!')
    }
}