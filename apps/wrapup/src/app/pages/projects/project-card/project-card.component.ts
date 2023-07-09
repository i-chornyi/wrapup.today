import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project } from '@wrapup/api-interfaces';

@Component({
  selector: 'wrapup-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  @Input() project!: Project;
}
