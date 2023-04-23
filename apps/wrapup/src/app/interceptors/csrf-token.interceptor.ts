import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CSRF_HEADER_KEY } from '@wrapup/common-constants';
import { CsrfService } from '../services/csrf.service';

@Injectable()
export class CsrfTokenInterceptor implements HttpInterceptor {
  constructor(private csrfService: CsrfService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const csrfToken =
      this.csrfService.getCsrfTokenFromLocalStorage()?.csrfToken;

    if (csrfToken) {
      const updatedRequest = request.clone({
        headers: request.headers.set(CSRF_HEADER_KEY, csrfToken),
      });

      return next.handle(updatedRequest);
    }

    return next.handle(request);
  }
}
