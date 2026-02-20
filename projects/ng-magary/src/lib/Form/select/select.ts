import {
  Component,
  ElementRef,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  signal,
  viewChild,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'magary-select',
  standalone: true,
  imports: [CommonModule, OverlayModule, LucideAngularModule],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MagarySelect),
      multi: true,
    },
  ],
})
export class MagarySelect implements ControlValueAccessor {
  // Signal Inputs
  readonly options = input<any[]>([]);
  readonly optionLabel = input<string>();
  readonly optionValue = input<string>();
  readonly placeholder = input<string>('Select an option');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly filter = input(false, { transform: booleanAttribute });
  readonly showClear = input(false, { transform: booleanAttribute });

  private readonly formDisabled = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  // Internal State
  readonly isOpen = signal(false);
  readonly focused = signal(false);
  readonly value = signal<any>(null);
  readonly filterValue = signal('');

  // Element Reference for Overlay Width
  readonly trigger = viewChild.required<ElementRef>('trigger');
  readonly triggerWidth = signal<number | string>('auto');

  // CVA Callbacks
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  // Computed Helpers
  readonly visibleOptions = computed(() => {
    const opts = this.options();
    const search = this.filterValue().toLowerCase();

    if (!this.filter() || !search) return opts;

    return opts.filter((opt) =>
      String(this.getLabel(opt)).toLowerCase().includes(search),
    );
  });

  readonly selectedLabel = computed(() => {
    const val = this.value();
    if (val === null || val === undefined || val === '') return '';
    const opts = this.options();

    const selectedOption = opts.find((opt) => this.getValue(opt) === val);
    return selectedOption ? this.getLabel(selectedOption) : '';
  });

  readonly hasValue = computed(
    () =>
      this.value() !== null &&
      this.value() !== undefined &&
      this.value() !== '',
  );

  constructor() {
    effect(() => {
      if (this.isDisabled() && this.isOpen()) {
        this.close();
      }
    });
  }

  toggleOverlay() {
    if (this.isDisabled() || this.loading()) return;

    // Update width before opening
    if (!this.isOpen()) {
      const width = this.trigger().nativeElement.getBoundingClientRect().width;
      this.triggerWidth.set(width);
    }

    this.isOpen.update((v) => !v);
    if (this.isOpen()) {
      this.focused.set(true);
    } else {
      this.onTouched();
      this.focused.set(false);
    }
  }

  close() {
    this.isOpen.set(false);
    this.focused.set(false);
    this.onTouched();
  }

  selectOption(option: any) {
    const val = this.getValue(option);
    this.value.set(val);
    this.onChange(val);
    this.close();
  }

  isSelected(option: any): boolean {
    return this.getValue(option) === this.value();
  }

  getLabel(option: any): string {
    const labelProp = this.optionLabel();
    return labelProp ? option[labelProp] : option;
  }

  getValue(option: any): any {
    const valueProp = this.optionValue();
    return valueProp ? option[valueProp] : option;
  }

  onFilterInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.filterValue.set(val);
  }

  clear(event: Event) {
    if (this.isDisabled()) return;
    event.stopPropagation();
    this.value.set(null);
    this.onChange(null);
    this.onTouched();
  }

  // CVA Implementation
  writeValue(obj: any): void {
    this.value.set(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}
