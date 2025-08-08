import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewCard } from './view-card';
describe('ViewCard', () => {
  let component: ViewCard;
  let fixture: ComponentFixture<ViewCard>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCard]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ViewCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
