import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftBarComponent } from './default/left-bar/left-bar.component';
import { ProductListComponent } from './modules/product/List/product.component';
import { ProductModalComponent } from './modules/product/Shared/product-modal.component';
import { AlertModalComponent } from './modules/Shared/Modal/Alert/alert-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftBarComponent,
    ProductListComponent,
    ProductModalComponent,
    AlertModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { 
        path: 'ListProduct', component: ProductListComponent
      }
      // ,
      // {
      //   path: 'NewProduct', component: ProductNewComponent
      // }
    ]),
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  entryComponents:[ProductModalComponent, AlertModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
