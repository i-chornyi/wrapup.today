import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CsrfService } from './services/csrf.service';
import { UserService } from './services/user.service';
import { UserProfile } from '@wrapup/api-interfaces';
import { switchMap } from 'rxjs';

@Component({
  selector: 'wrapup-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private csrfService: CsrfService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.setupCsrfToken();
    this.setupMyProfile();
  }

  setupMyProfile() {
    this.authService
      .checkToken()
      .pipe(
        switchMap(() => {
          return this.userService.getMyProfile();
        }),
      )
      .subscribe((user: UserProfile) => {
        console.log(user);
        this.userService.setCurrentUser(user);
        this.authService.setIsUserLoggedIn(true);
      });
  }

  setupCsrfToken() {
    this.getCsrfToken();

    setInterval(() => {
      if (!this.csrfService.checkIsCsrfTokenValid()) {
        this.getCsrfToken();
      }
    }, 5000);
  }

  getCsrfToken() {
    this.authService.getCsrfToken().subscribe((token) => {
      this.csrfService.setCsrfTokenToLocalStorage(token);
    });
  }
}
