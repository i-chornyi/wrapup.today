import { FormControlErrorPipe } from './form-control-error.pipe';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('FormControlErrorPipe', () => {
  let pipe: FormControlErrorPipe;
  let form: FormGroup;

  beforeEach(() => {
    pipe = new FormControlErrorPipe();

    form = new FormGroup({
      name: new FormControl({
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
    });
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it("should return an empty array if the form wasn't changed yet", () => {
    expect(pipe.transform(form, 'addProjectForm', 'name')).toStrictEqual([]);
  });

  it('should return a correct array of errors', () => {
    form.markAsDirty();
    form.controls['name'].setErrors({
      required: true,
    });

    expect(pipe.transform(form, 'addProjectForm', 'name')).toStrictEqual([
      'Project name is required',
    ]);
  });
});
