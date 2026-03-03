import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocksGallery } from './blocks-gallery';

describe('BlocksGallery', () => {
  let component: BlocksGallery;
  let fixture: ComponentFixture<BlocksGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlocksGallery],
    }).compileComponents();

    fixture = TestBed.createComponent(BlocksGallery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
