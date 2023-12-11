import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isEmptyCart=true;
  title = 'SEIS-622-01';
  events: string[] = [];
  opened: boolean = false;

  pageToLoad = ""

  constructor(private router: Router) {
  }

  componentToLoad(componentNameToLoad: string) {
    this.pageToLoad = componentNameToLoad;
  }

  public navToHomepage() {
    this.router.navigate(['']);
  }

  public navToProductDetails() {
    this.router.navigate(['/product-details']);
  }

  public navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
