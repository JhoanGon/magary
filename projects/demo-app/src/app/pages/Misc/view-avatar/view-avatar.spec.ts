import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAvatar } from './view-avatar';

describe('ViewAvatar', () => {
  let component: ViewAvatar;
  let fixture: ComponentFixture<ViewAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAvatar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
