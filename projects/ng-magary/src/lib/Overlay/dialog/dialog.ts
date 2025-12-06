import {
  Component,
  ElementRef,
  Renderer2,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  computed,
  signal,
  effect,
  model,
  booleanAttribute,
  input,
  output,
  viewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent,
} from '@angular/animations';

@Component({
  selector: 'magary-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('maskAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 0 })),
      ]),
    ]),
    trigger('dialogAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.9)', opacity: 0 }),
        animate(
          '300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ transform: 'scale(1)', opacity: 1 }),
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ transform: 'scale(0.9)', opacity: 0 }),
        ),
      ]),
    ]),
  ],
})
export class MagaryDialog {
  // Model for two-way binding of visibility
  visible = model<boolean>(false);

  // Inputs
  header = input<string | undefined>(undefined);
  draggable = input(true, { transform: booleanAttribute });
  resizable = input(false, { transform: booleanAttribute });
  modal = input(true, { transform: booleanAttribute });
  closeOnEscape = input(true, { transform: booleanAttribute });
  dismissableMask = input(false, { transform: booleanAttribute });
  maximizable = input(false, { transform: booleanAttribute });
  style = input<any>(null);
  contentStyle = input<any>(null);
  styleClass = input<string | undefined>(undefined);
  appendTo = input<'body' | 'local'>('body');

  // Aesthetic Inputs
  width = input<string | undefined>(undefined);
  height = input<string | undefined>(undefined);
  position = input<
    | 'center'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
  >('center');
  backgroundColor = input<string | undefined>(undefined);
  glass = input(false, { transform: booleanAttribute });

  // Outputs
  onShow = output<AnimationEvent>();
  onHide = output<AnimationEvent>();

  // ViewChild
  containerViewChild =
    viewChild.required<ElementRef<HTMLDivElement>>('container');
  contentViewChild = viewChild.required<ElementRef<HTMLDivElement>>('content');
  headerViewChild =
    viewChild.required<ElementRef<HTMLDivElement>>('headerElement');

  // Internal State
  maximized = signal(false);
  resizing = signal(false);
  dragging = signal(false);

  // Drag/Resize State
  private lastPageX = 0;
  private lastPageY = 0;
  private startWidth = 0;
  private startHeight = 0;
  private startX = 0;
  private startY = 0;

  // Listeners
  private documentMouseMoveListener: (() => void) | null = null;
  private documentMouseUpListener: (() => void) | null = null;

  public el = inject(ElementRef);
  public renderer = inject(Renderer2);

  constructor() {
    // Effect to handle body scroll locking when modal is visible
    effect(() => {
      if (this.visible() && this.modal()) {
        this.blockBodyScroll();
      } else {
        this.unblockBodyScroll();
      }
    });

    // Effect to handle focus trap or other side effects if needed
  }

  // --- Public Methods ---

  close(event: Event) {
    this.visible.set(false);
    event.preventDefault();
  }

  maximize(event: Event) {
    if (this.maximizable()) {
      this.maximized.update((v) => !v);
      event.preventDefault();
    }
  }

  onMaskClick(event: MouseEvent) {
    if (this.resizing() || this.dragging()) {
      return;
    }

    if (
      this.dismissableMask() &&
      this.modal() &&
      this.visible() &&
      event.target === event.currentTarget
    ) {
      this.close(event);
    }
  }

  // --- Dragging Logic ---

  initDrag(event: MouseEvent) {
    if (this.draggable() && !this.maximized()) {
      this.dragging.set(true);
      this.lastPageX = event.pageX;
      this.lastPageY = event.pageY;

      const container = this.containerViewChild().nativeElement;
      const rect = container.getBoundingClientRect();
      this.startX = rect.left;
      this.startY = rect.top;

      // Ensure absolute positioning for dragging if likely to move
      // Note: Premium libraries often switch to fixed/absolute on first drag
      // Here we assume the dialog container might need position styles applied

      this.renderer.addClass(document.body, 'magary-dragging');
      this.bindGlobalListeners('drag');
      event.preventDefault();
    }
  }

  onDrag(event: MouseEvent) {
    if (this.dragging()) {
      const deltaX = event.pageX - this.lastPageX;
      const deltaY = event.pageY - this.lastPageY;

      const container = this.containerViewChild().nativeElement;

      // We rely on transform for smoother performance
      // Get current transform
      const computedStyle = getComputedStyle(container);
      const matrix = new WebKitCSSMatrix(computedStyle.transform);
      const currentX = matrix.m41;
      const currentY = matrix.m42;

      const newX = currentX + deltaX;
      const newY = currentY + deltaY;

      this.renderer.setStyle(
        container,
        'transform',
        `translate3d(${newX}px, ${newY}px, 0)`,
      );

      this.lastPageX = event.pageX;
      this.lastPageY = event.pageY;
    }
  }

  endDrag() {
    this.renderer.removeClass(document.body, 'magary-dragging');
    this.unbindGlobalListeners();
    setTimeout(() => {
      this.dragging.set(false);
    }, 50);
  }

  // --- Resizing Logic ---

  initResize(event: MouseEvent) {
    if (this.resizable() && !this.maximized()) {
      this.resizing.set(true);
      this.lastPageX = event.pageX;
      this.lastPageY = event.pageY;

      const container = this.containerViewChild().nativeElement;
      this.startWidth = container.offsetWidth;
      this.startHeight = container.offsetHeight;

      this.renderer.addClass(document.body, 'magary-resizing');
      this.bindGlobalListeners('resize');
      event.preventDefault();
    }
  }

  onResize(event: MouseEvent) {
    if (this.resizing()) {
      const deltaX = event.pageX - this.lastPageX;
      const deltaY = event.pageY - this.lastPageY;

      const container = this.containerViewChild().nativeElement;
      const newWidth = Math.max(this.startWidth + deltaX, 300); // Min width constraint
      const newHeight = Math.max(this.startHeight + deltaY, 150); // Min height constraint

      this.renderer.setStyle(container, 'width', `${newWidth}px`);
      this.renderer.setStyle(container, 'height', `${newHeight}px`);
    }
  }

  endResize() {
    this.renderer.removeClass(document.body, 'magary-resizing');
    this.unbindGlobalListeners();
    setTimeout(() => {
      this.resizing.set(false);
    }, 50);
  }

  // --- Event Listeners Helpers ---

  private bindGlobalListeners(type: 'drag' | 'resize') {
    if (type === 'drag') {
      this.documentMouseMoveListener = this.renderer.listen(
        'document',
        'mousemove',
        (e) => this.onDrag(e),
      );
      this.documentMouseUpListener = this.renderer.listen(
        'document',
        'mouseup',
        () => this.endDrag(),
      );
    } else {
      this.documentMouseMoveListener = this.renderer.listen(
        'document',
        'mousemove',
        (e) => this.onResize(e),
      );
      this.documentMouseUpListener = this.renderer.listen(
        'document',
        'mouseup',
        () => this.endResize(),
      );
    }
  }

  private unbindGlobalListeners() {
    if (this.documentMouseMoveListener) {
      this.documentMouseMoveListener();
      this.documentMouseMoveListener = null;
    }
    if (this.documentMouseUpListener) {
      this.documentMouseUpListener();
      this.documentMouseUpListener = null;
    }
  }

  // --- Utilities ---

  private blockBodyScroll() {
    this.renderer.addClass(document.body, 'magary-overflow-hidden');
  }

  private unblockBodyScroll() {
    this.renderer.removeClass(document.body, 'magary-overflow-hidden');
  }
}
