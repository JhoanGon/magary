import {
  Component,
  ElementRef,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  signal,
  viewChild,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { LucideAngularModule } from 'lucide-angular';

type SelectObjectOption = Record<string, unknown>;
type SelectPrimitiveOption = string | number | boolean;
type SelectSize = 'small' | 'normal' | 'large';
export type MagarySelectOption = SelectPrimitiveOption | SelectObjectOption;
export type MagarySelectValue = SelectPrimitiveOption | SelectObjectOption | null;

@Component({
  selector: 'magary-select',
  standalone: true,
  imports: [CommonModule, OverlayModule, LucideAngularModule],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MagarySelect),
      multi: true,
    },
  ],
})
export class MagarySelect implements ControlValueAccessor {
  // Signal Inputs
  readonly options = input<MagarySelectOption[]>([]);
  readonly optionLabel = input<string>();
  readonly optionValue = input<string>();
  readonly placeholder = input<string>('Select an option');
  readonly ariaLabel = input<string>('');
  readonly size = input<SelectSize>('normal');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly error = input<string>('');
  readonly helpText = input<string>('');
  readonly filter = input(false, { transform: booleanAttribute });
  readonly showClear = input(false, { transform: booleanAttribute });

  private readonly formDisabled = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  // Internal State
  readonly isOpen = signal(false);
  readonly focused = signal(false);
  readonly value = signal<MagarySelectValue>(null);
  readonly filterValue = signal('');
  readonly activeIndex = signal<number>(-1);

  // Element Reference for Overlay Width
  readonly trigger = viewChild.required<ElementRef<HTMLElement>>('trigger');
  readonly filterInputRef = viewChild<ElementRef<HTMLInputElement>>('filterInput');
  readonly triggerWidth = signal<number | string>('auto');
  private readonly uniqueId = `magary-select-${Math.random().toString(36).substring(2, 11)}`;
  readonly triggerId = `${this.uniqueId}-trigger`;
  readonly listboxId = `${this.uniqueId}-listbox`;
  readonly errorMessageId = `${this.uniqueId}-error`;
  readonly helpMessageId = `${this.uniqueId}-help`;
  readonly listboxLabel = computed(() =>
    this.placeholder().trim().length > 0 ? `${this.placeholder()} options` : 'Select options',
  );
  readonly resolvedAriaLabel = computed(() => {
    const explicitLabel = this.ariaLabel().trim();
    if (explicitLabel.length > 0) {
      return explicitLabel;
    }

    const placeholder = this.placeholder().trim();
    if (placeholder.length > 0) {
      return placeholder;
    }

    return 'Select option';
  });
  readonly activeDescendantId = computed(() => {
    if (!this.isOpen()) {
      return null;
    }

    const index = this.activeIndex();
    if (index < 0 || index >= this.visibleOptions().length) {
      return null;
    }

    return this.getOptionId(index);
  });
  readonly hasError = computed(() => this.invalid() || this.error().trim().length > 0);
  readonly errorMessage = computed(() => {
    const message = this.error().trim();
    return message.length > 0 ? message : 'Invalid selection';
  });
  readonly describedBy = computed(() => {
    if (this.hasError()) {
      return this.errorMessageId;
    }

    if (this.helpText().trim().length > 0) {
      return this.helpMessageId;
    }

    return null;
  });

  // CVA Callbacks
  private onChange: (value: MagarySelectValue) => void = () => {};
  private onTouched: () => void = () => {};

  // Computed Helpers
  readonly visibleOptions = computed(() => {
    const opts = this.options();
    const search = this.filterValue().toLowerCase();

    if (!this.filter() || !search) return opts;

    return opts.filter((opt) =>
      this.getLabel(opt).toLowerCase().includes(search),
    );
  });

  readonly selectedLabel = computed(() => {
    const val = this.value();
    if (val === null || val === undefined || val === '') return '';
    const opts = this.options();

    const selectedOption = opts.find((opt) => this.getValue(opt) === val);
    return selectedOption ? this.getLabel(selectedOption) : '';
  });

  readonly hasValue = computed(
    () =>
      this.value() !== null &&
      this.value() !== undefined &&
      this.value() !== '',
  );

  constructor() {
    effect(() => {
      if (this.isDisabled() && this.isOpen()) {
        this.close();
      }
    });

    effect(() => {
      if (!this.isOpen()) {
        this.activeIndex.set(-1);
        return;
      }

      const options = this.visibleOptions();
      if (options.length === 0) {
        this.activeIndex.set(-1);
        return;
      }

      const currentIndex = this.activeIndex();
      if (currentIndex >= 0 && currentIndex < options.length) {
        return;
      }

      const selectedIndex = options.findIndex((option) =>
        this.valuesEqual(this.getValue(option), this.value()),
      );
      this.activeIndex.set(selectedIndex >= 0 ? selectedIndex : 0);
    });

    effect(() => {
      if (!this.isOpen() || !this.filter()) {
        return;
      }

      queueMicrotask(() => {
        this.filterInputRef()?.nativeElement.focus();
      });
    });

    effect(() => {
      if (!this.isOpen()) {
        return;
      }

      const activeId = this.activeDescendantId();
      if (!activeId) {
        return;
      }

      queueMicrotask(() => {
        const activeElement = document.getElementById(activeId);
        if (
          activeElement &&
          typeof activeElement.scrollIntoView === 'function'
        ) {
          activeElement.scrollIntoView({ block: 'nearest' });
        }
      });
    });
  }

