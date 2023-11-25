import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [FormsModule],
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

  it("should show label in the template if it's set in the component", () => {
    component.label = 'name';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('label'))).toBeTruthy();
  });

  it("should hide label in the template if it's not set in the component", () => {
    expect(fixture.debugElement.query(By.css('label'))).toBeNull();
  });
});
