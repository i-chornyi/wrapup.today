import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  finalize,
  map,
  Observable,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { DateTime } from 'luxon';
import { Dialog } from '@angular/cdk/dialog';
import { AddWrapupDialogComponent } from './components/add-wrapup-dialog/add-wrapup-dialog.component';
import { Project } from '@wrapup/api-interfaces';

@Component({
  selector: 'wrapup-project-detail',
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent implements OnInit {
  selectedDay$: Observable<DateTime> = this.activatedRoute.queryParamMap.pipe(
    map((queryParams) => {
      const day = queryParams.get('day');

      if (day) {
        return DateTime.fromISO(day);
      }

      return DateTime.local();
    }),
    shareReplay(1),
  );

  projectId$ = this.activatedRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('projectId')),
  );

  project$ = this.projectId$.pipe(
    switchMap((projectId) => this.projectService.getProject(projectId || '')),
  );

  wrapups$ = combineLatest([this.projectId$, this.selectedDay$]).pipe(
    tap(() => this.isLoading$.next(true)),
    switchMap(([projectId, selectedDay]) =>
      this.projectService
        .getProjectWrapups(projectId || '', selectedDay.toUTC().toISO())
        .pipe(finalize(() => this.isLoading$.next(false))),
    ),
  );

  isLoading$ = new BehaviorSubject(true);

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private dialog: Dialog,
  ) {}

  ngOnInit(): void {}

  handleDayChange(day: DateTime) {
    const extras: NavigationExtras = { relativeTo: this.activatedRoute };

    // remove query params if the selected day is 'today', so it's properly updated the next day
    if (!day.hasSame(DateTime.local(), 'day')) {
      extras.queryParams = { day: day.toISODate() };
    }

    this.router.navigate([], extras);
  }

  openAddWrapupDialog(selectedDay: DateTime, project: Project) {
    this.dialog.open(AddWrapupDialogComponent, {
      data: { day: selectedDay, project },
    });
  }
}
