import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project, ProjectCreation, Wrapup } from '@wrapup/api-interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get<Project[]>(environment.apiHost + `/projects`, {
      withCredentials: true,
    });
  }

  getProject(id: Project['id']) {
    return this.http.get<Project>(environment.apiHost + `/projects/${id}`, {
      withCredentials: true,
    });
  }

  getProjectWrapups(id: Project['id'], day: string) {
    return this.http.get<Wrapup[]>(
      environment.apiHost + `/projects/${id}/wrapups`,
      { params: { day }, withCredentials: true },
    );
  }

  createProject(project: ProjectCreation) {
    return this.http.post<Project>(environment.apiHost + `/projects`, project, {
      withCredentials: true,
    });
  }
}
