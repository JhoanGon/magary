import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
  booleanAttribute,
  forwardRef,
  input,
  output,
  signal,
  computed,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'magary-radio',
  standalone: true,
  imports: [],
  templateUrl: './radio.html',
  styleUrl: './radio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MagaryRadioButton),
      multi: true,
    },
  ],
})
export class MagaryRadioButton implements ControlValueAccessor {
  inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement');

  // Signal Inputs
  readonly value = input<unknown>();
  readonly checked = input<boolean | undefined>(undefined);
  readonly name = input<string>();
  readonly label = input<string>();
  readonly inputId = input<string>('');
  readonly ariaLabel = input<string>('');
  readonly ariaLabelledby = input<string>('');
  readonly ariaDescribedby = input<string>('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  private readonly formDisabled = signal(false);
  readonly selectionChange = output<unknown>();
  readonly blurred = output<void>();

  // Internal State
  readonly focused = signal(false);
  readonly modelValue = signal<unknown>(null);
  readonly uniqueId = `magary-radio-${Math.random().toString(36).substring(2, 11)}`;
  readonly resolvedInputId = computed(() => this.inputId().trim() || this.uniqueId);

  // Computed
  readonly isChecked = computed(() => this.checked() ?? Object.is(this.modelValue(), this.value()));
  readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  readonly isInvalid = computed(() => this.invalid());

  // CVA Callbacks
  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};
  private touched = false;

  select(event: Event) {
    if (this.isDisabled()) {
      return;
    }

    event.preventDefault(); // Prevent native double toggle actions logic

    // Only select if not already selected
    if (!this.isChecked()) {
      this.updateModel();
      this.inputElement()?.nativeElement.focus(); // Ensure focus moves here
    } else {
      this.markAsTouched();
    }
  }

  updateModel() {
    this.modelValue.set(this.value());
    this.onChange(this.value());
    this.selectionChange.emit(this.value());
    this.markAsTouched();
  }

  // Input Event Handlers
  onInputChange(event: Event) {
    // Native radio change
    if (!this.isDisabled()) {
      this.updateModel();
    }
  }

  onInputFocus() {
    this.focused.set(true);
  }

  onInputBlur() {
    this.focused.set(false);
    this.markAsTouched();
    this.blurred.emit();
  }

  // CVA Impl
  writeValue(value: unknown): void {
    this.modelValue.set(value);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  private markAsTouched(): void {
    if (this.touched) {
      return;
    }

    this.touched = true;
    this.onTouched();
  }
}
