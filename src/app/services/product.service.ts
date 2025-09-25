// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../features/products/product.model';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // Ejemplo con DummyJSON
  private base = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  // lista todos (nota: dummyjson devuelve { products: [...] })
  getAll(): Observable<Product[]> {
    return this.http.get<{products: Product[]}>(`${this.base}/products`)
      .pipe(map(r => r.products));
  }

  // obtener paginado
  getPage(limit = 10, skip = 0): Observable<Product[]> {
    return this.http.get<{products: Product[]}>(`${this.base}/products?limit=${limit}&skip=${skip}`)
      .pipe(map(r => r.products));
  }

  // busqueda
  search(q: string): Observable<Product[]> {
    return this.http.get<{products: Product[]}>(`${this.base}/products/search?q=${encodeURIComponent(q)}`)
      .pipe(map(r => r.products));
  }

  // obtener por id
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}/products/${id}`);
  }
}


