import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
  ChangeDetectorRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  Injector,
  signal,
  computed,
  input,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  FormsModule,
} from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

export const INPUTNUMBER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MagaryInputNumber),
  multi: true,
};

@Component({
  selector: 'magary-input-number',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './input-number.html',
  styleUrl: './input-number.scss',
  providers: [INPUTNUMBER_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'magary-inputnumber-wrapper',
    '[class.magary-inputnumber-buttons-stacked]':
      'showButtons() && buttonLayout() === "stacked"',
    '[class.magary-inputnumber-buttons-horizontal]':
      'showButtons() && buttonLayout() === "horizontal"',
    '[class.magary-inputnumber-vertical]':
      'showButtons() && buttonLayout() === "vertical"',
  },
})
export class MagaryInputNumber implements OnInit, ControlValueAccessor {
  // Signal Inputs
  value = model<number | null>(null);

  format = input<boolean>(true);
  showButtons = input<boolean>(false);
  buttonLayout = input<'stacked' | 'horizontal' | 'vertical'>('stacked');
  incrementButtonClass = input<string>('');
  decrementButtonClass = input<string>('');
  incrementButtonIcon = input<string>('chevron-up');
  decrementButtonIcon = input<string>('chevron-down');

  locale = input<string>('en-US');
  localeMatcher = input<'lookup' | 'best fit'>('best fit');
  mode = input<'decimal' | 'currency' | 'percent'>('decimal');
  currency = input<string>('USD');
  currencyDisplay = input<'symbol' | 'narrowSymbol' | 'code' | 'name'>(
    'symbol',
  );
  useGrouping = input<boolean>(true);
  minFractionDigits = input<number | undefined>(undefined);
  maxFractionDigits = input<number | undefined>(undefined);

  prefix = input<string>('');
  suffix = input<string>('');

  min = input<number | null>(null);
  max = input<number | null>(null);
  step = input<number>(1);
  allowEmpty = input<boolean>(true);
  inputStyle = input<{ [klass: string]: any } | null>(null);
  inputStyleClass = input<string>('');
  style = input<{ [klass: string]: any } | null>(null);
  styleClass = input<string>('');
  placeholder = input<string>('');
  size = input<number | null>(null);
  maxlength = input<number | null>(null);
  tabindex = input<number | null>(null);
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  name = input<string>('');
  inputId = input<string>('');

  @Output() onInput = new EventEmitter<any>();
  @Output() onFocus = new EventEmitter<any>();
  @Output() onBlur = new EventEmitter<any>();
  @Output() onKeyDown = new EventEmitter<any>();

  @ViewChild('input') inputElement!: ElementRef;

  focused = signal<boolean>(false);

  // Internal logic
  public formattedValue = signal<string>('');

  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  ngOnInit() {
    // initial format
    if (this.value() != null) {
      this.updateInput(this.value(), false);
    }
  }

  // --- Formatting ---

  getFormatter(): Intl.NumberFormat {
    const options: Intl.NumberFormatOptions = {
      localeMatcher: this.localeMatcher(),
      useGrouping: this.useGrouping(),
      minimumFractionDigits: this.minFractionDigits(),
      maximumFractionDigits: this.maxFractionDigits(),
    };

    if (this.mode() === 'currency') {
      options.style = 'currency';
      options.currency = this.currency();
      options.currencyDisplay = this.currencyDisplay();
    } else if (this.mode() === 'percent') {
      options.style = 'percent';
    } else {
      options.style = 'decimal';
    }

    return new Intl.NumberFormat(this.locale(), options);
  }

  formatValue(val: number): string {
    let formatted = '';
    if (val != null) {
      if (this.format()) {
        formatted = this.getFormatter().format(val);
      } else {
        formatted = val.toString();
      }
    }

    if (this.prefix()) {
      formatted = this.prefix() + formatted;
    }

    if (this.suffix()) {
      formatted = formatted + this.suffix();
    }

    return formatted;
  }

