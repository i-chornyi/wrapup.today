import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountDialogComponent } from './create-account-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

describe('CreateAccountDialogComponent', () => {
  let component: CreateAccountDialogComponent;
  let fixture: ComponentFixture<CreateAccountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAccountDialogComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: DialogRef, useValue: {} },
        { provide: DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
