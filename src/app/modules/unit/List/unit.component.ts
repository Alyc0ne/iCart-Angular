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

    public units = [
        { isCheck: false, unitID: 1, unitNo: 'UN-25641020-001', unitName: 'ชิ้น', createdDate: '22 ตุลาคม 2564'},
        { isCheck: false, unitID: 2, unitNo: 'UN-25640910-002', unitName: 'ขวด', createdDate: '10 กันยายน 2564'},
        { isCheck: false, unitID: 3, unitNo: 'UN-25640902-003', unitName: 'อัน', createdDate: '02 กันยายน 2564'},
        { isCheck: false, unitID: 4, unitNo: 'UN-25640206-004', unitName: 'แพ๊ค', createdDate: '06 กุมภาพันธ์ 2564'},
        { isCheck: false, unitID: 5, unitNo: 'UN-25640122-001', unitName: 'กล่อง', createdDate: '22 มกราคม 2564'},
        { isCheck: false, unitID: 6, unitNo: 'UN-25640122-002', unitName: 'ซอง', createdDate: '22 มกราคม 2564'},
        { isCheck: false, unitID: 7, unitNo: 'UN-25640122-003', unitName: 'ถุง', createdDate: '22 มกราคม 2564'},
        { isCheck: false, unitID: 8, unitNo: 'UN-25640122-004', unitName: 'มัด', createdDate: '22 มกราคม 2564'},
        { isCheck: false, unitID: 9, unitNo: 'UN-25640122-005', unitName: 'เครื่อง', createdDate: '22 มกราคม 2564'},
        { isCheck: false, unitID: 10, unitNo: 'UN-25640122-006', unitName: 'หน่วย', createdDate: '22 มกราคม 2564'},
    ]

    public unitNo:any
    public unitName:any
    public createdDate:any
    
    //productModel: ProductModel[];
    
    ngOnInit(): void {
        //this.service.refreshList()

        //this.units 
    }

    showDetail(unitID, isCheck) {
        if (!!unitID) {
            var unit = this.units.filter(x => {
                return x.unitID == unitID && x.isCheck == false;
            })

            this.units.map(x => x.isCheck = false);

            if (unit.length > 0) {
                unit[0].isCheck = !isCheck
                this.unitNo = unit[0].unitNo
                this.unitName = unit[0].unitName
                this.createdDate = unit[0].createdDate
            }
            else
            {
                this.unitNo = ''
                this.unitName = ''
                this.createdDate = ''
            }
        }
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