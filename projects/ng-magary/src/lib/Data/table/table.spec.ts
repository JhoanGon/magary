import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryTable, MagaryTableColumn } from './table';

interface ProductRow {
  name: string;
  category: string;
  status: string;
}

describe('MagaryTable behavior', () => {
  let fixture: ComponentFixture<MagaryTable>;
  let component: MagaryTable;

  const columns: MagaryTableColumn[] = [
    { field: 'name', header: 'Name', type: 'text' },
    { field: 'category', header: 'Category', type: 'text' },
    { field: 'status', header: 'Status', type: 'badge' },
  ];

  const rows: ProductRow[] = [
    { name: 'Alpha Phone', category: 'Electronics', status: 'INSTOCK' },
    { name: 'Beta Headphones', category: 'Audio', status: 'LOWSTOCK' },
    { name: 'Gamma Laptop', category: 'Electronics', status: 'INSTOCK' },
    { name: 'Delta Watch', category: 'Accessories', status: 'OUTOFSTOCK' },
  ];

  const kebabCase = (value: string) =>
    value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

  const lucideIcons = Object.entries(icons).reduce(
    (acc, [key, icon]) => {
      acc[key] = icon;
      acc[kebabCase(key)] = icon;
      return acc;
    },
    {} as Record<string, any>,
  );

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

  it('updates page data and emits onPageChange when moving to next page', () => {
    fixture.componentRef.setInput('paginator', true);
    fixture.componentRef.setInput('rows', 2);
    fixture.detectChanges();

    const emittedEvents: any[] = [];
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
});
