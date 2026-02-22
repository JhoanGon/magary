import {
  Component,
  contentChild,
  TemplateRef,
  input,
  output,
  computed,
  effect,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryPaginator, PaginatorState } from '../paginator/paginator';

interface MagaryDataViewItem {
  id?: unknown;
  name?: unknown;
  label?: unknown;
}

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
  listItemTemplate =
    contentChild<TemplateRef<{ $implicit: MagaryDataViewItem; index: number }>>(
      'listItem',
    );
  gridItemTemplate =
    contentChild<TemplateRef<{ $implicit: MagaryDataViewItem; index: number }>>(
      'gridItem',
    );
  headerTemplate = contentChild<TemplateRef<unknown>>('header');
  footerTemplate = contentChild<TemplateRef<unknown>>('footer');

  // Inputs
  value = input<MagaryDataViewItem[]>([]);
  layout = input<'list' | 'grid'>('list');
  paginator = input<boolean>(false);
  rows = input<number>(0);
  totalRecords = input<number>(0);
  pageLinks = input<number>(5);
  rowsPerPageOptions = input<number[]>([]);
  emptyMessage = input<string>('No records found');
  sortField = input<string | null>(null);
  sortOrder = input<number | null>(null); // 1 or -1
  loading = input<boolean>(false);
  trackBy = input<(index: number, item: MagaryDataViewItem) => unknown>(
    (index: number, item: MagaryDataViewItem) => item,
  );

  // Outputs
  onPage = output<PaginatorState>();

  // Signals
  first = signal<number>(0);
  _rows = signal<number>(0);

  constructor() {
    effect(() => {
      const nextRows = this.rows() ?? 0;
      this._rows.set(nextRows);
    });
  }

  // Computed
  processedData = computed(() => {
    let data = this.value() || [];
    // Optional: Sorting logic could go here if we implemented internal sorting
    return data;
  });

  dataToRender = computed(() => {
    const data = this.processedData();
    if (this.paginator()) {
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
    return this.totalRecords()
      ? this.totalRecords()
      : this.value()
        ? this.value().length
        : 0;
  }
}
