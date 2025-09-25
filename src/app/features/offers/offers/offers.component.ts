// src/app/features/offers/offers.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Offer {
  id: string;
  title: string;
  description?: string;
  discount?: string;
  image?: string;
}

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent {
  offers: Offer[] = [
    { id: 'o1', title: 'Descuento 20% en camisetas', description: 'Válido hasta agotar existencias', discount: '20%', image: '/assets/data/images/sMoJw7k09CeytKNzE820.jpg' },
    { id: 'o2', title: '2x1 en tazas', description: 'Solo esta semana', discount: '2x1', image: '/assets/data/images/imagen_2025-03-14_163026134.png' }
  ];
}
