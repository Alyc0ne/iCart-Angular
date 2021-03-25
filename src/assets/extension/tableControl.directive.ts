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
    const target = event.target
    if (target.className == 'grid-inline-cell') {      
      const parentElement = target.parentElement
      const focusId = parentElement.dataset.id
      let outId = ""

      const dom_table_row = document.querySelectorAll('.grid-inline-row')
      dom_table_row.forEach(parentElement => {
        if (parentElement.parentElement.className != "grid-inline-groupHeader") {
          if (parentElement.classList.contains('rowHover')) {
            outId = parentElement['dataset'].id
            this.focusCell(parentElement, false)
          }
        }
      });
      
      if (focusId != outId)
        this.focusCell(parentElement, true)
    }
  }

  focusCell(element, type) {
    const mat_checkbox = element.querySelector('.mat-checkbox')
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