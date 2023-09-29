import { EventEmitter, Injectable, Output } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluationHubService {
  hubConnection!: signalR.HubConnection;

  @Output() evaluationCreated: EventEmitter<string> = new EventEmitter<string>()
  @Output() evaluationUpdated: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  private buildConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.notificationsApi}/hubs/evaluations`)
      .withAutomaticReconnect()
      .build();
  }

  listenNotificationsEvents(): void {
    if (!this.hubConnection) {
      this.buildConnection();
    }

    if (this.hubConnection?.state == signalR.HubConnectionState.Disconnected)
      this.hubConnection.start();

    this.hubConnection.on('EvaluationCreated', (message: string) => {
      this.evaluationCreated.emit(message);
    });

    this.hubConnection.on('EvaluationUpdated', (message: string) => {
      this.evaluationUpdated.emit(message);
    });
  }

  sendCreated(message: string){
    this.hubConnection.invoke('EvaluationCreated', message);
  }

  sendUpdated(message: string){
    this.hubConnection.invoke('EvaluationUpdated', message);
  }

  disconnectFromHub(): void {
    if (this.hubConnection.state == signalR.HubConnectionState.Connected)
      this.hubConnection.stop();
  }
}
