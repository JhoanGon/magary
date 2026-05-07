import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryAccordion } from './accordion';
import { MagaryAccordionTab } from './accordion-tab';

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

@Component({
  standalone: true,
  imports: [MagaryAccordion, MagaryAccordionTab],
  template: `
    <magary-accordion #accordion>
      <magary-accordion-tab header="Tab 1">Content 1</magary-accordion-tab>
      <magary-accordion-tab header="Tab 2">Content 2</magary-accordion-tab>
      <magary-accordion-tab header="Tab 3">Content 3</magary-accordion-tab>
    </magary-accordion>
  `,
})
class AccordionHostComponent {
  accordion = viewChild.required<MagaryAccordion>('accordion');
}

@Component({
  standalone: true,
  imports: [MagaryAccordion, MagaryAccordionTab],
  template: `
    <magary-accordion #accordion [multiple]="true">
      <magary-accordion-tab header="Multi 1">Content 1</magary-accordion-tab>
      <magary-accordion-tab header="Multi 2">Content 2</magary-accordion-tab>
    </magary-accordion>
  `,
})
class AccordionMultipleHostComponent {
  accordion = viewChild.required<MagaryAccordion>('accordion');
}

@Component({
  standalone: true,
  imports: [MagaryAccordion, MagaryAccordionTab],
  template: `
    <magary-accordion #accordion>
      <magary-accordion-tab header="Enabled" >Enabled Content</magary-accordion-tab>
      <magary-accordion-tab header="Disabled" [disabled]="true">Disabled Content</magary-accordion-tab>
    </magary-accordion>
  `,
})
class AccordionDisabledHostComponent {
  accordion = viewChild.required<MagaryAccordion>('accordion');
}

describe('MagaryAccordion behavior', () => {
  let fixture: ComponentFixture<AccordionHostComponent>;
  let host: AccordionHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionHostComponent],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getHeaders(): HTMLButtonElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.magary-accordion-header-link'),
    ) as HTMLButtonElement[];
  }

  function getContentWrappers(): HTMLElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll(
        '.magary-accordion-content-wrapper',
      ),
    ) as HTMLElement[];
  }

  it('renders all tab headers', () => {
    const headers = getHeaders();
    expect(headers).toHaveLength(3);
    expect(headers[0].textContent).toContain('Tab 1');
    expect(headers[1].textContent).toContain('Tab 2');
    expect(headers[2].textContent).toContain('Tab 3');
  });

  it('starts with all tabs collapsed', () => {
    const headers = getHeaders();
    headers.forEach((header) => {
      expect(header.getAttribute('aria-expanded')).toBe('false');
    });
  });

  it('expands a tab on header click', () => {
    const headers = getHeaders();
    headers[0].click();
    fixture.detectChanges();

    expect(headers[0].getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.textContent).toContain('Content 1');
  });

  it('collapses a tab on second click', () => {
    const headers = getHeaders();
    headers[0].click();
    fixture.detectChanges();
    expect(headers[0].getAttribute('aria-expanded')).toBe('true');

    headers[0].click();
    fixture.detectChanges();
    expect(headers[0].getAttribute('aria-expanded')).toBe('false');
  });

  it('in single mode, opening one tab closes others', () => {
    const headers = getHeaders();
    headers[0].click();
    fixture.detectChanges();
    expect(headers[0].getAttribute('aria-expanded')).toBe('true');

    headers[1].click();
    fixture.detectChanges();
    expect(headers[0].getAttribute('aria-expanded')).toBe('false');
    expect(headers[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('emits onOpen when a tab is expanded', () => {
    const component = host.accordion();
    const openSpy = vi.fn();
    component.onOpen.subscribe(openSpy);

    getHeaders()[0].click();
    fixture.detectChanges();

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith(
      expect.objectContaining({ index: 0 }),
    );
  });

  it('emits onClose when a tab is collapsed', () => {
    const component = host.accordion();
    const closeSpy = vi.fn();
    component.onClose.subscribe(closeSpy);

    const headers = getHeaders();
    headers[0].click();
    fixture.detectChanges();
    expect(closeSpy).not.toHaveBeenCalled();

    headers[0].click();
    fixture.detectChanges();
    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(closeSpy).toHaveBeenCalledWith(
      expect.objectContaining({ index: 0 }),
    );
  });

  it('findTabIndex returns correct index', () => {
    const component = host.accordion();
    const tabs = component.tabs();
    expect(component.findTabIndex(tabs[0])).toBe(0);
    expect(component.findTabIndex(tabs[1])).toBe(1);
    expect(component.findTabIndex(tabs[2])).toBe(2);
  });

  it('sets aria-controls linking header to content panel', () => {
    const headers = getHeaders();
    const contentWrappers = getContentWrappers();

    expect(headers[0].getAttribute('aria-controls')).toBe(
      contentWrappers[0].getAttribute('id'),
    );
    expect(contentWrappers[0].getAttribute('role')).toBe('region');
    expect(contentWrappers[0].getAttribute('aria-labelledby')).toBe(
      headers[0].getAttribute('id'),
    );
  });
});

describe('MagaryAccordion multiple mode', () => {
  let fixture: ComponentFixture<AccordionMultipleHostComponent>;
  let host: AccordionMultipleHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionMultipleHostComponent],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionMultipleHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('allows multiple tabs to stay open simultaneously', () => {
    const headers = Array.from(
      fixture.nativeElement.querySelectorAll('.magary-accordion-header-link'),
    ) as HTMLButtonElement[];

    headers[0].click();
    fixture.detectChanges();
    headers[1].click();
    fixture.detectChanges();

    expect(headers[0].getAttribute('aria-expanded')).toBe('true');
    expect(headers[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('closing one tab does not affect other open tabs', () => {
    const headers = Array.from(
      fixture.nativeElement.querySelectorAll('.magary-accordion-header-link'),
    ) as HTMLButtonElement[];

    headers[0].click();
    headers[1].click();
    fixture.detectChanges();

    headers[0].click();
    fixture.detectChanges();

    expect(headers[0].getAttribute('aria-expanded')).toBe('false');
    expect(headers[1].getAttribute('aria-expanded')).toBe('true');
  });
});

describe('MagaryAccordion disabled tab', () => {
  let fixture: ComponentFixture<AccordionDisabledHostComponent>;
  let host: AccordionDisabledHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionDisabledHostComponent],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionDisabledHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('does not expand a disabled tab', () => {
    const headers = Array.from(
      fixture.nativeElement.querySelectorAll('.magary-accordion-header-link'),
    ) as HTMLButtonElement[];

    headers[1].click();
    fixture.detectChanges();

    expect(headers[1].getAttribute('aria-expanded')).toBe('false');
  });

  it('disabled tab has tabindex -1', () => {
    const headers = Array.from(
      fixture.nativeElement.querySelectorAll('.magary-accordion-header-link'),
    ) as HTMLButtonElement[];

    expect(headers[1].getAttribute('tabindex')).toBe('-1');
  });

  it('disabled tab renders the disabled CSS class', () => {
    const items = fixture.nativeElement.querySelectorAll('.magary-accordion-item');
    expect(items[1].classList.contains('magary-accordion-item-disabled')).toBe(true);
  });
});
