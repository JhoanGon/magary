import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInput } from './view-input';

describe('ViewInput', () => {
  let component: ViewInput;
  let fixture: ComponentFixture<ViewInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
