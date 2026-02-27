import {
  Component,
  ElementRef,
  viewChild,
  booleanAttribute,
  forwardRef,
  input,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'magary-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio.html',
  styleUrl: './radio.scss',
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
  readonly name = input<string>();
  readonly label = input<string>();
  readonly inputId = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });
  private readonly formDisabled = signal(false);

  // Internal State
  readonly focused = signal(false);
  readonly modelValue = signal<unknown>(null);

  // Computed
  readonly checked = computed(() => this.modelValue() === this.value());
  readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  // CVA Callbacks
  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  select(event: Event) {
    if (this.isDisabled()) {
      return;
    }

    event.preventDefault(); // Prevent native double toggle actions logic

    // Only select if not already selected
    if (!this.checked()) {
      this.updateModel();
      this.inputElement()?.nativeElement.focus(); // Ensure focus moves here
    }
  }

  updateModel() {
    this.modelValue.set(this.value());
    this.onChange(this.value());
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
    this.onTouched();
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
}
