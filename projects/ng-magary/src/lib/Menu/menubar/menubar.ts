import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  ViewChild,
  computed,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, type UrlTree } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MenuItem } from '../api/menu.interface';

// --- Helper Directive for Item logic (Hover, etc) ---
@Directive({
  selector: '[appMenubarItem]',
  standalone: true,
})
export class MenubarItemDirective {
  item = input.required<MenuItem>();
  parent = input.required<MagaryMenubar>();

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.item().disabled) return;
    this.parent().onItemHover(this.item());
  }
}

// --- Main Component ---
@Component({
  selector: 'magary-menubar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    MenubarItemDirective,
  ],
  templateUrl: './menubar.html',
  styleUrl: './menubar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MagaryMenubar implements OnDestroy {
  model = input<MenuItem[]>([]);
  style = input<Record<string, unknown> | null>(null);
  styleClass = input<string>('');

  processedModel = computed(() => {
    return this.model();
  });

  private documentClickListener: (() => void) | null = null;
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  constructor() {}

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
      // It has children, toggle expansion
      if (item.expanded) {
        item.expanded = false;
        this.unbindDocumentClickListener();
      } else {
        item.expanded = true;
        this.bindDocumentClickListener();
      }
    } else {
      // Leaf node clicked, close whole menu
      this.resetExpansion(this.model());
      this.unbindDocumentClickListener();
    }
  }

  onItemHover(item: MenuItem) {
    if (item.disabled) return;

    // Hover logic:
    // If we hover an item that has children, we expand it and close siblings.
    // If we hover an item that is a LEAF, strictly speaking in menubar we might keep parent open.
    // We reuse the generic "hover handler" that closes siblings but keeps path open.

    // HOWEVER, for top-level items, we typically only open on hover IF another item is already open (like native menus),
    // OR if we decide to be "hover-to-open" always.
    // Web standard often is hover-to-open for submenus, but click-to-open for root?
    // User requested "TieredMenu" logic which is heavily hover-based.
    // Let's stick to: Hover opens submenus.

    this.handleHover(this.model(), item);
  }

  handleHover(items: MenuItem[], targetItem: MenuItem): boolean {
    let found = false;
    for (let item of items) {
      if (item === targetItem) {
        if (item.items) {
          item.expanded = true;
          this.bindDocumentClickListener();
        }
        found = true;
      } else {
        // If this item contains the target, it should remain expanded.
        // If not, it should be collapsed.
        if (this.isParentOf(item, targetItem)) {
          item.expanded = true;
          // Continue down
          this.handleHover(item.items || [], targetItem);
        } else {
          item.expanded = false;
        }
      }
    }
    return found;
  }

  isParentOf(parent: MenuItem, child: MenuItem): boolean {
    if (parent.items) {
      for (let sub of parent.items) {
        if (sub === child) return true;
        if (this.isParentOf(sub, child)) return true;
      }
    }
    return false;
  }

  resetExpansion(items: MenuItem[]) {
    items.forEach((item) => {
      item.expanded = false;
      if (item.items) {
        this.resetExpansion(item.items);
      }
    });
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      // setTimeout to avoid immediate trigger
      setTimeout(() => {
        this.documentClickListener = this.renderer.listen(
          'document',
          'click',
          (event) => {
            // Check if click is inside the menu
            if (!this.el.nativeElement.contains(event.target)) {
              this.resetExpansion(this.model());
              this.unbindDocumentClickListener();
            }
          },
        );
      }, 0);
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  containerClass() {
    return {
      'magary-menubar': true,
      [this.styleClass()]: true,
    };
  }

  ngOnDestroy() {
    this.unbindDocumentClickListener();
  }

  getRouterLink(item: MenuItem): string | readonly unknown[] | UrlTree | null {
    return item.route ?? item.routerLink ?? null;
  }
}
