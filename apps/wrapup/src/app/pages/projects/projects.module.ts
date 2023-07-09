import { NgModule } from '@angular/core';
import { ProjectsComponent } from './projects.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectCardComponent } from './project-card/project-card.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
  },
];

@NgModule({
  declarations: [ProjectsComponent, AddProjectComponent, ProjectCardComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ProjectsModule {}
