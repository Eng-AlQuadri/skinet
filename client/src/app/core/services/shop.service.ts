import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { Observable, Subscription } from 'rxjs';
import { ShopParams } from '../../shared/models/shopParams';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl: string = environment.apiUrl;

  types: string[] = [];

  brands: string[] = [];

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams): Observable<Pagination<Product>> {

    let params = new HttpParams();

    if (shopParams.brands.length > 0) {
      params = params.append('brands', shopParams.brands.join(','));
    }

    if (shopParams.types.length > 0) {
      params = params.append('types', shopParams.types.join(','));
    }

    if (shopParams.sort) {
      params = params.append('sort', shopParams.sort);
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('pageSize', shopParams.pageSize);

    params = params.append('pageIndex', shopParams.pageNumber);

    return this.http.get<Pagination<Product>>(this.baseUrl + 'product', {params});
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'product/' + id);
  }

  getBrands() { //: Subsicription
    if (this.brands.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'product/brands').subscribe({
      next: response => this.brands = response
    })
  }

  getTypes() { //Subscription | undefined
    if (this.types.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'product/types').subscribe({
      next: response => this.types = response
    })
  }
}
