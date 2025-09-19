import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../features/products/product.model';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private url = '/assets/data/products.json'; 
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    console.log('[ProductService] getAll -> requesting', this.url);
    return this.http.get<Product[]>(this.url).pipe(
      tap(res => console.log('[ProductService] response length =', Array.isArray(res) ? res.length : 'not-array', res)),
      catchError(err => {
        console.error('[ProductService] error', err);
        return of([]); // evita que rompa la app y permite ver la UI vacía
      })
    );
  }
}

