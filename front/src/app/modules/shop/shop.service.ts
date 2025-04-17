import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponsePaginatedShopRoute, ShopInterface } from './interfaces/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private readonly url = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  public page: WritableSignal<number> = signal(1);

  getShopList(): Observable<ResponsePaginatedShopRoute> {
    const params = { page: this.page() };
    return this.http.get<ResponsePaginatedShopRoute>(`${this.url}shops/paginate`, { params })
  }

  getShop(id: number): Observable<ShopInterface> {
    return this.http.get<ShopInterface>(`${this.url}shops/${id}`)
  }

  getAllShops(): Observable<ShopInterface[]> {
    return this.http.get<ShopInterface[]>(`${this.url}shops`)
  }

  createShop(
    data: ShopInterface,
  ): Observable<{ shop: ShopInterface, message: string }> {
    return this.http.post<{ shop: ShopInterface, message: string }>(`${this.url}shops`, data)
  }

  updateShop(
    data: ShopInterface,
    id: number
  ): Observable<{ shop: ShopInterface, message: string }> {
    return this.http.patch<{ shop: ShopInterface, message: string }>(`${this.url}shops/${id}`, data)
  }

  deleteShop(
    id: number
  ): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.url}shops/${id}`);
  }

  alterPage(page: number): void {
    this.page.set(page);
  }
}
