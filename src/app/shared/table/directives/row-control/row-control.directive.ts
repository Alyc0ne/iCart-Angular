import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appRowControl]'
})
export class RowControlDirective {
  @Input() isOneRow: boolean = false
  element: HTMLElement

  constructor(
    public el: ElementRef
  ) { 
    this.element = el.nativeElement
  }

  @HostListener('click', ['$event'])
  onClick = async (event) => {
    event.preventDefault()
    const eventClass = event.target.classList
    let row = null
    const elm = this.element
    const localName = elm.localName
    const tbody = elm.closest('.mat-table').querySelector('.mat-table tbody')
    let tableRows = tbody.querySelectorAll('tr.mat-row')
    const selectAll = elm.dataset.selectall

    if (this.isOneRow) await this.clearRowSelected(tableRows)

    if (!eventClass.contains('mat-menu-trigger') && !eventClass.contains('edit')) {
      if (selectAll) {
        const notSelecteds = document.querySelectorAll('tr.mat-row:not(.rowSelected)')
        if (notSelecteds.length > 0) {
          notSelecteds.forEach(_row => {
            this.setRowSelected(_row)
          });
        } else {
          await this.clearRowSelected(tableRows)
        }
      } else {
        if (localName == 'mat-checkbox')
          row = elm.closest('tr.mat-row')
        else
          row = elm
  
        if (!!row) await this.setRowSelected(row)
      }
    }
  }

  clearRowSelected = async (tableRows) => {
    tableRows.forEach(_row => {
      if (_row.classList.contains('rowSelected')) this.setRowSelected(_row)
    });
  }

  setRowSelected = async (row) => {
    const checkbox = row.querySelector('.mat-checkbox-input')
    if (!!checkbox) checkbox['click']()

    if (!row['classList'].contains('rowSelected'))
      row['classList'].add('rowSelected')
    else
      row['classList'].remove('rowSelected')
  }
}
