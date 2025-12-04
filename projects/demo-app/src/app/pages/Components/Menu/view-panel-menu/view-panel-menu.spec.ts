import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPanelMenu } from './view-panel-menu';
describe('ViewPanelMenu', () => {
  let component: ViewPanelMenu;
  let fixture: ComponentFixture<ViewPanelMenu>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPanelMenu]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ViewPanelMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
