import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftBarComponent } from './default/left-bar/left-bar.component';
import { ProductListComponent } from './modules/product/List/product.component';
import { ProductModalComponent } from './modules/product/Shared/product-modal.component';
import { ProductNewComponent } from './modules/product/New/product-new.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftBarComponent,
    ProductListComponent,
    ProductNewComponent,
    ProductModalComponent
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
      },
      {
        path: 'NewProduct', component: ProductNewComponent
      }
    ]),
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  entryComponents:[ProductModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
