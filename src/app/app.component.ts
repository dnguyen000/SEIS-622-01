import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isEmptyCart=true;
  title = 'SEIS-622-01';

  pageToLoad = ""

  componentToLoad(componentNameToLoad: string) {
    this.pageToLoad = componentNameToLoad;
  }
}
