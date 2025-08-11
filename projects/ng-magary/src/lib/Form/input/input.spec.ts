import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagaryInput } from './input';

describe('Input', () => {
  let component: MagaryInput;
  let fixture: ComponentFixture<MagaryInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryInput],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
