import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DaytimeSleepinessLogPage } from './daytime-sleepiness-log.page';

describe('DaytimeSleepinessLogPage', () => {
  let component: DaytimeSleepinessLogPage;
  let fixture: ComponentFixture<DaytimeSleepinessLogPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DaytimeSleepinessLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
