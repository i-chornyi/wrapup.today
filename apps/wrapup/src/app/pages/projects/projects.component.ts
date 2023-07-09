import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'wrapup-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$ = this.projectService.getProjects();

  constructor(private dialog: Dialog, private projectService: ProjectService) {}

  ngOnInit(): void {}

  openAddProjectDialog() {
    this.dialog.open(AddProjectComponent);
  }
}
