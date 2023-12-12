import { Component } from '@angular/core';
import {CartService} from "../services/cart.service";
import {Product} from "../models/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  id = 1;
  imageName = "pic1.jpg"
  productDescription = "Women Clothing"
  price = 25;
  public productList: Product[] = [];

  constructor(private cartService: CartService) {}

  loadImage(productId: number, imgName: string, desc: string, cost: number) {
    this.id = productId;
    this.imageName = imgName;
    this.productDescription = desc;
    this.price = cost;
  }

  addToCart(productIdToAdd: number) {
    let productExists = false;

    if(this.productList.length != 0) {
      for(let i = 0; i < this.productList.length; i++) {
        if(this.productList[i].id == productIdToAdd) {
          productExists = true;
          break;
        }
      }
    }

    if(!productExists) {
      const productToAddToCart: Product = {
        id: Number(this.id),
        name: this.productDescription,
        qty: 1,
        price: this.price
      }

      this.productList.push(productToAddToCart);
      this.cartService.addToCart(this.productList);
      console.log(this.productList);
    } else {
      alert("The Select Product is already added to the cart.");
    }
  }

  removeFromCart(productIdToRemove: number) {
    if(this.productList.length != 0) {
      this.productList = this.productList.filter(function(productObj) {
        return productObj.id != productIdToRemove;
      });

      this.cartService.addToCart(this.productList);
      console.log(this.productList);
    } else {
      alert("Your cart is currently empty. So Remove operation failed.");
    }
  }
}
