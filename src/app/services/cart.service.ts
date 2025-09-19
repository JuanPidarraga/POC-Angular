import { Injectable } from '@angular/core';
import { Product } from '../features/products/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private key = 'shop_cart';
  getCart(): (Product & { qty?: number })[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }
  add(product: Product) {
    const cart = this.getCart();
    const item = cart.find(i => i.id === product.id);
    if (item) item.qty = (item.qty || 1) + 1;
    else cart.push({ ...product, qty: 1 });
    localStorage.setItem(this.key, JSON.stringify(cart));
  }
  clear() { localStorage.removeItem(this.key); }
}
