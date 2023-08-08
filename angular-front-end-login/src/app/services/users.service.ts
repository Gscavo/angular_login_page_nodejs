import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserModel } from '../model/UserModel';
import { environment } from '../../environments/environment.development';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // urls
  private ws_url = environment.WS_ENDPOINT;
  private api_url = environment.API_PATH;
  
  //real-time-web-socket
  private socket$!: WebSocket;
  messageReceived: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  connectToWebSocket(): void {
    this.socket$ = new WebSocket(this.ws_url);

    this.socket$.onopen = () => {
      console.log('WebSocket connection established.');
    }

    this.socket$.onmessage = (event) => {
      const message = event.data;
      console.log('Received message: ', message);
      this.messageReceived.next(message);
    }

    this.socket$.onclose = (event) => {
      console.log('Closed Connection! ', event);
    }

    this.socket$.onerror = (error) => {
      console.log('WebSocket Error: ', error);
    }
  }

  sendMessage(message: string): void {
    this.socket$.send(message);
  }

  closeConnection(): void {
    this.socket$.close();
  }

  getUsers(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(this.api_url+'getData/');
  }

  getUserById(id: String): Observable<UserModel> {
    return this.httpClient.get<UserModel>(this.api_url+id);
  }

  setUser(id: String, user: UserModel): Observable<UserModel>{
    return this.httpClient.put<UserModel>(this.api_url+id, user);
  }

  deleteUser(id: String) {
    this.httpClient.delete(this.api_url+id);
  }
}
