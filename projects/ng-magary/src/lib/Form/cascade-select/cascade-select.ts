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

@Component({
  selector: 'magary-cascade-select',
  standalone: true,
  imports: [CommonModule],
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

  public options = input<any[]>([]);
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

  // Computed que combina ambos (OR lógico)
  public disabled = computed(() => this._disabled() || this.disabledInput());

  public isOpen = signal(false);
  public value = signal<any>(null);
  public activeOption = signal<any>(null);

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  public selectedLabel = computed(() => {
    const val = this.value();
    if (!val) return this.placeholder();

    const findLabel = (opts: any[]): string | null => {
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

  public getOptionLabel(option: any): string {
    if (this.isOptionGroup(option)) {
      const groupLabel = this.optionGroupLabel();
      if (groupLabel) {
        if (typeof groupLabel === 'string') {
          return option[groupLabel];
        }
      }
    }
    return option[this.optionLabel()];
  }

  public getOptionValue(option: any): any {
    const valueKey = this.optionValue();
    return valueKey ? option[valueKey] : option;
  }

  public getOptionChildren(option: any): any[] | null {
    for (const childKey of this.optionGroupChildren()) {
      if (option[childKey]) {
        return option[childKey];
      }
    }
    return null;
  }

  public isOptionGroup(option: any): boolean {
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

  public selectOption(option: any, event: Event) {
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
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
      this.onTouched();
    }
  }

  writeValue(obj: any): void {
    this.value.set(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }
}
