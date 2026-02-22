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

  // Templates
  templates = contentChildren(MagaryTemplate);

  headerTemplate: TemplateRef<unknown> | null = null;
  bodyTemplate: TemplateRef<unknown> | null = null;
  captionTemplate: TemplateRef<unknown> | null = null;

  // Internal State
  first = signal<number>(0);
  searchTerm = signal<string>('');

  // Track specific rows state if it changes via paginator
  currentRows = signal<number>(5);

  // Computed State
  processedData = computed(() => {
    let data = [...(this.value() || [])];
    const term = this.searchTerm().toLowerCase();
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

  totalRecords = computed(() => this.processedData().length);

  paginatedData = computed(() => {
    const data = this.processedData();
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
      this.currentRows.set(this.rows());
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

  // Handle event from MagaryPaginator
  onPaginatorChange(event: PaginatorState) {
    this.first.set(event.first);
    this.currentRows.set(event.rows);

    this.onPageChange.emit(event);
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

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
}
