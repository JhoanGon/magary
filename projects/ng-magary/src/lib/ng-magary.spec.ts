import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgMagary } from './ng-magary';
describe('NgMagary', () => {
  let component: NgMagary;
  let fixture: ComponentFixture<NgMagary>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgMagary]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NgMagary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
