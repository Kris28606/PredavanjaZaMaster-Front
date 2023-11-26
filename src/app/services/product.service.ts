import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl;
  constructor(private httpClient: HttpClient) {
    this.baseUrl="https://localhost:7240/product";
   }

  getAllProductsByCategory(id: number):Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/all/${id}`);
  }

  getAllProductsByCategoryWithPictures(id: number):Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/all/${id}/with-pictures`);
  }
}
