import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AppService } from '@services/base/apps.service';

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
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  constructor(
    private baseService: AppService
  ) {}

  @Input() gridName: string
  @Input() bindLoad: string  
  @Input() initColumns: any[] = []
  
  isInit: boolean = true
  tableHeight: number = null
  
  displayedColumns: any[] = []
  dataSource: any = []
  
  selection = new SelectionModel<PeriodicElement>(true, [])
  nextPage: boolean = false
  previousPage: boolean = false
  morePageCount: number = 1
  pageStart: number = 1
  pageEnd: number 
  pageLimit: number = 5
  pageSizeOptions = [
    { value: 1 },
    { value: 3 },
    { value: 10 }, { value: 20 }, { value: 50 },
    { value: 100 }, { value: 500 }, { value: 1000 },
  ];
  pageSizeSeleted = this.pageSizeOptions[0].value
  pageNumber: number = 1
  totalPages: number = 1
  pagination = [1]
  //this.totalPages.slice(0, this.pageLimit)
  totalCount: number
  currentPageCount: number
  paginationDetail: string

  ngOnInit(): void {
    window[this.gridName] = this.data
    this.initTable()
  }

  data: {
    fetchData: () => {
      fetch
    }
  }

  initTable = async () => {
    this.displayedColumns = this.initColumns.map(col => col.field)
    this.fetchData()
  }

  fetchData = async () => {
    const filter = '?pageNumber=' + this.pageNumber + '&pageSize=' + this.pageSizeSeleted
    const respone = await this.baseService.httpRequest('get', this.bindLoad, filter, true)
    this.dataSource = respone.body
    console.log(JSON.parse(respone['headers'].get('X-pagination')))

    await this.initPagination(JSON.parse(respone['headers'].get('X-pagination')))
  }

  initPagination(pageObject) {
    console.log('init') 
    this.pageEnd = this.pageLimit * this.morePageCount
    this.pageNumber = pageObject['PageNumber']
    this.totalPages = pageObject['TotalPages']
    this.totalCount = pageObject['TotalCount']
    this.currentPageCount = pageObject['CurrentPageCount']
    if(this.checkOverLimit()) this.calculatePagination()
    this.initPaginationDetail(this.totalPages)
  }

  calculatePagination() {
    this.pagination = []
    for (let index = this.pageStart; index <= this.totalPages; index++) {
      if (this.pagination.length > 4) break
      this.pagination.push(index)
    }
  }

  initPaginationDetail(totalPages) {
    let pagedetailStart = ((this.pageNumber - 1) * this.pageSizeSeleted) + 1
    pagedetailStart = pagedetailStart == totalPages ? totalPages : pagedetailStart
    const pageDetailEnd = this.pageSizeSeleted * this.pageNumber
    this.paginationDetail = ((this.currentPageCount == 1 && this.pageNumber == this.totalPages) ? pagedetailStart : pagedetailStart + '-' + pageDetailEnd).toString()
  }

  changePage(pageNumber, isNext: boolean = false) {
    this.nextPage = true
    // if (isNext ? pageNumber > this.pageEnd  : pageNumber < this.pageStart) {
    //   if (isNext)
    //     this.pageStart = pageNumber
    //   else
    //     this.pageStart = (pageNumber - this.pageLimit )  + 1
    // } else {
    //   //this.morePageCount--
    // }
    this.pageNumber = pageNumber
    this.fetchData()
  }

  morePages(num) {
    this.pageStart += (this.pageLimit * num)
    this.pageNumber = this.pageStart
    this.fetchData()
  }

  checkOverLimit() {
    if (this.pageNumber > this.pageEnd || this.isInit) {
      if (!this.isInit) {
        this.morePageCount++
        this.pageStart = this.pageNumber
      }
      this.isInit = false
      return true
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.length;
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.forEach(row => this.selection.select(row));
  // }
}



export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}