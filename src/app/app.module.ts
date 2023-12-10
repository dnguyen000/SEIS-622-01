import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CartProductComponent } from './cart-product/cart-product.component';
import {CommonModule} from "@angular/common";
import {CartComponent} from "./cart/cart.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductComponent} from "./product/product.component";
import { HomepageComponent } from './homepage/homepage.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { DialogPopupComponent } from './dialog-popup/dialog-popup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";
import { CheckoutComponent } from './cart/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomepageComponent,
    SidebarComponent,
    CartComponent,
    CartProductComponent,
    DialogPopupComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
