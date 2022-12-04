import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change its value when set programmatically in reactive form', () => {
    expect(component.value).toBeUndefined();
    component.writeValue('123');
    expect(component.value).toBe('123');
  });

  it('should disable the input', () => {
    expect(component.isDisabled).toBe(false);
    component.setDisabledState(true);
    expect(component.isDisabled).toBe(true);
  });
});
