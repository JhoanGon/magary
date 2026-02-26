import { Component, importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, icons } from 'lucide-angular';
import {
  MagaryTable,
  MagaryTableColumn,
  MagaryTableSortState,
} from './table';
import { PaginatorState } from '../paginator/paginator';
import { MagaryTemplate } from './table-templates';

interface ProductRow {
  name: string;
  category: string;
  status: string;
}

const kebabCase = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, (typeof icons)[keyof typeof icons]>,
);

describe('MagaryTable behavior', () => {
  let fixture: ComponentFixture<MagaryTable>;
  let component: MagaryTable;

  const columns: MagaryTableColumn[] = [
    { field: 'name', header: 'Name', type: 'text', sortable: true },
    { field: 'category', header: 'Category', type: 'text', sortable: true },
    { field: 'status', header: 'Status', type: 'badge', sortable: true },
  ];

  const rows: ProductRow[] = [
    { name: 'Alpha Phone', category: 'Electronics', status: 'INSTOCK' },
    { name: 'Beta Headphones', category: 'Audio', status: 'LOWSTOCK' },
    { name: 'Gamma Laptop', category: 'Electronics', status: 'INSTOCK' },
    { name: 'Delta Watch', category: 'Accessories', status: 'OUTOFSTOCK' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryTable],
      providers: [
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryTable);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('value', rows);
    fixture.componentRef.setInput('globalFilterFields', [
      'name',
      'category',
      'status',
    ]);
    fixture.detectChanges();
  });

  it('filters rows using global filter fields', () => {
    component.onSearch('electronics');
    fixture.detectChanges();

    expect(component.totalRecords()).toBe(2);
    expect(component.paginatedData().map((row) => row.name)).toEqual([
      'Alpha Phone',
      'Gamma Laptop',
    ]);
  });

  it('sorts rows and cycles between ascending, descending and none', () => {
    const emittedEvents: MagaryTableSortState[] = [];
    const subscription = component.onSortChange.subscribe((event) =>
      emittedEvents.push(event),
    );

    const nameSortButton = fixture.nativeElement.querySelector(
      'th .magary-sort-button',
    ) as HTMLButtonElement;
    expect(nameSortButton).toBeTruthy();

    nameSortButton.click();
    fixture.detectChanges();
    expect(component.paginatedData().map((row) => row.name)).toEqual([
      'Alpha Phone',
      'Beta Headphones',
      'Delta Watch',
      'Gamma Laptop',
    ]);

    nameSortButton.click();
    fixture.detectChanges();
    expect(component.paginatedData().map((row) => row.name)).toEqual([
      'Gamma Laptop',
      'Delta Watch',
      'Beta Headphones',
      'Alpha Phone',
    ]);

    nameSortButton.click();
    fixture.detectChanges();
    expect(component.paginatedData().map((row) => row.name)).toEqual([
      'Alpha Phone',
      'Beta Headphones',
      'Gamma Laptop',
      'Delta Watch',
    ]);

    expect(emittedEvents).toEqual([
      { field: 'name', order: 1 },
      { field: 'name', order: -1 },
      { field: null, order: 0 },
    ]);

    subscription.unsubscribe();
  });

  it('resets to first page when the search term changes', () => {
    fixture.componentRef.setInput('paginator', true);
    fixture.componentRef.setInput('rows', 2);
    fixture.detectChanges();

    component.onPaginatorChange({
      page: 1,
      first: 2,
      rows: 2,
      pageCount: 2,
    });
    expect(component.first()).toBe(2);

    component.onSearch('alpha');
    fixture.detectChanges();

    expect(component.first()).toBe(0);
  });

  it('filters rows by nested fields when globalFilterFields uses dot notation', () => {
    const nestedRows = [
      {
        name: 'Alpha Phone',
        category: 'Electronics',
        status: 'INSTOCK',
        meta: { city: 'Lima' },
      },
      {
        name: 'Beta Headphones',
        category: 'Audio',
        status: 'LOWSTOCK',
        meta: { city: 'Bogota' },
      },
      {
        name: 'Gamma Laptop',
        category: 'Electronics',
        status: 'INSTOCK',
        meta: { city: 'Quito' },
      },
    ];

    fixture.componentRef.setInput('value', nestedRows);
    fixture.componentRef.setInput('globalFilterFields', ['meta.city']);
    fixture.detectChanges();

    component.onSearch('lima');
    fixture.detectChanges();

    expect(component.totalRecords()).toBe(1);
    expect(component.paginatedData().map((row) => row.name)).toEqual([
      'Alpha Phone',
    ]);
  });

  it('updates page data and emits onPageChange when moving to next page', () => {
    fixture.componentRef.setInput('paginator', true);
    fixture.componentRef.setInput('rows', 2);
    fixture.detectChanges();

    const emittedEvents: PaginatorState[] = [];
    const subscription = component.onPageChange.subscribe((event) =>
      emittedEvents.push(event),
    );

    const nextButton = fixture.nativeElement.querySelector(
      '.magary-paginator-next',
    ) as HTMLButtonElement;

    expect(nextButton).toBeTruthy();
    nextButton.click();
    fixture.detectChanges();

    expect(component.first()).toBe(2);
    expect(component.paginatedData().map((row) => row.name)).toEqual([
      'Gamma Laptop',
      'Delta Watch',
    ]);
    expect(emittedEvents).toHaveLength(1);
    expect(emittedEvents[0]).toMatchObject({
      page: 1,
      first: 2,
      rows: 2,
      pageCount: 2,
    });

    subscription.unsubscribe();
  });

  it('resets first index when paginator is disabled after navigation', () => {
    fixture.componentRef.setInput('paginator', true);
    fixture.componentRef.setInput('rows', 2);
    fixture.detectChanges();

    component.onPaginatorChange({
      page: 1,
      first: 2,
      rows: 2,
      pageCount: 2,
    });
    fixture.detectChanges();
    expect(component.first()).toBe(2);

    fixture.componentRef.setInput('paginator', false);
    fixture.detectChanges();

    expect(component.first()).toBe(0);
    expect(component.paginatedData().map((row) => row.name)).toEqual([
      'Alpha Phone',
      'Beta Headphones',
      'Gamma Laptop',
      'Delta Watch',
    ]);
  });

  it('resets to first page when sort changes on paginated table', () => {
    fixture.componentRef.setInput('paginator', true);
    fixture.componentRef.setInput('rows', 2);
    fixture.detectChanges();

    component.onPaginatorChange({
      page: 1,
      first: 2,
      rows: 2,
      pageCount: 2,
    });
    fixture.detectChanges();
    expect(component.first()).toBe(2);

    const nameSortButton = fixture.nativeElement.querySelector(
      'th .magary-sort-button',
    ) as HTMLButtonElement;
    nameSortButton.click();
    fixture.detectChanges();

    expect(component.first()).toBe(0);
    expect(component.paginatedData().map((row) => row.name)).toEqual([
      'Alpha Phone',
      'Beta Headphones',
    ]);
  });

  it('resets active sort when the sorted column is no longer sortable', () => {
    const emittedEvents: MagaryTableSortState[] = [];
    const subscription = component.onSortChange.subscribe((event) =>
      emittedEvents.push(event),
    );

    const nameSortButton = fixture.nativeElement.querySelector(
      'th .magary-sort-button',
    ) as HTMLButtonElement;
    nameSortButton.click();
    fixture.detectChanges();

    expect(component.sortState()).toEqual({ field: 'name', order: 1 });

    fixture.componentRef.setInput('columns', [
      { field: 'name', header: 'Name', sortable: false },
      { field: 'category', header: 'Category', sortable: true },
      { field: 'status', header: 'Status', sortable: true },
    ]);
    fixture.detectChanges();

    expect(component.sortState()).toEqual({ field: null, order: 0 });
    expect(component.paginatedData().map((row) => row.name)).toEqual([
      'Alpha Phone',
      'Beta Headphones',
      'Gamma Laptop',
      'Delta Watch',
    ]);
    expect(emittedEvents).toEqual([{ field: 'name', order: 1 }]);

    subscription.unsubscribe();
  });

  it('sorts nested date values and keeps nulls at the end on ascending order', () => {
    const datedRows = [
      {
        name: 'Newest',
        category: 'Electronics',
        status: 'INSTOCK',
        meta: { created: '2026-02-20T10:00:00.000Z' },
      },
      {
        name: 'Oldest',
        category: 'Audio',
        status: 'LOWSTOCK',
        meta: { created: new Date('2026-01-02T10:00:00.000Z') },
      },
      {
        name: 'Middle',
        category: 'Accessories',
        status: 'INSTOCK',
        meta: { created: '2026-02-10T10:00:00.000Z' },
      },
      {
        name: 'Missing',
        category: 'Accessories',
        status: 'OUTOFSTOCK',
        meta: { created: null },
      },
    ];

    fixture.componentRef.setInput('columns', [
      { field: 'meta.created', header: 'Created', sortable: true },
      { field: 'name', header: 'Name', sortable: true },
    ]);
    fixture.componentRef.setInput('value', datedRows);
    fixture.componentRef.setInput('globalFilterFields', []);
    fixture.detectChanges();

    component.toggleSort('meta.created');
    fixture.detectChanges();

    expect(component.paginatedData().map((row) => row.name)).toEqual([
      'Oldest',
      'Middle',
      'Newest',
      'Missing',
    ]);
  });

  it('renders empty state when data is empty and not loading', () => {
    fixture.componentRef.setInput('value', []);
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();

    const emptyStateText = fixture.nativeElement.querySelector(
      '.empty-state p',
    ) as HTMLElement | null;

    expect(emptyStateText).toBeTruthy();
    expect(emptyStateText?.textContent).toContain('No records found');
  });

  it('marks the scroll wrapper as a keyboard-focusable region', () => {
    const scrollWrapper = fixture.nativeElement.querySelector(
      '.table-scroll-wrapper',
    ) as HTMLElement;

    expect(scrollWrapper.getAttribute('tabindex')).toBe('0');
    expect(scrollWrapper.getAttribute('role')).toBe('region');
    expect(scrollWrapper.getAttribute('aria-label')).toBe('Table data region');

    fixture.componentRef.setInput('title', 'Products');
    fixture.detectChanges();

    expect(scrollWrapper.getAttribute('aria-label')).toBe(
      'Products data region',
    );
  });

  it('does not render data rows while loading is true', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const dataRows = fixture.nativeElement.querySelectorAll(
      '.table-row:not(.skeleton-row)',
    ) as NodeListOf<HTMLTableRowElement>;
    const skeletonRows = fixture.nativeElement.querySelectorAll(
      '.skeleton-row',
    ) as NodeListOf<HTMLTableRowElement>;

    expect(dataRows.length).toBe(0);
    expect(skeletonRows.length).toBeGreaterThan(0);
  });

  it('normalizes rows input to at least one row per page', () => {
    fixture.componentRef.setInput('paginator', true);
    fixture.componentRef.setInput('rows', 0);
    fixture.detectChanges();

    expect(component.currentRows()).toBe(1);
    expect(component.paginatedData()).toHaveLength(1);
  });

  it('normalizes invalid paginator events before emitting', () => {
    fixture.componentRef.setInput('paginator', true);
    fixture.componentRef.setInput('rows', 2);
    fixture.detectChanges();

    const emittedEvents: PaginatorState[] = [];
    const subscription = component.onPageChange.subscribe((event) =>
      emittedEvents.push(event),
    );

    component.onPaginatorChange({
      page: 99,
      first: 999,
      rows: 0,
      pageCount: 0,
    });
    fixture.detectChanges();

    expect(component.currentRows()).toBe(1);
    expect(component.first()).toBe(3);
    expect(component.paginatedData().map((row) => row.name)).toEqual([
      'Delta Watch',
    ]);
    expect(emittedEvents).toEqual([
      { page: 3, first: 3, rows: 1, pageCount: 4 },
    ]);

    subscription.unsubscribe();
  });

  it('clamps first index when data shrinks on paginated view', () => {
    fixture.componentRef.setInput('paginator', true);
    fixture.componentRef.setInput('rows', 2);
    fixture.detectChanges();

    component.onPaginatorChange({
      page: 1,
      first: 2,
      rows: 2,
      pageCount: 2,
    });
    fixture.detectChanges();
    expect(component.first()).toBe(2);

    fixture.componentRef.setInput('value', [rows[0]]);
    fixture.detectChanges();

    expect(component.first()).toBe(0);
    expect(component.paginatedData().map((row) => row.name)).toEqual([
      'Alpha Phone',
    ]);
  });
});

