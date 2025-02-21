import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggedDataViewPage } from './logged-data-view.page';

describe('LoggedDataViewPage', () => {
  let component: LoggedDataViewPage;
  let fixture: ComponentFixture<LoggedDataViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedDataViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
