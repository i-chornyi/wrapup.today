import { FormControl } from '@angular/forms';

export interface UpdateProfileForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
}
