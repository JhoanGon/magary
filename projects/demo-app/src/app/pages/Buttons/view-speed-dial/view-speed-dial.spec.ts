import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpeedDial } from './view-speed-dial';

describe('ViewSpeedDial', () => {
  let component: ViewSpeedDial;
  let fixture: ComponentFixture<ViewSpeedDial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSpeedDial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSpeedDial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
