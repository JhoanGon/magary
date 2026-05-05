import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MagaryInputNumber } from './input-number';

@Component({
  standalone: true,
  imports: [MagaryInputNumber, ReactiveFormsModule],
  template: `
    <magary-input-number
      [formControl]="control"
      errorMessage="Amount is required"
      helpText="Enter a valid amount"
    ></magary-input-number>
  `,
})
class InputNumberReactiveHostComponent {
  readonly control = new FormControl<number | null>(null, {
    validators: [Validators.required],
  });
}

describe('MagaryInputNumber behavior', () => {
  let fixture: ComponentFixture<MagaryInputNumber>;
  let component: MagaryInputNumber;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryInputNumber],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryInputNumber);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('writes incoming values and propagates user changes through ControlValueAccessor', () => {
    const onChange = vi.fn<(value: number | null) => void>();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    component.registerOnChange(onChange);
    component.writeValue(12.5);
    fixture.detectChanges();

    expect(input.value).toBe('12.5');

    input.value = '40';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith(40);
  });

  it('marks the control as touched on blur, clamps to min/max, and emits semantic events', () => {
    const onTouched = vi.fn();
    const blurEvents: FocusEvent[] = [];
    const inputEvents: Event[] = [];

    component.registerOnTouched(onTouched);
    component.onBlur.subscribe((event) => blurEvents.push(event));
    component.onInput.subscribe((event) => inputEvents.push(event));
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 10);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '18';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(inputEvents).toHaveLength(1);
    expect(blurEvents).toHaveLength(1);
    expect(onTouched).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('10');
  });

  it('reflects Angular Forms invalid state after touch and restores help text when valid', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [InputNumberReactiveHostComponent],
    }).compileComponents();

    const hostFixture = TestBed.createComponent(InputNumberReactiveHostComponent);
    hostFixture.detectChanges();

    const hostComponent = hostFixture.componentInstance;
    const input = hostFixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.getAttribute('aria-describedby')).toContain('-help');
    expect(input.getAttribute('aria-invalid')).toBeNull();

    input.dispatchEvent(new FocusEvent('blur'));
    hostFixture.detectChanges();

    expect(hostComponent.control.touched).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(
      hostFixture.nativeElement.querySelector('.error-message')?.textContent,
    ).toContain('Amount is required');

    input.value = '25';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new FocusEvent('blur'));
    hostFixture.detectChanges();

    expect(hostComponent.control.valid).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBeNull();
    expect(hostFixture.nativeElement.querySelector('.error-message')).toBeNull();
    expect(
      hostFixture.nativeElement.querySelector('.help-message')?.textContent,
    ).toContain('Enter a valid amount');
  });

  it('combines disabled input and ControlValueAccessor disabled state', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    component.setDisabledState(true);
    fixture.detectChanges();
    expect(input.disabled).toBe(true);

    component.setDisabledState(false);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(input.disabled).toBe(true);

    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();
    expect(input.disabled).toBe(false);
  });
});
