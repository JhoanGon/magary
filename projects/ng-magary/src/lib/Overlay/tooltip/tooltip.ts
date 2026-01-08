import {
  Directive,
  ElementRef,
  HostListener,
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
  text = input<string | undefined>(undefined, { alias: 'magaryTooltip' });
  tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('top');

  private tooltipElement: HTMLElement | null = null;
  private scrollUnlisten: (() => void) | null = null;
  private resizeUnlisten: (() => void) | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private zone: NgZone,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.text()) return;
    this.show();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hide();
  }

  @HostListener('focus')
  onFocus() {
    if (!this.text()) return;
    this.show();
  }

  @HostListener('blur')
  onBlur() {
    this.hide();
  }

  show() {
    if (this.tooltipElement) return;

    this.create();
    this.align();

    // Bind window events to update position or hide
    this.bindEvents();

    // Add Fade In class
    this.renderer.addClass(this.tooltipElement, 'magary-tooltip-visible');
  }

  hide() {
    if (!this.tooltipElement) return;

    this.unbindEvents();
    this.renderer.removeChild(this.document.body, this.tooltipElement);
    this.tooltipElement = null;
  }

  create() {
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'magary-tooltip');
    this.renderer.addClass(
      this.tooltipElement,
      `magary-tooltip-${this.tooltipPosition()}`,
    );

    const textNode = this.renderer.createText(this.text()!);
    this.renderer.appendChild(this.tooltipElement, textNode);

    this.renderer.appendChild(this.document.body, this.tooltipElement);

    // Ensure styles are available globally if not encapsulated
    // Or we rely on global styles. Since this is a directive appending to body, styles must be global or added via a component.
    // For simplicity in this structure, we assume tooltip styles are loaded globally or we'll add them to a global css file.
    // Wait, directives can't easily encapsulation styles.
    // We will define styles in tooltip.scss and the user must import them or we make a dummy component or use ViewEncapsulation.None on a container?
    // Best practice for libs: usually provide a global css or inclusion.
  }

  align() {
    if (!this.tooltipElement) return;

    const hostRect = this.el.nativeElement.getBoundingClientRect();
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
    top += window.scrollY;
    left += window.scrollX;

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
  }

  ngOnDestroy() {
    this.hide();
  }
}
