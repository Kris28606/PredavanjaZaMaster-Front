import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInfo } from '../models/ProductInfo';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {

  private baseUrl;
  constructor(private httpClient: HttpClient) {
    this.baseUrl="https://localhost:7240/proizvod/info";
   }

  getInfoProductsForProduct(id: number):Observable<ProductInfo[]> {
    return this.httpClient.get<ProductInfo[]>(`${this.baseUrl}/${id}`);
  }
}
