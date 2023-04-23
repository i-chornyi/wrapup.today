import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WrapupCreation } from '@wrapup/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class WrapupService {
  constructor(private http: HttpClient) {}

  createWrapup(wrapup: WrapupCreation) {
    return this.http.post(environment.apiHost + '/wrapups', wrapup);
  }
}
