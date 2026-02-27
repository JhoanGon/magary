import {
  Component,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';
import { MagaryRadioButton } from './radio';

type RadioObjectOption = Record<string, unknown>;
type RadioOption = string | number | boolean | RadioObjectOption;

@Component({
  selector: 'magary-radio-group',
  standalone: true,
  imports: [CommonModule, FormsModule, MagaryRadioButton],
  templateUrl: './radio-group.html',
  styleUrl: './radio-group.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MagaryRadioGroup),
      multi: true,
    },
  ],
})
export class MagaryRadioGroup implements ControlValueAccessor {
  readonly options = input<RadioOption[]>([]);
  readonly layout = input<'vertical' | 'horizontal'>('vertical');
  readonly name = input<string>();
  readonly ariaLabel = input<string>();
  readonly optionLabel = input<string>();
  readonly optionValue = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });
  private readonly formDisabled = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  readonly groupAriaLabel = computed(
    () => this.ariaLabel() || this.name() || 'Radio group',
  );

  readonly value = signal<unknown>(null);

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  onRadioChange(val: unknown) {
    if (this.isDisabled()) return;
    this.value.set(val);
    this.onChange(val);
    this.onTouched();
  }

  getOptionLabel(option: RadioOption): string {
    const labelProp = this.optionLabel();
    if (labelProp && this.isObjectOption(option)) {
      return String(option[labelProp] ?? '');
    }
    return String(option ?? '');
  }

  getOptionValue(option: RadioOption): unknown {
    const valueProp = this.optionValue();
    if (valueProp && this.isObjectOption(option)) {
      return option[valueProp];
    }
    return option;
  }

  readonly generatedName =
    'magary-radio-group-' + Math.random().toString(36).substr(2, 9);
  readonly groupName = computed(() => this.name() || this.generatedName);

  writeValue(val: unknown): void {
    this.value.set(val);
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

  private isObjectOption(option: RadioOption): option is RadioObjectOption {
    return typeof option === 'object' && option !== null;
  }
}
