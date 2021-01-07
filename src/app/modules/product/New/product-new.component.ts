import { Component } from '@angular/core';

@Component({
    selector: 'app-product-new',
    templateUrl: './product-new.component.html',
    styleUrls: ['./product-new.component.css']
})

export class ProductNewComponent {

    switchTab(tabid) {
        if (!!tabid) {
            var listtab = document.querySelectorAll(".tab");
            if (listtab.length > 0) {
                listtab.forEach(function(elem) {
                    if (tabid == elem.id) {
                        elem.classList.add("active");
                    }
                    else
                    {
                        elem.classList.remove("active");
                    }
                });
            }

            var tabpane = document.getElementsByClassName('tab-content')[0].querySelectorAll(".tab-pane");
            if (tabpane.length > 0) {
                tabpane.forEach(element => {
                    if (tabid == element.id)
                        element.classList.add("active");
                    else
                        element.classList.remove("active");
                });
            }
        }
    }
}