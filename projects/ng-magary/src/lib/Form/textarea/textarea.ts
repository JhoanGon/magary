import {
  Component,
  ElementRef,
  ViewChild,
  booleanAttribute,
  forwardRef,
  input,
  signal,
  computed,
  AfterViewInit,
  numberAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'magary-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MagaryTextArea),
      multi: true,
    },
  ],
})
export class MagaryTextArea implements ControlValueAccessor, AfterViewInit {
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  readonly rows = input(3, { transform: numberAttribute });
  readonly cols = input(20, { transform: numberAttribute });
  readonly placeholder = input<string>();
  readonly autoResize = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  // Counter
  readonly maxlength = input<any, unknown>(undefined, {
    transform: numberAttribute,
  });
  readonly showCounter = input(false, { transform: booleanAttribute });

  // Internal State
  readonly value = signal<string>('');
  readonly length = computed(() => this.value().length);

  // CVA Callbacks
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngAfterViewInit() {
    if (this.autoResize()) {
      this.resize();
    }
  }

  onInput(event: Event) {
    const val = (event.target as HTMLTextAreaElement).value;
    this.value.set(val);
    this.onChange(val);

    if (this.autoResize()) {
      this.resize();
    }
  }

  onBlur() {
    this.onTouched();
  }

  onFocus() {
    // Focus logic if needed
  }

  resize() {
    const el = this.textarea.nativeElement;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }

  // CVA
  writeValue(obj: any): void {
    const val = obj || '';
    this.value.set(val);
    if (this.textarea) {
      this.textarea.nativeElement.value = val;
      if (this.autoResize()) {
        setTimeout(() => this.resize(), 0); // Tick definition for direct value set
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // handled by input binding
  }
}
