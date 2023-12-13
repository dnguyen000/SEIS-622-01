import { Component, Input, OnInit } from '@angular/core';

interface slideshowImage {
  imageSrc: string;
  imageAlt: string;
}


@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {

  @Input() images: slideshowImage[]=[]
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide=false;
  @Input() slideInterval=3000; //default to 3 seconds



  selectedIndex=0;



  ngOnInit(): void {
    if(this.autoSlide) {
      this.autoSlideImages()
    }
  }
//changes slide in every 3 seconds
  autoSlideImages(): void {
    setInterval(()=> {
      this.onNextClick();
    }, this.slideInterval);
  }

  onNextClick(): void {
    if(this.selectedIndex===this.images.length-1) {
      this.selectedIndex=0;
    } else {
      this.selectedIndex++;
    }
  }

  //sets index of image on dot/indicator click
  selectImage(index:number): void {
    this.selectedIndex=index;
  }

}
