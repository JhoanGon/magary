import {
  Component,
  ElementRef,
  input,
  OnInit,
  effect,
  ChangeDetectionStrategy,
  inject,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryGrid } from '../grid/grid';

@Component({
  selector: 'magary-grid-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-item.html',
  styleUrl: './grid-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagaryGridItem implements OnInit {
  // Gridstack widget properties as Signal Inputs
  x = input<number | undefined>(undefined);
  y = input<number | undefined>(undefined);
  w = input<number | undefined>(undefined);
  h = input<number | undefined>(undefined);

  // Custom identifier
  id = input<string | undefined>(undefined);

  // Lock properties
  noResize = input<boolean>(false);
  noMove = input<boolean>(false);
  locked = input<boolean>(false);

  // Inject parent grid
  private parentGrid = inject(forwardRef(() => MagaryGrid));

  constructor(private el: ElementRef) {
    // Reactively update attributes when signals change
    effect(() => {
      const val = this.x();
      if (val !== undefined) this.updateAttribute('gs-x', val);
    });
    effect(() => {
      const val = this.y();
      if (val !== undefined) this.updateAttribute('gs-y', val);
    });
    effect(() => {
      const val = this.w();
      if (val !== undefined) this.updateAttribute('gs-w', val);
    });
    effect(() => {
      const val = this.h();
      if (val !== undefined) this.updateAttribute('gs-h', val);
    });

    // Lock/Constraint effects
    effect(() => {
      if (this.noResize()) this.updateAttribute('gs-no-resize', 'true');
      else this.el.nativeElement.removeAttribute('gs-no-resize');
    });
    effect(() => {
      if (this.noMove()) this.updateAttribute('gs-no-move', 'true');
      else this.el.nativeElement.removeAttribute('gs-no-move');
    });
    effect(() => {
      if (this.locked()) this.updateAttribute('gs-locked', 'true');
      else this.el.nativeElement.removeAttribute('gs-locked');
    });
  }

  ngOnInit() {
    // Add required class for Gridstack item
    this.el.nativeElement.classList.add('grid-stack-item');

    if (this.id()) {
      this.updateAttribute('gs-id', this.id()!);
    }

    // Register self with parent grid (important for dynamic additions)
    // We use a small timeout or wait for next tick to ensure we are in DOM
    setTimeout(() => {
      this.parentGrid.registerWidget(this.el.nativeElement);
    });
  }

  private updateAttribute(attr: string, value: string | number) {
    this.el.nativeElement.setAttribute(attr, String(value));
  }
}
