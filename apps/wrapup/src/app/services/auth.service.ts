import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthCredentials, CsrfToken } from '@wrapup/api-interfaces';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { CsrfService } from './csrf.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private csrfService: CsrfService,
  ) {}

  logIn(credentials: AuthCredentials) {
    return this.http
      .post<CsrfToken>(environment.apiHost + '/auth/login', credentials, {
        withCredentials: true,
      })
      .pipe(tap((token) => this.csrfService.setCsrfTokenToLocalStorage(token)));
  }

  checkToken() {
    return this.http.get<{ result: 'ok' }>(
      environment.apiHost + '/token/check',
      {
        withCredentials: true,
      },
    );
  }

  updateAccessToken() {
    return this.http
      .post<CsrfToken>(
        environment.apiHost + '/token/refresh',
        {},
        {
          withCredentials: true,
        },
      )
      .pipe(tap((token) => this.csrfService.setCsrfTokenToLocalStorage(token)));
  }

  getCsrfToken() {
    return this.http.get<CsrfToken>(environment.apiHost + '/auth/csrf-token', {
      withCredentials: true,
    });
  }

  logout() {
    return this.http
      .post<CsrfToken>(
        environment.apiHost + '/auth/logout',
        {},
        {
          withCredentials: true,
        },
      )
      .pipe(
        tap((token) => this.csrfService.setCsrfTokenToLocalStorage(token)),
        finalize(() => this.router.navigate(['/'])),
      );
  }
}
