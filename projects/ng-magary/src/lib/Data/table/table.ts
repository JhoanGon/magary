import {
  Component,
  output,
  input,
  contentChildren,
  signal,
  computed,
  effect,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MagaryAvatar } from '../../Misc/avatar/avatar';
import { MagaryInput } from '../../Form/input/input';
import { MagarySkeleton } from '../../Misc/skeleton/skeleton';
// Import MagaryPaginator
import {
  MagaryPaginator,
  PaginatorState,
} from '../../Data/paginator/paginator';
import { MagaryTemplate } from './table-templates';

import { LucideAngularModule } from 'lucide-angular';
export interface MagaryTableColumn {
  field: string;
  header: string;
  type?: 'text' | 'avatar' | 'badge' | 'date' | 'currency';
  sortable?: boolean;
  width?: string;
}

export type MagaryTableSortOrder = -1 | 0 | 1;

export interface MagaryTableSortState {
  field: string | null;
  order: MagaryTableSortOrder;
}

interface MagaryTableRow {
  id?: unknown;
  key?: unknown;
  code?: unknown;
  name?: unknown;
}

@Component({
  selector: 'magary-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MagaryAvatar,
    MagaryInput,
    MagarySkeleton,
    LucideAngularModule,
    MagaryPaginator, // Add to imports
  ],
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MagaryTable {
  // Inputs as Signals
  value = input<MagaryTableRow[]>([]);
  columns = input<MagaryTableColumn[]>([]);
  paginator = input<boolean>(false);
  rows = input<number>(5);
  globalFilterFields = input<string[]>([]);
  title = input<string>('');
  loading = input<boolean>(false);
  responsiveLayout = input<boolean>(true);

  // New input for Paginator options
  rowsPerPageOptions = input<number[]>([]);

  onPageChange = output<PaginatorState>();
  onSortChange = output<MagaryTableSortState>();

  // Templates
  templates = contentChildren(MagaryTemplate);

  headerTemplate: TemplateRef<unknown> | null = null;
  bodyTemplate: TemplateRef<unknown> | null = null;
  captionTemplate: TemplateRef<unknown> | null = null;

  // Internal State
  first = signal<number>(0);
  searchTerm = signal<string>('');
  sortState = signal<MagaryTableSortState>({
    field: null,
    order: 0,
  });

  // Track specific rows state if it changes via paginator
  currentRows = signal<number>(5);
  private rowsInputSnapshot = 5;
  skeletonRows = computed(() => {
    const count = Math.min(Math.max(this.currentRows(), 1), 10);
    return Array.from({ length: count }, (_, index) => index);
  });

  // Computed State
  processedData = computed(() => {
    let data = [...(this.value() || [])];
    const term = this.searchTerm().trim().toLowerCase();
    const filterFields = this.globalFilterFields();

    if (term && filterFields.length > 0) {
      data = data.filter((item) => {
        return filterFields.some((field) => {
          const val = this.resolveFieldData(item, field);
          return String(val).toLowerCase().includes(term);
        });
      });
    }
    return data;
  });

  sortedData = computed(() => {
    const data = this.processedData();
    const sortState = this.sortState();
    if (!sortState.field || sortState.order === 0) {
      return data;
    }

    return this.sortRows(data, sortState.field, sortState.order);
  });

  totalRecords = computed(() => this.sortedData().length);

  paginatedData = computed(() => {
    if (this.loading()) {
      return [];
    }

    const data = this.sortedData();
    if (this.paginator()) {
      const start = this.first();
      const end = start + this.currentRows();
      return data.slice(start, end);
    } else {
      return data;
    }
  });

  constructor() {
    // Reset pagination when filter changes
    effect(() => {
      // Dependency tracking
      this.searchTerm();
      // Action
      this.first.set(0);
    });

    // Sync initial rows input with internal state
    effect(() => {
      const normalizedRows = this.normalizeRows(this.rows());
      if (this.rowsInputSnapshot !== normalizedRows) {
        this.rowsInputSnapshot = normalizedRows;
        this.currentRows.set(normalizedRows);
      }
    });

    // Keep paginator state valid when data/rows/paginator mode changes.
    effect(() => {
      const paginatorEnabled = this.paginator();
      const totalRecords = this.totalRecords();
      const rowsPerPage = this.currentRows();
      const first = this.first();

      if (!paginatorEnabled) {
        if (first !== 0) {
          this.first.set(0);
        }
        return;
      }

      if (rowsPerPage < 1) {
        this.currentRows.set(1);
        return;
      }

      if (totalRecords === 0) {
        if (first !== 0) {
          this.first.set(0);
        }
        return;
      }

      if (first < 0) {
        this.first.set(0);
        return;
      }

      const maxFirst = this.getMaxFirstIndex(totalRecords, rowsPerPage);
      if (first > maxFirst) {
        this.first.set(maxFirst);
      }
    });

    // Reset invalid sort state when columns input no longer supports it.
    effect(() => {
      const currentSort = this.sortState();
      if (!currentSort.field || currentSort.order === 0) {
        return;
      }

      const sortableColumn = this.columns().some(
        (col) => col.field === currentSort.field && col.sortable,
      );

      if (!sortableColumn) {
        this.setSortState(
          {
            field: null,
            order: 0,
          },
          false,
        );
      }
    });

    // Resolve projected templates as content changes.
    effect(() => {
      this.headerTemplate = null;
      this.bodyTemplate = null;
      this.captionTemplate = null;

      this.templates().forEach((item) => {
        switch (item.getType()) {
          case 'caption':
            this.captionTemplate = item.template;
            break;
          case 'header':
            this.headerTemplate = item.template;
            break;
          case 'body':
            this.bodyTemplate = item.template;
            break;
        }
      });
    });
  }

  onSearch(value: string) {
    this.searchTerm.set(value);
  }

  toggleSort(field: string): void {
    const column = this.columns().find((col) => col.field === field);
    if (!column?.sortable) {
      return;
    }

    const current = this.sortState();
    if (current.field !== field || current.order === 0) {
      this.setSortState({ field, order: 1 }, true);
      return;
    }

    if (current.order === 1) {
      this.setSortState({ field, order: -1 }, true);
      return;
    }

    this.setSortState({ field: null, order: 0 }, true);
  }

  getSortIcon(field: string): string {
    const order = this.getSortOrderForField(field);
    if (order === 1) {
      return 'chevron-up';
    }
    if (order === -1) {
      return 'chevron-down';
    }

    return 'chevrons-up-down';
  }

  getAriaSort(field: string): 'ascending' | 'descending' | 'none' {
    const order = this.getSortOrderForField(field);
    if (order === 1) {
      return 'ascending';
    }
    if (order === -1) {
      return 'descending';
    }
    return 'none';
  }

  getSortButtonLabel(header: string, field: string): string {
    const order = this.getSortOrderForField(field);
    if (order === 1) {
      return `Sorted ascending by ${header}. Activate to sort descending.`;
    }
    if (order === -1) {
      return `Sorted descending by ${header}. Activate to clear sorting.`;
    }
    return `Sort by ${header}.`;
  }

  // Handle event from MagaryPaginator
  onPaginatorChange(event: PaginatorState) {
    const normalizedRows = this.normalizeRows(event.rows);
    const totalRecords = this.totalRecords();
    const maxFirst = this.getMaxFirstIndex(totalRecords, normalizedRows);
    const normalizedFirst = Math.min(Math.max(event.first, 0), maxFirst);
    const pageCount = Math.ceil(totalRecords / normalizedRows) || 1;
    const page = Math.floor(normalizedFirst / normalizedRows);

    this.currentRows.set(normalizedRows);
    this.first.set(normalizedFirst);

    this.onPageChange.emit({
      page,
      first: normalizedFirst,
      rows: normalizedRows,
      pageCount,
    });
  }

  resolveFieldData(data: unknown, field: string): unknown {
    if (!field || !this.isRecord(data)) {
      return null;
    }

    if (!field.includes('.')) {
      return data[field];
    }

    const fields = field.split('.');
    let value: unknown = data;

    for (const fieldName of fields) {
      if (!this.isRecord(value)) {
        return null;
      }
      value = value[fieldName];
      if (value == null) {
        return value;
      }
    }

    return value;
  }

  resolveFieldDataAsString(data: unknown, field: string): string {
    const value = this.resolveFieldData(data, field);
    return value == null ? '' : String(value);
  }

  resolveFieldDataAsNumber(data: unknown, field: string): number | null {
    const value = this.resolveFieldData(data, field);
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string' && value.trim().length > 0) {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    }

    return null;
  }

  resolveFieldDataAsDate(data: unknown, field: string): Date | string | null {
    const value = this.resolveFieldData(data, field);
    if (value instanceof Date) {
      return value;
    }

    if (typeof value === 'string') {
      return value;
    }

    return null;
  }

  getAvatarImage(row: unknown, field: string): string {
    const value = this.resolveFieldData(row, field);
    return typeof value === 'string' ? value : '';
  }

  getBadgeClass(row: unknown, field: string): string {
    const value = this.resolveFieldDataAsString(row, field).toLowerCase();
    return value ? `status-${value}` : '';
  }

  getAvatarLabel(row: unknown): string {
    const val = this.resolveFieldDataAsString(row, 'name');
    return val ? String(val).slice(0, 1).toUpperCase() : '';
  }

  trackByRow(index: number, row: unknown): string | number {
    if (this.isRecord(row)) {
      const keyed = row['id'] ?? row['key'] ?? row['code'] ?? row['name'];
      if (typeof keyed === 'string' || typeof keyed === 'number') {
        return keyed;
      }
    }
    return index;
  }

  private normalizeRows(rows: number): number {
    if (!Number.isFinite(rows)) {
      return 1;
    }

    return Math.max(1, Math.floor(rows));
  }

  private getSortOrderForField(field: string): MagaryTableSortOrder {
    const current = this.sortState();
    if (current.field !== field) {
      return 0;
    }

    return current.order;
  }

  private setSortState(next: MagaryTableSortState, emit: boolean): void {
    const normalized =
      !next.field || next.order === 0
        ? { field: null, order: 0 as const }
        : { field: next.field, order: next.order };

    const current = this.sortState();
    if (current.field === normalized.field && current.order === normalized.order) {
      return;
    }

    this.sortState.set(normalized);

    if (this.first() !== 0) {
      this.first.set(0);
    }

    if (emit) {
      this.onSortChange.emit(normalized);
    }
  }

  private sortRows(
    data: MagaryTableRow[],
    field: string,
    order: Exclude<MagaryTableSortOrder, 0>,
  ): MagaryTableRow[] {
    return data
      .map((row, index) => ({ row, index }))
      .sort((a, b) => {
        const left = this.resolveFieldData(a.row, field);
        const right = this.resolveFieldData(b.row, field);
        const comparison = this.compareSortValues(left, right);
        if (comparison !== 0) {
          return comparison * order;
        }
        return a.index - b.index;
      })
      .map((entry) => entry.row);
  }

  private compareSortValues(left: unknown, right: unknown): number {
    const normalizedLeft = this.normalizeSortValue(left);
    const normalizedRight = this.normalizeSortValue(right);

    if (normalizedLeft === normalizedRight) {
      return 0;
    }

    if (normalizedLeft === null) {
      return 1;
    }

    if (normalizedRight === null) {
      return -1;
    }

    if (typeof normalizedLeft === 'number' && typeof normalizedRight === 'number') {
      return normalizedLeft - normalizedRight;
    }

    return String(normalizedLeft).localeCompare(String(normalizedRight), undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  }

  private normalizeSortValue(value: unknown): string | number | null {
    if (value == null) {
      return null;
    }

    if (value instanceof Date) {
      const timestamp = value.getTime();
      return Number.isFinite(timestamp) ? timestamp : null;
    }

    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : null;
    }

    if (typeof value === 'boolean') {
      return value ? 1 : 0;
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed.length === 0) {
        return '';
      }

      if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
        const parsedNumber = Number(trimmed);
        if (Number.isFinite(parsedNumber)) {
          return parsedNumber;
        }
      }

      if (/^\d{4}-\d{2}-\d{2}(T.*)?$/.test(trimmed)) {
        const parsedDate = Date.parse(trimmed);
        if (!Number.isNaN(parsedDate)) {
          return parsedDate;
        }
      }

      return trimmed.toLowerCase();
    }

    return String(value).toLowerCase();
  }

  private getMaxFirstIndex(totalRecords: number, rowsPerPage: number): number {
    if (totalRecords <= 0) {
      return 0;
    }

    return Math.floor((totalRecords - 1) / rowsPerPage) * rowsPerPage;
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
}
