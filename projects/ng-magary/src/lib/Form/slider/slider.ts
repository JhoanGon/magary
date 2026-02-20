import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Output,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnDestroy,
  Renderer2,
  ChangeDetectorRef,
  inject,
  input,
  signal,
  computed,
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
    '[class.magary-disabled]': 'isDisabled()',
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
  private formDisabled = signal<boolean>(false);
  isDisabled = computed(() => this.disabled() || this.formDisabled());
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
  private touchMoveListener: (() => void) | null = null;
  private touchEndListener: (() => void) | null = null;
  private touchCancelListener: (() => void) | null = null;

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

  updateValue(
    val: number,
    handleIdx: number = 0,
    originalEvent?: MouseEvent | Event,
  ) {
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
      this.onChange.emit({ originalEvent, value: current });
    } else {
      this.value.set(val);
      this.onModelChange(val);
      this.onChange.emit({ originalEvent, value: val });
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
    if (this.isDisabled()) return;

    event.preventDefault(); // prevent selection
    this.dragging.set(true);
    this.handleIndex.set(index);
    this.bindDragListeners();
  }

  onTouchStart(event: TouchEvent, index: number): void {
    if (this.isDisabled()) return;

    if (event.cancelable) {
      event.preventDefault();
    }
    event.stopPropagation();

    this.dragging.set(true);
    this.handleIndex.set(index);
    this.bindTouchListeners();
  }

  onBarTouchStart(event: TouchEvent): void {
    if (this.isDisabled() || this.dragging()) return;

    const touch = event.touches[0];
    if (!touch) return;

    if (event.cancelable) {
      event.preventDefault();
    }

    this.updateValueFromClientPosition(touch.clientX, touch.clientY, event);
  }

  onBarClick(event: MouseEvent) {
    if (this.isDisabled() || this.dragging()) return;
    this.updateValueFromClientPosition(event.clientX, event.clientY, event);
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

  bindTouchListeners(): void {
    if (!this.touchMoveListener) {
      this.touchMoveListener = this.renderer.listen(
        this.document,
        'touchmove',
        (event) => {
          this.onTouchMove(event);
        },
      );
    }
    if (!this.touchEndListener) {
      this.touchEndListener = this.renderer.listen(
        this.document,
        'touchend',
        (event) => {
          this.onTouchEnd(event);
        },
      );
    }
    if (!this.touchCancelListener) {
      this.touchCancelListener = this.renderer.listen(
        this.document,
        'touchcancel',
        (event) => {
          this.onTouchEnd(event);
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

  unbindTouchListeners(): void {
    if (this.touchMoveListener) {
      this.touchMoveListener();
      this.touchMoveListener = null;
    }
    if (this.touchEndListener) {
      this.touchEndListener();
      this.touchEndListener = null;
    }
    if (this.touchCancelListener) {
      this.touchCancelListener();
      this.touchCancelListener = null;
    }
  }

  onDrag(event: MouseEvent) {
    if (this.dragging()) {
      this.updateDragFromClientPosition(event.clientX, event.clientY, event);
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

  onTouchMove(event: TouchEvent): void {
    if (!this.dragging()) return;

    const touch = event.touches[0];
    if (!touch) return;

    if (event.cancelable) {
      event.preventDefault();
    }

    this.updateDragFromClientPosition(touch.clientX, touch.clientY, event);
  }

  onTouchEnd(event: TouchEvent): void {
    if (this.dragging()) {
      this.dragging.set(false);
      this.handleIndex.set(null);
      this.unbindTouchListeners();
      this.onSlideEnd.emit({ originalEvent: event, value: this.value() });
    }
  }

  private getRailRect(): DOMRect {
    return this.el.nativeElement
      .querySelector('.magary-slider-rail')
      .getBoundingClientRect();
  }

  private calculatePercentFromPosition(
    clientX: number,
    clientY: number,
    rect: DOMRect,
  ): number {
    return this.orientation() === 'vertical'
      ? (rect.bottom - clientY) / rect.height
      : (clientX - rect.left) / rect.width;
  }

  private updateValueFromClientPosition(
    clientX: number,
    clientY: number,
    originalEvent?: Event,
  ): void {
    const rect = this.getRailRect();
    const percent = this.calculatePercentFromPosition(clientX, clientY, rect);
    const newVal = this.calculateValueFromPos(percent);

    if (!this.range()) {
      this.updateValue(newVal, 0, originalEvent);
      return;
    }

    const current = (this.value() as number[]) || [this.min(), this.max()];
    const dist1 = Math.abs(current[0] - newVal);
    const dist2 = Math.abs(current[1] - newVal);

    if (dist1 < dist2) {
      this.updateValue(newVal, 0, originalEvent);
    } else if (dist2 < dist1) {
      this.updateValue(newVal, 1, originalEvent);
    } else if (newVal < current[0]) {
      this.updateValue(newVal, 0, originalEvent);
    } else if (newVal > current[1]) {
      this.updateValue(newVal, 1, originalEvent);
    } else {
      this.updateValue(newVal, 0, originalEvent);
    }
  }

  private updateDragFromClientPosition(
    clientX: number,
    clientY: number,
    originalEvent?: Event,
  ): void {
    const rect = this.getRailRect();
    const percent = this.calculatePercentFromPosition(clientX, clientY, rect);
    const newVal = this.calculateValueFromPos(percent);
    this.updateValue(newVal, this.handleIndex()!, originalEvent);
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
    this.formDisabled.set(isDisabled);
  }

  ngOnDestroy() {
    this.unbindDragListeners();
    this.unbindTouchListeners();
  }
}
