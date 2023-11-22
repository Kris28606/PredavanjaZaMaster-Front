import { Component, OnInit, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { CategoryService } from '../services/category.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { FoodCategory } from '../models/FoodCategory';
import { OtherCategory } from '../models/OtherCategory';
import { TextileCategory } from '../models/TextileCategory';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  public categories: string[] = [];
  public foodCategories: FoodCategory[] = [];
  public textileCategories: TextileCategory[] = [];
  public otherCategories: OtherCategory[] = [];

  constructor(public categoryService: CategoryService) {
  }
  ngOnInit(): void {
    this.initData();
  }

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

  initData() {
    const observables = [
      this.categoryService.getAllCategories(),
      this.categoryService.getAllFoodCategories(),
      this.categoryService.getAllOtherCategories(),
      this.categoryService.getAllTextileCategories()
    ];
    forkJoin(observables).subscribe((results: any[]) => {
      const [catData, foodCategories, otherCategories, textileCategories] = results;
      this.categories = catData;
      this.otherCategories = otherCategories;
      this.textileCategories = textileCategories;
      this.foodCategories = foodCategories;
    });
    // this.categoryService.getAllCategories().subscribe(data=> {
    //   this.categories=data;
    //   }, error => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'Sorry, we can’t get categories!'
    //     });
    //     console.log(error.message);
    //   })
  }

  getProducts(categoryId: number) {
    
  }
}
