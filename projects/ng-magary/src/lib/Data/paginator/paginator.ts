import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  computed,
  OnChanges,
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
export class MagaryPaginator implements OnChanges {
  /** Total number of records. */
  @Input({ required: true }) totalRecords: number = 0;

  /** Number of rows to display per page. */
  @Input() rows: number = 10;

  /** Index of the first record to display. */
  @Input() first: number = 0;

  /** Array of integers representing available options for rows per page. */
  @Input() rowsPerPageOptions: number[] = [];

  /** Whether to show page links. */
  @Input() showPageLinks: boolean = true;

  /** Number of page links to display. */
  @Input() pageLinkSize: number = 5;

  /** Event triggered when page changes. */
  @Output() onPageChange: EventEmitter<PaginatorState> =
    new EventEmitter<PaginatorState>();

  /** Current page index (0-based). */
  getPage(): number {
    return Math.floor(this.first / this.rows);
  }

  /** Total number of pages. */
  getPageCount(): number {
    return Math.ceil(this.totalRecords / this.rows) || 1;
  }

  /** Whether the first page is currently active. */
  isFirstPage(): boolean {
    return this.getPage() === 0;
  }

  /** Whether the last page is currently active. */
  isLastPage(): boolean {
    return this.getPage() === this.getPageCount() - 1;
  }

  /** Calculate page links. */
  getPageLinks(): number[] {
    const pageCount = this.getPageCount();
    const page = this.getPage();
    const visiblePages = Math.min(this.pageLinkSize, pageCount);

    let start = Math.max(0, Math.ceil(page - visiblePages / 2));
    let end = Math.min(pageCount - 1, start + visiblePages - 1);

    const delta = visiblePages - (end - start + 1);
    start = Math.max(0, start - delta);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i + 1);
    }
    return pages;
  }

  changePage(p: number) {
    const pc = this.getPageCount();

    if (p >= 0 && p < pc) {
      this.first = this.rows * p;
      const state: PaginatorState = {
        page: p,
        first: this.first,
        rows: this.rows,
        pageCount: pc,
      };
      this.onPageChange.emit(state);
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

  onRppChange(event: any) {
    this.rows = Number(event.target.value);
    this.changePage(0);
  }

  onPageLinkClick(event: Event, page: number) {
    event.preventDefault();
    this.changePage(page - 1); // 0-based
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalRecords']) {
      // Re-validate first index if total records change
      if (this.first >= this.totalRecords && this.totalRecords > 0) {
        // Adjust to last possible page
        this.changePage(Math.ceil(this.totalRecords / this.rows) - 1);
      }
    }
  }
}
