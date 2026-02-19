import {
  Component,
  ContentChild,
  TemplateRef,
  Input,
  Output,
  EventEmitter,
  computed,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryPaginator, PaginatorState } from '../paginator/paginator';

@Component({
  selector: 'magary-dataview',
  standalone: true,
  imports: [CommonModule, MagaryPaginator],
  templateUrl: './dataview.html',
  styleUrl: './dataview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MagaryDataView {
  // Content Templates
  @ContentChild('listItem') listItemTemplate!: TemplateRef<any>;
  @ContentChild('gridItem') gridItemTemplate!: TemplateRef<any>;
  @ContentChild('header') headerTemplate!: TemplateRef<any>;
  @ContentChild('footer') footerTemplate!: TemplateRef<any>;

  // Inputs
  @Input() set value(val: any[]) {
    this._value.set(val);
  }
  @Input() set layout(val: 'list' | 'grid') {
    this._layout.set(val);
  }
  get layout() {
    return this._layout();
  }

  @Input() paginator: boolean = false;
  @Input() set rows(val: number) {
    const nextRows = val ?? 0;
    this._rowsInput.set(nextRows);
    this._rows.set(nextRows);
  }
  get rows() {
    return this._rowsInput();
  }
  @Input() totalRecords: number = 0;
  @Input() pageLinks: number = 5;
  @Input() rowsPerPageOptions: number[] = [];
  @Input() emptyMessage: string = 'No records found';
  @Input() sortField: string | null = null;
  @Input() sortOrder: number | null = null; // 1 or -1
  @Input() loading: boolean = false;
  @Input() trackBy: any = (index: number, item: any) => item;

  // Outputs
  @Output() onPage = new EventEmitter<PaginatorState>();

  // Signals
  _value = signal<any[]>([]);
  _layout = signal<'list' | 'grid'>('list');
  first = signal<number>(0);
  _rowsInput = signal<number>(0);
  _rows = signal<number>(0);

  // Computed
  processedData = computed(() => {
    let data = this._value() || [];
    // Optional: Sorting logic could go here if we implemented internal sorting
    return data;
  });

  dataToRender = computed(() => {
    const data = this.processedData();
    if (this.paginator) {
      const first = this.first();
      const rows = this._rows() || data.length; // fallback
      return data.slice(first, first + rows);
    }
    return data;
  });

  onPageChange(event: PaginatorState) {
    this.first.set(event.first);
    this._rows.set(event.rows);
    this.onPage.emit(event);
  }

  getTotalRecords() {
    return this.totalRecords
      ? this.totalRecords
      : this._value()
        ? this._value().length
        : 0;
  }
}
