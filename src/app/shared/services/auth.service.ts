import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { paths } from 'src/app/app-routing.constants';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  private user = localStorage.getItem('user');
  private _isAuthenticated: boolean;
  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  constructor(private router: Router) {
    this._isAuthenticated = !!this.user;
  }

  logIn(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/', paths.projects]);
    this._isAuthenticated = true;
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigate([paths.login]);
    this._isAuthenticated = false;
  }

  getUser(): User | {} {
    if (this.user) {
      return JSON.parse(this.user) as User;
    }
    return {};
  }

  canActivate(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate([paths.login]);
    }
    return this.isAuthenticated;
  }
}
