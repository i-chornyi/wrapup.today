import { NgModule } from '@angular/core';
import { ProjectsComponent } from './projects.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
  },
];

@NgModule({
  declarations: [ProjectsComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ProjectsModule {}
