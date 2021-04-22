import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
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
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './default/top-bar/top-bar.component';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ProductListComponent } from './modules/product/List/product.component';
import { POSComponent } from './modules/pos/pos.component';
import { UnitListComponent } from './modules/unit/List/unit.component';
import { EmployeeListComponent } from './modules/employee/List/employee.component';

//Modal
import { ProductModalComponent } from './modules/product/Shared/modal/product-modal.component';
import { AlertModalComponent } from './modules/Shared/Modal/Alert/alert-modal.component';
import { SuccessModalComponent } from './modules/Shared/Modal/Success/success-modal.component';
import { ConfirmModalComponent } from './modules/Shared/Modal/Confirm/confirm-modal.component';
import { PaymentModalComponent } from './modules/pos/Shared/Payment/payment-modal.component';
import { ReceiptModalComponent } from './modules/pos/Shared/Receipt/receipt-modal.component';
import { UnitModalComponent } from './modules/unit/Shared/modal/unit-modal.component';

//Extension
import { NumberOnlyDirective } from '../assets/extension/onlynumber.directive';
import { TableControlDirective } from '../assets/extension/tableControl.directive';
import { NumberPipePipe } from '../assets/extension/number-pipe';
import { OrderByPipe } from '../assets/extension/order-by.pipe';

export function tokenGetter() {
  return localStorage.getItem('jwt')
}

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginComponent,
    DashboardComponent,
    ProductListComponent,
    ProductModalComponent,
    POSComponent,
    UnitListComponent,
    EmployeeListComponent,

    //Modal
    ConfirmModalComponent,
    AlertModalComponent,
    SuccessModalComponent,
    PaymentModalComponent,
    ReceiptModalComponent,
    UnitModalComponent,

    //Extension
    NumberOnlyDirective,
    NumberPipePipe,
    OrderByPipe,
    TableControlDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: 'Login', component: LoginComponent },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'POS', component: POSComponent },
      { path: 'ListProduct', component: ProductListComponent },
      { path: 'ListUnit', component: UnitListComponent },
      { path: 'ListEmployee', component: EmployeeListComponent }
    ]),
    JwtModule.forRoot({

    }),
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatRippleModule,
    MatDividerModule,
    MatTabsModule
  ],
  entryComponents:[
    ProductModalComponent, 
    ConfirmModalComponent,
    AlertModalComponent,
    SuccessModalComponent,
    PaymentModalComponent, 
    ReceiptModalComponent,
    UnitModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
