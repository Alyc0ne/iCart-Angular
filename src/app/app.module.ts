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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './default/top-bar/top-bar.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ProductListComponent } from './modules/product/List/product.component';
import { POSComponent } from './modules/pos/pos.component';
import { UnitListComponent } from './modules/unit/List/unit.component';

//Modal
import { ProductModalComponent } from './modules/product/Shared/modal/product-modal.component';
import { AlertModalComponent } from './modules/Shared/Modal/Alert/alert-modal.component';
import { ConfirmModalComponent } from './modules/Shared/Modal/Confirm/confirm-modal.component';
import { PaymentModalComponent } from './modules/pos/Shared/Payment/payment-modal.component';
import { ReceiptModalComponent } from './modules/pos/Shared/Receipt/receipt-modal.component';
import { UnitModalComponent } from './modules/unit/Shared/modal/unit-modal.component';

//Extension
import { OnlynumberDirective } from '../assets/extension/onlynumber.directive';
import { NumberPipePipe } from '../assets/extension/number-pipe';
import { OrderByPipe } from '../assets/extension/order-by.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductModalComponent,
    POSComponent,
    UnitListComponent,

    //Modal
    ConfirmModalComponent,
    AlertModalComponent,
    PaymentModalComponent,
    ReceiptModalComponent,
    UnitModalComponent,

    //Extension
    OnlynumberDirective,
    NumberPipePipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '', redirectTo: '/DashboardComponent', pathMatch: 'full' 
      },
      { 
        path: 'Dashboard', component: DashboardComponent
      },
      { 
        path: 'POS', component: POSComponent
      },
      { 
        path: 'ListProduct', component: ProductListComponent
      },
      {
        path: 'ListUnit', component: UnitListComponent
      }
    ]),
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatRippleModule,
    MatDividerModule
  ],
  entryComponents:[
    ProductModalComponent, 
    ConfirmModalComponent,
    AlertModalComponent, 
    PaymentModalComponent, 
    ReceiptModalComponent,
    UnitModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
