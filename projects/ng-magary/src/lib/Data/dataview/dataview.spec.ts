import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagaryDataView } from './dataview';
import { PaginatorState } from '../paginator/paginator';

describe('MagaryDataView behavior', () => {
  let fixture: ComponentFixture<MagaryDataView>;
  let component: MagaryDataView;

  const items = [
    { id: 1, name: 'Alpha' },
    { id: 2, name: 'Beta' },
    { id: 3, name: 'Gamma' },
    { id: 4, name: 'Delta' },
    { id: 5, name: 'Epsilon' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryDataView],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryDataView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('applies layout classes from input changes', () => {
    fixture.componentRef.setInput('layout', 'list');
    fixture.detectChanges();

    let container = fixture.nativeElement.querySelector('.magary-dataview') as HTMLElement;
    expect(container.classList.contains('magary-dataview-list')).toBe(true);

    fixture.componentRef.setInput('layout', 'grid');
    fixture.detectChanges();

    container = fixture.nativeElement.querySelector('.magary-dataview') as HTMLElement;
    expect(container.classList.contains('magary-dataview-grid')).toBe(true);
  });

  it('paginates data and updates rendered slice after page change', () => {
    fixture.componentRef.setInput('value', items);
    fixture.componentRef.setInput('paginator', true);
    fixture.componentRef.setInput('rows', 2);
    fixture.detectChanges();

    component.onPageChange({ page: 0, first: 0, rows: 2, pageCount: 3 });
    fixture.detectChanges();
    expect(component.dataToRender().map((item) => item.name)).toEqual(['Alpha', 'Beta']);

    component.onPageChange({ page: 1, first: 2, rows: 2, pageCount: 3 });
    fixture.detectChanges();
    expect(component.dataToRender().map((item) => item.name)).toEqual(['Gamma', 'Delta']);
  });

  it('renders empty message when value is empty', () => {
    fixture.componentRef.setInput('value', []);
    fixture.componentRef.setInput('emptyMessage', 'Sin datos');
    fixture.detectChanges();

    const msg = fixture.nativeElement.querySelector('.magary-dataview-empty') as HTMLElement;
    expect(msg).toBeTruthy();
    expect(msg.textContent?.trim()).toBe('Sin datos');
  });

  it('uses explicit totalRecords or falls back to value length', () => {
    fixture.componentRef.setInput('value', items);
    fixture.detectChanges();
    expect(component.getTotalRecords()).toBe(5);

    fixture.componentRef.setInput('totalRecords', 50);
    fixture.detectChanges();
    expect(component.getTotalRecords()).toBe(50);
  });

  it('renders error message when errorMessage is set', () => {
    fixture.componentRef.setInput('errorMessage', 'Load error');
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.magary-dataview-error') as HTMLElement;
    expect(error).toBeTruthy();
    expect(error.textContent).toContain('Load error');
  });

  it('emits onErrorRetry when retry clicked', () => {
    fixture.componentRef.setInput('errorMessage', 'Failed');
    fixture.detectChanges();

    let retried = false;
    component.onErrorRetry.subscribe(() => (retried = true));

    const btn = fixture.nativeElement.querySelector('.magary-dataview-error button') as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();
    expect(retried).toBe(true);
  });

  it('emits onSort via emitSort', () => {
    const events: { field: string | null; order: number }[] = [];
    component.onSort.subscribe((e) => events.push(e));

    component.emitSort('name', 1);
    fixture.detectChanges();

    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({ field: 'name', order: 1 });
  });
});
