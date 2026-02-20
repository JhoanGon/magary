import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  ViewEncapsulation,
  computed,
  inject,
  input,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, type UrlTree } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MenuItem } from '../api/menu.interface';

// --- Helper Directive for Item logic (Hover) ---
@Directive({
  selector: '[appMegaMenuItem]',
  standalone: true,
})
export class MegaMenuItemDirective {
  item = input.required<MenuItem>();
  parent = input.required<MagaryMegaMenu>();

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.item().disabled) return;
    this.parent().onItemHover(this.item());
  }
}

@Component({
  selector: 'magary-megamenu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    MegaMenuItemDirective,
  ],
  templateUrl: './megamenu.html',
  styleUrl: './megamenu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MagaryMegaMenu implements OnDestroy {
  model = input<MenuItem[]>([]);
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  style = input<{ [klass: string]: any } | null>(null);
  styleClass = input<string>('');

  processedModel = computed(() => {
    return this.model();
  });

  private documentClickListener: (() => void) | null = null;
  private renderer = inject(Renderer2);
  public el = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

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

    // Toggle logic for root items
    if (item.items) {
      if (item.expanded) {
        item.expanded = false;
        this.unbindDocumentClickListener();
      } else {
        // Close others first? Typically yes for horizontal menu.
        this.resetExpansion(this.model());
        item.expanded = true;
        this.bindDocumentClickListener();
      }
      this.cdr.markForCheck(); // Explicitly mark for check
    } else {
      // Leaf
      this.resetExpansion(this.model());
      this.unbindDocumentClickListener();
      this.cdr.markForCheck(); // Explicitly mark for check
    }
  }

  onItemHover(item: MenuItem) {
    if (item.disabled) return;
    // Hover logic
    this.resetExpansion(this.model());
    if (item.items) {
      item.expanded = true;
      this.bindDocumentClickListener();
    }
    this.cdr.markForCheck(); // Explicitly mark for check
  }

  resetExpansion(items: MenuItem[]) {
    items.forEach((item) => {
      item.expanded = false;
      if (item.items) {
        this.resetExpansion(item.items);
      }
    });
  }

  // Columns calculation helper could go here if needed,
  // but we assume item.items corresponds to columns directly.

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      setTimeout(() => {
        this.documentClickListener = this.renderer.listen(
          'document',
          'click',
          (event) => {
            if (!this.el.nativeElement.contains(event.target)) {
              this.resetExpansion(this.model());
              this.unbindDocumentClickListener();
              this.cdr.markForCheck(); // Explicitly mark for check
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
      'magary-megamenu': true,
      'magary-megamenu-horizontal': this.orientation() === 'horizontal',
      'magary-megamenu-vertical': this.orientation() === 'vertical',
      [this.styleClass()]: true,
    };
  }

  ngOnDestroy() {
    this.unbindDocumentClickListener();
  }

  getRouterLink(item: MenuItem): string | readonly any[] | UrlTree | null {
    return item.route ?? item.routerLink ?? null;
  }
}
