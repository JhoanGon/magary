import { Component, importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryInput } from './input';

const kebabCase = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, (typeof icons)[keyof typeof icons]>,
);

@Component({
  standalone: true,
  imports: [MagaryInput, ReactiveFormsModule],
  template: `
    <magary-input
      [formControl]="control"
      label="Email"
      errorMessage="Email is required"
      helpText="We will never share it"
    ></magary-input>
  `,
})
class InputReactiveHostComponent {
  readonly control = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
}

describe('MagaryInput behavior', () => {
  let fixture: ComponentFixture<MagaryInput>;
  let component: MagaryInput;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryInput],
      providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('writes incoming values and propagates user changes through ControlValueAccessor', () => {
    const onChange = vi.fn<(value: string) => void>();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    component.registerOnChange(onChange);
    component.writeValue(65);
    fixture.detectChanges();

    expect(input.value).toBe('65');

    input.value = 'Jhoan';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith('Jhoan');
  });

  it('marks the control as touched on blur and emits focus/blur events', () => {
    const focusEvents: FocusEvent[] = [];
    const blurEvents: FocusEvent[] = [];
    const onTouched = vi.fn();

    component.inputFocus.subscribe((event) => focusEvents.push(event));
    component.inputBlur.subscribe((event) => blurEvents.push(event));
    component.registerOnTouched(onTouched);

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    input.dispatchEvent(new FocusEvent('focus'));
    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(focusEvents).toHaveLength(1);
    expect(blurEvents).toHaveLength(1);
    expect(onTouched).toHaveBeenCalledTimes(1);
  });

  it('does not invent internal validation errors for required or email rules', () => {
    fixture.componentRef.setInput('required', true);
    fixture.componentRef.setInput('type', 'email');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    input.value = 'invalid-email';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.error-message')).toBeNull();
    expect(input.getAttribute('aria-invalid')).toBeNull();
  });

  it('reflects Angular Forms invalid state after touch and restores help text when valid', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [InputReactiveHostComponent],
      providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
    }).compileComponents();

    const hostFixture = TestBed.createComponent(InputReactiveHostComponent);
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
    ).toContain('Email is required');

    input.value = 'hello@magary.dev';
    input.dispatchEvent(new Event('input'));
    hostFixture.detectChanges();

    expect(hostComponent.control.valid).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBeNull();
    expect(hostFixture.nativeElement.querySelector('.error-message')).toBeNull();
    expect(
      hostFixture.nativeElement.querySelector('.help-message')?.textContent,
    ).toContain('We will never share it');
  });

  it('toggles password visibility and blocks toggle when readonly', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;
    const toggle = fixture.nativeElement.querySelector(
      '.password-toggle',
    ) as HTMLButtonElement;

    expect(input.type).toBe('password');
    expect(toggle.disabled).toBe(false);

    toggle.click();
    fixture.detectChanges();
    expect(input.type).toBe('text');

    toggle.click();
    fixture.detectChanges();
    expect(input.type).toBe('password');

    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    expect(toggle.disabled).toBe(true);
    toggle.click();
    fixture.detectChanges();
    expect(input.type).toBe('password');
  });

  it('emits prefix/suffix icon clicks and blocks them when disabled', () => {
    fixture.componentRef.setInput('prefixIcon', 'user');
    fixture.componentRef.setInput('suffixIcon', 'search');
    fixture.detectChanges();

    const iconEvents: Array<'prefix' | 'suffix'> = [];
    component.iconClick.subscribe((event) => iconEvents.push(event));

    const prefix = fixture.nativeElement.querySelector(
      '.prefix-icon-button',
    ) as HTMLButtonElement;
    const suffix = fixture.nativeElement.querySelector(
      '.suffix-icon-button',
    ) as HTMLButtonElement;

    prefix.click();
    suffix.click();
    fixture.detectChanges();

    expect(iconEvents).toEqual(['prefix', 'suffix']);

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(prefix.disabled).toBe(true);
    expect(suffix.disabled).toBe(true);

    prefix.click();
    suffix.click();
    fixture.detectChanges();

    expect(iconEvents).toEqual(['prefix', 'suffix']);
  });

  it('sets aria attributes and message ids for explicit help and error states', () => {
    fixture.componentRef.setInput('helpText', 'Only letters allowed');
    fixture.componentRef.setInput('errorMessage', 'External error');
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const helpMessage = fixture.nativeElement.querySelector(
      '.help-message',
    ) as HTMLElement;
    const errorMessage = fixture.nativeElement.querySelector(
      '.error-message',
    ) as HTMLElement;

    expect(helpMessage).toBeNull();
    expect(errorMessage.getAttribute('id')).toBe(component.errorMessageId);
    expect(errorMessage.getAttribute('role')).toBe('alert');
    expect(input.getAttribute('aria-describedby')).toBe(component.errorMessageId);
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('normalizes maxlength and inputmode attributes', () => {
    const input = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;

    expect(input.getAttribute('maxlength')).toBeNull();
    expect(input.getAttribute('inputmode')).toBe('text');

    fixture.componentRef.setInput('maxLength', 12.9);
    fixture.componentRef.setInput('type', 'number');
    fixture.detectChanges();

    expect(input.getAttribute('maxlength')).toBe('12');
    expect(input.getAttribute('inputmode')).toBe('decimal');

    fixture.componentRef.setInput('maxLength', 0);
    fixture.componentRef.setInput('type', 'email');
    fixture.detectChanges();

    expect(input.getAttribute('maxlength')).toBeNull();
    expect(input.getAttribute('inputmode')).toBe('email');
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

  it('supports numeric incoming values on blur without runtime errors', () => {
    fixture.componentRef.setInput('type', 'number');
    component.writeValue(65);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(() => {
      input.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();
    }).not.toThrow();

    expect(input.value).toBe('65');
  });
});

