import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy,
  inject,
  signal,
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
  dismissable = signal(true); // Default true
  showCloseIcon = signal(false);

  @Input('dismissable') set _dismissable(val: boolean) {
    this.dismissable.set(val);
  }
  @Input('showCloseIcon') set _showCloseIcon(val: boolean) {
    this.showCloseIcon.set(val);
  }

  @Output() onShow = new EventEmitter<any>();
  @Output() onHide = new EventEmitter<any>();

  @ViewChild('container') container: ElementRef | undefined;

  visible = signal(false);
  target: any;
  documentClickListener: any;
  scrollListener: any;

  cd = inject(ChangeDetectorRef);
  renderer = inject(Renderer2);
  el = inject(ElementRef);
  document = inject(DOCUMENT);

  toggle(event: Event, target?: any) {
    if (this.visible()) {
      this.hide();
    } else {
      this.show(event, target);
    }
  }

  show(event: Event, target?: any) {
    this.target = target || event.currentTarget || event.target;
    this.visible.set(true);
    this.onShow.emit(null);

    // Append to body to avoid z-index/transform issues
    // We need to wait for the view to be created by the signal change
    setTimeout(() => {
      if (this.container) {
        this.renderer.appendChild(
          this.document.body,
          this.container.nativeElement,
        );
        this.alignWithTarget();
        this.bindDocumentClickListener();
        this.bindScrollListener();
        this.cd.markForCheck();
      }
    });
  }

  hide() {
    this.visible.set(false);
    this.onHide.emit(null);
    this.unbindDocumentClickListener();
    this.unbindScrollListener();
    this.target = null;

    // Optional: Remove from body immediately or let *ngIf handle it?
    // Since we moved the DOM node, *ngIf removing it from its original place in View might not remove it from Body.
    // We MUST remove it from body manually if we moved it.
    if (
      this.container &&
      this.container.nativeElement.parentNode === this.document.body
    ) {
      this.renderer.removeChild(
        this.document.body,
        this.container.nativeElement,
      );
    }
  }

  alignWithTarget() {
    if (!this.target || !this.container) return;

    const targetRect = this.target.getBoundingClientRect();
    const containerRect = this.container.nativeElement.getBoundingClientRect();
    const scrollY = window.scrollY || this.document.documentElement.scrollTop;
    const scrollX = window.scrollX || this.document.documentElement.scrollLeft;

    // Basic positioning: Bottom Left aligned
    let top = targetRect.bottom + scrollY + 5; // 5px gap
    let left = targetRect.left + scrollX;

    // Viewport check
    const viewportWidth = window.innerWidth;

    // If goes off screen right
    if (left + containerRect.width > viewportWidth) {
      left = targetRect.right + scrollX - containerRect.width;
      // If still off screen (element wider than target and aligned right), capped at viewport width
      if (left < 0) left = 10;
    }

    this.renderer.setStyle(this.container.nativeElement, 'top', `${top}px`);
    this.renderer.setStyle(this.container.nativeElement, 'left', `${left}px`);
    this.renderer.setStyle(
      this.container.nativeElement,
      'position',
      'absolute',
    );
    this.renderer.setStyle(this.container.nativeElement, 'display', 'block'); // Ensure it's not hidden
  }

  bindScrollListener() {
    if (!this.scrollListener) {
      // Use native addEventListener with capture: true to catch scroll of any parent container
      this.scrollListener = () => {
        if (this.visible()) {
          this.alignWithTarget();
        }
      };
      window.addEventListener('scroll', this.scrollListener, true);
    }
  }

  unbindScrollListener() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener, true);
      this.scrollListener = null;
    }
  }

  bindDocumentClickListener() {
    if (!this.dismissable()) return;

    // Unbind existing if any
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
            const isTarget =
              this.target &&
              (this.target === event.target ||
                this.target.contains(event.target));
            const isOutside =
              this.container &&
              !this.container.nativeElement.contains(event.target);

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

  ngOnDestroy() {
    this.unbindDocumentClickListener();
    this.unbindScrollListener();
    // Ensure removal from body
    if (
      this.container &&
      this.container.nativeElement.parentNode === this.document.body
    ) {
      this.renderer.removeChild(
        this.document.body,
        this.container.nativeElement,
      );
    }
  }
}
