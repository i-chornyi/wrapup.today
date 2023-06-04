import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserCreation } from '@wrapup/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createAccount(userData: UserCreation) {
    return this.http.post(environment.apiHost + '/users', userData, {
      withCredentials: true,
    });
  }

  getMyProfile() {
    return this.http.get(environment.apiHost + '/users/profile', {
      withCredentials: true,
    });
  }

  updateMyProfile(body: { firstName: string; lastName?: string }) {
    return this.http.put(environment.apiHost + '/users/profile', body, {
      withCredentials: true,
    });
  }
}
