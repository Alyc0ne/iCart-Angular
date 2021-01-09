import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

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
    ProductNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
    MatSelectModule
  ],
  entryComponents:[ProductModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
