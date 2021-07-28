import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RowControlModule } from "../directives/row-control/row-control.module";
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TableComponent } from "./table.component";
// import { StatusPipe } from '@pipes/table/status.pipe';

@NgModule({
  declarations: [
    TableComponent,
    // StatusPipe
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatCheckboxModule,
    RowControlModule,
    MatRippleModule,
    MatTooltipModule
  ],
  exports: [
    TableComponent
  ]
})

export class TableModule { }
