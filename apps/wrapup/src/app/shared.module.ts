import { NgModule } from '@angular/core';
import { WrapupCardComponent } from './components/wrapup-card/wrapup-card.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { WrapupCardSkeletonComponent } from './components/skeletons/wrapup-card-skeleton/wrapup-card-skeleton.component';
import { HeadingModule } from '@wrapup/heading';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { DialogModule } from '@angular/cdk/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputModule } from '@wrapup/input';
import { CreateAccountDialogComponent } from './components/create-account-dialog/create-account-dialog.component';
import { ButtonModule } from '@wrapup/button';
import { GoogleSignInButtonComponent } from './components/google-sign-in-button/google-sign-in-button.component';
import { UserInitialsPipe } from './pipes/user-initials.pipe';
import { UserNamePipe } from './pipes/user-name.pipe';

@NgModule({
  declarations: [
    WrapupCardComponent,
    WrapupCardSkeletonComponent,
    LoginDialogComponent,
    CreateAccountDialogComponent,
    GoogleSignInButtonComponent,
    UserInitialsPipe,
    UserNamePipe,
  ],

  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    HeadingModule,
    InputModule,
    ButtonModule,
    NgOptimizedImage,
  ],
  exports: [
    WrapupCardComponent,
    WrapupCardSkeletonComponent,
    LoginDialogComponent,
    UserInitialsPipe,
    UserNamePipe,

    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    HeadingModule,
    DialogModule,
    InputModule,
    ButtonModule,
  ],
})
export class SharedModule {}
