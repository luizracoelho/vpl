import { EventEmitter, Injectable, Output } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleHubService {
  hubConnection!: signalR.HubConnection;

  @Output() vehicleCreated: EventEmitter<string> = new EventEmitter<string>()
  @Output() vehicleUpdated: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  private buildConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.notificationsApi}/hubs/vehicles`)
      .withAutomaticReconnect()
      .build();
  }

  listenNotificationsEvents(): void {
    if (!this.hubConnection) {
      this.buildConnection();
    }

    if (this.hubConnection?.state == signalR.HubConnectionState.Disconnected)
      this.hubConnection.start();

    this.hubConnection.on('VehicleCreated', (message: string) => {
      this.vehicleCreated.emit(message);
    });

    this.hubConnection.on('VehicleUpdated', (message: string) => {
      this.vehicleUpdated.emit(message);
    });
  }

  sendCreated(message: string){
    this.hubConnection.invoke('VehicleCreated', message);
  }

  sendUpdated(message: string){
    this.hubConnection.invoke('VehicleUpdated', message);
  }

  disconnectFromHub(): void {
    if (this.hubConnection.state == signalR.HubConnectionState.Connected)
      this.hubConnection.stop();
  }
}
