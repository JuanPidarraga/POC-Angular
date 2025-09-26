// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../features/products/product.model';
import { map, Observable } from 'rxjs';

export interface PagedResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

    // lista completa (
  getAll(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(`${this.base}/products`)
      .pipe(map(res => res.products ?? []));
  }

  // paginado general
  getPage(limit = 12, skip = 0): Observable<PagedResponse> {
    return this.http.get<PagedResponse>(`${this.base}/products?limit=${limit}&skip=${skip}`);
  }

  // búsqueda con paginación
  search(q: string, limit = 12, skip = 0): Observable<PagedResponse> {
    return this.http.get<PagedResponse>(`${this.base}/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`);
  }

  // obtener por id 
  getById(id: number) {
    return this.http.get<Product>(`${this.base}/products/${id}`);
  }
}


