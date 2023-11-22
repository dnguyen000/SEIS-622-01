import { Component } from '@angular/core';
import {State} from "../../models/state";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent {
  states: State[] = this.cartService.getStates();

  constructor(private cartService: CartService) {
  }
}
