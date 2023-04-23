import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CsrfService } from './services/csrf.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wrapup-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private csrfService: CsrfService,
  ) {}

  ngOnInit() {
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

  logOut() {
    this.authService.logout().subscribe();
  }
}
