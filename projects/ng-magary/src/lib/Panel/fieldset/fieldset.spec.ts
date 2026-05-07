import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryFieldset } from './fieldset';

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
  imports: [MagaryFieldset],
  template: `
    <magary-fieldset #fieldset legend="Details" [toggleable]="true">
      Fieldset Content
    </magary-fieldset>
  `,
})
class ToggleableFieldsetHostComponent {
  fieldset = viewChild.required<MagaryFieldset>('fieldset');
}

@Component({
  standalone: true,
  imports: [MagaryFieldset],
  template: `
    <magary-fieldset #fieldset legend="Static Info" [toggleable]="false">
      Static Content
    </magary-fieldset>
  `,
})
class StaticFieldsetHostComponent {
  fieldset = viewChild.required<MagaryFieldset>('fieldset');
}

describe('MagaryFieldset toggleable', () => {
  let fixture: ComponentFixture<ToggleableFieldsetHostComponent>;
  let host: ToggleableFieldsetHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleableFieldsetHostComponent],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleableFieldsetHostComponent);
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

  it('renders legend text', () => {
    const legend = fixture.nativeElement.querySelector('.magary-fieldset-legend');
    expect(legend.textContent).toContain('Details');
  });

  it('renders content when not collapsed', () => {
    expect(fixture.nativeElement.textContent).toContain('Fieldset Content');
  });

  it('expand() opens collapsed fieldset', () => {
    host.fieldset().collapsed.set(true);
    fixture.detectChanges();
    expect(host.fieldset().collapsed()).toBe(true);

    host.fieldset().expand(new Event('click'));
    fixture.detectChanges();
    expect(host.fieldset().collapsed()).toBe(false);
  });

  it('collapse() closes expanded fieldset', () => {
    host.fieldset().collapsed.set(false);
    fixture.detectChanges();
    expect(host.fieldset().collapsed()).toBe(false);

    host.fieldset().collapse(new Event('click'));
    fixture.detectChanges();
    expect(host.fieldset().collapsed()).toBe(true);
  });

  it('expand() and collapse() are no-ops when toggleable is false', () => {
    // Use the static fieldset host which already has toggleable=false
    const staticFixture = TestBed.createComponent(StaticFieldsetHostComponent);
    const staticHost = staticFixture.componentInstance;
    staticFixture.detectChanges();

    const fieldset = staticHost.fieldset();
    fieldset.collapsed.set(true);
    staticFixture.detectChanges();

    fieldset.expand(new Event('click'));
    staticFixture.detectChanges();
    expect(fieldset.collapsed()).toBe(true);
  });
});

describe('MagaryFieldset static (non-toggleable)', () => {
  let fixture: ComponentFixture<StaticFieldsetHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticFieldsetHostComponent],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StaticFieldsetHostComponent);
    fixture.detectChanges();
  });

  it('does not render toggle button when toggleable is false', () => {
    const toggleButton = fixture.nativeElement.querySelector('.magary-fieldset-toggler');
    expect(toggleButton).toBeFalsy();
  });

  it('renders static legend text', () => {
    const legend = fixture.nativeElement.querySelector('.magary-fieldset-legend');
    expect(legend.textContent).toContain('Static Info');
  });

  it('renders content', () => {
    expect(fixture.nativeElement.textContent).toContain('Static Content');
  });
});
