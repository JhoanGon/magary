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
  effect,
  inject,
  input,
  signal,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MenuItem } from '../api/menu.interface';

// --- Helper Directive for Item logic (Hover, etc) ---
@Directive({
  selector: '[appTieredMenuItem]',
  standalone: true,
})
export class TieredMenuItemDirective {
  item = input.required<MenuItem>();
  parent = input.required<MagaryTieredMenu>();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.item().disabled) return;
    this.parent().onItemHover(this.item());
  }
}

// --- Main Component ---
@Component({
  selector: 'magary-tiered-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    TieredMenuItemDirective,
  ], // Add directive
  templateUrl: './tiered-menu.html',
  styleUrl: './tiered-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagaryTieredMenu implements OnDestroy {
  model = input<MenuItem[]>([]);
  popup = input<boolean>(false);
  style = input<{ [klass: string]: any } | null>(null);
  styleClass = input<string>('');

  visible = signal<boolean>(false);
  target: any;

  // Track expanded items path to handle closing siblings
  // Usually in tiered menu, only one item per level is expanded.
  // We can just rely on mutating 'expanded' property on MenuItem for simplicity in UI,
  // but better to have local state if possible.
  // For library, modifying input model 'expanded' is common pattern but can be dirty.
  // We will clone or just modify it for now as it's purely view state.

  // Actually, using a centralized signal for active items path is cleaner.
  // activeItemPath = signal<MenuItem[]>([]);

  // Since we modified MenuItem interface to have 'expanded?', we can use it.
  // We need to ensure we clear it on hide.

  processedModel = computed(() => {
    return this.model();
  });

  private documentClickListener: (() => void) | null = null;
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  constructor() {}

  toggle(event: Event) {
    event.stopPropagation(); // Prevent immediate closing by document listener
    if (this.visible()) {
      this.hide();
    } else {
      this.show(event);
    }
  }

  show(event: Event) {
    this.target = event.target;
    this.visible.set(true);
    this.bindDocumentClickListener();

    if (this.popup()) {
      this.positionOverlay(event);
    }
  }

  hide() {
    this.visible.set(false);
    this.unbindDocumentClickListener();
    this.resetExpansion(this.model());
  }

  onMouseLeave() {
    if (!this.popup()) {
      this.resetExpansion(this.model());
    }
  }

  // Recursive reset
  resetExpansion(items: MenuItem[]) {
    items.forEach((item) => {
      item.expanded = false;
      if (item.items) {
        this.resetExpansion(item.items);
      }
    });
  }

  onItemClick(event: Event, item: MenuItem) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (!item.url && !item.routerLink) {
      event.preventDefault();
    }

    if (item.command) {
      item.command({ originalEvent: event, item });
    }

    if (item.items) {
      // It has children, toggle expansion
      if (item.expanded) {
        item.expanded = false;
      } else {
        // Close siblings
        // We can't easy access siblings here without parent ref.
        // But Hover handles opening. Click usually navigates OR toggles on mobile/touch?
        // Desktop TieredMenu usually opens on Hover.
        item.expanded = true;
      }
    } else {
      // Leaf node clicked, close menu if popup
      if (this.popup()) {
        this.hide();
      }
    }
  }

  onItemHover(item: MenuItem) {
    if (item.disabled) return;

    // Close all siblings at this level?
    // We need to know which level we are in.
    // Simplest approach: Close all other items in the whole menu that are NOT parents of this item?
    // Or just set 'expanded' = true for this item.

    // Correct Tiered Menu behavior:
    // When hovering an item, we show its submenu.
    // We should hide submenus of siblings.

    // To do this efficiently, we might need a better structure or just iterate.
    // For this iteration, we will implement a simple "Self Expand" and rely on CSS/focus?
    // No, the HTML relies on `item.expanded`.
    // Let's iterate the whole model to find the parent of this item and close others.
    // This is expensive recursively.

    // Alternative: pass siblings to the directive?

    // Let's implement a 'closeOtherItems' helper.
    this.handleHover(this.model(), item);
  }

  handleHover(items: MenuItem[], targetItem: MenuItem): boolean {
    let found = false;
    for (let item of items) {
      if (item === targetItem) {
        item.expanded = true;
        found = true;
      } else {
        // If this item contains the target, it should remain expanded.
        // If not, it should be collapsed.
        if (this.isParentOf(item, targetItem)) {
          item.expanded = true;
          // Continue down
          // We don't need to call handleHover on children because isParentOf check suggests we are on path.
          // Actually we DO need to clear *its* other children.
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

  onContainerClick(event: Event) {
    // Prevent document click from hiding when clicking inside
    event.stopPropagation();
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener && this.popup()) {
      this.documentClickListener = this.renderer.listen(
        'document',
        'click',
        () => {
          this.hide();
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

  positionOverlay(event: Event) {
    // Basic absolute positioning near target
    // Ideally usage of Angular CDK Overlay or Floating UI
    // For this task, we assume simple relative matching or center.
    // Actually, popup menus appear at the element.
    const target =
      (event.currentTarget as HTMLElement) || (event.target as HTMLElement);
    const rect = target.getBoundingClientRect();

    // We set style on the element
    this.renderer.setStyle(
      this.el.nativeElement.children[0],
      'top',
      rect.bottom + 'px',
    );
    this.renderer.setStyle(
      this.el.nativeElement.children[0],
      'left',
      rect.left + 'px',
    );
    // Fixed?
    this.renderer.setStyle(
      this.el.nativeElement.children[0],
      'position',
      'fixed',
    );
    this.renderer.setStyle(
      this.el.nativeElement.children[0],
      'z-index',
      '9999',
    );
  }

  containerClass() {
    return {
      'magary-tieredmenu': true,
      [this.styleClass()]: true,
    };
  }

  ngOnDestroy() {
    this.unbindDocumentClickListener();
  }
}
