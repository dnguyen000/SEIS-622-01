import { Injectable } from '@angular/core';
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

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
