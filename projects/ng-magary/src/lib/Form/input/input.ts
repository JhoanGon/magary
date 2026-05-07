import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  Injector,
  output,
  signal,
  effect,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search';

export type InputSize = 'small' | 'normal' | 'large';

export type InputVariant = 'filled' | 'outlined' | 'underlined';

@Component({
  selector: 'magary-input',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MagaryInput),
      multi: true,
    },
  ],
})
export class MagaryInput implements ControlValueAccessor {
  readonly value = signal('');
  placeholder = input<string>('');
  type = input<InputType>('text');
  size = input<InputSize>('normal');
  variant = input<InputVariant>('outlined');

  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  loading = input<boolean>(false);

  invalid = input<boolean>(false);
  errorMessage = input<string>('');
  success = input<boolean>(false);

  label = input<string>('');
  ariaLabel = input<string>('');
  helpText = input<string>('');

  prefixIcon = input<string>('');
  suffixIcon = input<string>('');

  width = input<string>('100%');
  maxLength = input<number | undefined>(undefined);

  inputFocus = output<FocusEvent>();
  inputBlur = output<FocusEvent>();
  iconClick = output<'prefix' | 'suffix'>();

  private focused = signal(false);
  private readonly formDisabled = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  private readonly injector = inject(Injector);

  private showPassword = signal(false);

  private readonly uniqueId = `magary-input-${Math.random().toString(36).substring(2, 11)}`;
  readonly errorMessageId = `${this.uniqueId}-error`;
  readonly helpMessageId = `${this.uniqueId}-help`;

  constructor() {
    // Keep password visibility in sync with input type changes.
    effect(() => {
      this.type();
      this.showPassword.set(false);
    });
  }

  inputClasses = computed(() => {
    const classes = ['magary-input-field'];
    classes.push(`input-${this.variant()}`);
    classes.push(`input-${this.size()}`);
    const isInvalid = this.isInvalid();

    if (this.isDisabled()) classes.push('input-disabled');
    if (this.readonly()) classes.push('input-readonly');
    if (isInvalid) classes.push('input-error');
    if (this.success() && !isInvalid) classes.push('input-success');
    if (this.focused()) classes.push('input-focused');
    if (this.loading()) classes.push('input-loading');

    return classes.join(' ');
  });

  containerClasses = computed(() => {
    const classes = ['magary-input-container'];
    if (this.label()) classes.push('has-label');
    if (this.prefixIcon()) classes.push('has-prefix');
    if (this.suffixIcon() || this.type() === 'password' || this.loading())
      classes.push('has-suffix');
    return classes.join(' ');
  });

  inputStyles = computed(() => ({
    width: this.width(),
  }));

  resolvedAriaLabel = computed(() => {
    if (this.ariaLabel()) {
      return this.ariaLabel();
    }

    if (!this.label() && this.placeholder()) {
      return this.placeholder();
    }

    return null;
  });

  resolvedMaxLength = computed(() => {
    const maxLength = this.maxLength();
    if (typeof maxLength !== 'number' || !Number.isFinite(maxLength) || maxLength <= 0) {
      return null;
    }

    return Math.floor(maxLength);
  });

  resolvedInputMode = computed(() => {
    switch (this.type()) {
      case 'email':
        return 'email';
      case 'number':
        return 'decimal';
      case 'tel':
        return 'tel';
      case 'url':
        return 'url';
      case 'search':
        return 'search';
      default:
        return 'text';
    }
  });

  actualType = computed(() => {
    if (this.type() === 'password') {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type();
  });

  passwordIcon = computed(() => {
    return this.showPassword() ? 'eye-off' : 'eye';
  });

  onInput(event: Event): void {
    if (this.isDisabled() || this.readonly()) {
      return;
    }

    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    this.value.set(target.value);
    this.onChange(target.value);
  }

  onFocus(event: FocusEvent): void {
    this.focused.set(true);
    this.inputFocus.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this.focused.set(false);
    this.markAsTouched();
    this.inputBlur.emit(event);
  }

  private toComparableString(value: unknown): string {
    if (value == null) {
      return '';
    }

    return typeof value === 'string' ? value : String(value);
  }

  onPrefixIconClick(): void {
    if (!this.isInteractionBlocked()) {
      this.iconClick.emit('prefix');
    }
  }

  onSuffixIconClick(): void {
    if (!this.isInteractionBlocked()) {
      this.iconClick.emit('suffix');
    }
  }

  togglePasswordVisibility(): void {
    if (
      this.type() === 'password' &&
      !this.readonly() &&
      !this.isInteractionBlocked()
    ) {
      this.showPassword.set(!this.showPassword());
    }
  }

  getPrefixIconLabel(): string {
    if (this.label()) {
      return `Activate prefix action for ${this.label()}`;
    }
    return 'Activate prefix action';
  }

  getSuffixIconLabel(): string {
    if (this.label()) {
      return `Activate suffix action for ${this.label()}`;
    }
    return 'Activate suffix action';
  }

  getPasswordToggleLabel(): string {
    return this.showPassword() ? 'Hide password' : 'Show password';
  }

  getId(): string {
    return this.uniqueId;
  }

  private isInteractionBlocked(): boolean {
    return this.isDisabled() || this.loading();
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

  writeValue(value: string | number | null): void {
    this.value.set(this.toComparableString(value));
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  private onChange: (value: string) => void = () => {};
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

