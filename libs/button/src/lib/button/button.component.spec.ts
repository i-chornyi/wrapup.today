import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { ElementRef } from '@angular/core';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  let hostElementRef: ElementRef<HTMLButtonElement>;
  let hostElementClasses: DOMTokenList;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostElementRef = fixture.elementRef;
    hostElementClasses = hostElementRef.nativeElement.classList;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct color classes for the DEFAULT theme', () => {
    component.theme = 'default';
    expect(hostElementClasses).toContain('bg-gray-600');
    expect(hostElementClasses).toContain('border-gray-600');
    expect(hostElementClasses).toContain('border-2');
  });

  it('should return correct color classes for the PRIMARY theme', () => {
    component.theme = 'primary';
    component.ngOnInit();
    expect(hostElementClasses).toContain('border-blue-500');
    expect(hostElementClasses).toContain('text-grey-700');
    expect(hostElementClasses).toContain('bg-blue');
    expect(hostElementClasses).toContain('hover:bg-blue-hover');
  });

  it('should return correct color classes for the NEGATIVE theme', () => {
    component.theme = 'negative';
    component.ngOnInit();
    expect(hostElementClasses).toContain('bg-red-700');
    expect(hostElementClasses).toContain('border-red-700');
    expect(hostElementClasses).toContain('text-red');
  });

  it('should add classes to the host element', () => {
    expect(hostElementClasses).not.toContain('test-class-1');
    expect(hostElementClasses).not.toContain('test-class-2');

    component.addClassesToHostElement(['test-class-1', 'test-class-2']);

    expect(hostElementClasses).toContain('test-class-1');
    expect(hostElementClasses).toContain('test-class-2');
  });
});
