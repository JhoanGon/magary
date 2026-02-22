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
    const focusEvents: Event[] = [];
    const blurEvents: Event[] = [];

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
    expect(component.effectiveError().toLowerCase()).toContain('email');

    input.value = 'valid@email.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.effectiveError()).toBe('');
  });

  it('toggles password visibility when password icon is clicked', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;
    const toggle = fixture.nativeElement.querySelector(
      '.password-toggle',
    ) as HTMLElement;

    expect(input.type).toBe('password');

    toggle.click();
    fixture.detectChanges();
    expect(input.type).toBe('text');

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
      '.prefix-icon',
    ) as HTMLElement;
    const suffix = fixture.nativeElement.querySelector(
      '.suffix-icon',
    ) as HTMLElement;

    prefix.click();
    suffix.click();
    fixture.detectChanges();

    expect(iconEvents).toEqual(['prefix', 'suffix']);

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    prefix.click();
    suffix.click();
    fixture.detectChanges();

    expect(iconEvents).toEqual(['prefix', 'suffix']);
  });
});

