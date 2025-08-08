import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Panelmenu } from './panelmenu';
describe('Panelmenu', () => {
  let component: Panelmenu;
  let fixture: ComponentFixture<Panelmenu>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Panelmenu]
    })
    .compileComponents();
    fixture = TestBed.createComponent(Panelmenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
