import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedDial } from './speed-dial';

describe('SpeedDial', () => {
  let component: SpeedDial;
  let fixture: ComponentFixture<SpeedDial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeedDial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeedDial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
