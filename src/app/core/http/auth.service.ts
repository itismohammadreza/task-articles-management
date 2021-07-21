import { Injectable } from '@angular/core';
import { ApiService } from '@core/http';
import { Observable } from 'rxjs';
import { User } from '@shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  private endpoint: string = 'users';

  constructor() {
    super();
  }

  register(user: User): Observable<User> {
    return this._post(`${this.endpoint}`, {user});
  }

  login(user: User): Observable<User> {
    return this._post(`${this.endpoint}/login`, {user});
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): Observable<User> {
    return this._get(`user`, null, 'user');
  }
}
