import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    component.avatarSettings = {
      colors: ['#000', '#111', '#222'],
      angle: 10,
    };
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

  it('should not have initials if none provided', () => {
    expect(component.initials).toBeFalsy();
  });

  it('should have initials', () => {
    fixture.componentRef.setInput('initials', 'aa');
    fixture.detectChanges();

    const initialsElement = fixture.debugElement.nativeElement.querySelector(
      '[data-test-id="avatar-initials"]',
    );

    expect(initialsElement).toBeTruthy();
    expect(initialsElement.textContent.trim()).toEqual('AA');
  });
});
