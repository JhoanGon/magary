import {
  Component,
  ElementRef,
  ViewChild,
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
  @ViewChild('inputElement') inputElement!: ElementRef;

  // Signal Inputs
  readonly value = input<any>();
  readonly name = input<string>();
  readonly label = input<string>();
  readonly inputId = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });

  // Internal State
  readonly focused = signal(false);
  readonly modelValue = signal<any>(null);

  // Computed
  readonly checked = computed(() => this.modelValue() === this.value());

  // CVA Callbacks
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  select(event: Event) {
    if (this.disabled()) {
      return;
    }

    event.preventDefault(); // Prevent native double toggle actions logic

    // Only select if not already selected
    if (!this.checked()) {
      this.updateModel();
      this.inputElement.nativeElement.focus(); // Ensure focus moves here
    }
  }

  updateModel() {
    this.modelValue.set(this.value());
    this.onChange(this.value());
  }

  // Input Event Handlers
  onInputChange(event: Event) {
    // Native radio change
    if (!this.disabled()) {
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
  writeValue(value: any): void {
    this.modelValue.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // managed by input binding normally, but good to have
  }
}
