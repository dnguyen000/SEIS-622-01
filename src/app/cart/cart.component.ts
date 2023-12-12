import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../services/cart.service";
import { Product } from "../models/product";
import { Observable } from "rxjs";
import {State} from "../models/state";
import {FormGroup, NgForm} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import { DialogPopupComponent } from "../dialog-popup/dialog-popup.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() products: Product[];
  public isValid: boolean | undefined;
  public saveUnsuccessful: boolean = false;
  dialogRef: MatDialogRef<DialogPopupComponent>;
  subtotal: number = 0;

  states: State[] = [];
  selectedState: State | undefined;
  lastName: String;
  address: String;
  state: String;

  constructor(private cartService: CartService, public dialog: MatDialog, private httpClient: HttpClient) {
    this.lastName = "";
    this.address = "";
    this.state = "";
  }

  openDialogSuccess(): void {
    this.dialogRef = this.dialog.open(DialogPopupComponent, {
      disableClose: false
    });

    this.dialogRef.componentInstance.wasSuccessful = "Success!"
    this.dialogRef.componentInstance.message = "This is a test showing it passed";
  }

  openDialogFailed(): void {
    this.dialogRef = this.dialog.open(DialogPopupComponent, {
      disableClose: false
    });

    this.dialogRef.componentInstance.wasSuccessful = "Failed!"
    this.dialogRef.componentInstance.message = "This is a test showing it failed...";
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
    this.calculateSubtotal();

    this.fetchStates().subscribe(data => {
      this.states = data;
    });

    this.cartService.clearProducts.subscribe((data: Product[]) => {
      this.products = data;
      // window.location.reload();
    });
  }

  fetchStates(): Observable<State[]> {
    return this.httpClient.get<State[]>("http://localhost:8080/cart")
  }

  onFormSubmit(ngForm: NgForm) {
    this.saveUnsuccessful = false;
    if(!ngForm.valid) {
      this.saveUnsuccessful = true;
      this.openDialogFailed();
      return;
    }
    console.log(ngForm);
    this.openDialogSuccess();

    ngForm.resetForm();
  }

  removeProduct(id: number) {
    this.cartService.removeProduct(id);
    this.products = this.cartService.getProducts();
    this.calculateSubtotal();
  }

  private calculateSubtotal() {
    this.subtotal = this.products.map(product => product.price).reduce((accum: number, currentValue: number) => accum + currentValue, 0);
  }

  public set cartSubtotal(subtotal: number) {
    this.cartService.setSubtotal(subtotal);
  }

  //Shipping
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

  //Payment
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
