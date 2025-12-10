import {
  Component,
  ElementRef,
  HostListener,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { MagaryButton } from '../../Button/button/button';

@Component({
  selector: 'magary-select',
  standalone: true,
  imports: [CommonModule, LucideAngularModule], // Internal reuse rule
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
  // Signal Inputs based on Rules
  readonly options = input<any[]>([]);
  readonly optionLabel = input<string>();
  readonly optionValue = input<string>();
  readonly placeholder = input<string>('Select an option');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly filter = input(false, { transform: booleanAttribute });
  readonly showClear = input(false, { transform: booleanAttribute });

  // Internal State
  readonly isOpen = signal(false);
  readonly focused = signal(false);
  readonly value = signal<any>(null); // Actual value of the selection
  readonly filterValue = signal('');

  // CVA Callbacks
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private elementRef: ElementRef) {}

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
    if (!val) return '';
    const opts = this.options();

    // Find option that matches value
    const selectedOption = opts.find((opt) => this.getValue(opt) === val);
    return selectedOption ? this.getLabel(selectedOption) : '';
  });

  readonly hasValue = computed(
    () =>
      this.value() !== null &&
      this.value() !== undefined &&
      this.value() !== '',
  );

  toggleOverlay() {
    if (this.disabled() || this.loading()) return;
    this.isOpen.update((v) => !v);
    if (this.isOpen()) {
      this.focused.set(true);
    } else {
      this.onTouched();
    }
  }

  selectOption(option: any) {
    const val = this.getValue(option);
    this.value.set(val);
    this.onChange(val);
    this.isOpen.set(false);
    this.focused.set(true); // Keep focus style
  }

  isSelected(option: any): boolean {
    return this.getValue(option) === this.value();
  }

  // Utilities to handle Object vs Primitive options
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
    event.stopPropagation();
    this.value.set(null);
    this.onChange(null);
    this.onTouched();
  }

  // Click Outside Listener
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
      this.focused.set(false);
      this.onTouched();
    }
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
    // We can't write to a signal input, but the CVA contract implies managing disabled state.
    // In signal-input paradigm, the parent should bind [disabled].
    // However, CVA setDisabledState is usually called by reactive forms.
    // We might need a separate signal if we want to support both.
    // effectively merging input disabled + form disabled.
    // For now, we rely on the input, assuming correct usage.
    // Ideally we would merge: effectiveDisabled = computed(() => this.disabled() || this.formDisabled())
  }
}
