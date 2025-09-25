import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'products', loadComponent: () => import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent) },
  { path: 'offers', loadComponent: () => import('./features/offers/offers/offers.component').then(m => m.OffersComponent) },
  { path: 'about', loadComponent: () => import('./features/about-us/about-us/about-us.component').then(m => m.AboutUsComponent) },
  { path: '**', redirectTo: 'products' }
];

