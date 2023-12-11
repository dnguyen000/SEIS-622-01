import {Product} from "./product";

export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  zipCode: string;
  city: string;
  state: string;
  phoneNumber: string;
}

export interface Payment {
  ccNumber: string;
  ccExpr: string;
  ccCVV: string;
}

export interface OrderConfirmation {
  address: Address,
  payment: Payment,
  products: Product[];
}
