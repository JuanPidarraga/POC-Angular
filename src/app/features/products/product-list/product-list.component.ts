import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Product } from '../product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { catchError, map, Observable, of, startWith } from 'rxjs';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
})

export class ProductListComponent {
  // stream de productos + estado
  products$: Observable<Product[]>;
  loading$ = of(false); // solo útil si quieres subscribirte al loading desde template

  constructor(private productService: ProductService) {
    // mapear y proteger contra errores
    this.products$ = this.productService.getAll().pipe(
      // si tu servicio devuelve { products: [] }, ajusta con map(r => r.products)
      map(res => Array.isArray(res) ? res : (res as any).products ?? []),
      startWith([]), // opcional: da valor inicial
      catchError(err => {
        console.error('[ProductList] getAll error', err);
        return of([] as Product[]);
      })
    );
  }
}
