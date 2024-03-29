import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H5Component } from './h5.component';

describe('H5Component', () => {
  let component: H5Component;
  let fixture: ComponentFixture<H5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [H5Component],
    }).compileComponents();

    fixture = TestBed.createComponent(H5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
