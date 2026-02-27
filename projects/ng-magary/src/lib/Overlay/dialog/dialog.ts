import {
  Component,
  ElementRef,
  Renderer2,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  signal,
  effect,
  model,
  booleanAttribute,
  input,
  output,
  viewChild,
  inject,
  AfterViewInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
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
  imports: [CommonModule, LucideAngularModule],
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
export class MagaryDialog implements AfterViewInit, OnDestroy {
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
  trapFocus = input(true, { transform: booleanAttribute });
  autoFocus = input(true, { transform: booleanAttribute });
  ariaLabel = input<string>('Dialog');
  style = input<Record<string, unknown> | null>(null);
  contentStyle = input<Record<string, unknown> | null>(null);
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
  headerBackground = input<string | undefined>(undefined);
  contentBackground = input<string | undefined>(undefined);
  footerBackground = input<string | undefined>(undefined);
  showBorder = input(true, { transform: booleanAttribute });
  showSectionBorders = input(true, { transform: booleanAttribute });
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
  private previouslyFocusedElement: HTMLElement | null = null;
  private readonly focusableSelectors =
    'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), ' +
    'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  readonly titleId = `magary-dialog-title-${Math.random().toString(36).substring(2, 11)}`;

  // Drag/Resize State
  private lastClientX = 0;
  private lastClientY = 0;
  private startWidth = 0;
  private startHeight = 0;
  private activeDragPointerId: number | null = null;
  private activeResizePointerId: number | null = null;
  private destroyed = false;

  // Listeners
  private documentPointerMoveListener: (() => void) | null = null;
  private documentPointerUpListener: (() => void) | null = null;
  private documentPointerCancelListener: (() => void) | null = null;

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

    let wasVisible = false;
    effect(() => {
      const isVisible = this.visible();

      if (isVisible && !wasVisible) {
        this.previouslyFocusedElement =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;

        if (this.autoFocus()) {
          queueMicrotask(() => this.focusInitialElement());
        }
      }

      if (!isVisible && wasVisible) {
        this.restorePreviousFocus();
      }

      wasVisible = isVisible;
    });
  }

  ngAfterViewInit() {
    if (this.appendTo() === 'body') {
      this.renderer.appendChild(document.body, this.el.nativeElement);
    }
  }

  ngOnDestroy() {
    // If we moved it to body, Angular should usually handle removal,
    // but to be safe and cleaner we can ensure cleanup if needed.
    // In standard Angular, removing the component destroys the view and removes the host.
    // However, since we moved it, let's explicitely check if we need to remove, though Angular usually tracks the node.
    // Actually, simpler: if we moved it, we leave it to Angular to remove.
    // But we should unblock scroll just in case.
    this.cancelInteractions();
    this.unblockBodyScroll();
    this.destroyed = true;
  }

  // --- Public Methods ---

  close(event?: Event) {
    if (!this.visible()) return;

    this.cancelInteractions();
    this.visible.set(false);
    event?.preventDefault();
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

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event) {
    if (!this.visible() || !this.closeOnEscape()) return;
    this.close(event);
  }

  onDialogKeydown(event: KeyboardEvent) {
    if (event.key !== 'Tab' || !this.visible() || !this.trapFocus()) {
      return;
    }

    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) {
      event.preventDefault();
      this.containerViewChild().nativeElement.focus();
      return;
    }

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;
    const activeInsideDialog =
      activeElement instanceof HTMLElement &&
      this.containerViewChild().nativeElement.contains(activeElement);

    if (event.shiftKey) {
      if (!activeInsideDialog || activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
      return;
    }

    if (!activeInsideDialog || activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }

  handleDialogAnimationStart(event: AnimationEvent) {
    if (!this.destroyed && event.toState !== 'void') {
      this.onShow.emit(event);
    }
  }

  handleDialogAnimationDone(event: AnimationEvent) {
    if (!this.destroyed && event.toState === 'void') {
      this.onHide.emit(event);
    }
  }

  // --- Dragging Logic ---

  initDrag(event: PointerEvent) {
    if (!this.draggable() || this.maximized()) return;
    if (!this.isPrimaryPointer(event)) return;
    if (this.activeDragPointerId !== null || this.resizing()) return;
    if (this.isHeaderActionTarget(event.target)) return;

    this.activeDragPointerId = event.pointerId;
    this.dragging.set(true);
    this.lastClientX = event.clientX;
    this.lastClientY = event.clientY;

    const currentTarget = event.currentTarget as HTMLElement | null;
    currentTarget?.setPointerCapture?.(event.pointerId);

    this.renderer.addClass(document.body, 'magary-dragging');
    this.bindGlobalListeners('drag');
    event.preventDefault();
  }

  onDrag(event: PointerEvent) {
    if (!this.dragging()) return;
    if (
      this.activeDragPointerId !== null &&
      event.pointerId !== this.activeDragPointerId
    ) {
      return;
    }

    const deltaX = event.clientX - this.lastClientX;
    const deltaY = event.clientY - this.lastClientY;

    const container = this.containerViewChild().nativeElement;
    const { x: currentX, y: currentY } = this.getCurrentTransform(container);
    const newX = currentX + deltaX;
    const newY = currentY + deltaY;

    this.renderer.setStyle(
      container,
      'transform',
      `translate3d(${newX}px, ${newY}px, 0)`,
    );

    this.lastClientX = event.clientX;
    this.lastClientY = event.clientY;
    event.preventDefault();
  }

  endDrag(event?: PointerEvent) {
    if (
      event &&
      this.activeDragPointerId !== null &&
      event.pointerId !== this.activeDragPointerId
    ) {
      return;
    }

    this.activeDragPointerId = null;
    this.renderer.removeClass(document.body, 'magary-dragging');
    this.unbindGlobalListeners();
    this.dragging.set(false);
  }

  // --- Resizing Logic ---

  initResize(event: PointerEvent) {
    if (!this.resizable() || this.maximized()) return;
    if (!this.isPrimaryPointer(event)) return;
    if (this.activeResizePointerId !== null || this.dragging()) return;

    this.activeResizePointerId = event.pointerId;
    this.resizing.set(true);
    this.lastClientX = event.clientX;
    this.lastClientY = event.clientY;

    const container = this.containerViewChild().nativeElement;
    this.startWidth = container.offsetWidth;
    this.startHeight = container.offsetHeight;

    const currentTarget = event.currentTarget as HTMLElement | null;
    currentTarget?.setPointerCapture?.(event.pointerId);

    this.renderer.addClass(document.body, 'magary-resizing');
    this.bindGlobalListeners('resize');
    event.preventDefault();
  }

  onResize(event: PointerEvent) {
    if (!this.resizing()) return;
    if (
      this.activeResizePointerId !== null &&
      event.pointerId !== this.activeResizePointerId
    ) {
      return;
    }

    const deltaX = event.clientX - this.lastClientX;
    const deltaY = event.clientY - this.lastClientY;

    const container = this.containerViewChild().nativeElement;
    const newWidth = Math.max(this.startWidth + deltaX, 300); // Min width constraint
    const newHeight = Math.max(this.startHeight + deltaY, 150); // Min height constraint

    this.renderer.setStyle(container, 'width', `${newWidth}px`);
    this.renderer.setStyle(container, 'height', `${newHeight}px`);
    event.preventDefault();
  }

  endResize(event?: PointerEvent) {
    if (
      event &&
      this.activeResizePointerId !== null &&
      event.pointerId !== this.activeResizePointerId
    ) {
      return;
    }

    this.activeResizePointerId = null;
    this.renderer.removeClass(document.body, 'magary-resizing');
    this.unbindGlobalListeners();
    this.resizing.set(false);
  }

  // --- Event Listeners Helpers ---

  private bindGlobalListeners(type: 'drag' | 'resize') {
    if (type === 'drag') {
      this.documentPointerMoveListener = this.renderer.listen(
        'document',
        'pointermove',
        (e) => this.onDrag(e),
      );
      this.documentPointerUpListener = this.renderer.listen(
        'document',
        'pointerup',
        (e) => this.endDrag(e),
      );
      this.documentPointerCancelListener = this.renderer.listen(
        'document',
        'pointercancel',
        (e) => this.endDrag(e),
      );
    } else {
      this.documentPointerMoveListener = this.renderer.listen(
        'document',
        'pointermove',
        (e) => this.onResize(e),
      );
      this.documentPointerUpListener = this.renderer.listen(
        'document',
        'pointerup',
        (e) => this.endResize(e),
      );
      this.documentPointerCancelListener = this.renderer.listen(
        'document',
        'pointercancel',
        (e) => this.endResize(e),
      );
    }
  }

  private unbindGlobalListeners() {
    if (this.documentPointerMoveListener) {
      this.documentPointerMoveListener();
      this.documentPointerMoveListener = null;
    }
    if (this.documentPointerUpListener) {
      this.documentPointerUpListener();
      this.documentPointerUpListener = null;
    }
    if (this.documentPointerCancelListener) {
      this.documentPointerCancelListener();
      this.documentPointerCancelListener = null;
    }
  }

  // --- Utilities ---

  private blockBodyScroll() {
    this.renderer.addClass(document.body, 'magary-overflow-hidden');
  }

  private unblockBodyScroll() {
    this.renderer.removeClass(document.body, 'magary-overflow-hidden');
  }

  private cancelInteractions() {
    this.activeDragPointerId = null;
    this.activeResizePointerId = null;
    this.unbindGlobalListeners();
    this.renderer.removeClass(document.body, 'magary-dragging');
    this.renderer.removeClass(document.body, 'magary-resizing');
    this.dragging.set(false);
    this.resizing.set(false);
  }

  private focusInitialElement() {
    if (!this.visible()) {
      return;
    }

    const focusableElements = this.getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
      return;
    }

    this.containerViewChild().nativeElement.focus();
  }

  private restorePreviousFocus() {
    const element = this.previouslyFocusedElement;
    this.previouslyFocusedElement = null;

    if (!element) {
      return;
    }

    if (document.contains(element)) {
      queueMicrotask(() => element.focus());
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const container = this.containerViewChild().nativeElement;
    const elements = Array.from(
      container.querySelectorAll<HTMLElement>(this.focusableSelectors),
    );

    return elements.filter((element) => this.isElementVisible(element));
  }

  private isElementVisible(element: HTMLElement): boolean {
    const style = getComputedStyle(element);
    return style.visibility !== 'hidden' && style.display !== 'none';
  }

  private isPrimaryPointer(event: PointerEvent): boolean {
    if (!event.isPrimary) return false;
    if (event.pointerType === 'mouse') {
      return event.button === 0;
    }
    return true;
  }

  private isHeaderActionTarget(target: EventTarget | null): boolean {
    return (
      target instanceof HTMLElement &&
      !!target.closest('.magary-dialog-header-icon')
    );
  }

  private getCurrentTransform(element: HTMLElement): { x: number; y: number } {
    const transform = getComputedStyle(element).transform;

    if (!transform || transform === 'none') {
      return { x: 0, y: 0 };
    }

    try {
      const matrix = new DOMMatrixReadOnly(transform);
      return { x: matrix.m41, y: matrix.m42 };
    } catch {
      const match = transform.match(/matrix\(([^)]+)\)/);
      if (!match) return { x: 0, y: 0 };

      const values = match[1].split(',').map((v) => Number(v.trim()));
      return {
        x: values[4] || 0,
        y: values[5] || 0,
      };
    }
  }
}
