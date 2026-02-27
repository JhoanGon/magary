import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagarySelect, MagarySelectValue } from './select';

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

describe('MagarySelect behavior', () => {
  let fixture: ComponentFixture<MagarySelect>;
  let component: MagarySelect;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagarySelect],
      providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
    }).compileComponents();

    fixture = TestBed.createComponent(MagarySelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders selected label for falsy values like 0', () => {
    fixture.componentRef.setInput('options', [
      { label: 'Zero', value: 0 },
      { label: 'One', value: 1 },
    ]);
    fixture.componentRef.setInput('optionLabel', 'label');
    fixture.componentRef.setInput('optionValue', 'value');
    component.writeValue(0);
    fixture.detectChanges();

    const selected = fixture.nativeElement.querySelector(
      '.selected-value span',
    ) as HTMLElement;

    expect(selected.textContent?.trim()).toBe('Zero');
    expect(component.selectedLabel()).toBe('Zero');
  });

  it('does not open when disabled through ControlValueAccessor', () => {
    component.setDisabledState?.(true);
    fixture.detectChanges();

    component.toggleOverlay();
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector(
      '.magary-select-container',
    ) as HTMLElement;

    expect(component.isDisabled()).toBe(true);
    expect(component.isOpen()).toBe(false);
    expect(root.classList.contains('disabled')).toBe(true);
  });

  it('exposes an accessible name on combobox trigger', () => {
    fixture.componentRef.setInput('placeholder', 'Select a city');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector(
      '.magary-select-container',
    ) as HTMLElement;
    expect(root.getAttribute('aria-label')).toBe('Select a city');

    fixture.componentRef.setInput('ariaLabel', 'City selector');
    fixture.detectChanges();
    expect(root.getAttribute('aria-label')).toBe('City selector');
  });

  it('supports keyboard open and selection with Enter', () => {
    fixture.componentRef.setInput('options', ['New York', 'London', 'Tokyo']);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector(
      '.magary-select-container',
    ) as HTMLElement;

    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();
    expect(component.isOpen()).toBe(true);
    expect(component.activeIndex()).toBe(0);

    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(component.value()).toBe('New York');
    expect(component.selectedLabel()).toBe('New York');
    expect(component.isOpen()).toBe(false);
  });

  it('supports Home/End shortcuts from closed state', () => {
    fixture.componentRef.setInput('options', ['Alpha', 'Beta', 'Gamma']);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector(
      '.magary-select-container',
    ) as HTMLElement;

    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    fixture.detectChanges();

    expect(component.isOpen()).toBe(true);
    expect(component.activeIndex()).toBe(2);

    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(component.value()).toBe('Gamma');
    expect(component.isOpen()).toBe(false);
  });

  it('updates aria-activedescendant while navigating options', () => {
    fixture.componentRef.setInput('options', ['One', 'Two', 'Three']);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector(
      '.magary-select-container',
    ) as HTMLElement;

    root.click();
    fixture.detectChanges();

    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();
    expect(root.getAttribute('aria-activedescendant')).toContain(
      '-option-1',
    );

    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();
    expect(root.getAttribute('aria-activedescendant')).toContain(
      '-option-2',
    );
  });

  it('filters visible options and shows empty state when no matches', () => {
    fixture.componentRef.setInput('filter', true);
    fixture.componentRef.setInput('options', ['Alpha', 'Beta']);
    fixture.detectChanges();

    component.open();
    fixture.detectChanges();

    const filterInput = document.querySelector(
      '.cdk-overlay-container .filter-input',
    ) as HTMLInputElement | null;
    expect(filterInput).toBeTruthy();
    if (!filterInput) {
      return;
    }

    filterInput.value = 'zzz';
    filterInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const emptyMessage = document.querySelector(
      '.cdk-overlay-container .empty-message',
    ) as HTMLElement | null;

    expect(component.visibleOptions().length).toBe(0);
    expect(emptyMessage?.textContent?.trim()).toBe('No results found');
    component.close();
  });

  it('clears selected value and emits null through ControlValueAccessor', () => {
    fixture.componentRef.setInput('showClear', true);
    fixture.componentRef.setInput('options', [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ]);
    fixture.componentRef.setInput('optionLabel', 'name');
    fixture.componentRef.setInput('optionValue', 'id');
    fixture.detectChanges();

    const emitted: MagarySelectValue[] = [];
    component.registerOnChange((value) => emitted.push(value));
    component.writeValue('1');
    fixture.detectChanges();

    const clearButton = fixture.nativeElement.querySelector(
      '.clear-button',
    ) as HTMLButtonElement;
    clearButton.click();
    fixture.detectChanges();

    expect(component.value()).toBeNull();
    expect(emitted).toEqual([null]);
  });

  it('sets aria-invalid and renders error/help messages with priority to error', () => {
    fixture.componentRef.setInput('helpText', 'Pick one item');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector(
      '.magary-select-container',
    ) as HTMLElement;
    expect(root.getAttribute('aria-invalid')).toBeNull();
    expect(
      fixture.nativeElement.querySelector('.help-message')?.textContent?.trim(),
    ).toBe('Pick one item');

    fixture.componentRef.setInput('invalid', true);
    fixture.componentRef.setInput('error', 'Invalid option');
    fixture.detectChanges();

    expect(root.getAttribute('aria-invalid')).toBe('true');
    expect(
      fixture.nativeElement.querySelector('.error-message')?.textContent,
    ).toContain('Invalid option');
  });
});

