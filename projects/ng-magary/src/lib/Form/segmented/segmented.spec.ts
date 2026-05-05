import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MagarySegmented,
  MagarySegmentedValue,
} from './segmented';

@Component({
  standalone: true,
  imports: [MagarySegmented, ReactiveFormsModule],
  template: `
    <magary-segmented
      [formControl]="control"
      [options]="options"
      errorMessage="Pick a supported locale"
      helpText="Choose the UI locale"
    ></magary-segmented>
  `,
})
class SegmentedReactiveHostComponent {
  readonly options = ['es', 'en'];
  readonly control = new FormControl<string | null>(null, {
    validators: [Validators.required],
  });
}

describe('MagarySegmented behavior', () => {
  let fixture: ComponentFixture<MagarySegmented>;
  let component: MagarySegmented;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagarySegmented],
    }).compileComponents();

    fixture = TestBed.createComponent(MagarySegmented);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', ['es', 'en']);
    fixture.detectChanges();
  });

  it('renders options and selects by click', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.segment-option',
    ) as NodeListOf<HTMLButtonElement>;

    const emitted: MagarySegmentedValue[] = [];
    component.registerOnChange((value) => emitted.push(value));

    buttons[1].click();
    fixture.detectChanges();

    expect(component.value()).toBe('en');
    expect(emitted).toEqual(['en']);
    expect(buttons[1].classList.contains('selected')).toBe(true);
  });

  it('supports object options with optionLabel and optionValue', () => {
    fixture.componentRef.setInput('options', [
      { label: 'ES', value: 'es' },
      { label: 'EN', value: 'en' },
    ]);
    fixture.componentRef.setInput('optionLabel', 'label');
    fixture.componentRef.setInput('optionValue', 'value');
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      '.segment-option',
    ) as NodeListOf<HTMLButtonElement>;
    buttons[0].click();
    fixture.detectChanges();

    expect(buttons[0].textContent?.trim()).toBe('ES');
    expect(component.value()).toBe('es');
  });

  it('moves selection with keyboard arrows and wraps around', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.segment-option',
    ) as NodeListOf<HTMLButtonElement>;

    buttons[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    expect(component.value()).toBe('en');

    buttons[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    expect(component.value()).toBe('es');
  });

  it('respects disabled state from input and CVA', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      '.segment-option',
    ) as NodeListOf<HTMLButtonElement>;
    buttons[1].click();
    fixture.detectChanges();

    expect(component.value()).toBeNull();

    fixture.componentRef.setInput('disabled', false);
    component.setDisabledState(true);
    fixture.detectChanges();

    buttons[0].click();
    fixture.detectChanges();
    expect(component.value()).toBeNull();
  });

  it('sets roving tabindex based on selected option', () => {
    fixture.componentRef.setInput('options', ['es', 'en', 'pt']);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      '.segment-option',
    ) as NodeListOf<HTMLButtonElement>;
    expect(buttons[0].getAttribute('tabindex')).toBe('0');
    expect(buttons[1].getAttribute('tabindex')).toBe('-1');

    buttons[2].click();
    fixture.detectChanges();
    expect(buttons[2].getAttribute('tabindex')).toBe('0');
    expect(buttons[0].getAttribute('tabindex')).toBe('-1');
  });

  it('marks the control as touched after a completed selection', () => {
    const onTouched = vi.fn();
    component.registerOnTouched(onTouched);

    const buttons = fixture.nativeElement.querySelectorAll(
      '.segment-option',
    ) as NodeListOf<HTMLButtonElement>;

    buttons[1].click();
    fixture.detectChanges();

    expect(onTouched).toHaveBeenCalledTimes(1);
  });

  it('supports explicit comparison when object options use external values', () => {
    fixture.componentRef.setInput('options', [
      { id: 1, label: 'Starter' },
      { id: 2, label: 'Pro' },
    ]);
    fixture.componentRef.setInput('optionLabel', 'label');
    fixture.componentRef.setInput(
      'compareWith',
      (left: MagarySegmentedValue, right: MagarySegmentedValue) =>
        (left as ({ id?: number } & Record<string, unknown>) | null)?.id ===
        (right as ({ id?: number } & Record<string, unknown>) | null)?.id,
    );
    component.writeValue({ id: 2, label: 'Different ref' });
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      '.segment-option',
    ) as NodeListOf<HTMLButtonElement>;

    expect(buttons[1].getAttribute('aria-checked')).toBe('true');
  });

  it('reflects Angular Forms invalid state after touch and restores help text when valid', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [SegmentedReactiveHostComponent],
    }).compileComponents();

    const hostFixture = TestBed.createComponent(SegmentedReactiveHostComponent);
    hostFixture.detectChanges();

    const hostComponent = hostFixture.componentInstance;
    const group = hostFixture.nativeElement.querySelector(
      '.magary-segmented',
    ) as HTMLElement;
    const buttons = hostFixture.nativeElement.querySelectorAll(
      '.segment-option',
    ) as NodeListOf<HTMLButtonElement>;

    expect(group.getAttribute('aria-describedby')).toContain('-help');
    expect(group.getAttribute('aria-invalid')).toBeNull();

    buttons[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    hostFixture.detectChanges();

    expect(hostComponent.control.touched).toBe(true);
    expect(hostComponent.control.valid).toBe(true);
    expect(group.getAttribute('aria-invalid')).toBeNull();

    hostComponent.control.setValue(null);
    hostComponent.control.markAsTouched();
    hostFixture.detectChanges();

    expect(group.getAttribute('aria-invalid')).toBe('true');
    expect(
      hostFixture.nativeElement.querySelector('.error-message')?.textContent,
    ).toContain('Pick a supported locale');
  });
});
