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
  selector: 'magary-checkbox',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagaryCheckbox {
  checked = model<boolean>(false);
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  label = input<string>('');
  value = input<any>(null);

  // Visual variants
  color = input<'primary' | 'success' | 'danger' | 'warning' | 'info'>(
    'primary',
  );

  change = output<boolean>();

  focused = signal(false);
  uniqueId = `magary-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  containerClasses = computed(() => {
    const classes = ['magary-checkbox-container'];
    if (this.disabled()) classes.push('checkbox-disabled');
    if (this.checked()) classes.push('checkbox-checked');
    if (this.focused()) classes.push('checkbox-focused');
    classes.push(`checkbox-${this.color()}`);
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
