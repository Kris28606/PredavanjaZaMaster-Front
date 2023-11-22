import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodCategory } from '../models/FoodCategory';
import { OtherCategory } from '../models/OtherCategory';
import { TextileCategory } from '../models/TextileCategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl;
  constructor(private httpClient: HttpClient) {
    this.baseUrl="https://localhost:7240/category";
   }

  getAllCategories():Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseUrl}/all`);
  }

  getAllOtherCategories():Observable<OtherCategory[]> {
    return this.httpClient.get<OtherCategory[]>(`${this.baseUrl}/all/other`);
  }

  getAllFoodCategories():Observable<FoodCategory[]> {
    return this.httpClient.get<FoodCategory[]>(`${this.baseUrl}/all/food`);
  }

  getAllTextileCategories():Observable<TextileCategory[]> {
    return this.httpClient.get<TextileCategory[]>(`${this.baseUrl}/all/textile`);
  }
}
