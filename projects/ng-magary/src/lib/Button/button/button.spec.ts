import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagaryButton } from './button';

describe('MagaryButton', () => {
  let component: MagaryButton;
  let fixture: ComponentFixture<MagaryButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryButton],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
