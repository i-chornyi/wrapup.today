import { NgModule } from '@angular/core';
import { SuccessfulLoginComponent } from './successful-login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';

const routes: Routes = [
  {
    path: '',
    component: SuccessfulLoginComponent,
  },
];

@NgModule({
  declarations: [SuccessfulLoginComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class SuccessfulLoginModule {}
