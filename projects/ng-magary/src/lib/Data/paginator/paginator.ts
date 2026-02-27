import {
  Component,
  output,
  input,
  signal,
  computed,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PaginatorState {
  page: number;
  first: number;
  rows: number;
  pageCount: number;
}

/**
 * MagaryPaginator
 *
 * A component to handle data pagination.
 *
 * @example
 * <magary-paginator [rows]="10" [totalRecords]="100" (onPageChange)="paginate($event)"></magary-paginator>
 */
@Component({
  selector: 'magary-paginator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paginator.html',
  styleUrls: ['./paginator.scss'],
})
export class MagaryPaginator implements OnChanges, OnDestroy {
  private destroyed = false;
  /** Total number of records. */
  totalRecords = input.required<number>();

  /** Number of rows to display per page. */
  rows = input<number>(10);

  /** Index of the first record to display. */
  first = input<number>(0);

  /** Array of integers representing available options for rows per page. */
  rowsPerPageOptions = input<number[]>([]);

  /** Whether to show page links. */
  showPageLinks = input<boolean>(true);

  /** Number of page links to display. */
  pageLinkSize = input<number>(5);

  /** Event triggered when page changes. */
  onPageChange = output<PaginatorState>();

  /** Current page index (0-based). */
  getPage = computed(() => Math.floor(this.first() / this.rows()));

  /** Total number of pages. */
  getPageCount = computed(
    () => Math.ceil(this.totalRecords() / this.rows()) || 1,
  );

  /** Whether the first page is currently active. */
  isFirstPage = computed(() => this.getPage() === 0);

  /** Whether the last page is currently active. */
  isLastPage = computed(() => this.getPage() === this.getPageCount() - 1);

  /** Calculate page links. */
  getPageLinks = computed(() => {
    const pageCount = this.getPageCount();
    const page = this.getPage();
    const visiblePages = Math.min(this.pageLinkSize(), pageCount);

    let start = Math.max(0, Math.ceil(page - visiblePages / 2));
    let end = Math.min(pageCount - 1, start + visiblePages - 1);

    const delta = visiblePages - (end - start + 1);
    start = Math.max(0, start - delta);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i + 1);
    }
    return pages;
  });

  private emitPageChange(state: PaginatorState): void {
    if (!this.destroyed) {
      this.onPageChange.emit(state);
    }
  }

  changePage(p: number) {
    const pc = this.getPageCount();

    if (p >= 0 && p < pc) {
      const newFirst = this.rows() * p;
      const state: PaginatorState = {
        page: p,
        first: newFirst,
        rows: this.rows(),
        pageCount: pc,
      };
      this.emitPageChange(state);
    }
  }

  changePageToFirst(event: Event) {
    event.preventDefault();
    if (!this.isFirstPage()) {
      this.changePage(0);
    }
  }

  changePageToPrev(event: Event) {
    event.preventDefault();
    if (!this.isFirstPage()) {
      this.changePage(this.getPage() - 1);
    }
  }

  changePageToNext(event: Event) {
    event.preventDefault();
    if (!this.isLastPage()) {
      this.changePage(this.getPage() + 1);
    }
  }

  changePageToLast(event: Event) {
    event.preventDefault();
    if (!this.isLastPage()) {
      this.changePage(this.getPageCount() - 1);
    }
  }

  onRppChange(event: Event) {
    // We cannot mutate the input 'rows' directly.
    // The parent must handle the state change for 'rows' if it's dynamic,
    // or we emit an event.
    // However, PaginatorState typically includes rows.
    // Let's assume onPageChange handles it.
    // But wait, the standard Paginator pattern usually updates rows.
    // Since 'rows' is now a signal input, we can't write to it.
    // We will emit the change with page 0.

    const target = event.target as HTMLSelectElement | null;
    const newRows = Number(target?.value ?? this.rows());
    const state: PaginatorState = {
      page: 0,
      first: 0,
      rows: newRows,
      pageCount: Math.ceil(this.totalRecords() / newRows) || 1,
    };
    this.emitPageChange(state);
  }

  onPageLinkClick(event: Event, page: number) {
    event.preventDefault();
    this.changePage(page - 1); // 0-based
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalRecords']) {
      // Re-validate first index if total records change
      // Signal inputs don't trigger ngOnChanges for themselves if accessed as signals, but standard OnChanges works if using attributes?
      // Actually, with signal inputs, we should use effect().
    }
  }

  constructor() {
    // Effect to validate first index
    // effect(() => {
    //    const total = this.totalRecords();
    //    const rows = this.rows();
    //    const first = this.first();
    //    if (first >= total && total > 0) {
    //        // We cannot emit inside effect easily without causing loops if we are not careful
    //        // logic to adjust page should be on consumer?
    //    }
    // });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }
}
