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

  onPageChange = output<any>();

  // Internal State
  first = signal<number>(0);
  currentPage = signal<number>(1);
  searchTerm = signal<string>('');

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

  totalPages = computed(() => {
    const rows = this.rows();
    if (rows <= 0) return 0;
    return Math.ceil(this.totalRecords() / rows);
  });

  paginatedData = computed(() => {
    const data = this.processedData();
    if (this.paginator()) {
      const start = (this.currentPage() - 1) * this.rows();
      const end = start + this.rows();
      return data.slice(start, end);
    } else {
      return data;
    }
  });

  pagesArray = computed(() => {
    return Array(this.totalPages())
      .fill(0)
      .map((x, i) => i + 1);
  });

  constructor() {
    // Reset pagination when filter changes
    effect(
      () => {
        // Dependency tracking
        this.searchTerm();
        // Action (using untracked if needed, but here we want to reset on search change)
        this.first.set(0);
        this.currentPage.set(1);
      },
      { allowSignalWrites: true },
    );
  }

  onSearch(value: string) {
    this.searchTerm.set(value);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.first.set((this.currentPage() - 1) * this.rows());

      this.onPageChange.emit({
        first: this.first(),
        rows: this.rows(),
        page: this.currentPage(),
        pageCount: this.totalPages(),
      });
    }
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
