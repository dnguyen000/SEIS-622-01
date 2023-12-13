import { Component } from '@angular/core';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  title = 'slideshow'

  images = [
    {
      imageSrc: 'assets/Images/product/pic1.jpg',
      imageAlt: 'Women Sweater',
    },
    {
      imageSrc: 'assets/Images/product/pic2.jpg',
      imageAlt: 'Men Clothing',
    },
    {
      imageSrc: 'assets/Images/product/pic3.jpg',
      imageAlt: 'Girl Clothing',
    },
    {
      imageSrc: 'assets/Images/product/pic4.jpg',
      imageAlt: 'Women Sandal',
    },
    {
      imageSrc: 'assets/Images/product/pic5.jpg',
      imageAlt: 'Men Dress Shoe',
    },
    {
      imageSrc: 'assets/Images/product/pic6.jpg',
      imageAlt: 'Kids Shoe',
    },
  ]

}
