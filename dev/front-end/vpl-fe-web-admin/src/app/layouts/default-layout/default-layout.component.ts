import { Component, OnInit } from '@angular/core';
import { MenuItem } from './models/menu-item';
import { DrawerService } from 'src/app/shared/services/drawer.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  
  isDrawerOpened: boolean = true;

  menuItems: MenuItem[] = [
    new MenuItem('Home', 'house', ['/']),
    new MenuItem('Marcas', 'tags', ['/brands']),
    new MenuItem('Modelos', 'phone', ['/models']),
    new MenuItem('Veículo', 'car', ['/vehicles']),
    new MenuItem('Ano Referência', 'calendar', ['/referenceYear']),
    new MenuItem('Avaliação', 'clipboard', ['/evaluations']),
  ];

  constructor(
    private _drawerService: DrawerService
  ) {  }

  ngOnInit(): void {
    this._drawerService.drawerToggle.subscribe({
      next: () =>{
        this.isDrawerOpened = !this.isDrawerOpened;
      }
    });
  }

}
