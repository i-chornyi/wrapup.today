import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulLoginComponent } from './successful-login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SuccessfulLoginComponent', () => {
  let component: SuccessfulLoginComponent;
  let fixture: ComponentFixture<SuccessfulLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessfulLoginComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessfulLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
