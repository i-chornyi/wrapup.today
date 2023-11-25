import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { ProjectCreation } from '@wrapup/api-interfaces';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'wrapup-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent {
  newProjectForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    public dialogRef: DialogRef<AddProjectComponent>,
    // @Inject(DIALOG_DATA) public data: { day: DateTime; project: Project },
    private projectService: ProjectService,
    private router: Router,
  ) {}

  save() {
    if (!this.newProjectForm.valid) {
      this.newProjectForm.markAsDirty();
      return;
    }

    const newProject: ProjectCreation = {
      name: this.newProjectForm.getRawValue().name,
    };
    this.projectService.createProject(newProject).subscribe((data) => {
      console.log(data);
      // this.router.navigate(['/successful-login'], { skipLocationChange: true });
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
