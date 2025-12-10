import {
  Component,
  Input,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';
import { MagaryRadioButton } from './radio';

@Component({
  selector: 'magary-radio-group',
  standalone: true,
  imports: [CommonModule, FormsModule, MagaryRadioButton],
  templateUrl: './radio-group.html',
  styleUrl: './radio-group.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MagaryRadioGroup),
      multi: true,
    },
  ],
})
export class MagaryRadioGroup implements ControlValueAccessor {
  readonly options = input<any[]>([]);
  readonly layout = input<'vertical' | 'horizontal'>('vertical');
  readonly name = input<string>();
  readonly optionLabel = input<string>();
  readonly optionValue = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly value = signal<any>(null);

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  onRadioChange(val: any) {
    if (this.disabled()) return;
    this.value.set(val);
    this.onChange(val);
    this.onTouched();
  }

  getOptionLabel(option: any): string {
    const labelProp = this.optionLabel();
    const val = labelProp ? option[labelProp] : option;
    return String(val);
  }

  getOptionValue(option: any): any {
    const valueProp = this.optionValue();
    return valueProp ? option[valueProp] : option;
  }

  readonly generatedName =
    'magary-radio-group-' + Math.random().toString(36).substr(2, 9);
  readonly groupName = computed(() => this.name() || this.generatedName);

  writeValue(val: any): void {
    this.value.set(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handled by signal input usually, but we can't write to input signal.
    // relying on parent binding [disabled].
  }
}