@Component({
  standalone: true,
  imports: [MagaryTable, MagaryTemplate],
  template: `
    <magary-table [value]="rows" [columns]="columns">
      <ng-template magaryTemplate="caption">
        <span class="custom-caption">Inventory</span>
      </ng-template>
      <ng-template magaryTemplate="header">
        <tr class="custom-header-row">
          <th>Custom Name</th>
          <th>Custom Category</th>
        </tr>
      </ng-template>
      <ng-template magaryTemplate="body" let-item>
        <tr class="custom-body-row">
          <td>{{ item.name }}</td>
          <td>{{ item.category }}</td>
        </tr>
      </ng-template>
    </magary-table>
  `,
})
class MagaryTableTemplateHostComponent {
  columns: MagaryTableColumn[] = [
    { field: 'name', header: 'Name', sortable: true, width: '40%' },
    { field: 'category', header: 'Category', sortable: true, width: '60%' },
  ];

  rows: ProductRow[] = [
    { name: 'Alpha Phone', category: 'Electronics', status: 'INSTOCK' },
  ];
}

describe('MagaryTable projected templates', () => {
  let fixture: ComponentFixture<MagaryTableTemplateHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryTableTemplateHostComponent],
      providers: [
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryTableTemplateHostComponent);
    fixture.detectChanges();
  });

  it('renders projected caption and header templates', () => {
    const caption = fixture.nativeElement.querySelector(
      '.custom-caption',
    ) as HTMLElement | null;
    const customHeaderRow = fixture.nativeElement.querySelector(
      '.custom-header-row',
    ) as HTMLTableRowElement | null;
    const sortButton = fixture.nativeElement.querySelector(
      '.magary-sort-button',
    ) as HTMLButtonElement | null;

    expect(caption).toBeTruthy();
    expect(caption?.textContent ?? '').toContain('Inventory');
    expect(customHeaderRow).toBeTruthy();
    expect(customHeaderRow?.textContent).toContain('Custom Name');
    expect(sortButton).toBeNull();
  });

  it('applies configured column widths through colgroup with projected templates', () => {
    const columns = fixture.nativeElement.querySelectorAll(
      'colgroup col',
    ) as NodeListOf<HTMLTableColElement>;

    expect(columns.length).toBe(2);
    expect(columns[0].style.width).toBe('40%');
    expect(columns[1].style.width).toBe('60%');
  });
});
