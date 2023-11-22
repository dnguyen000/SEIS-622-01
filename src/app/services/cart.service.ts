import { Injectable } from '@angular/core';
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {

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
