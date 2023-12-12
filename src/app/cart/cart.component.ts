import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../services/cart.service";
import { Product } from "../models/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() products: Product[];
  subtotal: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
    this.calculateSubtotal();

    this.cartService.clearProducts.subscribe((data: Product[]) => {
      this.products = data;
    });
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
}
