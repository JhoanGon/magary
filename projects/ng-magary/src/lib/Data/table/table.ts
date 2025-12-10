import {
  Component,
  output,
  input,
  signal,
  computed,
  effect,
  ChangeDetectionStrategy,
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

import { LucideAngularModule } from 'lucide-angular';
export interface MagaryTableColumn {
  field: string;
  header: string;
  type?: 'text' | 'avatar' | 'badge' | 'date' | 'currency';
  sortable?: boolean;
  width?: string;
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
  value = input<any[]>([]);
  columns = input<MagaryTableColumn[]>([]);
  paginator = input<boolean>(false);
  rows = input<number>(5);
  globalFilterFields = input<string[]>([]);
  title = input<string>('');
  loading = input<boolean>(false);
  responsiveLayout = input<boolean>(true);

  // New input for Paginator options
  rowsPerPageOptions = input<number[]>([]);

  onPageChange = output<any>();

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
    effect(
      () => {
        // Dependency tracking
        this.searchTerm();
        // Action
        this.first.set(0);
      },
      { allowSignalWrites: true },
    );

    // Sync initial rows input with internal state
    effect(
      () => {
        this.currentRows.set(this.rows());
      },
      { allowSignalWrites: true },
    );
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

  resolveFieldData(data: any, field: string): any {
    if (data && field) {
      if (field.indexOf('.') == -1) {
        return data[field];
      } else {
        let fields: string[] = field.split('.');
        let value = data;
        for (let i = 0, len = fields.length; i < len; ++i) {
          if (value == null) {
            return null;
          }
          value = value[fields[i]];
        }
        return value;
      }
    }
    return null;
  }

  getAvatarLabel(row: any): string {
    const val = this.resolveFieldData(row, 'name');
    return val ? String(val).slice(0, 1).toUpperCase() : '';
  }
}
