import {
  Directive,
  ElementRef,
  HostListener,
  booleanAttribute,
  input,
  OnDestroy,
  Renderer2,
  Inject,
  NgZone,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[magaryTooltip]',
  standalone: true,
})
export class MagaryTooltip implements OnDestroy {
  private static instanceSequence = 0;
  text = input<string | undefined>(undefined, { alias: 'magaryTooltip' });
  tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('top');
  tooltipDisabled = input(false, { transform: booleanAttribute });

  private tooltipElement: HTMLElement | null = null;
  private readonly tooltipId = `magary-tooltip-${++MagaryTooltip.instanceSequence}`;
  private scrollUnlisten: (() => void) | null = null;
  private resizeUnlisten: (() => void) | null = null;
  private keydownUnlisten: (() => void) | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private zone: NgZone,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.text() || this.tooltipDisabled()) return;
    this.show();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hide();
  }

  @HostListener('focus')
  onFocus() {
    if (!this.text() || this.tooltipDisabled()) return;
    this.show();
  }

  @HostListener('blur')
  onBlur() {
    this.hide();
  }

  @HostListener('keydown.escape')
  onEscape() {
    this.hide();
  }

  show() {
    if (this.tooltipElement || this.tooltipDisabled()) return;

    this.create();
    this.align();

    // Bind window events to update position or hide
    this.bindEvents();

    // Add Fade In class
    this.renderer.addClass(this.tooltipElement, 'magary-tooltip-visible');
    this.renderer.setAttribute(this.hostElement, 'aria-describedby', this.tooltipId);
  }

  hide() {
    if (!this.tooltipElement) {
      this.renderer.removeAttribute(this.hostElement, 'aria-describedby');
      return;
    }

    this.unbindEvents();
    this.renderer.removeChild(this.document.body, this.tooltipElement);
    this.tooltipElement = null;
    this.renderer.removeAttribute(this.hostElement, 'aria-describedby');
  }

  create() {
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'magary-tooltip');
    this.renderer.addClass(
      this.tooltipElement,
      `magary-tooltip-${this.tooltipPosition()}`,
    );
    this.renderer.setAttribute(this.tooltipElement, 'id', this.tooltipId);
    this.renderer.setAttribute(this.tooltipElement, 'role', 'tooltip');
    this.renderer.setAttribute(this.tooltipElement, 'aria-hidden', 'false');

    const textNode = this.renderer.createText(this.text()!);
    this.renderer.appendChild(this.tooltipElement, textNode);

    this.renderer.appendChild(this.document.body, this.tooltipElement);
  }

  align() {
    if (!this.tooltipElement) return;

    const hostRect = this.hostElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();

    let top = 0;
    let left = 0;
    const offset = 8; // gap

    switch (this.tooltipPosition()) {
      case 'top':
        top = hostRect.top - tooltipRect.height - offset;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + offset;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - offset;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + offset;
        break;
    }

    // Add scroll offset
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    top += scrollY;
    left += scrollX;

    const viewportTop = scrollY + 8;
    const viewportBottom = scrollY + window.innerHeight - 8;
    const viewportLeft = scrollX + 8;
    const viewportRight = scrollX + window.innerWidth - 8;

    // Fallback placement if initial position overflows viewport.
    if (this.tooltipPosition() === 'top' && top < viewportTop) {
      top = hostRect.bottom + scrollY + offset;
    } else if (
      this.tooltipPosition() === 'bottom' &&
      top + tooltipRect.height > viewportBottom
    ) {
      top = hostRect.top + scrollY - tooltipRect.height - offset;
    } else if (this.tooltipPosition() === 'left' && left < viewportLeft) {
      left = hostRect.right + scrollX + offset;
    } else if (
      this.tooltipPosition() === 'right' &&
      left + tooltipRect.width > viewportRight
    ) {
      left = hostRect.left + scrollX - tooltipRect.width - offset;
    }

    // Final clamp
    left = Math.min(Math.max(left, viewportLeft), viewportRight - tooltipRect.width);
    top = Math.min(Math.max(top, viewportTop), viewportBottom - tooltipRect.height);

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }

  bindEvents() {
    this.zone.runOutsideAngular(() => {
      this.resizeUnlisten = this.renderer.listen(window, 'resize', () =>
        this.hide(),
      );
      this.scrollUnlisten = this.renderer.listen(window, 'scroll', () =>
        this.hide(),
      );
      this.keydownUnlisten = this.renderer.listen(
        this.document,
        'keydown',
        (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            this.hide();
          }
        },
      );
    });
  }

  unbindEvents() {
    if (this.resizeUnlisten) {
      this.resizeUnlisten();
      this.resizeUnlisten = null;
    }
    if (this.scrollUnlisten) {
      this.scrollUnlisten();
      this.scrollUnlisten = null;
    }
    if (this.keydownUnlisten) {
      this.keydownUnlisten();
      this.keydownUnlisten = null;
    }
  }

  ngOnDestroy() {
    this.hide();
  }

  private get hostElement(): HTMLElement {
    return this.el.nativeElement as HTMLElement;
  }
}
