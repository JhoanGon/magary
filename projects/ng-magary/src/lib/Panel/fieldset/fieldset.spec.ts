import { Component, importProvidersFrom, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryFieldset } from './fieldset';

@Component({
  standalone: true,
  imports: [MagaryFieldset],
  template: `
    <magary-fieldset #fieldset legend="Details" [toggleable]="true">
      Fieldset Content
    </magary-fieldset>
  `,
})
class FieldsetHostComponent {
  fieldset = viewChild.required<MagaryFieldset>('fieldset');
}

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

describe('MagaryFieldset behavior', () => {
  let fixture: ComponentFixture<FieldsetHostComponent>;
  let host: FieldsetHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldsetHostComponent],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldsetHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('links legend and content region with valid accessibility ids', () => {
    const legend = fixture.nativeElement.querySelector(
      '.magary-fieldset-legend',
    ) as HTMLElement;
    const toggleButton = fixture.nativeElement.querySelector(
      '.magary-fieldset-toggler',
    ) as HTMLButtonElement;
    const contentWrapper = fixture.nativeElement.querySelector(
      '.magary-fieldset-content-wrapper',
    ) as HTMLElement;

    expect(toggleButton.type).toBe('button');
    expect(legend.id).toContain('magary-fieldset-legend-');
    expect(contentWrapper.id).toContain('magary-fieldset-content-');
    expect(toggleButton.getAttribute('aria-controls')).toBe(contentWrapper.id);
    expect(contentWrapper.getAttribute('aria-labelledby')).toBe(legend.id);
  });

  it('toggles collapsed state and emits before/after events', () => {
    const beforeEvents: Array<{ collapsed: boolean }> = [];
    const afterEvents: Array<{ collapsed: boolean }> = [];
    host.fieldset().onBeforeToggle.subscribe((event) => beforeEvents.push(event));
    host.fieldset().onAfterToggle.subscribe((event) => afterEvents.push(event));

    const toggleButton = fixture.nativeElement.querySelector(
      '.magary-fieldset-toggler',
    ) as HTMLButtonElement;

    expect(host.fieldset().collapsed()).toBe(false);
    toggleButton.click();
    fixture.detectChanges();

    expect(host.fieldset().collapsed()).toBe(true);
    expect(beforeEvents).toHaveLength(1);
    expect(afterEvents).toHaveLength(1);
    expect(beforeEvents[0].collapsed).toBe(true);
    expect(afterEvents[0].collapsed).toBe(true);

    toggleButton.click();
    fixture.detectChanges();

    expect(host.fieldset().collapsed()).toBe(false);
    expect(beforeEvents).toHaveLength(2);
    expect(afterEvents).toHaveLength(2);
    expect(beforeEvents[1].collapsed).toBe(false);
    expect(afterEvents[1].collapsed).toBe(false);
  });
});

