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
  {} as Record<string, any>,
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
});
