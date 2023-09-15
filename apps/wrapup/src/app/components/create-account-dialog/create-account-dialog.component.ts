import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UserCreation } from '@wrapup/api-interfaces';

@Component({
  selector: 'wrapup-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
})
export class CreateAccountDialogComponent implements OnInit {
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
    public dialogRef: DialogRef<CreateAccountDialogComponent>,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  save() {
    const newUser: UserCreation = {
      email: this.loginForm.getRawValue().email,
      password: this.loginForm.getRawValue().password,
    };
    this.userService.createAccount(newUser).subscribe({
      next: () => {
        this.router.navigate(['/projects']);
        this.close();
      },
      error: (error) => console.log(error),
    });
  }

  close() {
    this.dialogRef.close();
  }
}
