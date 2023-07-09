import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePanelItemComponent } from './profile-panel-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { getTestIdDataAttribute } from '@wrapup/test-utils';

describe('ProfilePanelItemComponent', () => {
  let component: ProfilePanelItemComponent;
  let fixture: ComponentFixture<ProfilePanelItemComponent>;

  let itemClickSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePanelItemComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePanelItemComponent);
    component = fixture.componentInstance;
    itemClickSpy = jest.spyOn(component.itemClick, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a link element if url is provided', () => {
    fixture.componentRef.setInput('url', ['https://example.com']);
    fixture.detectChanges();
    const linkElement = fixture.debugElement.nativeElement.querySelector(
      getTestIdDataAttribute('panel-item-link'),
    );
    expect(linkElement).toBeTruthy();
  });

  it('should display a button element if url is NOT provided', () => {
    const buttonElement = fixture.debugElement.nativeElement.querySelector(
      getTestIdDataAttribute('panel-item-button'),
    );
    expect(buttonElement).toBeTruthy();
  });

  it('should NOT emit a new itemClick event on link click', () => {
    fixture.componentRef.setInput('url', ['https://example.com']);
    fixture.detectChanges();
    const linkElement: HTMLLinkElement =
      fixture.debugElement.nativeElement.querySelector(
        getTestIdDataAttribute('panel-item-link'),
      );
    linkElement.click();
    expect(itemClickSpy).not.toHaveBeenCalled();
  });

  it('should emit a new itemClick event on button click', () => {
    const buttonElement: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector(
        getTestIdDataAttribute('panel-item-button'),
      );
    buttonElement.click();
    expect(itemClickSpy).toHaveBeenCalledTimes(1);
  });
});
