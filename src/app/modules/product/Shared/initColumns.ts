export const initColumns = [
    { field: 'select'},
    { field: 'action'},
    { display: 'รหัสสินค้า', field: 'productNo', width: 150 },
    { display: 'Barcode', field: 'barcode', width: 160 },
    { display: 'ชื่อสินค้า', field: 'productName' },
    { display: 'จำนวนคงเหลือ', field: 'productQuantity', width: 120 },
    { display: 'หน่วยนับ', field: 'unitName', width: 180 },
    { display: 'ราคาซื้อ', field: 'productPurchasePrice', width: 120, type: 'number' },
    { display: 'ราคาขาย', field: 'productSalePrice', width: 120, type: 'number' },
];