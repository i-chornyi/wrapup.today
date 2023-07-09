import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserCreation, UserProfile } from '@wrapup/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _currentUser$ = new BehaviorSubject<UserProfile | undefined>(
    undefined,
  );
  currentUser$ = this._currentUser$.asObservable();

  constructor(private http: HttpClient) {}

  createAccount(userData: UserCreation) {
    return this.http.post(environment.apiHost + '/users', userData, {
      withCredentials: true,
    });
  }

  getMyProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(environment.apiHost + '/users/profile', {
      withCredentials: true,
    });
  }

  updateMyProfile(body: { firstName: string; lastName?: string }) {
    return this.http.put(environment.apiHost + '/users/profile', body, {
      withCredentials: true,
    });
  }

  setCurrentUser(user: UserProfile) {
    this._currentUser$.next(user);
  }
}
