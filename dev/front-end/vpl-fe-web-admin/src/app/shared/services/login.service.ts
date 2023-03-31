import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { Login } from '../models/login';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  login(login: Login): Observable<User> {
    return this._http.post<User>(`${environment.api}/auth/users/login`, login).pipe(
      tap((user: User) => {
        localStorage.setItem('vpl_user', JSON.stringify(user));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('vpl_user');

    this._router.navigate(['/login']);
  }

  getUser(): User | null {
    let user = localStorage.getItem('vpl_user');

    if (!user)
      return null;

    return JSON.parse(user);
  }

  isLoggedIn(): boolean {
    return this.getUser() != null;
  }

  canActivate(): boolean {
    return this.isLoggedIn();
  }
}
