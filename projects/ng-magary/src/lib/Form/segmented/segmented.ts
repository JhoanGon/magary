import { CommonModule, DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  booleanAttribute,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type SegmentedObjectOption = Record<string, unknown>;
type SegmentedPrimitiveOption = string | number | boolean;
type SegmentedSize = 'small' | 'normal' | 'large';

export type MagarySegmentedOption =
  | SegmentedPrimitiveOption
  | SegmentedObjectOption;
export type MagarySegmentedValue =
  | SegmentedPrimitiveOption
  | SegmentedObjectOption
  | null;

@Component({
  selector: 'magary-segmented',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './segmented.html',
  styleUrl: './segmented.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MagarySegmented),
      multi: true,
    },
  ],
})
export class MagarySegmented implements ControlValueAccessor, AfterViewInit {
  readonly options = input<MagarySegmentedOption[]>([]);
  readonly optionLabel = input<string>();
  readonly optionValue = input<string>();
  readonly ariaLabel = input<string>('Segmented control');
  readonly size = input<SegmentedSize>('normal');
  readonly fullWidth = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly value = model<MagarySegmentedValue>(null);
  readonly change = output<MagarySegmentedValue>();
  readonly optionButtons = viewChildren<ElementRef<HTMLButtonElement>>('optionButton');

  private readonly document = inject(DOCUMENT);
  private readonly formDisabled = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  readonly indicatorLeft = signal(0);
  readonly indicatorWidth = signal(0);
  readonly indicatorVisible = signal(false);
  readonly indicatorTransform = computed(
    () => `translate3d(${this.indicatorLeft()}px, 0, 0)`,
  );

  readonly activeIndex = computed(() => {
    const options = this.options();
    if (options.length === 0) {
      return -1;
    }

    const selected = this.value();
    const selectedIndex = options.findIndex((option) =>
      this.valuesEqual(this.getValue(option), selected),
    );

    return selectedIndex >= 0 ? selectedIndex : 0;
  });

  private readonly uniqueId = `magary-segmented-${Math.random().toString(36).substring(2, 11)}`;

  private onChange: (value: MagarySegmentedValue) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      this.options();
      this.value();
      this.size();
      this.fullWidth();
      this.optionButtons();

      queueMicrotask(() => this.syncIndicator());
    });
  }

  ngAfterViewInit(): void {
    this.syncIndicator();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.syncIndicator();
  }

  selectOption(option: MagarySegmentedOption): void {
    if (this.isDisabled()) {
      return;
    }

    const nextValue = this.getValue(option);
    if (this.valuesEqual(nextValue, this.value())) {
      this.onTouched();
      return;
    }

    this.updateValue(nextValue);
  }

  onOptionKeydown(event: KeyboardEvent, optionIndex: number): void {
    if (this.isDisabled() || this.options().length === 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        this.selectByIndex(optionIndex + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        this.selectByIndex(optionIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        this.selectByIndex(0);
        break;
      case 'End':
        event.preventDefault();
        this.selectByIndex(this.options().length - 1);
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.selectByIndex(optionIndex);
        break;
      default:
        break;
    }
  }

  getOptionId(optionIndex: number): string {
    return `${this.uniqueId}-option-${optionIndex}`;
  }

  getTabIndex(optionIndex: number): number {
    if (this.isDisabled()) {
      return -1;
    }

    return optionIndex === this.activeIndex() ? 0 : -1;
  }

  getLabel(option: MagarySegmentedOption): string {
    const labelProp = this.optionLabel();
    if (labelProp && this.isObjectOption(option)) {
      return String(option[labelProp] ?? '');
    }

    return String(option ?? '');
  }

  getValue(option: MagarySegmentedOption): MagarySegmentedValue {
    const valueProp = this.optionValue();
    if (valueProp && this.isObjectOption(option)) {
      return this.normalizeExternalValue(option[valueProp]);
    }

    return this.normalizeExternalValue(option);
  }

  isSelected(option: MagarySegmentedOption): boolean {
    return this.valuesEqual(this.getValue(option), this.value());
  }

  writeValue(obj: unknown): void {
    this.value.set(this.normalizeExternalValue(obj));
  }

  registerOnChange(fn: (value: MagarySegmentedValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  private selectByIndex(optionIndex: number): void {
    const options = this.options();
    if (options.length === 0) {
      return;
    }

    const normalizedIndex =
      ((optionIndex % options.length) + options.length) % options.length;
    const selectedOption = options[normalizedIndex];

    this.updateValue(this.getValue(selectedOption));
    this.focusOption(normalizedIndex);
  }

  private focusOption(optionIndex: number): void {
    queueMicrotask(() => {
      const element = this.document.getElementById(this.getOptionId(optionIndex));
      if (element instanceof HTMLButtonElement) {
        element.focus();
      }
    });
  }

  private updateValue(nextValue: MagarySegmentedValue): void {
    this.value.set(nextValue);
    this.change.emit(nextValue);
    this.onChange(nextValue);
    this.onTouched();
    this.syncIndicator();
  }

  private syncIndicator(): void {
    const buttons = this.optionButtons();
    if (buttons.length === 0) {
      this.indicatorVisible.set(false);
      return;
    }

    const activeIndex = this.activeIndex();
    const normalizedIndex =
      activeIndex >= 0 ? Math.min(activeIndex, buttons.length - 1) : 0;

    const activeButton = buttons[normalizedIndex]?.nativeElement;
    if (!activeButton) {
      this.indicatorVisible.set(false);
      return;
    }

    this.indicatorLeft.set(activeButton.offsetLeft);
    this.indicatorWidth.set(activeButton.offsetWidth);
    this.indicatorVisible.set(true);
  }

  private normalizeExternalValue(value: unknown): MagarySegmentedValue {
    if (value == null) {
      return null;
    }

    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      return value;
    }

    if (typeof value === 'object') {
      return value as SegmentedObjectOption;
    }

    return null;
  }

  private valuesEqual(
    left: MagarySegmentedValue,
    right: MagarySegmentedValue,
  ): boolean {
    return Object.is(left, right);
  }

  private isObjectOption(option: MagarySegmentedOption): option is SegmentedObjectOption {
    return typeof option === 'object' && option !== null;
  }
}
