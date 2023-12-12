import { Injectable, EventEmitter, Output } from '@angular/core';
import {Product} from "../models/product";
import {HttpClient} from "@angular/common/http";
import {OrderConfirmation} from "../models/OrderConfirmation";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private firstName: string | undefined;
  private lastName: string | undefined;
  private address: string | undefined;
  private city: string | undefined;
  private state: string | undefined;
  private zipCode: string | undefined;
  private phoneNumber: string | undefined;

  private creditCardNumber: string | undefined;
  private creditCardExpiration: string | undefined;
  private creditCardCVV: string | undefined;

  @Output() clearProducts = new EventEmitter<Product[]>();
  private subtotal: number = 0;

  constructor(private http: HttpClient) { }

  public getFirstName(): string  {
    return this.firstName !== undefined ? this.firstName : "";
  }

  public getLastName(): string {
    return this.lastName !== undefined ? this.lastName : "";
  }

  public getAddress(): string {
    return this.address !== undefined ? this.address : "";
  }

  public getCity(): string {
    return this.city !== undefined ? this.city : "";
  }

  public getState(): string {
    return this.state !== undefined ? this.state : "";
  }

  public getZipCode(): string {
    return this.zipCode !== undefined ? this.zipCode : "";
  }

  public getPhoneNumber(): string {
    return this.phoneNumber !== undefined ? this.phoneNumber : "";
  }

  public getCCNumber(): string {
    return this.creditCardNumber !== undefined ? this.creditCardNumber : "";
  }

  public getCCExp(): string {
    return this.creditCardExpiration !== undefined ? this.creditCardExpiration : "";
  }

  public getCCCVV(): string {
    return this.creditCardCVV !== undefined ? this.creditCardCVV : "";
  }

  public getSubtotal(): number {
    return this.subtotal;
  }

  public setSubtotal(subtotal: number) {
    this.subtotal = subtotal;
  }

  public setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  public setLastName(lastName: string) {
    this.lastName = lastName;
  }

  public setAddress(address: string) {
    this.address = address;
  }

  public setCity(city: string) {
    this.city = city;
  }

  public setState(state: string) {
    this.state = state;
  }

  public setZipCode(zipCode: string) {
    this.zipCode = zipCode;
  }

  public setCreditCardNumber(creditCardNumber: string) {
    this.creditCardNumber = creditCardNumber;
  }

  public setCCExpiration(expirationDate: string) {
    this.creditCardExpiration = expirationDate;
  }

  public setCCCVV(creditCardCVV: string) {
    this.creditCardCVV = creditCardCVV;
  }

  public setPhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  private validateAddressForms(): boolean {
    return this.firstName !== "" && this.lastName !== "" && this.address !== "" && this.city !== "" && this.state !== "" && this.zipCode !== "" && this.phoneNumber !== "";
  }

  private onlyNumbers(input: string | undefined): boolean {
    const regex = new RegExp(/^\d+$/);

    return regex.test(<string>input);
  }

  private isExpired(input: string | undefined): boolean {
    let isValid = false;
    if(input) {
      const currentDate = new Date();
      const endOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      const userDate = new Date(Number(input.substring(2, 5)), Number(input.substring(0, 2)), 0);

      isValid = userDate < endOfCurrentMonth;
    }

    return isValid;
  }

  private validatePaymentForms(): boolean {

    return this.creditCardNumber !== "" && this.creditCardNumber?.length === 16
      && this.onlyNumbers(this.creditCardNumber) && this.creditCardExpiration !== ""
      && this.onlyNumbers(this.creditCardExpiration) && this.creditCardExpiration?.length === 6 && !this.isExpired(this.creditCardExpiration);
  }

  public getOrderConfirmation(): OrderConfirmation {
    return <OrderConfirmation>{
      "address": {
        "firstName": this.getFirstName(),
        "lastName": this.getLastName(),
        "street": this.getAddress(),
        "zipCode": this.getZipCode(),
        "city": this.getCity(),
        "state": this.getState(),
        "phoneNumber": this.getPhoneNumber()
      },
      "payment": {
        "ccNumber": this.getCCNumber(),
        "ccExpr": this.getCCExp(),
        "ccCVV": this.getCCCVV()
      },
      "products": this.getProducts()
    }
  }

  public validateUserFormInput(): boolean {
    return this.validateAddressForms() && this.validatePaymentForms();
  }

  public getProducts() {
    return JSON.parse(localStorage.getItem("products") || '[]');
  }

  public removeProduct(id: number) {
    const products = JSON.parse(localStorage.getItem("products") || '[]');

    const updatedProduct = products.filter((product: Product) => product.id !== id);

    localStorage.setItem("products", JSON.stringify(updatedProduct));
  }

  public clearCart() {
    localStorage.removeItem("products");
    this.clearProducts.emit([]);
  }

  //This is only for testing. Setting products to cache should be part
  public updateProductQualtity(id: number, qty: number){
    const products = JSON.parse(localStorage.getItem("products") || '[]');

    if (products.length > 0) {
      const updatedProducts: any = products.map((product: Product) => {
        if (product.id === id) {
          return {
            id: product.id,
            name: product.name,
            qty: product.qty + qty,
            price: product.price
          }
        }

        return {...product};
      });

      return updatedProducts;
    }

    return products;
  }
}
