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

type DatePickerValue = Date | Date[] | null;

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

  readonly onSelect = output<Date | Date[]>();

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
  readonly value = signal<DatePickerValue>(null);
  readonly isOpen = signal(false);
  readonly viewDate = signal(new Date()); // Current month being viewed
  readonly currentView = signal<'day' | 'month' | 'year'>('day');
  readonly activeDate = signal<Date | null>(null);
  readonly activeMonthIndex = signal<number | null>(null);
  readonly activeYearValue = signal<number | null>(null);
  private readonly formDisabled = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  readonly triggerId = `magary-datepicker-${Math.random().toString(36).slice(2, 11)}`;
  readonly panelId = `${this.triggerId}-panel`;
  readonly panelLabelId = `${this.triggerId}-panel-label`;
  readonly activeDayId = computed(() => {
    const date = this.activeDate();
    if (!date || !this.isOpen() || this.currentView() !== 'day') {
      return null;
    }

    return this.getDayId(date);
  });
  readonly activeMonthId = computed(() => {
    if (!this.isOpen() || this.currentView() !== 'month') {
      return null;
    }

    const monthIndex = this.activeMonthIndex();
    if (monthIndex == null || monthIndex < 0 || monthIndex > 11) {
      return null;
    }

    return this.getMonthId(monthIndex);
  });
  readonly activeYearId = computed(() => {
    if (!this.isOpen() || this.currentView() !== 'year') {
      return null;
    }

    const year = this.activeYearValue();
    if (year == null || !this.years().includes(year)) {
      return null;
    }

    return this.getYearId(year);
  });

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

  private onChange: (value: DatePickerValue) => void = () => {};
  private onTouched: () => void = () => {};
  private documentClickListener: ((event: Event) => void) | null = null;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.documentClickListener = (event: Event) => {
      if (
        this.isOpen() &&
        !this.elementRef.nativeElement.contains(event.target as Node | null)
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
    if (this.isDisabled()) return;
    if (this.isOpen()) {
      this.close();
      return;
    }

    this.openPanel();
  }

  open() {
    if (!this.isDisabled() && !this.isOpen()) {
      this.toggle(); // Reusing toggle logic for sync
    }
  }

  close() {
    this.isOpen.set(false);
    this.activeDate.set(null);
    this.activeMonthIndex.set(null);
    this.activeYearValue.set(null);
    this.onTouched();
  }

  onContainerClick(event: Event) {}

  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    if (this.handleOpenCalendarKeyboardNavigation(event)) {
      event.preventDefault();
      return;
    }

    if (event.key === 'Escape' && this.isOpen()) {
      event.preventDefault();
      this.close();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }

    if (event.key === 'ArrowDown' && !this.isOpen()) {
      event.preventDefault();
      this.open();
    }
  }

  onPanelKeydown(event: KeyboardEvent): void {
    if (this.handleOpenCalendarKeyboardNavigation(event)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.close();
    }
  }

  // Navigation
  prev() {
    if (this.currentView() === 'day') {
      const active = this.activeDate() ?? this.resolveInitialActiveDate();
      const next = new Date(active);
      next.setMonth(next.getMonth() - 1);
      this.setActiveDate(next);
    } else if (this.currentView() === 'month') {
      const d = new Date(this.viewDate());
      d.setFullYear(d.getFullYear() - 1);
      this.viewDate.set(d);
      this.activeYearValue.set(d.getFullYear());
    } else {
      const d = new Date(this.viewDate());
      d.setFullYear(d.getFullYear() - 10);
      this.viewDate.set(d);
      const activeYear = this.activeYearValue();
      this.activeYearValue.set(
        activeYear !== null ? activeYear - 10 : d.getFullYear(),
      );
    }
  }

  next() {
    if (this.currentView() === 'day') {
      const active = this.activeDate() ?? this.resolveInitialActiveDate();
      const next = new Date(active);
      next.setMonth(next.getMonth() + 1);
      this.setActiveDate(next);
    } else if (this.currentView() === 'month') {
      const d = new Date(this.viewDate());
      d.setFullYear(d.getFullYear() + 1);
      this.viewDate.set(d);
      this.activeYearValue.set(d.getFullYear());
    } else {
      const d = new Date(this.viewDate());
      d.setFullYear(d.getFullYear() + 10);
      this.viewDate.set(d);
      const activeYear = this.activeYearValue();
      this.activeYearValue.set(
        activeYear !== null ? activeYear + 10 : d.getFullYear(),
      );
    }
  }

  switchView() {
    if (this.currentView() === 'day') {
      this.activeMonthIndex.set(this.viewDate().getMonth());
      this.currentView.set('month');
    } else if (this.currentView() === 'month') {
      this.activeYearValue.set(this.viewDate().getFullYear());
      this.currentView.set('year');
    }
  }

  selectMonth(monthIndex: number) {
    if (this.isDisabled()) return;
    const base = this.activeDate() ?? this.viewDate();
    const d = new Date(base);
    d.setMonth(monthIndex);
    this.viewDate.set(d);
    this.setActiveDate(d);
    this.activeMonthIndex.set(monthIndex);
    this.currentView.set('day');
  }

  selectYear(year: number) {
    if (this.isDisabled()) return;
    const base = this.activeDate() ?? this.viewDate();
    const d = new Date(base);
    d.setFullYear(year);
    this.viewDate.set(d);
    this.setActiveDate(d);
    this.activeYearValue.set(year);
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
    this.setActiveDate(date);

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

  dayAriaLabel(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }

  getDayId(date: Date): string {
    const normalized = this.normalizeDate(date);
    return `${this.panelId}-day-${normalized.getFullYear()}-${normalized.getMonth()}-${normalized.getDate()}`;
  }

  isActive(date: Date | null): boolean {
    if (!date) {
      return false;
    }

    const active = this.activeDate();
    if (!active) {
      return false;
    }

    return this.isSameDay(date, active);
  }

  onDayHover(date: Date): void {
    if (this.isDisabledDate(date)) {
      return;
    }

    this.setActiveDate(date);
  }

  getMonthId(monthIndex: number): string {
    return `${this.panelId}-month-${monthIndex}`;
  }

  getYearId(year: number): string {
    return `${this.panelId}-year-${year}`;
  }

  isActiveMonth(monthIndex: number): boolean {
    return this.activeMonthIndex() === monthIndex;
  }

  isActiveYear(year: number): boolean {
    return this.activeYearValue() === year;
  }

  onMonthHover(monthIndex: number): void {
    this.activeMonthIndex.set(monthIndex);
  }

  onYearHover(year: number): void {
    this.activeYearValue.set(year);
  }

  // CVA
  writeValue(value: unknown): void {
    // Handle Date or Date[] or String
    if (value) {
      if (Array.isArray(value)) {
        this.value.set(value as Date[]); // Assume Date[]
      } else if (value instanceof Date) {
        this.value.set(value);
      } else {
        // Try parse string
        if (typeof value === 'string' || typeof value === 'number') {
          const d = new Date(value);
          if (!isNaN(d.getTime())) {
            this.value.set(d);
          }
        }
      }
    } else {
      this.value.set(null);
    }
  }

  registerOnChange(fn: (value: DatePickerValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  private openPanel(): void {
    this.isOpen.set(true);

    const initialDate = this.resolveInitialActiveDate();
    this.setActiveDate(initialDate);
    this.activeMonthIndex.set(initialDate.getMonth());
    this.activeYearValue.set(initialDate.getFullYear());
  }

  private resolveInitialActiveDate(): Date {
    const selected = this.getSelectedAnchorDate();
    if (selected) {
      return this.boundDate(selected);
    }

    return this.boundDate(new Date());
  }

  private getSelectedAnchorDate(): Date | null {
    const currentValue = this.value();
    if (Array.isArray(currentValue)) {
      return currentValue[0] ? this.normalizeDate(currentValue[0]) : null;
    }

    if (currentValue instanceof Date) {
      return this.normalizeDate(currentValue);
    }

    return null;
  }

  private setActiveDate(date: Date): void {
    const normalized = this.boundDate(date);
    this.activeDate.set(normalized);
    this.activeMonthIndex.set(normalized.getMonth());
    this.activeYearValue.set(normalized.getFullYear());

    const viewDate = this.viewDate();
    if (
      viewDate.getFullYear() !== normalized.getFullYear() ||
      viewDate.getMonth() !== normalized.getMonth()
    ) {
      this.viewDate.set(new Date(normalized));
    }
  }

  private handleDayKeyboardNavigation(event: KeyboardEvent): boolean {
    if (!this.isOpen() || this.currentView() !== 'day') {
      return false;
    }

    switch (event.key) {
      case 'ArrowRight':
        this.moveActiveDateByDays(1);
        return true;
      case 'ArrowLeft':
        this.moveActiveDateByDays(-1);
        return true;
      case 'ArrowDown':
        this.moveActiveDateByDays(7);
        return true;
      case 'ArrowUp':
        this.moveActiveDateByDays(-7);
        return true;
      case 'Home':
        this.moveActiveDateToWeekBoundary('start');
        return true;
      case 'End':
        this.moveActiveDateToWeekBoundary('end');
        return true;
      case 'PageUp':
        this.moveActiveDateByMonths(-1);
        return true;
      case 'PageDown':
        this.moveActiveDateByMonths(1);
        return true;
      case 'Enter':
      case ' ':
        this.selectDate(this.activeDate());
        return true;
      default:
        return false;
    }
  }

  private handleOpenCalendarKeyboardNavigation(event: KeyboardEvent): boolean {
    if (!this.isOpen()) {
      return false;
    }

    if (this.currentView() === 'day') {
      return this.handleDayKeyboardNavigation(event);
    }

    if (this.currentView() === 'month') {
      return this.handleMonthKeyboardNavigation(event);
    }

    if (this.currentView() === 'year') {
      return this.handleYearKeyboardNavigation(event);
    }

    return false;
  }

  private handleMonthKeyboardNavigation(event: KeyboardEvent): boolean {
    switch (event.key) {
      case 'ArrowRight':
        this.moveActiveMonth(1);
        return true;
      case 'ArrowLeft':
        this.moveActiveMonth(-1);
        return true;
      case 'ArrowDown':
        this.moveActiveMonth(3);
        return true;
      case 'ArrowUp':
        this.moveActiveMonth(-3);
        return true;
      case 'Home':
        this.activeMonthIndex.set(0);
        return true;
      case 'End':
        this.activeMonthIndex.set(11);
        return true;
      case 'PageUp':
        this.shiftMonthViewYear(-1);
        return true;
      case 'PageDown':
        this.shiftMonthViewYear(1);
        return true;
      case 'Enter':
      case ' ':
        this.selectMonth(this.activeMonthIndex() ?? this.viewDate().getMonth());
        return true;
      default:
        return false;
    }
  }

  private handleYearKeyboardNavigation(event: KeyboardEvent): boolean {
    switch (event.key) {
      case 'ArrowRight':
        this.moveActiveYear(1);
        return true;
      case 'ArrowLeft':
        this.moveActiveYear(-1);
        return true;
      case 'ArrowDown':
        this.moveActiveYear(3);
        return true;
      case 'ArrowUp':
        this.moveActiveYear(-3);
        return true;
      case 'Home': {
        const years = this.years();
        if (years.length > 0) {
          this.activeYearValue.set(years[0]);
        }
        return true;
      }
      case 'End': {
        const years = this.years();
        if (years.length > 0) {
          this.activeYearValue.set(years[years.length - 1]);
        }
        return true;
      }
      case 'PageUp':
        this.moveActiveYear(-10);
        return true;
      case 'PageDown':
        this.moveActiveYear(10);
        return true;
      case 'Enter':
      case ' ':
        this.selectYear(this.activeYearValue() ?? this.currentYear());
        return true;
      default:
        return false;
    }
  }

  private moveActiveMonth(offset: number): void {
    const current = this.activeMonthIndex() ?? this.viewDate().getMonth();
    const next = Math.max(0, Math.min(11, current + offset));
    this.activeMonthIndex.set(next);
  }

  private shiftMonthViewYear(yearOffset: number): void {
    const d = new Date(this.viewDate());
    d.setFullYear(d.getFullYear() + yearOffset);
    this.viewDate.set(d);
    this.activeYearValue.set(d.getFullYear());
  }

  private moveActiveYear(offset: number): void {
    const current = this.activeYearValue() ?? this.currentYear();
    const next = current + offset;
    this.ensureYearVisible(next);
    this.activeYearValue.set(next);
  }

  private ensureYearVisible(targetYear: number): void {
    let guard = 0;

    while (guard < 12) {
      const years = this.years();
      if (years.length === 0) {
        return;
      }

      const first = years[0];
      const last = years[years.length - 1];

      if (targetYear < first) {
        const d = new Date(this.viewDate());
        d.setFullYear(d.getFullYear() - 10);
        this.viewDate.set(d);
        guard++;
        continue;
      }

      if (targetYear > last) {
        const d = new Date(this.viewDate());
        d.setFullYear(d.getFullYear() + 10);
        this.viewDate.set(d);
        guard++;
        continue;
      }

      return;
    }
  }

  private moveActiveDateByDays(days: number): void {
    const current = this.activeDate() ?? this.resolveInitialActiveDate();
    const next = new Date(current);
    next.setDate(next.getDate() + days);
    this.setActiveDate(next);
  }

  private moveActiveDateByMonths(months: number): void {
    const current = this.activeDate() ?? this.resolveInitialActiveDate();
    const next = new Date(current);
    next.setMonth(next.getMonth() + months);
    this.setActiveDate(next);
  }

  private moveActiveDateToWeekBoundary(boundary: 'start' | 'end'): void {
    const current = this.activeDate() ?? this.resolveInitialActiveDate();
    const next = new Date(current);
    const offset =
      boundary === 'start' ? -current.getDay() : 6 - current.getDay();
    next.setDate(next.getDate() + offset);
    this.setActiveDate(next);
  }

  private boundDate(date: Date): Date {
    const normalized = this.normalizeDate(date);
    const minDate = this.minDate();
    const maxDate = this.maxDate();

    if (minDate) {
      const min = this.normalizeDate(minDate);
      if (normalized < min) {
        return min;
      }
    }

    if (maxDate) {
      const max = this.normalizeDate(maxDate);
      if (normalized > max) {
        return max;
      }
    }

    return normalized;
  }

  private normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
