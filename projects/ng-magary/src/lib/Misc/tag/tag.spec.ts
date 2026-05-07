import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryTag } from './tag';

const kebabCase = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .toLowerCase();

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, (typeof icons)[keyof typeof icons]>,
);

describe('MagaryTag', () => {
  let fixture: ComponentFixture<MagaryTag>;
  let component: MagaryTag;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryTag],
      providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders value and icon when provided', () => {
    fixture.componentRef.setInput('value', 'Active');
    fixture.componentRef.setInput('icon', 'check');
    fixture.detectChanges();

    const value = fixture.nativeElement.querySelector(
      '.magary-tag-value',
    ) as HTMLElement | null;
    const icon = fixture.nativeElement.querySelector(
      'lucide-icon.magary-tag-icon',
    ) as HTMLElement | null;

    expect(value?.textContent).toContain('Active');
    expect(icon).toBeTruthy();
  });

  it('applies severity and rounded host classes', () => {
    fixture.componentRef.setInput('severity', 'success');
    fixture.componentRef.setInput('rounded', true);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;

    expect(host.classList.contains('magary-tag-success')).toBe(true);
    expect(host.classList.contains('magary-tag-rounded')).toBe(true);
  });

  it('applies info severity by default', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.classList.contains('magary-tag-info')).toBe(true);
  });

  it('applies all severity classes correctly', () => {
    const severities = ['success', 'info', 'warning', 'danger', 'secondary', 'contrast'] as const;
    for (const severity of severities) {
      fixture.componentRef.setInput('severity', severity);
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.classList.contains(`magary-tag-${severity}`)).toBe(true);
    }
  });

  it('does not render icon element when icon is not provided', () => {
    fixture.componentRef.setInput('value', 'No Icon');
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('lucide-icon.magary-tag-icon');
    expect(icon).toBeFalsy();
  });

  it('does not render value element when value is not provided', () => {
    fixture.componentRef.setInput('icon', 'check');
    fixture.detectChanges();

    const value = fixture.nativeElement.querySelector('.magary-tag-value');
    expect(value).toBeFalsy();
  });

});
