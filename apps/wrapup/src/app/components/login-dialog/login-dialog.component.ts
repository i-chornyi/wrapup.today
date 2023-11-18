import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { AuthService } from '../../services/auth.service';
import { AuthCredentials } from '@wrapup/api-interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'wrapup-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor(
    public dialogRef: DialogRef<LoginDialogComponent>,
    // @Inject(DIALOG_DATA) public data: { day: DateTime; project: Project },
    private authService: AuthService,
    private router: Router,
  ) {}

  save() {
    const credentials: AuthCredentials = {
      email: this.loginForm.getRawValue().email,
      password: this.loginForm.getRawValue().password,
    };
    this.authService.logIn(credentials).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/successful-login'], { skipLocationChange: true });
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
