import { Component, OnInit } from '@angular/core';
import { MenuItem } from './models/menu-item';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { EvaluationHubService } from 'src/app/features/evaluation/evaluation-hub.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/shared/services/login.service';
import { VehicleHubService } from 'src/app/features/vehicles/vehicle-hub.service';
import { ModelHubService } from 'src/app/features/model/model-hub.service';

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
    private _vehicleHubService: VehicleHubService,
    private _loginService: LoginService,
    private _snackBar: MatSnackBar,
    private _modelHubService: ModelHubService
  ) { }

  ngOnInit(): void {
    // Controle do drawer
    this._drawerService.drawerToggle.subscribe({
      next: () => {
        this.isDrawerOpened = !this.isDrawerOpened;
      }
    });

    // Conexão com SignalR
    this._evaluationHubService.listenNotificationsEvents();
    this._vehicleHubService.listenNotificationsEvents();
    this._modelHubService.listenNotificationsEvents();

    // Evaluation
    this._evaluationHubService.evaluationCreated.subscribe({
      next: (message: string) => this._snackBar.open(message, 'Fechar')
    });

    this._evaluationHubService.evaluationUpdated.subscribe({
      next: (message: string) => this._snackBar.open(message, 'Fechar')
    });

    // Vehicle
    this._vehicleHubService.vehicleCreated.subscribe({
      next: (message: string) => this._snackBar.open(message, 'Fechar')
    });

    this._vehicleHubService.vehicleUpdated.subscribe({
      next: (message: string) => this._snackBar.open(message, 'Fechar')
    });
    
    // Model
    this._modelHubService.modelCreated.subscribe({
      next: (message: string) => this._snackBar.open(message, 'Fechar')
    });

    this._modelHubService.modelUpdated.subscribe({
      next: (message: string) => this._snackBar.open(message, 'Fechar')
    });

  }
}
