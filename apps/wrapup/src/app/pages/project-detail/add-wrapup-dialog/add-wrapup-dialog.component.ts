import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { WrapupService } from '../../../services/wrapup.service';
import { DateTime } from 'luxon';
import { Project, WrapupCreation } from '@wrapup/api-interfaces';

@Component({
  selector: 'wrapup-add-wrapup-dialog',
  templateUrl: './add-wrapup-dialog.component.html',
})
export class AddWrapupDialogComponent {
  addWrapupForm = new FormGroup({
    done: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    planned: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    blockers: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    public dialogRef: DialogRef<AddWrapupDialogComponent>,
    @Inject(DIALOG_DATA) public data: { day: DateTime; project: Project },
    private wrapupService: WrapupService,
  ) {}

  save() {
    console.log(this.data);
    const newWrapup: WrapupCreation = {
      projectId: this.data.project.id,
      day: this.data.day.toUTC().toISO(),
      ...this.addWrapupForm.getRawValue(),
    };
    this.wrapupService.createWrapup(newWrapup).subscribe();
  }

  close() {
    this.dialogRef.close();
  }
}
