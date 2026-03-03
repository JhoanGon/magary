import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero1 } from './hero-1';

describe('Hero1', () => {
  let component: Hero1;
  let fixture: ComponentFixture<Hero1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero1],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
