import { Component } from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  public isValid: boolean | undefined;
  public orderMessage: string = "";
  constructor(private cartService: CartService) {
  }

  public set userCreditCard(creditCardNumber: string) {
    this.cartService.setCreditCardNumber(creditCardNumber);
  }

  public set userCCExpiration(expirationDate: string) {
    this.cartService.setCCExpiration(expirationDate);
  }

  public set userCCCVV(creditCardCVV: string) {
    this.cartService.setCCCVV(creditCardCVV);
  }

  public validateForms() {
    this.isValid = this.cartService.validateUserFormInput();
  }

  public getOrderMessage(): string {
    return this.isValid ? "Purchased successfully!" : "Error! Please correct highlighted fields.";
  }

  public getFirstName() {
    alert(`user shipping info: ${this.cartService.getFirstName()} ${this.cartService.getLastName()}\n${this.cartService.getCity()}, ${this.cartService.getState()} ${this.cartService.getZipCode()}\n${this.cartService.getPhoneNumber()}`);
    alert(`user credit card info:\ncc number: ${this.cartService.getCCNumber()}\ncc exp: ${this.cartService.getCCExp()}\ncc cvv: ${this.cartService.getCCCVV()}`);
  }
}