import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  forwardRef,
  ElementRef,
  HostListener,
  inject,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

type CascadeSelectOption = Record<string, unknown>;

@Component({
  selector: 'magary-cascade-select',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './cascade-select.html',
  styleUrl: './cascade-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MagaryCascadeSelect),
      multi: true,
    },
  ],
})
export class MagaryCascadeSelect implements ControlValueAccessor {
  private elementRef = inject(ElementRef);

  public options = input<CascadeSelectOption[]>([]);
  public optionLabel = input<string>('label');
  public optionValue = input<string | null>(null);
  public optionGroupLabel = input<string[] | string | null>(null);
  public optionGroupChildren = input<string[]>(['children']);
  public placeholder = input<string>('Select an option');
  // Input externo: [disabled]="true"
  protected disabledInput = input<boolean>(false, { alias: 'disabled' });
  public width = input<string>('100%');
  public optionGroupSelectable = input<boolean>(false);

  // Signal interno: setDisabledState(true) desde Reactive Forms
  private _disabled = signal<boolean>(false);

  // Computed que combina ambos (OR logico)
  public disabled = computed(() => this._disabled() || this.disabledInput());

  public isOpen = signal(false);
  public value = signal<unknown>(null);

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  public selectedLabel = computed(() => {
    const val = this.value();
    if (val === null || val === undefined || val === '') {
      return this.placeholder();
    }

    const findLabel = (opts: CascadeSelectOption[]): string | null => {
      for (const opt of opts) {
        if (this.getOptionValue(opt) === val) {
          return this.getOptionLabel(opt);
        }
        const children = this.getOptionChildren(opt);
        if (children && children.length > 0) {
          const found = findLabel(children);
          if (found) return found;
        }
      }
      return null;
    };

    return findLabel(this.options()) || this.placeholder();
  });

  public getOptionLabel(option: CascadeSelectOption): string {
    if (this.isOptionGroup(option)) {
      const groupLabel = this.optionGroupLabel();
      if (groupLabel && typeof groupLabel === 'string') {
        return String(option[groupLabel] ?? '');
      }
    }
    return String(option[this.optionLabel()] ?? '');
  }

  public getOptionValue(option: CascadeSelectOption): unknown {
    const valueKey = this.optionValue();
    return valueKey ? option[valueKey] : option;
  }

  public getOptionChildren(option: CascadeSelectOption): CascadeSelectOption[] | null {
    for (const childKey of this.optionGroupChildren()) {
      const children = option[childKey];
      if (Array.isArray(children)) {
        return children as CascadeSelectOption[];
      }
    }
    return null;
  }

  public isOptionGroup(option: CascadeSelectOption): boolean {
    const children = this.getOptionChildren(option);
    return !!children && children.length > 0;
  }

  public toggle() {
    if (this.disabled()) return;
    this.isOpen.update((v) => !v);
    if (!this.isOpen()) {
      this.onTouched();
    }
  }

  public selectOption(option: CascadeSelectOption, event: Event) {
    event.stopPropagation();

    const isGroup = this.isOptionGroup(option);
    if (isGroup && !this.optionGroupSelectable()) {
      return;
    }

    const val = this.getOptionValue(option);

    this.value.set(val);
    this.onChange(val);
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target as Node | null)) {
      this.isOpen.set(false);
      this.onTouched();
    }
  }

  writeValue(obj: unknown): void {
    this.value.set(obj);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }
}
