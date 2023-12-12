import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogPopupComponent} from "../../dialog-popup/dialog-popup.component";
import {FormGroup, NgForm} from "@angular/forms";
import {State} from "../../models/state";
import {CartService} from "../../services/cart.service";
import { HttpClient, HttpResponse } from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderConfirmation} from "../../models/OrderConfirmation";
import {Success} from "../../models/Success";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  public isValid: boolean | undefined;
  public saveUnsuccessful: boolean = false;
  dialogRef: MatDialogRef<DialogPopupComponent>;
  subtotal: number = 0;
  reactiveForm: FormGroup;

  states: State[] = [];
  constructor(private cartService: CartService, public dialog: MatDialog, private httpClient: HttpClient) {
    this.reactiveForm = new FormGroup({
    });
  }

  openDialogSuccess(): void {
    this.dialogRef = this.dialog.open(DialogPopupComponent, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.cartService.clearCart();
    });

    this.dialogRef.componentInstance.wasSuccessful = "Success!"
    this.dialogRef.componentInstance.message = "This is a test showing it passed";
  }

  openDialogFailed(message: string): void {
    this.dialogRef = this.dialog.open(DialogPopupComponent, {
      disableClose: false
    });

    this.dialogRef.componentInstance.wasSuccessful = "Error Processing Order!"
    this.dialogRef.componentInstance.message = message;
  }

  ngOnInit(): void {
    this.fetchStates().subscribe(data => {
      this.states = data;
    });
  }

  fetchStates(): Observable<State[]> {
    return this.httpClient.get<State[]>("http://localhost:8080/cart")
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

  private getFormInput(): object {
    return {
      "address": {
        "firstName": this.cartService.getFirstName(),
        "lastName": this.cartService.getLastName(),
        "street": this.cartService.getAddress(),
        "zipCode": this.cartService.getZipCode(),
        "city": this.cartService.getCity(),
        "state": this.cartService.getState(),
        "phoneNumber": this.cartService.getPhoneNumber()
      },
      "payment": {
        "ccNumber": this.cartService.getCCNumber(),
        "ccExpr": this.cartService.getCCExp(),
        "ccCVV": this.cartService.getCCCVV()
      },
      "products": this.cartService.getProducts()
    }
  }

  postOrderConfirmation(payload: OrderConfirmation): Observable<HttpResponse<Success>> {
    return this.httpClient.post<Success>("http://localhost:8080/cart/purchase", payload,  {observe: "response"});
  }

  onFormSubmit(ngForm: NgForm) {
    this.saveUnsuccessful = false;
    this.postOrderConfirmation(this.cartService.getOrderConfirmation()).subscribe({
      next: response => {
        console.log(response);
        this.openDialogSuccess();
        ngForm.resetForm();
      },
      error: errorResponse => {
        this.saveUnsuccessful = true;
        this.openDialogFailed(errorResponse.error.message);
        return;
      }
    });
  }
}
