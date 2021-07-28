import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowControlDirective } from './row-control.directive';

@NgModule({
  declarations: [RowControlDirective],
  imports: [
    CommonModule
  ],
  exports: [RowControlDirective]
})
export class RowControlModule { }
