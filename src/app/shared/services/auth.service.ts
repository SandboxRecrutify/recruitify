import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, UserData } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(user: UserData): Observable<User> {
    return of({ email: user.email, id: 'some_id', token: 'some_token' });
  }
  logout(): Observable<{}> {
    return of({});
  }
}
