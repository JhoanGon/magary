import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagarySlider } from './slider';

describe('MagarySlider behavior', () => {
  let fixture: ComponentFixture<MagarySlider>;
  let component: MagarySlider;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagarySlider],
    }).compileComponents();

    fixture = TestBed.createComponent(MagarySlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('emits onChange with the provided originalEvent', () => {
    const events: Array<{ originalEvent?: Event; value: number | number[] }> =
      [];
    component.onChange.subscribe((event) => events.push(event));

    const nativeEvent = new MouseEvent('click');
    component.updateValue(24, 0, nativeEvent);
    fixture.detectChanges();

    expect(component.value()).toBe(24);
    expect(events).toHaveLength(1);
    expect(events[0].value).toBe(24);
    expect(events[0].originalEvent).toBe(nativeEvent);
  });

  it('prevents dragging when disabled through ControlValueAccessor', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    component.onMouseDown(new MouseEvent('mousedown'), 0);
    fixture.detectChanges();

    expect(component.isDisabled()).toBe(true);
    expect(component.dragging()).toBe(false);
  });

  it('supports touch drag interactions for mobile', () => {
    const rail = fixture.nativeElement.querySelector(
      '.magary-slider-rail',
    ) as HTMLElement;

    Object.defineProperty(rail, 'getBoundingClientRect', {
      configurable: true,
      value: () =>
        ({
          left: 0,
          top: 0,
          right: 100,
          bottom: 20,
          width: 100,
          height: 20,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        }) as DOMRect,
    });

    const startEvent = {
      touches: [{ clientX: 10, clientY: 10 }],
      changedTouches: [{ clientX: 10, clientY: 10 }],
      cancelable: true,
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as unknown as TouchEvent;

    component.onTouchStart(startEvent, 0);
    expect(component.dragging()).toBe(true);

    const moveEvent = {
      touches: [{ clientX: 80, clientY: 10 }],
      changedTouches: [{ clientX: 80, clientY: 10 }],
      cancelable: true,
      preventDefault: vi.fn(),
    } as unknown as TouchEvent;

    component.onTouchMove(moveEvent);
    expect(component.value()).toBe(80);

    const endEvent = {
      touches: [],
      changedTouches: [{ clientX: 80, clientY: 10 }],
      cancelable: true,
      preventDefault: vi.fn(),
    } as unknown as TouchEvent;

    component.onTouchEnd(endEvent);
    expect(component.dragging()).toBe(false);
  });

  it('supports keyboard interaction on slider handle', () => {
    component.writeValue(10);
    fixture.detectChanges();

    const slideEndEvents: Array<{
      originalEvent?: Event;
      value: number | number[] | null;
    }> = [];
    component.onSlideEnd.subscribe((event) => slideEndEvents.push(event));

    component.onHandleKeydown(
      new KeyboardEvent('keydown', { key: 'ArrowRight' }),
      0,
    );
    fixture.detectChanges();

    expect(component.value()).toBe(11);
    expect(slideEndEvents).toHaveLength(1);
    expect(slideEndEvents[0].value).toBe(11);
  });
});
