import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { ButtonModule } from '@wrapup/button';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { NgOptimizedImage } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    ButtonModule,
    RouterModule.forChild(routes),
    NgOptimizedImage,
  ],
})
export class HomeModule {}
