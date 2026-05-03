import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { TeaProduct } from '../models/tea-product';

export interface OrderData {
  name: string;
  last_name: string;
  phone: string;
  country: string;
  zip: string;
  product: string;
  address: string;
  comment?: string;
}

export interface OrderResponse {
  success: 0 | 1;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class TeaService {
  private readonly teaUrl = 'https://testologia.ru/tea';
  private readonly orderUrl = 'https://testologia.ru/order-tea';

  searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(search: string = ''): Observable<TeaProduct[]> {
    const trimmedSearch = search.trim().toLowerCase();

    return this.http.get<TeaProduct[]>(this.teaUrl).pipe(
        map((products: TeaProduct[]) => {
          if (!trimmedSearch) {
            return products;
          }

          return products.filter(product =>
              product.title.toLowerCase().includes(trimmedSearch)
          );
        })
    );
  }

  sendOrder(data: OrderData): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(this.orderUrl, data);
  }

  setSearch(value: string): void {
    this.searchSubject.next(value.trim());
  }

  clearSearch(): void {
    this.searchSubject.next('');
  }
}
