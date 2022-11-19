import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailComponent } from './project-detail.component';

const routes: Routes = [
  {
    path: ':projectId',
    component: ProjectDetailComponent,
  },
];

@NgModule({
  declarations: [ProjectDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ProjectDetailModule {}
