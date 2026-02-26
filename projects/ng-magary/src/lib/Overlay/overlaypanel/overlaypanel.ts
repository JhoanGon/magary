import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  input,
  output,
  signal,
  viewChild,
  Renderer2,
  ChangeDetectorRef,
  OnDestroy,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'magary-overlaypanel',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './overlaypanel.html',
  styleUrl: './overlaypanel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('animation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scaleY(0.8)' }),
        animate(
          '120ms cubic-bezier(0, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
      transition(':leave', [animate('100ms linear', style({ opacity: 0 }))]),
    ]),
  ],
})
export class MagaryOverlayPanel implements OnDestroy {
  private static nextId = 0;
  dismissable = input(true, { transform: booleanAttribute });
  showCloseIcon = input(false, { transform: booleanAttribute });
  closeOnEscape = input(true, { transform: booleanAttribute });
  panelAriaLabel = input<string>('Overlay panel');
  onShow = output<void>();
  onHide = output<void>();
  container = viewChild<ElementRef<HTMLElement>>('container');

  visible = signal(false);
  panelId = signal(`magary-overlaypanel-${MagaryOverlayPanel.nextId++}`);
  target: HTMLElement | null = null;
  documentClickListener: (() => void) | null = null;
  documentKeydownListener: (() => void) | null = null;
  scrollListener: ((event: Event) => void) | null = null;
  resizeListener: ((event: Event) => void) | null = null;

  cd = inject(ChangeDetectorRef);
  renderer = inject(Renderer2);
  el = inject(ElementRef);
  document = inject(DOCUMENT);

  toggle(event: Event, target?: EventTarget | null) {
    if (this.visible()) {
      this.hide();
    } else {
      this.show(event, target);
    }
  }

  show(event: Event, target?: EventTarget | null) {
    this.target = this.resolveTarget(event, target);
    this.updateTargetA11yState(true);
    this.visible.set(true);
    this.onShow.emit();

    // Append to body to avoid z-index/transform issues
    // We need to wait for the view to be created by the signal change
    setTimeout(() => {
      const container = this.container();
      if (container) {
        this.renderer.appendChild(
          this.document.body,
          container.nativeElement,
        );
        this.alignWithTarget();
        this.bindDocumentClickListener();
        this.bindDocumentKeydownListener();
        this.bindScrollListener();
        this.bindResizeListener();
        this.cd.markForCheck();
      }
    });
  }

  hide() {
    this.visible.set(false);
    this.onHide.emit();
    this.unbindDocumentClickListener();
    this.unbindDocumentKeydownListener();
    this.unbindScrollListener();
    this.unbindResizeListener();
    this.updateTargetA11yState(false);
    this.target = null;

    // Optional: Remove from body immediately or let *ngIf handle it?
    // Since we moved the DOM node, *ngIf removing it from its original place in View might not remove it from Body.
    // We MUST remove it from body manually if we moved it.
    const container = this.container();
    if (container && container.nativeElement.parentNode === this.document.body) {
      this.renderer.removeChild(
        this.document.body,
        container.nativeElement,
      );
    }
  }

  alignWithTarget() {
    const container = this.container();
    if (!this.target || !container) return;

    const targetRect = this.target.getBoundingClientRect();
    const containerRect = container.nativeElement.getBoundingClientRect();
    const scrollY = window.scrollY || this.document.documentElement.scrollTop;
    const scrollX = window.scrollX || this.document.documentElement.scrollLeft;

    // Basic positioning: Bottom Left aligned
    let top = targetRect.bottom + scrollY + 5; // 5px gap
    let left = targetRect.left + scrollX;

    // Viewport check
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const viewportBottom = scrollY + viewportHeight;

    // If goes off screen right
    if (left + containerRect.width > viewportWidth) {
      left = targetRect.right + scrollX - containerRect.width;
      // If still off screen (element wider than target and aligned right), capped at viewport width
      if (left < 0) left = 10;
    }
    left = Math.max(scrollX + 10, left);

    // If goes off screen bottom, show above target
    if (top + containerRect.height > viewportBottom) {
      top = targetRect.top + scrollY - containerRect.height - 5;
    }
    top = Math.max(scrollY + 10, top);

    this.renderer.setStyle(container.nativeElement, 'top', `${top}px`);
    this.renderer.setStyle(container.nativeElement, 'left', `${left}px`);
    this.renderer.setStyle(
      container.nativeElement,
      'position',
      'absolute',
    );
    this.renderer.setStyle(container.nativeElement, 'display', 'block'); // Ensure it's not hidden
  }

