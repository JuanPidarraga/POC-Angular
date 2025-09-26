// src/app/features/products/product-list/product-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  startWith,
  tap,
  catchError,
  map
} from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  // nonNullable evita que valueChanges emita null -> ahora es Observable<string>
  searchControl = new FormControl('', { nonNullable: true });

  products$: Observable<Product[]>;
  loading = false;
  error = '';

  constructor(private productService: ProductService) {
    this.products$ = this.searchControl.valueChanges.pipe(
      startWith(''),                    // emitir valor inicial (string)
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => { this.error = ''; this.loading = true; }),
      switchMap((q: string) => {
        const term = q.trim();
        if (!term) {
          return this.productService.getAll();
        }
        return this.productService.search(term);
      }),
      // si la API devuelve { products: [...] } mapea a array
      map(res => Array.isArray(res) ? res : (res as any).products ?? []),
      catchError(err => {
        console.error('[ProductList] search error', err);
        this.error = 'No se pudieron cargar los productos. Intenta nuevamente.';
        return of([] as Product[]);
      }),
      tap(() => { this.loading = false; })
    );
  }

  trackById(_: number, item: Product) {
    return item.id;
  }

  clearSearch() {
    // al usar nonNullable, setValue('') siempre acepta string
    this.searchControl.setValue('');
  }
}
