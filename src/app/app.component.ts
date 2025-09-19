import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './app/layout/header/header.component';
import { FooterComponent } from './app/layout/footer/footer.component';
import { HeroComponent } from './app/hero/hero.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HeroComponent],
  template: `
    <header class="header">
      <div class="container">
        <app-layout-header></app-layout-header>
      </div>
    </header>

    <main class="container" style="padding-top:1rem;">
      <app-hero></app-hero>
      <router-outlet></router-outlet>
    </main>

    <footer class="footer">
      <div class="container">
        <app-layout-footer></app-layout-footer>
      </div>
    </footer>
  `
})
export class AppComponent {}
