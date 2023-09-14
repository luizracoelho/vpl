import { EventEmitter, Injectable, Output } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelHubService {
  hubConnection!: signalR.HubConnection;

  @Output() modelCreated: EventEmitter<string> = new EventEmitter<string>()
  @Output() modelUpdated: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  private buildConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.notificationsApi}/hubs/models`)
      .withAutomaticReconnect()
      .build();
  }

  listenNotificationsEvents(): void {
    if (!this.hubConnection) {
      this.buildConnection();
    }

    if (this.hubConnection?.state == signalR.HubConnectionState.Disconnected)
      this.hubConnection.start();

    this.hubConnection.on('ModelCreated', (message: string) => {
      this.modelCreated.emit(message);
    });

    this.hubConnection.on('ModelUpdated', (message: string) => {
      this.modelUpdated.emit(message);
    });
  }

  sendCreated(message: string){
    this.hubConnection.invoke('ModelCreated', message);
  }

  sendUpdated(message: string){
    this.hubConnection.invoke('ModelUpdated', message);
  }

  disconnectFromHub(): void {
    if (this.hubConnection.state == signalR.HubConnectionState.Connected)
      this.hubConnection.stop();
  }
}
