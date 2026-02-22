import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagarySelect } from './select';

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
});

