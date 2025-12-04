import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTab } from './view-tab';
describe('ViewTab', () => {
  let component: ViewTab;
  let fixture: ComponentFixture<ViewTab>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTab]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ViewTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
