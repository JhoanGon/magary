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

    let container = fixture.nativeElement.querySelector(
      '.magary-dataview',
    ) as HTMLElement;
    expect(container.classList.contains('magary-dataview-list')).toBe(true);
    expect(container.classList.contains('magary-dataview-grid')).toBe(false);

    fixture.componentRef.setInput('layout', 'grid');
    fixture.detectChanges();

    container = fixture.nativeElement.querySelector('.magary-dataview') as HTMLElement;
    expect(container.classList.contains('magary-dataview-grid')).toBe(true);
    expect(container.classList.contains('magary-dataview-list')).toBe(false);
  });

  it('paginates data and updates rendered slice after page change', () => {
    fixture.componentRef.setInput('value', items);
    fixture.componentRef.setInput('paginator', true);
    fixture.componentRef.setInput('rows', 2);
    fixture.detectChanges();

    component.onPageChange({
      page: 0,
      first: 0,
      rows: 2,
      pageCount: 3,
    });
    fixture.detectChanges();

    expect(component.dataToRender().map((item) => item.name)).toEqual([
      'Alpha',
      'Beta',
    ]);

    component.onPageChange({
      page: 1,
      first: 2,
      rows: 2,
      pageCount: 3,
    });
    fixture.detectChanges();

    expect(component.first()).toBe(2);
    expect(component.dataToRender().map((item) => item.name)).toEqual([
      'Gamma',
      'Delta',
    ]);
  });

  it('emits onPage when paginator next button is clicked', () => {
    fixture.componentRef.setInput('value', items);
    fixture.componentRef.setInput('paginator', true);
    fixture.componentRef.setInput('rows', 2);
    fixture.detectChanges();

    const pageEvents: PaginatorState[] = [];
    component.onPage.subscribe((event) => pageEvents.push(event));

    const nextButton = fixture.nativeElement.querySelector(
      '.magary-paginator-next',
    ) as HTMLButtonElement;
    expect(nextButton).toBeTruthy();

    nextButton.click();
    fixture.detectChanges();

    expect(pageEvents).toHaveLength(1);
    expect(pageEvents[0]).toMatchObject({
      page: 1,
      first: 2,
      rows: 2,
    });
  });

  it('renders empty message when value is empty', () => {
    fixture.componentRef.setInput('value', []);
    fixture.componentRef.setInput('emptyMessage', 'Sin datos');
    fixture.detectChanges();

    const emptyMessage = fixture.nativeElement.querySelector(
      '.magary-dataview-empty',
    ) as HTMLElement;
    expect(emptyMessage).toBeTruthy();
    expect(emptyMessage.textContent?.trim()).toBe('Sin datos');
  });

  it('uses explicit totalRecords or falls back to value length', () => {
    fixture.componentRef.setInput('value', items);
    fixture.componentRef.setInput('totalRecords', 0);
    fixture.detectChanges();
    expect(component.getTotalRecords()).toBe(5);

    fixture.componentRef.setInput('totalRecords', 50);
    fixture.detectChanges();
    expect(component.getTotalRecords()).toBe(50);
  });
});
