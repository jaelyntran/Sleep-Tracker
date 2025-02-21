import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OvernightSleepLogPage } from './overnight-sleep-log.page';

describe('OvernightSleepLogPage', () => {
  let component: OvernightSleepLogPage;
  let fixture: ComponentFixture<OvernightSleepLogPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OvernightSleepLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
