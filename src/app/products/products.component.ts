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
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import { ProductInfoService } from '../services/productInfo.service';
import { ProductInfo } from '../models/ProductInfo';

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
  public products: Product[]=[];
  public productInfos: ProductInfo[]=[];

  constructor(
    public categoryService: CategoryService,
    public productService: ProductService,
    public productInfoService: ProductInfoService
    ) {
  }
  ngOnInit(): void {
    this.initData();
  }

  showCard = false;
  panelOpenState = false;
  showProductInfo = false;
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
    this.productService.getAllProductsByCategoryWithPictures(categoryId).subscribe(data=> {
      this.products=data;
      console.log(data,'data');
      this.showCard=true;
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sorry. We can’t find products!'
      });
      console.log(error.message);
    });
  }

  showProductInfos(productId: number) {
    this.productInfoService.getInfoProductsForProduct(productId).subscribe(data=> {
      this.productInfos=data;
      this.showCard=false;
      this.showProductInfo=true;
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sorry. We can’t find products!'
      });
      console.log(error.message);
    });
  }

  goBack() {
    this.showProductInfo=false;
    this.showCard=true;
  }

  getMainUrl(product: Product) {
    const mainPic = product.pictures.find(pic=> pic.main===true);
    if(mainPic!==undefined) {
      return mainPic.url;
    } else {
      return '';
    }
  }
}
