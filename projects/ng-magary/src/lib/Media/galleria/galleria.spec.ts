import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagaryGalleria } from './galleria';

describe('MagaryGalleria mobile gestures', () => {
  let fixture: ComponentFixture<MagaryGalleria>;
  let component: MagaryGalleria;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryGalleria],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryGalleria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('starts pinch zoom from default scale on touch devices', () => {
    component.onTouchStart({
      touches: [
        { clientX: 0, clientY: 0 },
        { clientX: 0, clientY: 100 },
      ],
    } as unknown as TouchEvent);

    const preventDefault = vi.fn();

    component.onTouchMove({
      touches: [
        { clientX: 0, clientY: 0 },
        { clientX: 0, clientY: 200 },
      ],
      preventDefault,
    } as unknown as TouchEvent);

    expect(preventDefault).toHaveBeenCalled();
    expect(component.zoomLevel()).toBeGreaterThan(1);
    expect(component.isZoomed()).toBe(true);
  });

  it('resets zoomed state when pinch zoom returns to base scale', () => {
    component.onTouchStart({
      touches: [
        { clientX: 0, clientY: 0 },
        { clientX: 0, clientY: 100 },
      ],
    } as unknown as TouchEvent);

    component.onTouchMove({
      touches: [
        { clientX: 0, clientY: 0 },
        { clientX: 0, clientY: 200 },
      ],
      preventDefault: vi.fn(),
    } as unknown as TouchEvent);

    component.onTouchMove({
      touches: [
        { clientX: 0, clientY: 0 },
        { clientX: 0, clientY: 100 },
      ],
      preventDefault: vi.fn(),
    } as unknown as TouchEvent);

    expect(component.zoomLevel()).toBe(1);
    expect(component.isZoomed()).toBe(false);
  });
});
