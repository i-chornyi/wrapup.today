import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { CsrfTokenInterceptor } from './interceptors/csrf-token.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from './shared.module';
import { provideSvgIcons, SvgIconComponent } from '@ngneat/svg-icon';
import { chevronDownIcon } from './svg/chevron-down';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'successful-login',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/successful-login/successful-login.module').then(
        (m) => m.SuccessfulLoginModule,
      ),
  },
  {
    path: 'project',
    loadChildren: () =>
      import('./pages/project-detail/project-detail.module').then(
        (m) => m.ProjectDetailModule,
      ),
  },
  {
    path: 'projects',
    title: 'My Projects',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    SharedModule,
    SvgIconComponent,
    HeaderComponent,
  ],
  providers: [
    provideSvgIcons([chevronDownIcon]),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CsrfTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
