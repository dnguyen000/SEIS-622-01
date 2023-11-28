import { Injectable } from '@angular/core';
import {Product} from "../models/product";

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

  constructor() { }

  public getStates() {
    return [
      { name: 'Alabama', abbrev: 'AL' },
      { name: 'Alaska', abbrev: 'AK' },
      { name: 'Arizona', abbrev: 'AZ' },
      { name: 'Arkansas', abbrev: 'AR' },
      { name: 'California', abbrev: 'CA' },
      { name: 'Colorado', abbrev: 'CO' },
      { name: 'Connecticut', abbrev: 'CT' },
      { name: 'Delaware', abbrev: 'DE' },
      { name: 'Florida', abbrev: 'FL' },
      { name: 'Georgia', abbrev: 'GA' },
      { name: 'Hawaii', abbrev: 'HI' },
      { name: 'Idaho', abbrev: 'ID' },
      { name: 'Illinois', abbrev: 'IL' },
      { name: 'Indiana', abbrev: 'IN' },
      { name: 'Iowa', abbrev: 'IA' },
      { name: 'Kansas', abbrev: 'KS' },
      { name: 'Kentucky', abbrev: 'KY' },
      { name: 'Louisiana', abbrev: 'LA' },
      { name: 'Maine', abbrev: 'ME' },
      { name: 'Maryland', abbrev: 'MD' },
      { name: 'Massachusetts', abbrev: 'MA' },
      { name: 'Michigan', abbrev: 'MI' },
      { name: 'Minnesota', abbrev: 'MN' },
      { name: 'Mississippi', abbrev: 'MS' },
      { name: 'Missouri', abbrev: 'MO' },
      { name: 'Montana', abbrev: 'MT' },
      { name: 'Nebraska', abbrev: 'NE' },
      { name: 'Nevada', abbrev: 'NV' },
      { name: 'New Hampshire', abbrev: 'NH' },
      { name: 'New Jersey', abbrev: 'NJ' },
      { name: 'New Mexico', abbrev: 'NM' },
      { name: 'New York', abbrev: 'NY' },
      { name: 'North Carolina', abbrev: 'NC' },
      { name: 'North Dakota', abbrev: 'ND' },
      { name: 'Ohio', abbrev: 'OH' },
      { name: 'Oklahoma', abbrev: 'OK' },
      { name: 'Oregon', abbrev: 'OR' },
      { name: 'Pennsylvania', abbrev: 'PA' },
      { name: 'Rhode Island', abbrev: 'RI' },
      { name: 'South Carolina', abbrev: 'SC' },
      { name: 'South Dakota', abbrev: 'SD' },
      { name: 'Tennessee', abbrev: 'TN' },
      { name: 'Texas', abbrev: 'TX' },
      { name: 'Utah', abbrev: 'UT' },
      { name: 'Vermont', abbrev: 'VT' },
      { name: 'Virginia', abbrev: 'VA' },
      { name: 'Washington', abbrev: 'WA' },
      { name: 'West Virginia', abbrev: 'WV' },
      { name: 'Wisconsin', abbrev: 'WI' },
      { name: 'Wyoming', abbrev: 'WY' }
    ];
  }

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
