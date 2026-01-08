import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
type ButtonSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'help';
type ButtonVariant = 'solid' | 'text' | 'outlined';
type ButtonSize = 'small' | 'normal' | 'large';
type IconPosition = 'left' | 'right';
type ShadowLevel = 0 | 1 | 2 | 3 | 4 | 5;
@Component({
  selector: 'magary-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagaryButton {
  readonly label = input<string>();
  readonly icon = input<string>();
  readonly shadow = input<ShadowLevel>(0);
  readonly rounded = input<boolean>(false);
  readonly customBackgroundColor = input<string>();
  readonly iconPos = input<IconPosition>('left');
  readonly severity = input<ButtonSeverity>();
  readonly iconSize = input<number>();
  readonly loading = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly variant = input<ButtonVariant>('solid');
  readonly size = input<ButtonSize>('normal');
  readonly ariaLabel = input<string>();
  readonly buttonClick = output<Event>();
  readonly isDisabled = computed(() => this.disabled() || this.loading());
  readonly buttonClasses = computed(() =>
    [
      'p-button',
      `shadow-${this.shadow()}`,
      `p-button-${this.size()}`,
      this.severity() ? `p-button-${this.severity()}` : '',
      this.variant() === 'text' ? 'p-button-text' : '',
      this.variant() === 'outlined' ? 'p-button-outlined' : '',
      this.icon() && !this.label() ? 'p-button-icon-only' : '',
      this.icon() && this.label() && this.iconPos() === 'left'
        ? 'p-button-icon-left'
        : '',
      this.icon() && this.label() && this.iconPos() === 'right'
        ? 'p-button-icon-right'
        : '',
      this.loading() ? 'p-button-loading' : '',
    ].filter(Boolean),
  );
  readonly buttonStyles = computed(() => ({
    'border-radius': this.rounded() ? '22px' : '8px',
    background: this.customBackgroundColor() || undefined,
  }));
  readonly effectiveAriaLabel = computed(
    () => this.ariaLabel() || this.label() || 'Button',
  );
  onButtonClick(event: Event): void {
    if (!this.isDisabled()) {
      this.buttonClick.emit(event);
    }
  }
}
