import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulLoginComponent } from './successful-login.component';

describe('SuccessfulLoginComponent', () => {
  let component: SuccessfulLoginComponent;
  let fixture: ComponentFixture<SuccessfulLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessfulLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessfulLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
