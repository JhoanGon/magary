import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('updates value and emits focus/blur events from the native input', () => {
    const focusEvents: FocusEvent[] = [];
    const blurEvents: FocusEvent[] = [];

    component.inputFocus.subscribe((event) => focusEvents.push(event));
    component.inputBlur.subscribe((event) => blurEvents.push(event));

    const input = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;

    input.dispatchEvent(new FocusEvent('focus'));
    input.value = 'Jhoan';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(component.value()).toBe('Jhoan');
    expect(focusEvents).toHaveLength(1);
    expect(blurEvents).toHaveLength(1);
  });

  it('shows required validation error and clears it after input', () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;

    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(component.effectiveError().toLowerCase()).toContain('obligatorio');

    input.value = 'valid value';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.effectiveError()).toBe('');
  });

  it('shows internal email validation error and clears it on new input', () => {
    fixture.componentRef.setInput('type', 'email');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;

    input.value = 'invalid-email';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(component.effectiveError().length).toBeGreaterThan(0);
    expect(component.effectiveError()).toBe('Correo electrónico inválido');

    input.value = 'valid@email.com';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(component.effectiveError()).toBe('');
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

  it('sets aria attributes and message ids for help and error states', () => {
    fixture.componentRef.setInput('helpText', 'Only letters allowed');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;
    const helpMessage = fixture.nativeElement.querySelector(
      '.help-message',
    ) as HTMLElement;

    expect(helpMessage.getAttribute('id')).toBe(component.helpMessageId);
    expect(input.getAttribute('aria-describedby')).toBe(component.helpMessageId);
    expect(input.getAttribute('aria-invalid')).toBeNull();
    expect(input.getAttribute('aria-required')).toBe('true');

    fixture.componentRef.setInput('error', 'External error');
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector(
      '.error-message',
    ) as HTMLElement;
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

  it('supports numeric model values on blur without throwing trim errors', () => {
    fixture.componentRef.setInput('type', 'number');
    fixture.componentRef.setInput('required', true);
    (
      component.value as unknown as {
        set: (value: unknown) => void;
      }
    ).set(65);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;

    expect(() => {
      input.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();
    }).not.toThrow();

    expect(component.effectiveError()).toBe('');
  });
});

