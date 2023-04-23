import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H6Component } from './h6.component';

describe('H6Component', () => {
  let component: H6Component;
  let fixture: ComponentFixture<H6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [H6Component],
    }).compileComponents();

    fixture = TestBed.createComponent(H6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
