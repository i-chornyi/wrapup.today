import { Injectable } from '@angular/core';
import { CsrfToken, CsrfTokenLocalStorage } from '@wrapup/api-interfaces';
import { CSRF_TOKEN_LOCAL_STORAGE_KEY } from '../constants';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class CsrfService {
  setCsrfTokenToLocalStorage(token: CsrfToken) {
    const validUntil = DateTime.local()
      .plus({ millisecond: token.maxAge })
      .minus({ minute: 5 }) // cookies are set on the server and the FE ttl is calculated on the FE, so they are not the same, and it's safe to reload csrf token before it's expired
      .toUTC()
      .toISO();

    localStorage.setItem(
      CSRF_TOKEN_LOCAL_STORAGE_KEY,
      JSON.stringify({
        csrfToken: token.csrfToken,
        validUntil,
      }),
    );
  }

  getCsrfTokenFromLocalStorage(): CsrfTokenLocalStorage | undefined {
    const csrfToken = localStorage.getItem(CSRF_TOKEN_LOCAL_STORAGE_KEY);

    try {
      if (csrfToken) {
        return JSON.parse(csrfToken);
      }
    } catch (e) {
      return undefined;
    }

    return undefined;
  }

  checkIsCsrfTokenValid(): boolean {
    const csrfToken = this.getCsrfTokenFromLocalStorage();

    if (!csrfToken) {
      return false;
    }

    return (
      DateTime.fromISO(csrfToken.validUntil)
        .toUTC()
        .diff(DateTime.now().toUTC(), 'second').seconds > 0
    );
  }
}
