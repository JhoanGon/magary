import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSidebar } from './view-sidebar';

describe('ViewSidebar', () => {
  let component: ViewSidebar;
  let fixture: ComponentFixture<ViewSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
