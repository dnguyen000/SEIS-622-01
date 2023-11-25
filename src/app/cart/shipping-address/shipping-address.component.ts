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
  selectedState: State | undefined;
  lastName: String = "";
  address: String = "";
  state: String = "";

  public set userFirstName(firstName: string) {
    this.cartService.setFirstName(firstName);
  }

  public set userLastName(lastName: string) {
    this.cartService.setLastName(lastName);
  }

  public set userAddress(address: string) {
    this.cartService.setAddress(address);
  }

  public set userState(state: string) {
    this.cartService.setState(state);
  }

  public set userZipCode(address: string) {
    this.cartService.setZipCode(address);
  }

  public set userCity(address: string) {
    this.cartService.setCity(address);
  }

  public set userPhoneNumber(address: string) {
    this.cartService.setPhoneNumber(address);
  }

  constructor(private cartService: CartService) {
  }
}
