import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  input,
  Injector,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MagaryRadioButton } from './radio';

type RadioObjectOption = Record<string, unknown>;
type RadioOption = string | number | boolean | RadioObjectOption;

@Component({
  selector: 'magary-radio-group',
  standalone: true,
  imports: [CommonModule, MagaryRadioButton],
  templateUrl: './radio-group.html',
  styleUrl: './radio-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  readonly inputId = input<string>('');
  readonly ariaLabel = input<string>('');
  readonly ariaLabelledby = input<string>('');
  readonly ariaDescribedby = input<string>('');
  readonly optionLabel = input<string>();
  readonly optionValue = input<string>();
  readonly optionDisabled = input<string>('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly errorMessage = input<string>('');
  readonly helpText = input<string>('');
  private readonly formDisabled = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  readonly groupAriaLabel = computed(
    () => {
      if (this.ariaLabelledby().trim().length > 0) {
        return null;
      }

      return this.ariaLabel().trim() || this.name() || 'Radio group';
    },
  );

  readonly value = signal<unknown>(null);
  readonly uniqueId = `magary-radio-group-${Math.random().toString(36).substring(2, 11)}`;
  readonly errorMessageId = `${this.uniqueId}-error`;
  readonly helpMessageId = `${this.uniqueId}-help`;
  readonly resolvedInputId = computed(() => this.inputId().trim() || this.uniqueId);
  private readonly injector = inject(Injector);

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};
  private touched = false;
  private resolvedNgControl: NgControl | null | undefined;

  onRadioChange(val: unknown) {
    if (this.isDisabled()) return;
    this.value.set(val);
    this.onChange(val);
    this.markAsTouched();
  }

  onRadioBlur() {
    this.markAsTouched();
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

  isInvalid(): boolean {
    return this.invalid() || this.hasControlError();
  }

  hasVisibleErrorMessage(): boolean {
    return this.isInvalid() && this.errorMessage().trim().length > 0;
  }

  describedBy(): string | null {
    const ids = [this.ariaDescribedby().trim()];

    if (this.hasVisibleErrorMessage()) {
      ids.push(this.errorMessageId);
    } else if (this.helpText().trim().length > 0) {
      ids.push(this.helpMessageId);
    }

    const filteredIds = ids.filter((id) => id.length > 0);
    return filteredIds.length > 0 ? filteredIds.join(' ') : null;
  }

  getRadioInputId(optionIndex: number): string {
    return `${this.resolvedInputId()}-${optionIndex}`;
  }

  isOptionSelected(option: RadioOption): boolean {
    return Object.is(this.getOptionValue(option), this.value());
  }

  isOptionDisabled(option: RadioOption): boolean {
    if (this.isDisabled()) {
      return true;
    }

    const disabledProp = this.optionDisabled();
    if (disabledProp && this.isObjectOption(option)) {
      return Boolean(option[disabledProp]);
    }

    return false;
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

  private markAsTouched(): void {
    if (this.touched) {
      return;
    }

    this.touched = true;
    this.onTouched();
  }

  private hasControlError(): boolean {
    const control = this.getNgControl()?.control;
    return !!control && control.invalid && control.touched;
  }

  private getNgControl(): NgControl | null {
    if (this.resolvedNgControl !== undefined) {
      return this.resolvedNgControl;
    }

    this.resolvedNgControl = this.injector.get(NgControl, null, {
      self: true,
      optional: true,
    });
    return this.resolvedNgControl;
  }

  private isObjectOption(option: RadioOption): option is RadioObjectOption {
    return typeof option === 'object' && option !== null;
  }
}
