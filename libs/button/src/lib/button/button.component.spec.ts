import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct color classes for the DEFAULT theme', () => {
    component.theme = 'default';
    expect(component.color).toBe(
      'bg-grey-50 border-grey-300 text-grey-700 hover:bg-grey-200',
    );
  });

  it('should return correct color classes for the PRIMARY theme', () => {
    component.theme = 'primary';
    expect(component.color).toBe(
      'bg-blue-50 border-blue text-blue hover:bg-blue-100',
    );
  });

  it('should return correct color classes for the NEGATIVE theme', () => {
    component.theme = 'negative';
    expect(component.color).toBe(
      'bg-red-50 border-red text-red hover:bg-red-100',
    );
  });
});
