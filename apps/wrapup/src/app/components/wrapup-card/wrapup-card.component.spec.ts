import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapupCardComponent } from './wrapup-card.component';

describe('WrapupCardComponent', () => {
  let component: WrapupCardComponent;
  let fixture: ComponentFixture<WrapupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrapupCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
