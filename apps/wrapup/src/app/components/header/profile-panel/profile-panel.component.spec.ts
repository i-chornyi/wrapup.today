import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePanelComponent } from './profile-panel.component';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../../services/user.service';
import {
  generateFakeUserProfile,
  getTestIdDataAttribute,
} from '@wrapup/test-utils';

const UserServiceMock = {
  currentUser$: of(
    generateFakeUserProfile({ firstName: 'John', lastName: 'Doe' }),
  ),
};

describe('ProfilePanelComponent', () => {
  let component: ProfilePanelComponent;
  let fixture: ComponentFixture<ProfilePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfilePanelComponent,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: UserService,
          useValue: UserServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePanelComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show user avatar', () => {
    const avatarElement = fixture.debugElement.nativeElement.querySelector(
      getTestIdDataAttribute('profile-button-avatar'),
    );

    expect(avatarElement.textContent.trim()).toBe('JD');
  });
});
