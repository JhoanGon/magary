import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryDatePicker } from './datepicker';

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

describe('MagaryDatePicker behavior', () => {
  let fixture: ComponentFixture<MagaryDatePicker>;
  let component: MagaryDatePicker;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryDatePicker],
      providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryDatePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('uses type=button for calendar navigation actions', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    const headerButtons = fixture.nativeElement.querySelectorAll(
      '.calendar-header button',
    ) as NodeListOf<HTMLButtonElement>;

    expect(headerButtons.length).toBeGreaterThanOrEqual(3);
    expect(Array.from(headerButtons).every((btn) => btn.type === 'button')).toBe(
      true,
    );
  });

  it('does not open when disabled through ControlValueAccessor', () => {
    component.setDisabledState?.(true);
    fixture.detectChanges();

    component.open();
    fixture.detectChanges();

    expect(component.isDisabled()).toBe(true);
    expect(component.isOpen()).toBe(false);
  });

  it('wires combobox trigger and popup panel aria attributes', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      '.datepicker-input',
    ) as HTMLInputElement;
    const panel = fixture.nativeElement.querySelector(
      '.datepicker-panel',
    ) as HTMLElement;

    expect(input.getAttribute('role')).toBe('combobox');
    expect(input.getAttribute('aria-haspopup')).toBe('dialog');
    expect(input.getAttribute('aria-expanded')).toBe('true');
    expect(input.getAttribute('aria-controls')).toBe(component.panelId);
    expect(panel.id).toBe(component.panelId);
    expect(panel.getAttribute('role')).toBe('dialog');
  });

  it('supports day-grid keyboard navigation and selection with Enter', () => {
    component.open();
    fixture.detectChanges();

    const before = component.activeDate();
    expect(before).toBeTruthy();
    if (!before) {
      return;
    }

    component.onPanelKeydown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();

    const afterMove = component.activeDate();
    expect(afterMove).toBeTruthy();
    if (!afterMove) {
      return;
    }

    const expected = new Date(before);
    expected.setDate(expected.getDate() + 1);

    expect(afterMove.getFullYear()).toBe(expected.getFullYear());
    expect(afterMove.getMonth()).toBe(expected.getMonth());
    expect(afterMove.getDate()).toBe(expected.getDate());

    component.onPanelKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    const selected = component.value();
    expect(selected instanceof Date).toBe(true);
    expect(component.isOpen()).toBe(false);
  });

  it('handles Home and End keys in day view', () => {
    component.writeValue(new Date(2026, 1, 18));
    component.open();
    fixture.detectChanges();

    component.onPanelKeydown(new KeyboardEvent('keydown', { key: 'Home' }));
    fixture.detectChanges();
    const homeDate = component.activeDate();

    component.onPanelKeydown(new KeyboardEvent('keydown', { key: 'End' }));
    fixture.detectChanges();
    const endDate = component.activeDate();

    expect(homeDate?.getDay()).toBe(0);
    expect(endDate?.getDay()).toBe(6);
  });

  it('supports keyboard navigation in month view and selects active month', () => {
    component.writeValue(new Date(2026, 1, 18));
    component.open();
    component.switchView();
    fixture.detectChanges();

    expect(component.currentView()).toBe('month');
    expect(component.activeMonthIndex()).toBe(1);

    component.onPanelKeydown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    expect(component.activeMonthIndex()).toBe(2);

    component.onPanelKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(component.currentView()).toBe('day');
    expect(component.viewDate().getMonth()).toBe(2);
  });

  it('supports keyboard navigation in year view and selects active year', () => {
    component.writeValue(new Date(2026, 1, 18));
    component.open();
    component.switchView();
    component.switchView();
    fixture.detectChanges();

    expect(component.currentView()).toBe('year');
    const initialYear = component.activeYearValue();
    expect(initialYear).toBe(2026);

    component.onPanelKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();
    expect(component.activeYearValue()).toBe(2029);

    component.onPanelKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(component.currentView()).toBe('month');
    expect(component.viewDate().getFullYear()).toBe(2029);
  });
});