  bindScrollListener() {
    if (!this.scrollListener) {
      // Use native addEventListener with capture: true to catch scroll of every parent container
      this.scrollListener = () => {
        if (this.visible()) {
          this.alignWithTarget();
        }
      };
      window.addEventListener('scroll', this.scrollListener, true);
    }
  }

  bindResizeListener() {
    if (!this.resizeListener) {
      this.resizeListener = () => {
        if (this.visible()) {
          this.alignWithTarget();
        }
      };
      window.addEventListener('resize', this.resizeListener);
    }
  }

  unbindScrollListener() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener, true);
      this.scrollListener = null;
    }
  }

  unbindResizeListener() {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
      this.resizeListener = null;
    }
  }

  bindDocumentClickListener() {
    if (!this.dismissable()) return;

    // Unbind existing listener if present
    if (this.documentClickListener) {
      this.unbindDocumentClickListener();
    }

    // We use a timeout to avoid immediate close if the click that opened it bubbles up
    setTimeout(() => {
      if (!this.documentClickListener && this.visible()) {
        this.documentClickListener = this.renderer.listen(
          'document',
          'click',
          (event) => {
            if (!this.visible()) {
              return;
            }

            // Check if click is inside the panel or is the target button
            const targetNode = event.target as Node | null;
            const isTarget =
              this.target &&
              targetNode &&
              (this.target === targetNode || this.target.contains(targetNode));
            const container = this.container();
            const isOutside =
              container &&
              targetNode &&
              !container.nativeElement.contains(targetNode);

            if (isOutside && !isTarget) {
              this.hide();
              this.cd.markForCheck();
            }
          },
        );
      }
    });
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  bindDocumentKeydownListener() {
    if (!this.closeOnEscape()) return;
    if (this.documentKeydownListener) {
      this.unbindDocumentKeydownListener();
    }

    this.documentKeydownListener = this.renderer.listen(
      'document',
      'keydown',
      (event: KeyboardEvent) => {
        if (event.key !== 'Escape' || !this.visible()) {
          return;
        }
        event.preventDefault();
        const targetToFocus = this.target;
        this.hide();
        targetToFocus?.focus();
        this.cd.markForCheck();
      },
    );
  }

  unbindDocumentKeydownListener() {
    if (this.documentKeydownListener) {
      this.documentKeydownListener();
      this.documentKeydownListener = null;
    }
  }

  ngOnDestroy() {
    this.unbindDocumentClickListener();
    this.unbindDocumentKeydownListener();
    this.unbindScrollListener();
    this.unbindResizeListener();
    this.updateTargetA11yState(false);
    // Ensure removal from body
    const container = this.container();
    if (container && container.nativeElement.parentNode === this.document.body) {
      this.renderer.removeChild(
        this.document.body,
        container.nativeElement,
      );
    }
  }

  private resolveTarget(
    event: Event,
    target?: EventTarget | null,
  ): HTMLElement | null {
    const candidate = target ?? event.currentTarget ?? event.target;
    return candidate instanceof HTMLElement ? candidate : null;
  }

  private updateTargetA11yState(expanded: boolean) {
    if (!this.target) {
      return;
    }
    this.renderer.setAttribute(this.target, 'aria-haspopup', 'dialog');
    this.renderer.setAttribute(this.target, 'aria-controls', this.panelId());
    this.renderer.setAttribute(
      this.target,
      'aria-expanded',
      expanded ? 'true' : 'false',
    );
  }
}
