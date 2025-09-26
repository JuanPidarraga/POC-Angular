// src/app/features/products/featured-products/featured-products.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Product } from '../product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent {
  featured$: Observable<Product[]>;
  error = '';
  limit = 4;

  // Tamaño de muestra que pedimos al servidor para ordenar por rating
  private sampleSize = 50;

  constructor(private productService: ProductService) {
    const pageObs = (this.productService as any).getPage
      ? (this.productService as any).getPage(this.sampleSize, 0)
      : null;

    if (pageObs) {
      this.featured$ = pageObs.pipe(
        map((r: any) => (r && r.products) ? (r.products as Product[]) : []),
        map((arr: Product[]) => this.pickTopByRating(arr, this.limit)),
        startWith([]),
        catchError(err => {
          console.error('[Featured] getPage error', err);
          this.error = 'No se pudo cargar productos destacados.';
          return of([] as Product[]);
        })
      );
    } else {
      this.featured$ = (this.productService as any).getAll
        ? (this.productService as any).getAll().pipe(
            map((arr: any) => Array.isArray(arr) ? (arr as Product[]) : (arr.products ?? []) as Product[]),
            map((arr: Product[]) => this.pickTopByRating(arr, this.limit)),
            startWith([]),
            catchError(err => {
              console.error('[Featured] getAll error', err);
              this.error = 'No se pudo cargar productos destacados.';
              return of([] as Product[]);
            })
          )
        : of([] as Product[]);
    }
  }

  private pickTopByRating(arr: Product[], limit: number): Product[] {
    return arr
      .slice() 
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, limit);
  }

  trackById(_: number, item: Product) {
    return item.id;
  }
}
