import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { LoginDialogComponent } from '../../components/login-dialog/login-dialog.component';
import { CreateAccountDialogComponent } from '../../components/create-account-dialog/create-account-dialog.component';

@Component({
  selector: 'wrapup-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  nameControl = new FormControl<string>('', [Validators.required]);

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private dialog: Dialog,
  ) {}

  save() {
    if (this.nameControl.value && this.nameControl.valid) {
      this.projectService
        .createProject({ name: this.nameControl.value })
        .subscribe((project) => this.router.navigate(['/project', project.id]));
    }
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
  }

  openCreateAccountDialog() {
    this.dialog.open(CreateAccountDialogComponent);
  }
}
