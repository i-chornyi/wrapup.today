import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  Subject,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CsrfToken } from '@wrapup/api-interfaces';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  /** A `BehaviorSubject`, contains a boolean whether the tokens update process in progress */
  private updateTokensInProgress$ = new BehaviorSubject<boolean>(false);
  /** A `Subject`, contains a boolean whether the tokens update process is successfully completed */
  private tokenSuccessfullyUpdated$ = new Subject<boolean>();

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error.status === HttpStatusCode.Unauthorized &&
          error.error.reason === 'token_expired'
        ) {
          this.updateTokensInProgress$
            .pipe(
              take(1),
              filter((isLoading) => !isLoading),
              tap(() => this.updateTokensInProgress$.next(true)),
              switchMap(() => this.updateToken()),
              catchError(() => this.authService.logout()),
            )
            .subscribe((newToken) => {
              if (newToken) {
                this.tokenSuccessfullyUpdated$.next(true);
                this.updateTokensInProgress$.next(false);
              }
            });

          return this.tokenSuccessfullyUpdated$.pipe(
            take(1),
            filter((tokenSuccessfullyUpdated) => tokenSuccessfullyUpdated),
            switchMap(() => {
              return next
                .handle(request)
                .pipe(
                  catchError((errorResponse: HttpErrorResponse) =>
                    throwError(() => errorResponse),
                  ),
                );
            }),
          );
        }
        return throwError(() => error);
      }),
    );
  }

  updateToken(): Observable<CsrfToken> {
    return this.authService.updateAccessToken();
  }
}
