import { Component } from '@angular/core';
import { MenuItem } from './models/menu-item';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {

  menuItems: MenuItem[] = [
    new MenuItem('Home', 'house', ['/']),
    new MenuItem('Marcas', 'tags', ['/brands']),
    new MenuItem('Modelos', 'phone', ['/models']),
    new MenuItem('Veículo', 'car', ['/vehicles']),
    new MenuItem('Ano Referência', 'calendar', ['/referenceYear']),
  ];

}
