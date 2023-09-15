import { EventEmitter, Injectable, Output } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferenceYearHubService {
  hubConnection!: signalR.HubConnection;

  @Output() referenceYearCreated: EventEmitter<string> = new EventEmitter<string>()
  @Output() referenceYearUpdated: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  private buildConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.notificationsApi}/hubs/referenceYears`)
      .withAutomaticReconnect()
      .build();
  }

  listenNotificationsEvents(): void {
    if (!this.hubConnection) {
      this.buildConnection();
    }

    if (this.hubConnection?.state == signalR.HubConnectionState.Disconnected)
      this.hubConnection.start();

    this.hubConnection.on('ReferenceYearCreated', (message: string) => {
      this.referenceYearCreated.emit(message);
    });

    this.hubConnection.on('ReferenceYearUpdated', (message: string) => {
      this.referenceYearUpdated.emit(message);
    });
  }

  sendCreated(message: string){
    this.hubConnection.invoke('ReferenceYearCreated', message);
  }

  sendUpdated(message: string){
    this.hubConnection.invoke('ReferenceYearUpdated', message);
  }

  disconnectFromHub(): void {
    if (this.hubConnection.state == signalR.HubConnectionState.Connected)
      this.hubConnection.stop();
  }
}
