import { Pipe, PipeTransform } from '@angular/core';
import { GLOBAL_FORM_ERRORS } from '../constants/form-errors';
import { FormName } from '../interfaces/form-errors.interface';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'formControlError',
  pure: false,
})
export class FormControlErrorPipe implements PipeTransform {
  transform(
    form: FormGroup,
    formName: FormName,
    controlName: string,
  ): string[] {
    let errorsToShow: string[] = [];

    if (form.dirty && form.invalid) {
      errorsToShow = Object.keys(form.get(controlName)?.errors ?? {}).map(
        (errorKey) => GLOBAL_FORM_ERRORS[formName]?.[controlName]?.[errorKey],
      );
    }

    return errorsToShow;
  }
}
