import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagaryPaginator, PaginatorState } from './paginator';

describe('MagaryPaginator behavior', () => {
  let fixture: ComponentFixture<MagaryPaginator>;
  let component: MagaryPaginator;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryPaginator],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryPaginator);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('totalRecords', 50);
    fixture.componentRef.setInput('rows', 10);
    fixture.componentRef.setInput('first', 0);
    fixture.detectChanges();
  });

  it('emits next-page state when next button is clicked', () => {
    const events: PaginatorState[] = [];
    component.onPageChange.subscribe((event) => events.push(event));

    const nextButton = fixture.nativeElement.querySelector(
      '.magary-paginator-next',
    ) as HTMLButtonElement;

    expect(nextButton.disabled).toBe(false);
    nextButton.click();
    fixture.detectChanges();

    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      page: 1,
      first: 10,
      rows: 10,
      pageCount: 5,
    });
  });

  it('applies disabled state for edges (first and last page)', () => {
    const firstButton = fixture.nativeElement.querySelector(
      '.magary-paginator-first',
    ) as HTMLButtonElement;
    const prevButton = fixture.nativeElement.querySelector(
      '.magary-paginator-prev',
    ) as HTMLButtonElement;
    const nextButton = fixture.nativeElement.querySelector(
      '.magary-paginator-next',
    ) as HTMLButtonElement;
    const lastButton = fixture.nativeElement.querySelector(
      '.magary-paginator-last',
    ) as HTMLButtonElement;

    expect(firstButton.disabled).toBe(true);
    expect(prevButton.disabled).toBe(true);
    expect(nextButton.disabled).toBe(false);
    expect(lastButton.disabled).toBe(false);

    fixture.componentRef.setInput('first', 40);
    fixture.detectChanges();

    expect(firstButton.disabled).toBe(false);
    expect(prevButton.disabled).toBe(false);
    expect(nextButton.disabled).toBe(true);
    expect(lastButton.disabled).toBe(true);
  });

  it('emits selected page when a page link is clicked', () => {
    fixture.componentRef.setInput('totalRecords', 100);
    fixture.componentRef.setInput('first', 20);
    fixture.detectChanges();

    const events: PaginatorState[] = [];
    component.onPageChange.subscribe((event) => events.push(event));

    const pageButtons = Array.from(
      fixture.nativeElement.querySelectorAll('.magary-paginator-page'),
    ) as HTMLButtonElement[];
    const pageFourButton = pageButtons.find(
      (button) => button.textContent?.trim() === '4',
    );

    expect(pageFourButton).toBeTruthy();
    pageFourButton?.click();
    fixture.detectChanges();

    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      page: 3,
      first: 30,
      rows: 10,
      pageCount: 10,
    });
  });

  it('emits rows-per-page selection state', () => {
    fixture.componentRef.setInput('totalRecords', 95);
    fixture.componentRef.setInput('rowsPerPageOptions', [10, 20, 30]);
    fixture.detectChanges();

    const events: PaginatorState[] = [];
    component.onPageChange.subscribe((event) => events.push(event));

    const rowsSelect = fixture.nativeElement.querySelector(
      '.magary-paginator-rpp-dropdown',
    ) as HTMLSelectElement;

    expect(rowsSelect.getAttribute('aria-label')).toBe('Rows per page');

    rowsSelect.value = '20';
    rowsSelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      page: 0,
      first: 0,
      rows: 20,
      pageCount: 5,
    });
  });

  it('hides the paginator when there are no records', () => {
    fixture.componentRef.setInput('totalRecords', 0);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector(
      '.magary-paginator',
    ) as HTMLElement;
    expect(container.classList.contains('hidden')).toBe(true);
  });
});
