import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsComponent {
  constructor(private title: Title) {
    this.title.setTitle('Sobre MyShop — Tienda POC');
  }


  values = [
    {
      icon: '⭐',
      title: 'Calidad Garantizada',
      description: 'Seleccionamos cuidadosamente cada producto para garantizar la mejor calidad para nuestros clientes.'
    },
    {
      icon: '💰',
      title: 'Mejores Precios',
      description: 'Trabajamos directamente con proveedores para ofrecerte los precios más competitivos del mercado.'
    },
    {
      icon: '🚀',
      title: 'Envío Rápido',
      description: 'Tu pedido llegará en tiempo récord. Contamos con una red de distribución eficiente y confiable.'
    },
    {
      icon: '🛡️',
      title: 'Compra Segura',
      description: 'Tu información está protegida. Utilizamos los más altos estándares de seguridad en todas las transacciones.'
    }
  ];

}
