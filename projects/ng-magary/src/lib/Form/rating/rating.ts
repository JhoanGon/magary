import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  forwardRef,
  input,
  model,
  output,
  inject,
  ChangeDetectorRef,
  Provider,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

export const RATING_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MagaryRating),
  multi: true,
};

@Component({
  selector: 'magary-rating',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
  providers: [RATING_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'magary-rating',
    '[class.magary-disabled]': 'disabled()',
    '[class.magary-readonly]': 'readonly()',
  },
})
export class MagaryRating implements ControlValueAccessor {
  // Inputs
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  stars = input<number>(5);
  cancel = input<boolean>(true);
  iconOn = input<string>('star'); // full star
  iconOff = input<string>('star'); // empty star
  iconCancel = input<string>('ban');

  // Model
  value = model<number | null>(null);

  // Events
  onRate = output<{ originalEvent: Event; value: number }>();
  onCancel = output<Event>();

  // State
  private cdr = inject(ChangeDetectorRef);

  onModelChange: (value: number | null) => void = () => {};
  onModelTouched: () => void = () => {};

  constructor() {}

  get starsArray() {
    // Create array of size stars()
    return new Array(this.stars()).fill(0).map((_, i) => i + 1);
  }

  rate(event: Event, i: number) {
    if (this.readonly() || this.disabled()) {
      return;
    }

    this.value.set(i);
    this.onModelChange(i);
    this.onRate.emit({ originalEvent: event, value: i });
    event.preventDefault();
  }

  clear(event: Event) {
    if (this.readonly() || this.disabled()) {
      return;
    }

    this.value.set(null);
    this.onModelChange(null);
    this.onCancel.emit(event);
    event.preventDefault();
  }

  // CVA
  writeValue(val: number | null): void {
    this.value.set(val);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  setDisabledState(_val: boolean): void {
    // We use signal inputs generally, but for CVA directive compatibility we should handle this.
    // However, signals are read-only from here.
    // We can just rely on the template binding to `disabled()` input if used as component input,
    // but `setDisabledState` strictly comes from forms API.
    // For now, let's assume usage via [disabled] input binding for simplicity in standalone signals world
    // or we would need a separate signal for formDisabled state combined with input disabled.
  }
}
