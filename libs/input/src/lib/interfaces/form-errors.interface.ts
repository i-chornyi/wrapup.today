import { ValidationErrors } from '@angular/forms';

export type FormName = 'addProjectForm';

export type FormControlErrors = Record<string, ValidationErrors>;

export type FormErrors = Record<FormName, FormControlErrors>;
