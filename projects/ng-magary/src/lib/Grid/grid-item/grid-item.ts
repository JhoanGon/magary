import {
  Component,
  ElementRef,
  input,
  OnInit,
  OnDestroy,
  effect,
  ChangeDetectionStrategy,
  inject,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryGrid, MagaryGridLayoutItem } from '../grid/grid';

@Component({
  selector: 'magary-grid-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-item.html',
  styleUrl: './grid-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagaryGridItem implements OnInit, OnDestroy {
  // Simple API model
  item = input<MagaryGridLayoutItem | undefined>(undefined);

  // Simple API aliases
  col = input<number | undefined>(undefined);
  row = input<number | undefined>(undefined);
  cols = input<number | undefined>(undefined);
  rows = input<number | undefined>(undefined);
  movable = input<boolean | undefined>(undefined);
  resizable = input<boolean | undefined>(undefined);

  // Gridstack widget properties as Signal Inputs
  x = input<number | undefined>(undefined);
  y = input<number | undefined>(undefined);
  w = input<number | undefined>(undefined);
  h = input<number | undefined>(undefined);

  // Custom identifier
  id = input<string | undefined>(undefined);

  // Lock properties
  noResize = input<boolean | undefined>(undefined);
  noMove = input<boolean | undefined>(undefined);
  locked = input<boolean | undefined>(undefined);

  // Inject parent grid
  private parentGrid = inject(forwardRef(() => MagaryGrid));
  private registerTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(private el: ElementRef) {
    // Reactively update attributes when signals change
    effect(() => {
      const val = this.x() ?? this.col() ?? this.item()?.col;
      this.syncAttribute('gs-x', val);
    });
    effect(() => {
      const val = this.y() ?? this.row() ?? this.item()?.row;
      this.syncAttribute('gs-y', val);
    });
    effect(() => {
      const val = this.w() ?? this.cols() ?? this.item()?.cols;
      this.syncAttribute('gs-w', val);
    });
    effect(() => {
      const val = this.h() ?? this.rows() ?? this.item()?.rows;
      this.syncAttribute('gs-h', val);
    });

    effect(() => {
      const val = this.id() ?? this.item()?.id;
      this.syncAttribute('gs-id', val);
    });

    // Lock/Constraint effects
    effect(() => {
      const val = this.resolveNoResize();
      this.syncBooleanAttribute('gs-no-resize', val);
    });
    effect(() => {
      const val = this.resolveNoMove();
      this.syncBooleanAttribute('gs-no-move', val);
    });
    effect(() => {
      const val = this.locked() ?? this.item()?.locked;
      this.syncBooleanAttribute('gs-locked', val);
    });
  }

  ngOnInit() {
    // Add required class for Gridstack item
    this.el.nativeElement.classList.add('grid-stack-item');

    // Register self with parent grid (important for dynamic additions)
    // We use a small timeout or wait for next tick to ensure we are in DOM
    this.registerTimeoutId = setTimeout(() => {
      this.registerTimeoutId = null;
      this.parentGrid.registerWidget(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    if (this.registerTimeoutId !== null) {
      clearTimeout(this.registerTimeoutId);
      this.registerTimeoutId = null;
    }
  }

  private resolveNoResize(): boolean | undefined {
    const explicitNoResize = this.noResize();
    if (explicitNoResize !== undefined) {
      return explicitNoResize;
    }

    const resizable = this.resizable();
    if (resizable !== undefined) {
      return !resizable;
    }

    const itemResizable = this.item()?.resizable;
    return itemResizable !== undefined ? !itemResizable : undefined;
  }

  private resolveNoMove(): boolean | undefined {
    const explicitNoMove = this.noMove();
    if (explicitNoMove !== undefined) {
      return explicitNoMove;
    }

    const movable = this.movable();
    if (movable !== undefined) {
      return !movable;
    }

    const itemMovable = this.item()?.movable;
    return itemMovable !== undefined ? !itemMovable : undefined;
  }

  private syncBooleanAttribute(attr: string, value: boolean | undefined) {
    if (value === true) {
      this.updateAttribute(attr, 'true');
      return;
    }
    this.el.nativeElement.removeAttribute(attr);
  }

  private syncAttribute(attr: string, value: string | number | undefined) {
    if (value === undefined) {
      this.el.nativeElement.removeAttribute(attr);
      return;
    }
    this.updateAttribute(attr, value);
  }

  private updateAttribute(attr: string, value: string | number) {
    this.el.nativeElement.setAttribute(attr, String(value));
  }
}
