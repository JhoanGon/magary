import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
  booleanAttribute,
  forwardRef,
  inject,
  input,
  signal,
  computed,
  AfterViewInit,
  Injector,
  numberAttribute,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'magary-textarea',
  standalone: true,
  imports: [],
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MagaryTextArea),
      multi: true,
    },
  ],
})
export class MagaryTextArea implements ControlValueAccessor, AfterViewInit {
  textarea = viewChild<ElementRef<HTMLTextAreaElement>>('textarea');

  readonly rows = input(3, { transform: numberAttribute });
  readonly cols = input(20, { transform: numberAttribute });
  readonly placeholder = input<string>();
  readonly autoResize = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly inputId = input<string>('');
  readonly ariaLabel = input<string>('');
  readonly ariaLabelledby = input<string>('');
  readonly ariaDescribedby = input<string>('');
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly errorMessage = input<string>('');
  readonly helpText = input<string>('');
  private readonly formDisabled = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  // Counter
  readonly maxlength = input<number | null, unknown>(null, {
    transform: numberAttribute,
  });
  readonly showCounter = input(false, { transform: booleanAttribute });

  // Internal State
  readonly value = signal<string>('');
  readonly length = computed(() => this.value().length);
  readonly uniqueId = `magary-textarea-${Math.random().toString(36).substring(2, 11)}`;
  readonly errorMessageId = `${this.uniqueId}-error`;
  readonly helpMessageId = `${this.uniqueId}-help`;
  readonly resolvedInputId = computed(() => this.inputId().trim() || this.uniqueId);
  private readonly injector = inject(Injector);

  // CVA Callbacks
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  private touched = false;
  private resolvedNgControl: NgControl | null | undefined;

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
    this.markAsTouched();
  }

  onFocus() {
    // Focus logic if needed
  }

  resize() {
    const textarea = this.textarea();
    if (!textarea) {
      return;
    }

    const el = textarea.nativeElement;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }

  isInvalid(): boolean {
    return this.invalid() || this.hasControlError();
  }

  hasVisibleErrorMessage(): boolean {
    return this.isInvalid() && this.errorMessage().trim().length > 0;
  }

  describedBy(): string | null {
    const ids = [this.ariaDescribedby().trim()];

    if (this.hasVisibleErrorMessage()) {
      ids.push(this.errorMessageId);
    } else if (this.helpText().trim().length > 0) {
      ids.push(this.helpMessageId);
    }

    const filteredIds = ids.filter((id) => id.length > 0);
    return filteredIds.length > 0 ? filteredIds.join(' ') : null;
  }

  // CVA
  writeValue(obj: string | null): void {
    const val = obj == null ? '' : String(obj);
    this.value.set(val);
    const textarea = this.textarea();
    if (textarea) {
      textarea.nativeElement.value = val;
      if (this.autoResize()) {
        setTimeout(() => this.resize(), 0); // Tick definition for direct value set
      }
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  private markAsTouched(): void {
    if (this.touched) {
      return;
    }

    this.touched = true;
    this.onTouched();
  }

  private hasControlError(): boolean {
    const control = this.getNgControl()?.control;
    return !!control && control.invalid && control.touched;
  }

  private getNgControl(): NgControl | null {
    if (this.resolvedNgControl !== undefined) {
      return this.resolvedNgControl;
    }

    this.resolvedNgControl = this.injector.get(NgControl, null, {
      self: true,
      optional: true,
    });
    return this.resolvedNgControl;
  }
}
