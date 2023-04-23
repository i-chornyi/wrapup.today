import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapupCardSkeletonComponent } from './wrapup-card-skeleton.component';

describe('WrapupCardSkeletonComponent', () => {
  let component: WrapupCardSkeletonComponent;
  let fixture: ComponentFixture<WrapupCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrapupCardSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapupCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
