import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  input,
  output,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridStack, GridStackOptions } from 'gridstack';

@Component({
  selector: 'magary-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MagaryGrid implements AfterViewInit, OnDestroy {
  @ViewChild('gridStackContainer') gridStackContainer!: ElementRef;

  options = input<GridStackOptions>({});

  // Event outputs
  change = output<any>();
  added = output<any>();
  removed = output<any>();

  private grid?: GridStack;

  ngAfterViewInit(): void {
    // Initialize GridStack with a slight delay to ensure DOM is ready and children are rendered
    setTimeout(() => {
      this.grid = GridStack.init(
        this.options(),
        this.gridStackContainer.nativeElement,
      );

      // Bind events after initialization
      this.bindEvents();
    });
  }

  private bindEvents(): void {
    if (!this.grid) return;

    this.grid.on('change', (event: any, items: any) =>
      this.change.emit({ event, items }),
    );
    this.grid.on('added', (event: any, items: any) =>
      this.added.emit({ event, items }),
    );
    this.grid.on('removed', (event: any, items: any) =>
      this.removed.emit({ event, items }),
    );
  }

  ngOnDestroy(): void {
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
