import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { filter, shareReplay } from 'rxjs';
import { ProfilePanelItemComponent } from './profile-panel-item/profile-panel-item.component';
import { SharedModule } from '../../../shared.module';
import { SvgIconComponent } from '@ngneat/svg-icon';
import { openCloseAnimation } from './open-close.animation';
import { AvatarComponent } from '../../avatar/avatar.component';

@Component({
  selector: 'wrapup-profile-panel',
  templateUrl: './profile-panel.component.html',
  standalone: true,
  animations: [openCloseAnimation],
  imports: [
    ProfilePanelItemComponent,
    SharedModule,
    SvgIconComponent,
    AvatarComponent,
  ],
})
export class ProfilePanelComponent {
  userProfile$ = this.userService.currentUser$.pipe(
    filter((user) => !!user),
    shareReplay(1),
  );

  @ViewChild('profilePanel') panelElement!: ElementRef;
  @ViewChild('profileTrigger') triggerElement!: ElementRef;

  isOpen = false;

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    const isTriggerClick = this.triggerElement?.nativeElement.contains(
      event.target,
    );
    const isNotPanelClick = !this.panelElement?.nativeElement.contains(
      event.target,
    );
    const hasClosePanelOnClickProp =
      'closePanelOnClick' in (event.target as HTMLElement).dataset;

    if (isTriggerClick) {
      this.toggleMenu(!this.isOpen);
    } else if (isNotPanelClick || hasClosePanelOnClickProp) {
      this.toggleMenu(false);
    }
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  logOut() {
    this.authService.logout().subscribe();
  }

  toggleMenu(isOpen: boolean) {
    this.isOpen = isOpen;
  }
}
