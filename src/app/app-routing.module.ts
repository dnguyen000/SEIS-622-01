import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartComponent} from "./cart/cart.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {ProductComponent} from "./product/product.component";

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  {"path": "", "component": HomepageComponent},
  { path: "product-details", component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
