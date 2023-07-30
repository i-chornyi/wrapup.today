import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWrapupDialogComponent } from './add-wrapup-dialog.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddWrapupDialogComponent', () => {
  let component: AddWrapupDialogComponent;
  let fixture: ComponentFixture<AddWrapupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWrapupDialogComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: DialogRef, useValue: {} },
        { provide: DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddWrapupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
