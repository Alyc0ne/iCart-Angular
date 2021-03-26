import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[tableControl]'
})
export class TableControlDirective {
  element: HTMLElement

  constructor(public el: ElementRef) {
    this.element = el.nativeElement;
  }

  @HostListener('click', ['$event']) 
  onClick(event) {
    var isSelectMuti = this.element.dataset.gridtype == "gridSelectMulti" ? true : false
    let target = event.target

    if (target.classList.contains('mat-checkbox-inner-container'))
      target = target.parentElement.parentElement.parentElement

    if (target.className == 'grid-inline-cell') {      
      const parentElement = target.parentElement
      const focusId_now = parentElement.dataset.id
      let focusIds = []
      
      const dom_table_row = document.querySelectorAll('.grid-inline-row')
      dom_table_row.forEach(parentElement => {
        if (parentElement.parentElement.className != "grid-inline-groupHeader") {
          if (parentElement.classList.contains('rowHover')) {
            const id = parentElement['dataset'].id
            focusIds.push(id)
            if (!isSelectMuti) {
              this.focusCell(parentElement, false)
              focusIds.splice(focusIds.findIndex(x => x == id), 1)
            }
          }
        }
      });
      
      this.focusCell(parentElement, focusIds.indexOf(focusId_now) < 0 ? true : false)
    }
  }

  focusCell(element, type) {
    const mat_checkbox = element.querySelector('.mat-checkbox')
    if (!!mat_checkbox) {
      mat_checkbox.querySelector('.mat-checkbox-input').checked = type

      if (type) {
        element.classList.add('rowHover')
        mat_checkbox.classList.add('mat-checkbox-checked')
      } else {
        element.classList.remove('rowHover')
        mat_checkbox.classList.remove('mat-checkbox-checked')
      }
    }
  }
}