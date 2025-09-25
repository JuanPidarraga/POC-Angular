import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../../app/hero/hero.component';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, ProductListComponent, CommonModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

}
