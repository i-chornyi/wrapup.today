import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWrapupDialogComponent } from './add-wrapup-dialog.component';

describe('AddWrapupDialogComponent', () => {
  let component: AddWrapupDialogComponent;
  let fixture: ComponentFixture<AddWrapupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWrapupDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddWrapupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
