import { Component, OnInit } from '@angular/core';
import { MenuItem } from './models/menu-item';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { EvaluationHubService } from 'src/app/features/evaluation/evaluation-hub.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/shared/services/login.service';
import { BrandHubService } from 'src/app/features/brand/brand-hub.service';

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
    private _drawerService: DrawerService,
    private _evaluationHubService: EvaluationHubService,
    private _brandHubService: BrandHubService,
    private _loginService: LoginService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Controle do drawer
    this._drawerService.drawerToggle.subscribe({
      next: () => {
        this.isDrawerOpened = !this.isDrawerOpened;
      }
    });

    // Conexão com SignalR Evaluation
    this._evaluationHubService.listenNotificationsEvents();

    this._evaluationHubService.evaluationCreated.subscribe({
      next: (message: string) => this._snackBar.open(message, 'Fechar')
    });

    this._evaluationHubService.evaluationUpdated.subscribe({
      next: (message: string) => this._snackBar.open(message, 'Fechar')
    });

    // Conexão com SignalR Brand
    this._brandHubService.listenNotificationsEvents();

    this._brandHubService.brandCreated.subscribe({
      next: (message: string) => this._snackBar.open(message, 'Fechar')
    });

    this._brandHubService.brandUpdated.subscribe({
      next: (message: string) => this._snackBar.open(message, 'Fechar')
    });
  }
}
