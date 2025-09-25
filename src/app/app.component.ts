import { Component } from '@angular/core';
import { Router,NavigationEnd, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './app/layout/header/header.component';
import { FooterComponent } from './app/layout/footer/footer.component';
import { HeroComponent } from './app/hero/hero.component';
import { filter, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <header class="header">
      <div class="container">
        <app-layout-header></app-layout-header>
      </div>
    </header>

    <main class="container " style="padding-top:1rem;">
      <router-outlet></router-outlet>
    </main>

    <footer class="footer">
      <div class="container">
        <app-layout-footer></app-layout-footer>
      </div>
    </footer>
  `
})
export class AppComponent {

}
