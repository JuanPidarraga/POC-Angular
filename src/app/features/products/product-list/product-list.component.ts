// src/app/features/products/product-list/product-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductService, PagedResponse } from '../../../services/product.service';
import { Product } from '../product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
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
  // control de búsqueda 
  searchControl = new FormControl('', { nonNullable: true });

  // paging state
  private page$ = new BehaviorSubject<number>(0);       // 0-based
  private pageSize$ = new BehaviorSubject<number>(12);  // items por página
  readonly pageSizeOptions = [6, 12, 24];

  // UI state observables
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);
  total$ = new BehaviorSubject<number>(0);

  // stream de productos que la plantilla consumirá
  products$: Observable<Product[]>;

  // páginas totales calculadas reactiva
  totalPages$: Observable<number> = combineLatest([this.total$, this.pageSize$]).pipe(
    map(([total, ps]) => Math.max(1, Math.ceil(total / ps)))
  );

  currentPage$ = this.page$.asObservable(); // 0-based page

  constructor(private productService: ProductService) {
    // stream de búsqueda (emite string)
    const query$ = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value ?? ''),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        // reset page a 0 cuando cambia búsqueda
        this.page$.next(0);
        this.error$.next(null);
      })
    );

    // combinar query, page y pageSize
    const request$ = combineLatest([query$, this.page$, this.pageSize$]).pipe(
      tap(() => {
        this.loading$.next(true);
        this.error$.next(null);
      }),
      switchMap(([q, page, pageSize]) => {
        const term = (q ?? '').trim();
        const skip = page * pageSize;

        // elegir endpoint: search o page
        const obs = term
          ? this.productService.search(term, pageSize, skip)
          : this.productService.getPage(pageSize, skip);

        return obs.pipe(
          catchError(err => {
            console.error('[ProductList] request error', err);
            this.error$.next('No se pudieron cargar los productos.');
            // devolver respuesta vacía con total=0 para que template no rompa
            return of({ products: [], total: 0, skip, limit: pageSize } as PagedResponse);
          })
        );
      }),
      tap((res: PagedResponse) => {
        this.total$.next(res.total ?? 0);
        this.loading$.next(false);
      })
    );

    // products$ mapea al array de productos de la respuesta
    this.products$ = request$.pipe(map(res => res.products ?? []));
  }

  // páginar: acciones
  goToPage(pageIndex: number) {
    const totalPages = Math.max(1, Math.ceil(this.total$.value / this.pageSize$.value));
    const clamped = Math.max(0, Math.min(pageIndex, totalPages - 1));
    this.page$.next(clamped);
  }

  nextPage() {
    this.goToPage(this.page$.value + 1);
  }
  prevPage() {
    this.goToPage(this.page$.value - 1);
  }

  setPageSize(ps: number) {
    this.pageSize$.next(ps);
    // resetear página al cambiar tamaño de página
    this.page$.next(0);
  }

  trackById(_: number, item: Product) {
    return item.id;
  }

  clearSearch() {
    this.searchControl.setValue('');
  }
}
