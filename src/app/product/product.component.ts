import { Component } from '@angular/core';
import { IProduct } from '../models/IProduct';

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
  public productList: IProduct[] = [];

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
      const productToAddToCart = {
        id: Number(this.id),
        productDescription: this.productDescription,
        price: this.price
      }

      this.productList.push(productToAddToCart);
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
      console.log(this.productList);
    } else {
      alert("Your cart is currently empty. So Remove operation failed.");
    }
  }
}
