import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wrapup-successful-login',
  templateUrl: './successful-login.component.html',
  styleUrls: ['./successful-login.component.scss'],
})
export class SuccessfulLoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('LOGIN SUCCESS');
    this.router.navigate(['/projects']);
    // this.authService.checkToken().subscribe({
    //   next: () => ,
    //   error: (error) => console.log('FAIL', error),
    // });
  }
}
