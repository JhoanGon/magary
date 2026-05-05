import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MagarySlider } from './slider';

@Component({
  standalone: true,
  imports: [MagarySlider, ReactiveFormsModule],
  template: `
    <magary-slider
      [formControl]="control"
      errorMessage="Pick at least 10"
      helpText="Choose a value between 0 and 100"
    ></magary-slider>
  `,
})
class SliderReactiveHostComponent {
  readonly control = new FormControl(0, {
    nonNullable: true,
    validators: [Validators.min(10)],
  });
}

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

  it('marks the control as touched when the interaction ends', () => {
    const onTouched = vi.fn();
    component.registerOnTouched(onTouched);

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

    component.onBarClick(new MouseEvent('click', { clientX: 50, clientY: 10 }));
    fixture.detectChanges();

    expect(onTouched).toHaveBeenCalledTimes(1);
  });

  it('reflects Angular Forms invalid state after touch and restores help text when valid', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [SliderReactiveHostComponent],
    }).compileComponents();

    const hostFixture = TestBed.createComponent(SliderReactiveHostComponent);
    hostFixture.detectChanges();

    const hostComponent = hostFixture.componentInstance;
    const handle = hostFixture.nativeElement.querySelector(
      '.magary-slider-handle',
    ) as HTMLElement;

    expect(handle.getAttribute('aria-describedby')).toContain('-help');
    expect(handle.getAttribute('aria-invalid')).toBeNull();

    handle.dispatchEvent(new FocusEvent('blur'));
    hostFixture.detectChanges();

    expect(hostComponent.control.touched).toBe(true);
    expect(handle.getAttribute('aria-invalid')).toBe('true');
    expect(
      hostFixture.nativeElement.querySelector('.error-message')?.textContent,
    ).toContain('Pick at least 10');

    hostComponent.control.setValue(20);
    hostFixture.detectChanges();

    expect(handle.getAttribute('aria-invalid')).toBeNull();
    expect(hostFixture.nativeElement.querySelector('.error-message')).toBeNull();
    expect(
      hostFixture.nativeElement.querySelector('.help-message')?.textContent,
    ).toContain('Choose a value between 0 and 100');
  });
});
