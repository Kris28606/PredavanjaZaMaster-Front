import { Component, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  @ViewChild('drawer') drawer: MatDrawer | undefined;
  showCard = false;
  panelOpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  toggleDrawer() {
    console.log('desilo se');
    if(this.drawer) {
      console.log('usao u if');
      this.drawer.toggle();
    }
  }
}
