import { EventEmitter, Injectable, Output } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandHubService {
  hubConnection!: signalR.HubConnection;

  @Output() brandCreated: EventEmitter<string> = new EventEmitter<string>()
  @Output() brandUpdated: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  private buildConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.notificationsApi}/hubs/brands`)
      .withAutomaticReconnect()
      .build();
  }

  listenNotificationsEvents(): void {
    if (!this.hubConnection) {
      this.buildConnection();
    }

    if (this.hubConnection?.state == signalR.HubConnectionState.Disconnected)
      this.hubConnection.start();

    this.hubConnection.on('BrandCreated', (message: string) => {
      this.brandCreated.emit(message);
    });

    this.hubConnection.on('BrandUpdated', (message: string) => {
      this.brandUpdated.emit(message);
    });
  }

  sendCreated(message: string) {
    this.hubConnection.invoke('BrandCreated', message);
  }

  sendUpdated(message: string) {
    this.hubConnection.invoke('BrandUpdated', message);
  }

  disconnectFromHub(): void {
    if (this.hubConnection.state == signalR.HubConnectionState.Connected)
      this.hubConnection.stop();
  }
}
