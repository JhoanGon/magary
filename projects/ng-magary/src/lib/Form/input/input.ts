import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  model,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagaryInput {
  value = model<string>('');
  placeholder = input<string>('');
  type = input<InputType>('text');
  size = input<InputSize>('normal');
  variant = input<InputVariant>('outlined');

  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  loading = input<boolean>(false);

  error = input<string>('');
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

  private _internalError = signal<string>('');

  effectiveError = computed(() => this.error() || this._internalError());
  hasEffectiveError = computed(() => this.effectiveError().trim().length > 0);

  private focused = signal(false);

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
    const hasError = this.hasEffectiveError();

    if (this.disabled()) classes.push('input-disabled');
    if (this.readonly()) classes.push('input-readonly');
    if (hasError) classes.push('input-error');
    if (this.success() && !hasError) classes.push('input-success');
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

  describedBy = computed(() => {
    if (this.hasEffectiveError()) {
      return this.errorMessageId;
    }

    if (this.helpText().trim().length > 0) {
      return this.helpMessageId;
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
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    this.value.set(target.value);

    if (this._internalError()) {
      this._internalError.set('');
    }
  }

  onFocus(event: FocusEvent): void {
    this.focused.set(true);
    this.inputFocus.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this.focused.set(false);
    this.validateInput();
    this.inputBlur.emit(event);
  }

  private validateInput(): void {
    if (this.disabled() || this.readonly()) {
      this._internalError.set('');
      return;
    }

    const value = this.toComparableString(this.value() as unknown).trim();

    if (this.required() && value.length === 0) {
      this._internalError.set('Campo obligatorio');
      return;
    }

    if (this.type() === 'email' && value.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this._internalError.set('Correo electrónico inválido');
        return;
      }
    }

    this._internalError.set('');
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
    return this.disabled() || this.loading();
  }
}

