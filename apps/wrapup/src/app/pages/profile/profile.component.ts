import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UpdateProfileForm } from './form-interfaces/update-profile.interface';

@Component({
  selector: 'wrapup-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  updateProfileForm = this.fb.group<UpdateProfileForm>({
    firstName: this.fb.control('', Validators.required),
    lastName: this.fb.control(''),
  });

  constructor(
    private userService: UserService,
    private fb: NonNullableFormBuilder,
  ) {}

  updateProfile() {
    this.userService
      .updateMyProfile(this.updateProfileForm.getRawValue())
      .subscribe();
  }
}
