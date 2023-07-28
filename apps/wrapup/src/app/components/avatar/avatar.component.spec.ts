import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar.component';
import {
  generateFakeUserProfile,
  getTestIdDataAttribute,
} from '@wrapup/test-utils';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'userProfile',
      generateFakeUserProfile({
        firstName: 'John',
        lastName: 'Doe',
        avatar: {
          angle: 10,
          colors: ['#000', '#111', '#222'],
        },
      }),
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a gradient background based on the avatar settings', () => {
    expect(component._avatarSettings).toBe(
      'linear-gradient(10deg, #000 0%, #111 50%, #222 100%)',
    );
  });

  it('should have initials', () => {
    const initialsElement = fixture.debugElement.nativeElement.querySelector(
      getTestIdDataAttribute('avatar-initials'),
    );

    expect(initialsElement).toBeTruthy();
    expect(initialsElement.textContent.trim()).toEqual('JD');
  });
});
