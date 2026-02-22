import {
  Component,
  ElementRef,
  Renderer2,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  OnDestroy,
  AfterViewInit,
  computed,
  viewChild,
  input,
} from '@angular/core';
import { CommonModule, NgTemplateOutlet, DOCUMENT } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule, type UrlTree } from '@angular/router';
import { MenuItem } from '../api/menu.interface';
// Actually, TieredMenuItemDirective is specific to TieredMenu interaction (mouseenter/leave).
// ContextMenu items also behave like tiered menu items (hover to expand).
// Let's assume we can reuse the logic or replicate it.
// For simplicity and decoupling, I'll inline the item logic or creating a shared directive later if needed.
// For now, I'll implement the recursive template inline similar to TieredMenu HTML.

@Component({
  selector: 'magary-context-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, NgTemplateOutlet],
  templateUrl: './context-menu.html',
  styleUrl: './context-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MagaryContextMenu implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  model = input<MenuItem[]>([]);
  style = input<Record<string, unknown> | null>(null);
  styleClass = input<string | null>(null);
  global = input<boolean>(false);
  target = input<string | ElementRef<HTMLElement> | HTMLElement | null>(null);

  visible = signal<boolean>(false);
  // Position
  x = signal<number>(0);
  y = signal<number>(0);

  containerViewChild = viewChild<ElementRef<HTMLElement>>('container');

  private documentClickListener: (() => void) | null = null;
  private documentResizeListener: (() => void) | null = null;
  private contextMenuListener: (() => void) | null = null;

  constructor() {}

  ngAfterViewInit() {
    if (this.global()) {
      this.bindGlobalListeners();
    } else if (this.target()) {
      this.bindTargetListeners();
    }
  }

  ngOnDestroy() {
    this.unbindListeners();
  }

  bindGlobalListeners() {
    this.contextMenuListener = this.renderer.listen(
      'document',
      'contextmenu',
      (event) => {
        this.show(event);
      },
    );
  }

  bindTargetListeners() {
    let targetElement = this.getTargetElement();
    if (targetElement) {
      this.contextMenuListener = this.renderer.listen(
        targetElement,
        'contextmenu',
        (event) => {
          this.show(event);
        },
      );
    }
  }

  getTargetElement(): HTMLElement | null {
    const target = this.target();
    if (typeof target === 'string') {
      return this.document.querySelector<HTMLElement>(target);
    } else if (target instanceof ElementRef) {
      return target.nativeElement;
    } else {
      return target;
    }
  }

  private document = inject(DOCUMENT);

  show(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    // Position relative to offset parent to scroll with content
    const offsetParent =
      (this.el.nativeElement.offsetParent as HTMLElement) || this.document.body;
    const parentRect = offsetParent.getBoundingClientRect();

    // Calculate local coordinates relative to the offset parent
    const x = event.clientX - parentRect.left;
    const y = event.clientY - parentRect.top;

    this.x.set(x);
    this.y.set(y);
    this.visible.set(true);

    this.bindDocumentClickListener();
    this.bindDocumentResizeListener();
  }

  hide() {
    this.visible.set(false);
    this.unbindDocumentClickListener();
    this.unbindDocumentResizeListener();
    this.resetExpansion(this.model());
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen(
        'document',
        'click',
        (event) => {
          const containerViewChild = this.containerViewChild();
          if (
            this.visible() &&
            containerViewChild &&
            !containerViewChild.nativeElement.contains(event.target)
          ) {
            this.hide();
          }
        },
      );
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  bindDocumentResizeListener() {
    if (!this.documentResizeListener) {
      this.documentResizeListener = this.renderer.listen(
        'window',
        'resize',
        () => {
          if (this.visible()) {
            this.hide();
          }
        },
      );
    }
  }

  unbindDocumentResizeListener() {
    if (this.documentResizeListener) {
      this.documentResizeListener();
      this.documentResizeListener = null;
    }
  }

  unbindListeners() {
    if (this.contextMenuListener) {
      this.contextMenuListener();
      this.contextMenuListener = null;
    }
    this.unbindDocumentClickListener();
    this.unbindDocumentResizeListener();
  }

  onItemClick(event: Event, item: MenuItem) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (!item.url && !this.getRouterLink(item)) {
      event.preventDefault();
    }

    if (item.command) {
      item.command({ originalEvent: event, item });
    }

    if (item.items) {
      item.expanded = !item.expanded;
      // Close siblings
      this.closeSiblings(item, this.model());
    } else {
      this.hide();
    }
  }

  // Helper to process model if needed (like adding ids)
  processedModel = computed(() => {
    return this.model();
  });

  resetExpansion(items: MenuItem[]) {
    items.forEach((item) => {
      item.expanded = false;
      if (item.items) {
        this.resetExpansion(item.items);
      }
    });
  }

  closeSiblings(activeItem: MenuItem, parentItems: MenuItem[]) {
    parentItems.forEach((item) => {
      if (item !== activeItem) {
        item.expanded = false;
      }
    });
  }

  containerClass() {
    return {
      'magary-contextmenu': true,
      [this.styleClass() || '']: true,
    };
  }

  // Hover handling for submenus
  onItemMouseEnter(item: MenuItem, parentItems: MenuItem[]) {
    if (item.disabled) return;

    // Close other submenus at this level
    this.closeSiblings(item, parentItems);

    if (item.items) {
      item.expanded = true;
    }
  }

  onMouseLeave() {
    // Optional: auto close? Standard context menus usually stay open until click.
    // But submenus should respond to hover.
  }

  getRouterLink(item: MenuItem): string | readonly unknown[] | UrlTree | null {
    return item.route ?? item.routerLink ?? null;
  }
}
