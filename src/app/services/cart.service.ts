import { Injectable, EventEmitter, Output } from '@angular/core';
import {Product} from "../models/product";
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

  constructor() { }

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

  public getOrderConfirmation(): OrderConfirmation {
    return <OrderConfirmation>{
      "address": {
        "firstName": this.firstName,
        "lastName": this.lastName,
        "street": this.address,
        "zipCode": this.zipCode,
        "city": this.city,
        "state": this.state,
        "phoneNumber": this.phoneNumber
      },
      "payment": {
        "ccNumber": this.creditCardNumber,
        "ccExpr": this.creditCardExpiration,
        "ccCVV": this.creditCardCVV
      },
      "products": this.getProducts()
    }
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
