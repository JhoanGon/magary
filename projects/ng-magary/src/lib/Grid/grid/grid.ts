import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  viewChild,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridStack, GridStackNode, GridStackOptions } from 'gridstack';

export interface MagaryGridEvent {
  event: Event;
  items: GridStackNode[];
}

export interface MagaryGridLayoutItem {
  id?: string;
  col: number;
  row: number;
  cols: number;
  rows: number;
  movable: boolean;
  resizable: boolean;
  locked: boolean;
}

@Component({
  selector: 'magary-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MagaryGrid implements AfterViewInit, OnDestroy {
  gridStackContainer =
    viewChild.required<ElementRef<HTMLDivElement>>('gridStackContainer');

  // Simple API (recommended)
  columns = input<number | undefined>(undefined);
  rowHeight = input<number | 'auto' | undefined>(undefined);
  gap = input<number | string | undefined>(undefined);
  editable = input<boolean | undefined>(undefined);

  // Advanced API escape hatch
  options = input<GridStackOptions>({});

  // Event outputs
  change = output<MagaryGridEvent>();
  added = output<MagaryGridEvent>();
  removed = output<MagaryGridEvent>();
  itemsChange = output<MagaryGridLayoutItem[]>();

  private grid?: GridStack;
  private initTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private isDestroyed = false;

  ngAfterViewInit(): void {
    // Initialize GridStack with a slight delay to ensure DOM is ready and children are rendered
    this.initTimeoutId = setTimeout(() => {
      if (this.isDestroyed) {
        return;
      }

      this.initTimeoutId = null;
      this.grid = GridStack.init(
        this.resolveOptions(),
        this.gridStackContainer().nativeElement,
      );

      // Bind events after initialization
      this.bindEvents();
      this.emitItemsChange();
    });
  }

  private bindEvents(): void {
    if (!this.grid) return;

    this.grid.on('change', (event: Event, items: GridStackNode[]) => {
      if (!this.isDestroyed) {
        this.change.emit({ event, items });
        this.emitItemsChange();
      }
    });
    this.grid.on('added', (event: Event, items: GridStackNode[]) => {
      if (!this.isDestroyed) {
        this.added.emit({ event, items });
        this.emitItemsChange();
      }
    });
    this.grid.on('removed', (event: Event, items: GridStackNode[]) => {
      if (!this.isDestroyed) {
        this.removed.emit({ event, items });
        this.emitItemsChange();
      }
    });
  }

  private resolveOptions(): GridStackOptions {
    const simpleOptions: GridStackOptions = {};

    if (this.columns() !== undefined) {
      simpleOptions.column = this.columns();
    }

    if (this.rowHeight() !== undefined) {
      simpleOptions.cellHeight = this.rowHeight();
    }

    if (this.gap() !== undefined) {
      simpleOptions.margin = this.gap();
    }

    const isEditable = this.editable();
    if (isEditable !== undefined) {
      simpleOptions.staticGrid = !isEditable;
      if (!isEditable) {
        simpleOptions.disableDrag = true;
        simpleOptions.disableResize = true;
      }
    }

    // Advanced options have precedence when both APIs are used.
    return {
      ...simpleOptions,
      ...this.options(),
    };
  }

  private emitItemsChange(): void {
    if (!this.grid || this.isDestroyed) {
      return;
    }

    const currentLayout = this.grid.engine.nodes.map((node) =>
      this.mapNodeToLayoutItem(node),
    );
    this.itemsChange.emit(currentLayout);
  }

  private mapNodeToLayoutItem(node: GridStackNode): MagaryGridLayoutItem {
    const rawId = node.id ?? node.el?.getAttribute('gs-id') ?? node.el?.id;

    return {
      id: rawId === undefined || rawId === null ? undefined : String(rawId),
      col: node.x ?? 0,
      row: node.y ?? 0,
      cols: node.w ?? 1,
      rows: node.h ?? 1,
      movable: !(node.noMove ?? false),
      resizable: !(node.noResize ?? false),
      locked: Boolean(node.locked),
    };
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;

    if (this.initTimeoutId !== null) {
      clearTimeout(this.initTimeoutId);
      this.initTimeoutId = null;
    }

    if (this.grid) {
      this.grid.destroy();
    }
  }

  getGridInstance(): GridStack | undefined {
    return this.grid;
  }

  registerWidget(element: HTMLElement) {
    if (this.grid) {
      // If grid is already initialized, manually register the new widget
      // Verify it's not already a widget to avoid double init issues (though makeWidget is usually safe)
      if (!element.classList.contains('grid-stack-item-content')) {
        // Gridstack requires the element to be the wrapper
        this.grid.makeWidget(element);
      }
    }
    // If grid NOT initialized, do nothing. GridStack.init() will pick it up.
  }
}
