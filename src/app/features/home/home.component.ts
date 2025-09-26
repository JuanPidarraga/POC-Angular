import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../../app/hero/hero.component';
import { CommonModule } from '@angular/common';
import { FeaturedProductsComponent } from '../products/featured-products/featured-products.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent,FeaturedProductsComponent, CommonModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

}
