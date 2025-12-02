import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'magary-switch',
  imports: [CommonModule, FormsModule],
  templateUrl: './switch.html',
  styleUrl: './switch.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagarySwitch {
  checked = model<boolean>(false);
  disabled = input<boolean>(false);
  label = input<string>('');

  // Visual variants
  color = input<'primary' | 'success' | 'danger' | 'warning' | 'info'>(
    'primary',
  );

  change = output<boolean>();

  focused = signal(false);
  uniqueId = `magary-switch-${Math.random().toString(36).substr(2, 9)}`;

  containerClasses = computed(() => {
    const classes = ['magary-switch-container'];
    if (this.disabled()) classes.push('switch-disabled');
    if (this.checked()) classes.push('switch-checked');
    if (this.focused()) classes.push('switch-focused');
    classes.push(`switch-${this.color()}`);
    return classes.join(' ');
  });

  onChange(event: Event): void {
    if (this.disabled()) return;
    const target = event.target as HTMLInputElement;
    this.checked.set(target.checked);
    this.change.emit(target.checked);
  }

  onFocus(): void {
    if (!this.disabled()) {
      this.focused.set(true);
    }
  }

  onBlur(): void {
    this.focused.set(false);
  }
}
