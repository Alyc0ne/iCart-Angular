import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'}
];

@Component({
  selector: 'app-table-inline',
  templateUrl: './table-inline.component.html',
  styleUrls: ['./table-inline.component.css']
})
export class TableInlineComponent implements OnInit {
  constructor() { }

  tableHeight: number = null
  initColumns: any[] = []
  displayedColumns: any[] = []
  dataSource:any = []
  selection = new SelectionModel<PeriodicElement>(true, [])
  pageOptions = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
  ];
  pageOptionSeleted = 10
  totalPages = Array(10);
  pagination = this.totalPages.slice(0, 5)

  ngOnInit(): void {
    this.pagination.push('..')
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row));
  }

  rowSelect(event) {
    console.log(event)
  }

}
