import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'wrapup-project-detail',
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent implements OnInit {
  project$ = this.activatedRoute.paramMap.pipe(
    switchMap((paramMap) =>
      this.projectService.getProject(paramMap.get('projectId') || ''),
    ),
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {}
}