  toggleOverlay(): void {
    if (this.isDisabled() || this.loading()) {
      return;
    }

    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    if (this.isDisabled() || this.loading()) {
      return;
    }

    const width = this.trigger().nativeElement.getBoundingClientRect().width;
    this.triggerWidth.set(width);
    this.isOpen.set(true);
    this.focused.set(true);
  }

  close(): void {
    this.isOpen.set(false);
    this.focused.set(false);
    this.onTouched();
  }

  selectOption(option: MagarySelectOption): void {
    const val = this.getValue(option);
    this.value.set(val);
    this.onChange(val);
    this.close();
  }

  isSelected(option: MagarySelectOption): boolean {
    return this.valuesEqual(this.getValue(option), this.value());
  }

  getLabel(option: MagarySelectOption): string {
    const labelProp = this.optionLabel();
    if (labelProp && this.isObjectOption(option)) {
      return String(option[labelProp] ?? '');
    }
    return String(option ?? '');
  }

  getValue(option: MagarySelectOption): MagarySelectValue {
    const valueProp = this.optionValue();
    if (valueProp && this.isObjectOption(option)) {
      const resolved = option[valueProp];
      return this.normalizeExternalValue(resolved);
    }
    return this.normalizeExternalValue(option);
  }

  getOptionId(index: number): string {
    return `${this.listboxId}-option-${index}`;
  }

  onFilterInput(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    const val = target.value;
    this.filterValue.set(val);
  }

  clear(event: Event): void {
    if (this.isDisabled()) {
      return;
    }

    event.stopPropagation();
    this.value.set(null);
    this.onChange(null);
    this.onTouched();
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.loading()) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.open();
        } else {
          this.moveActive(1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen()) {
          this.open();
        } else {
          this.moveActive(-1);
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!this.isOpen()) {
          this.open();
        } else {
          this.selectActiveOption();
        }
        break;
      case 'Home':
        event.preventDefault();
        if (!this.isOpen()) {
          this.open();
        }
        this.setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        if (!this.isOpen()) {
          this.open();
        }
        this.setActiveIndex(this.visibleOptions().length - 1);
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;
      case 'Tab':
        if (this.isOpen()) {
          this.close();
        }
        break;
      default:
        break;
    }
  }

  onFilterKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveActive(-1);
        break;
      case 'Enter':
        event.preventDefault();
        this.selectActiveOption();
        break;
      case 'Home':
        event.preventDefault();
        this.setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        this.setActiveIndex(this.visibleOptions().length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        this.trigger().nativeElement.focus();
        break;
      case 'Tab':
        this.close();
        break;
      default:
        break;
    }
  }

  setActiveIndex(index: number): void {
    const optionsCount = this.visibleOptions().length;
    if (optionsCount === 0) {
      this.activeIndex.set(-1);
      return;
    }

    const normalized = Math.max(0, Math.min(index, optionsCount - 1));
    this.activeIndex.set(normalized);
  }

  // CVA Implementation
  writeValue(obj: unknown): void {
    this.value.set(this.normalizeExternalValue(obj));
  }

  registerOnChange(fn: (value: MagarySelectValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  private moveActive(step: 1 | -1): void {
    const optionsCount = this.visibleOptions().length;
    if (optionsCount === 0) {
      this.activeIndex.set(-1);
      return;
    }

    const current = this.activeIndex();
    if (current === -1) {
      this.activeIndex.set(step > 0 ? 0 : optionsCount - 1);
      return;
    }

    const next = (current + step + optionsCount) % optionsCount;
    this.activeIndex.set(next);
  }

  private selectActiveOption(): void {
    const index = this.activeIndex();
    const options = this.visibleOptions();
    if (index < 0 || index >= options.length) {
      return;
    }

    this.selectOption(options[index]);
  }

  private normalizeExternalValue(value: unknown): MagarySelectValue {
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
      return value as SelectObjectOption;
    }

    return null;
  }

  private valuesEqual(left: MagarySelectValue, right: MagarySelectValue): boolean {
    return Object.is(left, right);
  }

  private isObjectOption(option: MagarySelectOption): option is SelectObjectOption {
    return typeof option === 'object' && option !== null;
  }
}