  parseValue(text: string): number | null {
    let cleanText = text;

    if (this.prefix()) {
      cleanText = cleanText.replace(this.prefix(), '');
    }
    if (this.suffix()) {
      cleanText = cleanText.replace(this.suffix(), '');
    }

    // This is a simplified parser. Robust parsing needs more defined regex based on locale.
    // For now, assuming standard decimals or simple currency usage.
    // We remove all non-numeric characters except '.', '-', and ',' if locale uses comma.

    // Simplest approach: remove currency symbols and group separators.
    // NOTE: This will fail for advanced locale parsing without a library.
    // We will assume standard input behavior: user types raw numbers, we format on blur.

    // Or we bind to an unformatted value internally?
    // Let's rely on standard parseFloat for now, stripping grouping separators.

    cleanText = cleanText.trim();
    if (cleanText.length === 0) {
      return null;
    }

    // Remove group separators (usually ,)
    // TODO: Improve locale detection for separators
    const isCommaDecimal = this.getDecimalSeparator() === ',';

    if (isCommaDecimal) {
      cleanText = cleanText.replace(/\./g, ''); // remove group
      cleanText = cleanText.replace(/,/g, '.'); // replace decimal
    } else {
      cleanText = cleanText.replace(/,/g, ''); // remove group
    }

    // Remove currency symbols (regex for non-digit/dot/minus)
    cleanText = cleanText.replace(/[^\d.-]/g, '');

    const parsed = parseFloat(cleanText);
    return isNaN(parsed) ? null : parsed;
  }

  getDecimalSeparator(): string {
    const formatter = new Intl.NumberFormat(this.locale());
    const parts = formatter.formatToParts(1.1);
    const part = parts.find((p) => p.type === 'decimal');
    return part ? part.value : '.';
  }

  // --- Event Handlers ---

  onUserInput(event: Event) {
    const inputVal = (event.target as HTMLInputElement).value;

    // If not formatting, just take value
    if (!this.format()) {
      const val = parseFloat(inputVal);
      this.updateModel(isNaN(val) ? null : val);
      this.onInput.emit(event);
      return;
    }

    // If formatting, we usually wait for blur to format,
    // OR we allow free typing and parse on the fly?
    // Usually formatting interferes with typing (caret jumps).
    // Let's parse but NOT re-format the view value while typing.
    const parsed = this.parseValue(inputVal);
    this.value.set(parsed);
    this.onModelChange(parsed);
    this.onInput.emit(event);
  }

  onInputFocus(event: FocusEvent) {
    this.focused.set(true);
    this.onFocus.emit(event);
  }

  onInputBlur(event: FocusEvent) {
    this.focused.set(false);
    this.onModelTouched();

    // Re-format on blur
    const currentVal = this.value();
    this.updateInput(currentVal, true);

    this.onBlur.emit(event);
  }

  onInputKeyDown(event: KeyboardEvent) {
    this.onKeyDown.emit(event);

    if (event.key === 'ArrowUp') {
      this.spin(event, 1);
      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      this.spin(event, -1);
      event.preventDefault();
    }
  }

  // --- Spinners ---

  spin(event: Event, dir: number) {
    const step = this.step() * dir;
    let current = this.value() || 0;

    let newValue = current + step;

    if (this.min() !== null && newValue < this.min()!) {
      newValue = this.min()!;
    }

    if (this.max() !== null && newValue > this.max()!) {
      newValue = this.max()!;
    }

    this.updateModel(newValue);
    this.updateInput(newValue, true); // format immediately
  }

  updateModel(val: number | null) {
    this.value.set(val);
    this.onModelChange(val);
  }

  updateInput(val: number | null, updateView: boolean) {
    if (val === null) {
      this.formattedValue.set('');
      if (updateView && this.inputElement)
        this.inputElement.nativeElement.value = '';
    } else {
      const formatted = this.formatValue(val);
      this.formattedValue.set(formatted);
      if (updateView && this.inputElement)
        this.inputElement.nativeElement.value = formatted;
    }
  }

  // --- CVA ---

  writeValue(value: number): void {
    this.value.set(value);
    this.updateInput(value, true);
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    // Handled by signal input usually, but CVA calls are directive-driven
    // We can't write to signal input easily?
    // Actually Angular signal inputs are readonly from inside.
    // We need a separate internal state or just rely on 'disabled' attribute binding if using template driven.
    // But implementation needs to handle disabled via CVA.
    // We will just use the input binding for now.
  }
}
