import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailComponent } from './project-detail.component';
import { CalendarModule } from '@wrapup/calendar';
import { ButtonModule } from '@wrapup/button';
import { AddWrapupDialogComponent } from './components/add-wrapup-dialog/add-wrapup-dialog.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedModule } from '../../shared.module';
import { AddWrapupCardButtonComponent } from './components/add-wrapup-card-button/add-wrapup-card-button.component';

const routes: Routes = [
  {
    path: ':projectId',
    component: ProjectDetailComponent,
  },
];

@NgModule({
  declarations: [ProjectDetailComponent, AddWrapupDialogComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CalendarModule,
    ButtonModule,
    OverlayModule,
    AddWrapupCardButtonComponent,
    // ReactiveFormsModule,
  ],
})
export class ProjectDetailModule {}
