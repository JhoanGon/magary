import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryButton } from './button';

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

describe('MagaryButton behavior', () => {
  let fixture: ComponentFixture<MagaryButton>;
  let component: MagaryButton;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryButton],
      providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('emits onClick and buttonClick when clicked in enabled state', () => {
    fixture.componentRef.setInput('label', 'Save');
    fixture.detectChanges();

    const onClickEvents: Event[] = [];
    const buttonClickEvents: Event[] = [];
    component.onClick.subscribe((event) => onClickEvents.push(event));
    component.buttonClick.subscribe((event) => buttonClickEvents.push(event));

    const button = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(onClickEvents).toHaveLength(1);
    expect(buttonClickEvents).toHaveLength(1);
    expect(buttonClickEvents[0]).toBe(onClickEvents[0]);
  });

  it('blocks clicks when disabled or loading', () => {
    const onClickEvents: Event[] = [];
    const buttonClickEvents: Event[] = [];
    component.onClick.subscribe((event) => onClickEvents.push(event));
    component.buttonClick.subscribe((event) => buttonClickEvents.push(event));

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    button.click();
    fixture.detectChanges();
    expect(onClickEvents).toHaveLength(0);
    expect(buttonClickEvents).toHaveLength(0);

    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    button.click();
    fixture.detectChanges();
    expect(onClickEvents).toHaveLength(0);
    expect(buttonClickEvents).toHaveLength(0);
  });

  it('applies classes/styles and resolves aria-label fallback', () => {
    fixture.componentRef.setInput('label', 'Action');
    fixture.componentRef.setInput('icon', 'house');
    fixture.componentRef.setInput('iconPos', 'right');
    fixture.componentRef.setInput('severity', 'secondary');
    fixture.componentRef.setInput('variant', 'outlined');
    fixture.componentRef.setInput('size', 'large');
    fixture.componentRef.setInput('rounded', true);
    fixture.componentRef.setInput('shadow', 6);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;

    expect(button.classList.contains('p-button')).toBe(true);
    expect(button.classList.contains('p-button-icon-right')).toBe(true);
    expect(button.classList.contains('p-button-secondary')).toBe(true);
    expect(button.classList.contains('p-button-outlined')).toBe(true);
    expect(button.classList.contains('p-button-large')).toBe(true);
    expect(button.classList.contains('shadow-6')).toBe(true);
    expect(button.style.borderRadius).toBe('22px');
    expect(button.getAttribute('aria-label')).toBe('Action');

    fixture.componentRef.setInput('ariaLabel', 'Custom label');
    fixture.detectChanges();
    expect(button.getAttribute('aria-label')).toBe('Custom label');

    fixture.componentRef.setInput('label', undefined);
    fixture.componentRef.setInput('ariaLabel', undefined);
    fixture.detectChanges();
    expect(button.getAttribute('aria-label')).toBe('house button');

    fixture.componentRef.setInput('icon', undefined);
    fixture.detectChanges();
    expect(button.getAttribute('aria-label')).toBe('Button');
  });

  it('supports text variant, icon-only mode and left icon position', () => {
    fixture.componentRef.setInput('icon', 'arrow-left');
    fixture.componentRef.setInput('variant', 'text');
    fixture.componentRef.setInput('size', 'small');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;

    expect(button.classList.contains('p-button-text')).toBe(true);
    expect(button.classList.contains('p-button-small')).toBe(true);
    expect(button.classList.contains('p-button-icon-only')).toBe(true);

    fixture.componentRef.setInput('label', 'Back');
    fixture.detectChanges();
    expect(button.classList.contains('p-button-icon-only')).toBe(false);
    expect(button.classList.contains('p-button-icon-left')).toBe(true);
    expect(button.classList.contains('p-button-icon-right')).toBe(false);
  });

  it('uses rounded default radius and custom background style', () => {
    fixture.componentRef.setInput('customBackgroundColor', '#123456');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;

    expect(button.style.borderRadius).toBe('8px');
    expect(button.style.background).toBe('rgb(18, 52, 86)');
  });

  it('trims aria inputs and falls back to icon-derived label', () => {
    fixture.componentRef.setInput('ariaLabel', '   ');
    fixture.componentRef.setInput('label', '   ');
    fixture.componentRef.setInput('icon', 'user_check');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;

    expect(button.getAttribute('aria-label')).toBe('user check button');

    fixture.componentRef.setInput('icon', undefined);
    fixture.detectChanges();
    expect(button.getAttribute('aria-label')).toBe('Button');
  });
});

