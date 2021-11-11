import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { paths } from './app-routing.constants';
import { LocalStorageService } from './services/local-storage.service';
import { User, UserData, UserResponse } from './shared/models/User';
import { AuthService } from './shared/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AppFacade {
  public readonly INITIAL_PATH = paths.projects;
  public readonly USER_KEY = 'user';

  private user: User | undefined;

  constructor(
    private lsService: LocalStorageService,
    private router: Router,
    private auth: AuthService,
    private message: NzMessageService
  ) {}
  isAuthenticated$(): Observable<boolean> {
    return this.getUser$().pipe(
      map((user) => !!user),
      catchError(() => of(false))
    );
  }

  getUser$(): Observable<User | null> {
    // console.log('getUser');
    if (this.user) {
      return of(this.user);
    }
    const user = this.lsService.getItem<User>(this.USER_KEY);
    return of(user);
  }

  initUserFromStorage() {}

  login(user: UserData) {
    this.auth.login(user).subscribe(
      (response: UserResponse) => {
        this.lsService.setItem(this.USER_KEY, {
          email: user.email,
          token: response.access_token,
        });
        this.user = {
          email: user.email,
          token: response.access_token,
        };
        this.router.navigate([this.INITIAL_PATH]);
        this.message.success('Login successful');
      },
      (error) => {
        this.message.error('Something went wrong!');
        console.log(error);
      }
    );
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.lsService.removeItem(this.USER_KEY);
      this.router.navigate([paths.login]);
    });
  }
}
