import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfilePanelComponent } from './profile-panel/profile-panel.component';

@Component({
  selector: 'wrapup-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterLink, ProfilePanelComponent],
})
export class HeaderComponent {}
