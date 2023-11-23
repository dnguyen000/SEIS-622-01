import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  imageName = "pic1.jpg"
  productDescription = "Women Clothing - $25"

  loadImage(imgName: string, desc: string) {
    this.imageName = imgName;
    this.productDescription = desc;
  }

  addToCart() {

  }
}
