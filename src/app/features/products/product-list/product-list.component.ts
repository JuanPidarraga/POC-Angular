import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Product } from '../product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => {
        console.log('[ProductList] data received', data);
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('[ProductList] error', err);
        this.products = [];
        this.loading = false;
      },
    });
  }
}
