import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  Renderer2,
  ChangeDetectorRef,
  inject,
  input,
  signal,
  computed,
  effect,
  model,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';

export const SLIDER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MagarySlider),
  multi: true,
};

@Component({
  selector: 'magary-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  providers: [SLIDER_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'magary-slider',
    '[class.magary-slider-horizontal]': 'orientation() === "horizontal"',
    '[class.magary-slider-vertical]': 'orientation() === "vertical"',
    '[class.magary-disabled]': 'disabled()',
  },
})
export class MagarySlider implements ControlValueAccessor, OnDestroy {
  // Inputs
  min = input<number>(0);
  max = input<number>(100);
  step = input<number>(1);
  range = input<boolean>(false);
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  disabled = input<boolean>(false);
  style = input<{ [klass: string]: any } | null>(null);
  styleClass = input<string>('');

  @Output() onChange = new EventEmitter<any>();
  @Output() onSlideEnd = new EventEmitter<any>();

  @ViewChild('sliderHandle') sliderHandle!: ElementRef;
  @ViewChild('sliderHandleStart') sliderHandleStart!: ElementRef;
  @ViewChild('sliderHandleEnd') sliderHandleEnd!: ElementRef;

  value = model<number | number[] | null>(null);

  // Internal state
  dragging = signal<boolean>(false);
  handleIndex = signal<number | null>(null); // 0 for start/single, 1 for end

  private document = inject(DOCUMENT);
  private renderer = inject(Renderer2);
  private cdr = inject(ChangeDetectorRef);
  private el = inject(ElementRef);

  private dragListener: (() => void) | null = null;
  private upListener: (() => void) | null = null;

  // Computed values for view
  handle1Pos = computed(() => {
    if (this.range()) {
      const v = this.value() as number[];
      if (!v) return 0;
      return this.calculatePos(v[0]);
    } else {
      const v = this.value() as number;
      if (v === null) return 0;
      return this.calculatePos(v);
    }
  });

  handle2Pos = computed(() => {
    if (this.range()) {
      const v = this.value() as number[];
      if (!v) return 100;
      return this.calculatePos(v[1]);
    }
    return 0; // Not used
  });

  rangeStartPos = computed(() => {
    if (this.range()) {
      return this.handle1Pos();
    }
    return 0;
  });

  rangeWidth = computed(() => {
    if (this.range()) {
      return this.handle2Pos() - this.handle1Pos();
    }
    return this.handle1Pos();
  });

  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  constructor() {}

  calculatePos(val: number): number {
    const min = this.min();
    const max = this.max();
    if (val < min) val = min;
    if (val > max) val = max;
    return ((val - min) / (max - min)) * 100;
  }

  updateValue(val: number, handleIdx: number = 0) {
    if (this.range()) {
      let current = [
        ...((this.value() as number[]) || [this.min(), this.max()]),
      ];

      // Constrain
      if (handleIdx === 0) {
        if (val > current[1]) val = current[1];
      } else {
        if (val < current[0]) val = current[0];
      }

      current[handleIdx] = val;
      this.value.set(current);
      this.onModelChange(current);
      this.onChange.emit({ originalEvent: event, value: current });
    } else {
      this.value.set(val);
      this.onModelChange(val);
      this.onChange.emit({ originalEvent: event, value: val });
    }
  }

  calculateValueFromPos(pos: number): number {
    // pos is 0-1 percentage-ish
    if (pos < 0) pos = 0;
    if (pos > 1) pos = 1;

    const min = this.min();
    const max = this.max();
    const step = this.step();

    let rawValue = (max - min) * pos + min;

    // Step snapping
    // round( (rawValue - min) / step ) * step + min
    let steps = Math.round((rawValue - min) / step);
    let value = steps * step + min;

    // Float precision fix
    // simple approach: assume step precision
    // Or simpler: Number(value.toFixed(10)) logic?

    return value;
  }

  // Events
  onMouseDown(event: MouseEvent, index: number) {
    if (this.disabled()) return;

    event.preventDefault(); // prevent selection
    this.dragging.set(true);
    this.handleIndex.set(index);
    this.bindDragListeners();
  }

  onBarClick(event: MouseEvent) {
    if (this.disabled() || this.dragging()) return;
    // Calculate clicked value
    // Decide which handle to move if range

    const rect = this.el.nativeElement
      .querySelector('.magary-slider-rail')
      .getBoundingClientRect();
    const vertical = this.orientation() === 'vertical';

    let percent = vertical
      ? (rect.bottom - event.clientY) / rect.height
      : (event.clientX - rect.left) / rect.width;

    const newVal = this.calculateValueFromPos(percent);

    if (this.range()) {
      const current = (this.value() as number[]) || [this.min(), this.max()];
      const dist1 = Math.abs(current[0] - newVal);
      const dist2 = Math.abs(current[1] - newVal);

      if (dist1 < dist2) {
        this.updateValue(newVal, 0);
      } else if (dist2 < dist1) {
        this.updateValue(newVal, 1);
      } else {
        // Equal distance, maybe move the nearest or start?
        // Typically move the one that creates a valid range or user intent.
        // Logic: if click is < v0, move v0. if click > v1, move v1. if in between, closest.
        if (newVal < current[0]) this.updateValue(newVal, 0);
        else if (newVal > current[1]) this.updateValue(newVal, 1);
        else this.updateValue(newVal, 0); // Default to start?
      }
    } else {
      this.updateValue(newVal, 0);
    }
  }

  bindDragListeners() {
    if (!this.dragListener) {
      this.dragListener = this.renderer.listen(
        this.document,
        'mousemove',
        (event) => {
          this.onDrag(event);
        },
      );
    }
    if (!this.upListener) {
      this.upListener = this.renderer.listen(
        this.document,
        'mouseup',
        (event) => {
          this.onDragEnd(event);
        },
      );
    }
  }

  unbindDragListeners() {
    if (this.dragListener) {
      this.dragListener();
      this.dragListener = null;
    }
    if (this.upListener) {
      this.upListener();
      this.upListener = null;
    }
  }

  onDrag(event: MouseEvent) {
    if (this.dragging()) {
      const rect = this.el.nativeElement
        .querySelector('.magary-slider-rail')
        .getBoundingClientRect();
      const vertical = this.orientation() === 'vertical';

      let percent = vertical
        ? (rect.bottom - event.clientY) / rect.height
        : (event.clientX - rect.left) / rect.width;

      const newVal = this.calculateValueFromPos(percent);
      this.updateValue(newVal, this.handleIndex()!);
    }
  }

  onDragEnd(event: MouseEvent) {
    if (this.dragging()) {
      this.dragging.set(false);
      this.handleIndex.set(null);
      this.unbindDragListeners();
      this.onSlideEnd.emit({ originalEvent: event, value: this.value() });
    }
  }

  // CVA
  writeValue(value: any): void {
    this.value.set(value);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Input signal disabled could be updated if it wasn't readonly.
    // But typically we rely on input binding `[disabled]`.
  }

  ngOnDestroy() {
    this.unbindDragListeners();
  }
}
