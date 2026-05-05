import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  Injector,
  output,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'magary-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MagaryCheckbox),
      multi: true,
    },
  ],
})
export class MagaryCheckbox implements ControlValueAccessor {
  readonly checked = signal(false);
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  label = input<string>('');
  invalid = input<boolean>(false);
  errorMessage = input<string>('');
  helpText = input<string>('');

  // Visual variants
  color = input<'primary' | 'success' | 'danger' | 'warning' | 'info'>(
    'primary',
  );

  change = output<boolean>();

  focused = signal(false);
  private readonly formDisabled = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  readonly uniqueId = `magary-checkbox-${Math.random().toString(36).substring(2, 11)}`;
  readonly errorMessageId = `${this.uniqueId}-error`;
  readonly helpMessageId = `${this.uniqueId}-help`;
  private readonly injector = inject(Injector);

  containerClasses = computed(() => {
    const classes = ['magary-checkbox-container'];
    if (this.isDisabled()) classes.push('checkbox-disabled');
    if (this.checked()) classes.push('checkbox-checked');
    if (this.focused()) classes.push('checkbox-focused');
    if (this.isInvalid()) classes.push('checkbox-invalid');
    classes.push(`checkbox-${this.color()}`);
    return classes.join(' ');
  });

  onChange(event: Event): void {
    if (this.isDisabled()) return;
    const target = event.target as HTMLInputElement;
    this.checked.set(target.checked);
    this.onChangeCallback(target.checked);
    this.markAsTouched();
    this.change.emit(target.checked);
  }

  onFocus(): void {
    if (!this.isDisabled()) {
      this.focused.set(true);
    }
  }

  onBlur(): void {
    this.focused.set(false);
    this.markAsTouched();
  }

  isInvalid(): boolean {
    return this.invalid() || this.hasControlError();
  }

  hasVisibleErrorMessage(): boolean {
    return this.isInvalid() && this.errorMessage().trim().length > 0;
  }

  describedBy(): string | null {
    if (this.hasVisibleErrorMessage()) {
      return this.errorMessageId;
    }

    if (this.helpText().trim().length > 0) {
      return this.helpMessageId;
    }

    return null;
  }

  writeValue(value: boolean | null): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  private onChangeCallback: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};
  private touched = false;
  private resolvedNgControl: NgControl | null | undefined;

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
}
