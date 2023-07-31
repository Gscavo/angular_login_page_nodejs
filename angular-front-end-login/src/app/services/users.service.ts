import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { UserModel } from '../model/UserModel';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private api_url = environment.API_PATH;

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(this.api_url);
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
