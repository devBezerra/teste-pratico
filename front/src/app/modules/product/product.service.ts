import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInterface, ProductsShopInterface, ResponsePaginatedProductRoute } from './interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly url = `${environment.apiUrl}products/`;
  private readonly urlProductsShop = `${environment.apiUrl}product-shop/`
  constructor(
    private http: HttpClient
  ) { }

  public page: WritableSignal<number> = signal(1);

  getProductList(): Observable<ResponsePaginatedProductRoute> {
    const params = { page: this.page() };
    return this.http.get<ResponsePaginatedProductRoute>(`${this.url}paginate`, { params })
  }

  getProduct(id: number): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`${this.url}${id}`)
  }

  createProduct(
    data: ProductInterface,
  ): Observable<any> {
    return this.http.post<{ product: ProductInterface, message: string }>(`${this.url}`, data)
  }

  updateProduct(
    data: ProductInterface,
    id: number
  ): Observable<{ product: ProductInterface, message: string }> {
    return this.http.patch<{ product: ProductInterface, message: string }>(`${this.url}${id}`, data)
  }

  deleteProduct(
    id: number
  ): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.url}${id}`);
  }

  getProductShop(id: number): Observable<ProductsShopInterface> {
    return this.http.get<ProductsShopInterface>(`${this.urlProductsShop}${id}`)
  }

  createProductShop(
    data: ProductsShopInterface,
  ): Observable<{ productShop: ProductsShopInterface, message: string }> {
    return this.http.post<{ productShop: ProductsShopInterface, message: string }>(`${this.urlProductsShop}`, data)
  }

  updateProductShop(
    data: ProductsShopInterface,
    id: number
  ): Observable<{ productShop: ProductsShopInterface, message: string }> {
    return this.http.patch<{ productShop: ProductsShopInterface, message: string }>(`${this.urlProductsShop}${id}`, data)
  }

  deleteProductShop(
    id: number
  ): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.urlProductsShop}${id}`);
  }

  alterPage(page: number): void {
    this.page.set(page);
  }
}
