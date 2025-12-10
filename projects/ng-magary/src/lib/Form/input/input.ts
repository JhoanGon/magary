import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  model,
  linkedSignal,
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
  helpText = input<string>('');

  prefixIcon = input<string>('');
  suffixIcon = input<string>('');

  width = input<string>('100%');
  maxLength = input<number | undefined>(undefined);

  inputFocus = output<Event>();
  inputBlur = output<Event>();
  iconClick = output<'prefix' | 'suffix'>();

  private _internalError = signal<string>('');

  effectiveError = computed(() => this.error() || this._internalError());

  private focused = signal(false);

  // Use linkedSignal to reset password visibility when type changes
  private showPassword = linkedSignal({
    source: this.type,
    computation: () => false,
  });

  private readonly uniqueId = `magary-input-${Math.random().toString(36).substr(2, 9)}`;

  inputClasses = computed(() => {
    const classes = ['magary-input-field'];
    classes.push(`input-${this.variant()}`);
    classes.push(`input-${this.size()}`);

    if (this.disabled()) classes.push('input-disabled');
    if (this.readonly()) classes.push('input-readonly');
    if (this.effectiveError()) classes.push('input-error');
    if (this.success()) classes.push('input-success');
    if (this.focused()) classes.push('input-focused');
    if (this.loading()) classes.push('input-loading');

    return classes.join(' ');
  });

  containerClasses = computed(() => {
    const classes = ['magary-input-container'];
    if (this.label()) classes.push('has-label');
    if (this.prefixIcon()) classes.push('has-prefix');
    if (this.suffixIcon() || this.type() === 'password')
      classes.push('has-suffix');
    return classes.join(' ');
  });

  inputStyles = computed(() => ({
    width: this.width(),
  }));

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
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);

    if (this._internalError()) {
      this._internalError.set('');
    }
  }

  onFocus(event: Event): void {
    this.focused.set(true);
    this.inputFocus.emit(event);
  }

  onBlur(event: Event): void {
    this.focused.set(false);
    this.validateEmail();
    this.inputBlur.emit(event);
  }

  private validateEmail(): void {
    if (this.type() === 'email' && this.value()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.value())) {
        this._internalError.set('Email inválido');
      }
    }
  }

  onPrefixIconClick(): void {
    if (!this.disabled()) {
      this.iconClick.emit('prefix');
    }
  }

  onSuffixIconClick(): void {
    if (!this.disabled()) {
      this.iconClick.emit('suffix');
    }
  }

  togglePasswordVisibility(): void {
    if (this.type() === 'password') {
      this.showPassword.set(!this.showPassword());
    }
  }

  getId(): string {
    return this.uniqueId;
  }
}
