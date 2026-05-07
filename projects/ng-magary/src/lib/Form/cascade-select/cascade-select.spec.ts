import { Component, importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryCascadeSelect } from './cascade-select';

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
  imports: [ReactiveFormsModule, MagaryCascadeSelect],
  template: `
    <magary-cascade-select
      inputId="region-select"
      ariaDescribedby="external-cascade-help"
      helpText="Choose a region"
      errorMessage="Region is required"
      [options]="options"
      optionLabel="cname"
      optionGroupLabel="name"
      [optionGroupChildren]="['states', 'cities']"
      optionValue="code"
      [formControl]="control"
    />
  `,
})
class CascadeSelectReactiveHost {
  readonly control = new FormControl<string | null>(null, {
    validators: [Validators.required],
    nonNullable: false,
  });

  readonly options = [
    {
      name: 'United States',
      code: 'US',
      states: [
        {
          name: 'Texas',
          cities: [{ cname: 'Austin', code: 'US-AU' }],
        },
      ],
    },
  ];
}

describe('MagaryCascadeSelect behavior', () => {
  let fixture: ComponentFixture<MagaryCascadeSelect>;
  let component: MagaryCascadeSelect;

  const options = [
    {
      name: 'United States',
      code: 'US',
      states: [
        {
          name: 'Texas',
          cities: [
            { cname: 'Austin', code: 'US-AU' },
            { cname: 'Dallas', code: 'US-DA' },
          ],
        },
      ],
    },
    {
      name: 'Canada',
      code: 'CA',
      states: [
        {
          name: 'Ontario',
          cities: [{ cname: 'Toronto', code: 'CA-TO' }],
        },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryCascadeSelect],
      providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryCascadeSelect);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('optionLabel', 'cname');
    fixture.componentRef.setInput('optionGroupLabel', 'name');
    fixture.componentRef.setInput('optionGroupChildren', ['states', 'cities']);
    fixture.componentRef.setInput('optionValue', 'code');
    fixture.detectChanges();
  });

  it('toggles open state from trigger click when enabled', () => {
    const root = fixture.nativeElement.querySelector(
      '.magary-cascade-select',
    ) as HTMLElement;

    expect(component.isOpen()).toBe(false);
    root.click();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(true);

    root.click();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(false);
  });

  it('selects leaf option, updates value and emits CVA change', () => {
    const changedValues: unknown[] = [];
    component.registerOnChange((value: unknown) => changedValues.push(value));
    component.isOpen.set(true);

    const event = { stopPropagation: vi.fn() } as unknown as Event;
    const cityOption = options[0].states[0].cities[0];
    component.selectOption(cityOption, event);
    fixture.detectChanges();

    expect(component.value()).toBe('US-AU');
    expect(changedValues).toEqual(['US-AU']);
    expect(component.isOpen()).toBe(false);
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  });

  it('blocks group selection by default and allows it when optionGroupSelectable is true', () => {
    const changedValues: unknown[] = [];
    component.registerOnChange((value: unknown) => changedValues.push(value));
    const event = { stopPropagation: vi.fn() } as unknown as Event;

    component.selectOption(options[0], event);
    expect(component.value()).toBe(null);
    expect(changedValues).toHaveLength(0);

    fixture.componentRef.setInput('optionGroupSelectable', true);
    fixture.detectChanges();

    component.selectOption(options[0], event);
    expect(component.value()).toBe('US');
    expect(changedValues).toEqual(['US']);
  });

  it('closes on outside click and calls touched callback', () => {
    let touchedCalls = 0;
    component.registerOnTouched(() => {
      touchedCalls += 1;
    });

    component.isOpen.set(true);
    fixture.detectChanges();

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
    expect(touchedCalls).toBe(1);
  });

  it('combines disabled input and ControlValueAccessor disabled state', () => {
    const root = fixture.nativeElement.querySelector(
      '.magary-cascade-select',
    ) as HTMLElement;

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(component.disabled()).toBe(true);

    root.click();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(false);

    fixture.componentRef.setInput('disabled', false);
    component.setDisabledState(true);
    fixture.detectChanges();
    expect(component.disabled()).toBe(true);

    component.setDisabledState(false);
    fixture.detectChanges();
    expect(component.disabled()).toBe(false);
  });

  it('blocks interactions while loading and exposes invalid aria state', () => {
    const root = fixture.nativeElement.querySelector(
      '.magary-cascade-select',
    ) as HTMLElement;

    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    root.click();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(false);

    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('invalid', true);
    fixture.componentRef.setInput('errorMessage', 'Invalid selection');
    fixture.detectChanges();

    expect(root.getAttribute('aria-invalid')).toBe('true');
    expect(
      fixture.nativeElement.querySelector('.error-message')?.textContent,
    ).toContain('Invalid selection');
  });

  it('supports hierarchical keyboard navigation and selection', () => {
    const root = fixture.nativeElement.querySelector(
      '.magary-cascade-select',
    ) as HTMLElement;

    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();

    expect(component.isOpen()).toBe(true);
    expect(root.getAttribute('aria-activedescendant')).toContain('-option-0');

    const panel = fixture.nativeElement.querySelector(
      '.select-panel',
    ) as HTMLElement;

    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    expect(root.getAttribute('aria-activedescendant')).toContain('-option-0-0');

    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    expect(root.getAttribute('aria-activedescendant')).toContain('-option-0-0-0');

    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(component.value()).toBe('US-AU');
    expect(component.isOpen()).toBe(false);
  });

  it('uses compareWith to resolve complex values without shared reference', () => {
    fixture.componentRef.setInput('optionValue', null);
    fixture.componentRef.setInput('compareWith', (option: unknown, value: unknown) => {
      return (
        (option as { code?: string } | null)?.code ===
        (value as { code?: string } | null)?.code
      );
    });
    fixture.detectChanges();

    component.writeValue({ code: 'CA-TO', cname: 'Toronto from API' });
    fixture.detectChanges();

    expect(component.selectedLabel()).toBe('Toronto');

    component.toggle();
    fixture.detectChanges();

    const selectedOption = fixture.nativeElement.querySelector(
      '.select-item.selected',
    ) as HTMLElement | null;
    expect(selectedOption?.textContent).toContain('Toronto');
  });

  it('reflects Angular Forms invalid state and combines describedBy ids', async () => {
    await TestBed.resetTestingModule()
      .configureTestingModule({
        imports: [CascadeSelectReactiveHost],
        providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
      })
      .compileComponents();

    const hostFixture = TestBed.createComponent(CascadeSelectReactiveHost);
    hostFixture.componentInstance.control.markAsTouched();
    hostFixture.detectChanges();

    const root = hostFixture.nativeElement.querySelector(
      '.magary-cascade-select',
    ) as HTMLElement;

    expect(root.id).toBe('region-select');
    expect(root.getAttribute('aria-invalid')).toBe('true');
    expect(root.getAttribute('aria-describedby')).toContain('external-cascade-help');
    expect(root.getAttribute('aria-describedby')).toContain('-error');
    expect(
      hostFixture.nativeElement.querySelector('.error-message')?.textContent,
    ).toContain('Region is required');
  });

  it('provides accessible names to all listbox elements including nested submenus', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    const topLevelListbox = fixture.nativeElement.querySelector(
      '.select-panel > .select-list[role="listbox"]',
    ) as HTMLElement;
    expect(topLevelListbox.getAttribute('aria-label')).toContain('options');

    // Expand the first group to reveal the submenu
    const firstItem = fixture.nativeElement.querySelector('.select-item') as HTMLElement;
    firstItem.click();
    fixture.detectChanges();

    const submenuListbox = fixture.nativeElement.querySelector(
      '.submenu.open > .select-list[role="listbox"]',
    ) as HTMLElement;
    expect(submenuListbox).not.toBeNull();
    expect(submenuListbox.getAttribute('aria-label')).toContain('sub-options');
  });
});
