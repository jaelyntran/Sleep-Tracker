import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BedtimeLogPage } from './bedtime-log.page';

describe('BedtimeLogPage', () => {
  let component: BedtimeLogPage;
  let fixture: ComponentFixture<BedtimeLogPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BedtimeLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
