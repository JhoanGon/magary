import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewButton } from './view-button';
describe('ViewButton', () => {
  let component: ViewButton;
  let fixture: ComponentFixture<ViewButton>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewButton]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ViewButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
