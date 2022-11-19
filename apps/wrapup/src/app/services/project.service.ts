import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project, ProjectCreation } from '@wrapup.today/api-interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProject(id: Project['id']) {
    return this.http.get<Project>(environment.apiHost + `/projects/${id}`);
  }

  createProject(project: ProjectCreation) {
    return this.http.post<Project>(environment.apiHost + `/projects`, project);
  }
}
