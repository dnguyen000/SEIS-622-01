import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private router: Router) {
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
