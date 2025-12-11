import {
  Component,
  ElementRef,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  output,
  signal,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'magary-datepicker',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './datepicker.html',
  styleUrl: './datepicker.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MagaryDatePicker),
      multi: true,
    },
  ],
})
export class MagaryDatePicker
  implements ControlValueAccessor, OnInit, OnDestroy
{
  readonly placeholder = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly minDate = input<Date>();
  readonly maxDate = input<Date>();
  readonly selectionMode = input<'single' | 'range'>('single');

  readonly onSelect = output<any>(); // Date | Date[]

  // Use simple short names for week days
  readonly weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  readonly monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // State
  readonly value = signal<any>(null); // Date | Date[] | null
  readonly isOpen = signal(false);
  readonly viewDate = signal(new Date()); // Current month being viewed
  readonly currentView = signal<'day' | 'month' | 'year'>('day');

  // Input Handling
  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    if (!val) {
      this.value.set(null);
      this.onChange(null);
      return;
    }
  }

  // Computed
  readonly formattedValue = computed(() => {
    const val = this.value();
    if (!val) return '';

    const pipe = new DatePipe('en-US');
    if (Array.isArray(val)) {
      const start = pipe.transform(val[0], 'dd/MM/yyyy');
      const end = val[1] ? pipe.transform(val[1], 'dd/MM/yyyy') : '';
      return end ? `${start} - ${end}` : `${start}`;
    }
    return pipe.transform(val, 'dd/MM/yyyy');
  });

  readonly currentMonthName = computed(
    () => this.monthNames[this.viewDate().getMonth()],
  );
  readonly currentYear = computed(() => this.viewDate().getFullYear());

  readonly calendarDays = computed(() => {
    const year = this.viewDate().getFullYear();
    const month = this.viewDate().getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: (Date | null)[] = [];
    const startPadding = firstDay.getDay(); // 0 (Sun) - 6 (Sat)

    // Padding for empty start
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }

    // Days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  });

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private documentClickListener: ((event: Event) => void) | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.documentClickListener = (event: Event) => {
      if (
        this.isOpen() &&
        !this.elementRef.nativeElement.contains(event.target)
      ) {
        this.close();
      }
    };
    document.addEventListener('click', this.documentClickListener);
  }

  ngOnDestroy() {
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener);
    }
  }

  // Interaction
  toggle() {
    if (this.disabled()) return;
    this.isOpen.update((v) => !v);

    if (!this.isOpen()) return;

    // Sync view
    let d: Date | null = null;
    const v = this.value();
    if (Array.isArray(v) && v[0]) d = v[0];
    else if (v instanceof Date) d = v;

    this.viewDate.set(d ? new Date(d) : new Date());
  }

  open() {
    if (!this.disabled() && !this.isOpen()) {
      this.toggle(); // Reusing toggle logic for sync
    }
  }

  close() {
    this.isOpen.set(false);
    this.onTouched();
  }

  onContainerClick(event: Event) {}

  // Navigation
  prev() {
    if (this.currentView() === 'day') {
      const d = new Date(this.viewDate());
      d.setMonth(d.getMonth() - 1);
      this.viewDate.set(d);
    } else if (this.currentView() === 'month') {
      const d = new Date(this.viewDate());
      d.setFullYear(d.getFullYear() - 1);
      this.viewDate.set(d);
    } else {
      const d = new Date(this.viewDate());
      d.setFullYear(d.getFullYear() - 10);
      this.viewDate.set(d);
    }
  }

  next() {
    if (this.currentView() === 'day') {
      const d = new Date(this.viewDate());
      d.setMonth(d.getMonth() + 1);
      this.viewDate.set(d);
    } else if (this.currentView() === 'month') {
      const d = new Date(this.viewDate());
      d.setFullYear(d.getFullYear() + 1);
      this.viewDate.set(d);
    } else {
      const d = new Date(this.viewDate());
      d.setFullYear(d.getFullYear() + 10);
      this.viewDate.set(d);
    }
  }

  switchView() {
    if (this.currentView() === 'day') {
      this.currentView.set('month');
    } else if (this.currentView() === 'month') {
      this.currentView.set('year');
    }
  }

  selectMonth(monthIndex: number) {
    const d = new Date(this.viewDate());
    d.setMonth(monthIndex);
    this.viewDate.set(d);
    this.currentView.set('day');
  }

  selectYear(year: number) {
    const d = new Date(this.viewDate());
    d.setFullYear(year);
    this.viewDate.set(d);
    this.currentView.set('month');
  }

  readonly years = computed(() => {
    const currentYear = this.viewDate().getFullYear();
    const startYear = currentYear - (currentYear % 10);
    const years = [];
    for (let i = 0; i < 12; i++) {
      years.push(startYear - 1 + i);
    }
    return years;
  });

  // Selection
  selectDate(date: Date | null) {
    if (!date || this.isDisabledDate(date)) return;

    if (this.selectionMode() === 'single') {
      this.value.set(date);
      this.onChange(date);
      this.onSelect.emit(date);
      this.close();
    } else {
      // Range Logic
      const current = this.value();
      let nextVal: Date[];

      if (
        !Array.isArray(current) ||
        !current[0] ||
        (current[0] && current[1])
      ) {
        // Start new range
        nextVal = [date];
      } else {
        // Complete range
        const start = current[0];
        if (date < start) {
          nextVal = [date, start];
        } else {
          nextVal = [start, date];
        }
        this.close(); // Close on second selection
      }

      this.value.set(nextVal);
      this.onChange(nextVal);
      this.onSelect.emit(nextVal);
    }
  }

  // Helpers
  isToday(date: Date | null): boolean {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  isSelected(date: Date | null): boolean {
    if (!date) return false;
    const v = this.value();

    if (this.selectionMode() === 'single') {
      if (!v || Array.isArray(v)) return false;
      return this.isSameDay(date, v);
    } else {
      // Range selection highlighting handled by start/end/range classes
      if (!Array.isArray(v) || !v[0]) return false;
      return (
        this.isSameDay(date, v[0]) || (!!v[1] && this.isSameDay(date, v[1]))
      );
    }
  }

  isRangeStart(date: Date | null): boolean {
    if (!date || this.selectionMode() !== 'range') return false;
    const v = this.value();
    if (!Array.isArray(v) || !v[0]) return false;
    return this.isSameDay(date, v[0]);
  }

  isRangeEnd(date: Date | null): boolean {
    if (!date || this.selectionMode() !== 'range') return false;
    const v = this.value();
    if (!Array.isArray(v) || !v[1]) return false;
    return this.isSameDay(date, v[1]);
  }

  isInRange(date: Date | null): boolean {
    if (!date || this.selectionMode() !== 'range') return false;
    const v = this.value();
    if (!Array.isArray(v) || !v[0] || !v[1]) return false;
    return date > v[0] && date < v[1];
  }

  private isSameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  }

  isDisabledDate(date: Date | null): boolean {
    if (!date) return true;
    if (this.minDate() && date < this.minDate()!) return true;
    if (this.maxDate() && date > this.maxDate()!) return true;
    return false;
  }

  // CVA
  writeValue(value: any): void {
    // Handle Date or Date[] or String
    if (value) {
      if (Array.isArray(value)) {
        this.value.set(value); // Assume Date[]
      } else if (value instanceof Date) {
        this.value.set(value);
      } else {
        // Try parse string
        const d = new Date(value);
        if (!isNaN(d.getTime())) {
          this.value.set(d);
        }
      }
    } else {
      this.value.set(null);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handled by signal
  }
}
