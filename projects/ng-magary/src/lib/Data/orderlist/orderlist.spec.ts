import { ComponentFixture, TestBed } from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryOrderList } from './orderlist';

const kebabCase = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .toLowerCase();

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, (typeof icons)[keyof typeof icons]>,
);

describe('MagaryOrderList behavior', () => {
  let fixture: ComponentFixture<MagaryOrderList>;
  let component: MagaryOrderList;

  const items = [{ label: 'A' }, { label: 'B' }, { label: 'C' }];
  const dragHarness = (instance: MagaryOrderList) =>
    instance as unknown as {
      reorderFromDrag: (sourceIndex: number, targetIndex: number) => void;
    };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryOrderList],
      providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryOrderList);
    component = fixture.componentInstance;
    component.value.set([...items]);
    component.selection.set([]);
    fixture.detectChanges();
  });

  it('emits selection changes for single click and toggle-off behavior', () => {
    const selections: string[][] = [];
    component.onSelectionChange.subscribe((selection) =>
      selections.push(selection.map((item) => String(item.label ?? ''))),
    );

    component.onItemClick(
      { metaKey: false, ctrlKey: false } as MouseEvent,
      items[1],
      1,
    );
    expect(component.selection().map((item) => item.label)).toEqual(['B']);

    component.onItemClick(
      { metaKey: false, ctrlKey: false } as MouseEvent,
      items[1],
      1,
    );
    expect(component.selection()).toEqual([]);
    expect(selections).toEqual([['B'], []]);
  });

  it('supports meta multi-selection on clicks', () => {
    component.onItemClick(
      { metaKey: false, ctrlKey: false } as MouseEvent,
      items[0],
      0,
    );
    component.onItemClick(
      { metaKey: true, ctrlKey: false } as MouseEvent,
      items[2],
      2,
    );

    expect(component.selection().map((item) => item.label)).toEqual(['A', 'C']);
  });

  it('reorders selected item upward and downward and emits onReorder', () => {
    const orders: string[][] = [];
    component.onReorder.subscribe((list) =>
      orders.push(list.map((item) => String(item.label ?? ''))),
    );

    component.selection.set([items[1]]);
    component.moveUp();
    expect(component.value().map((item) => item.label)).toEqual(['B', 'A', 'C']);

    component.moveDown();
    expect(component.value().map((item) => item.label)).toEqual(['A', 'B', 'C']);
    expect(orders).toEqual([
      ['B', 'A', 'C'],
      ['A', 'B', 'C'],
    ]);
  });

  it('moves selected items to top and bottom', () => {
    component.selection.set([items[2]]);
    component.moveTop();
    expect(component.value().map((item) => item.label)).toEqual(['C', 'A', 'B']);

    component.moveBottom();
    expect(component.value().map((item) => item.label)).toEqual(['A', 'B', 'C']);
  });

  it('reorders by drag indices and emits onReorder', () => {
    const orders: string[][] = [];
    component.onReorder.subscribe((list) =>
      orders.push(list.map((item) => String(item.label ?? ''))),
    );

    dragHarness(component).reorderFromDrag(0, 2);

    expect(component.value().map((item) => item.label)).toEqual(['B', 'C', 'A']);
    expect(orders).toEqual([['B', 'C', 'A']]);
  });

  it('ignores invalid drag reorder operations', () => {
    const orders: string[][] = [];
    component.onReorder.subscribe((list) =>
      orders.push(list.map((item) => String(item.label ?? ''))),
    );

    dragHarness(component).reorderFromDrag(1, 1);
    dragHarness(component).reorderFromDrag(-1, 2);
    dragHarness(component).reorderFromDrag(0, 9);

    expect(component.value().map((item) => item.label)).toEqual(['A', 'B', 'C']);
    expect(orders).toEqual([]);
  });

  // === Loading and error states ===

  it('renders loading skeleton when loading is true', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const skeleton = fixture.nativeElement.querySelector(
      '.magary-orderlist-loading',
    ) as HTMLElement;
    expect(skeleton).toBeTruthy();
  });

  it('renders error message and retry when errorMessage is set', () => {
    fixture.componentRef.setInput('errorMessage', 'Load failed');
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector(
      '.magary-orderlist-error',
    ) as HTMLElement;
    expect(error).toBeTruthy();
    expect(error.textContent).toContain('Load failed');

    const retryBtn = error.querySelector('button') as HTMLButtonElement;
    expect(retryBtn).toBeTruthy();
  });

  it('emits onErrorRetry on retry click', () => {
    fixture.componentRef.setInput('errorMessage', 'Failed');
    fixture.detectChanges();

    let retried = false;
    component.onErrorRetry.subscribe(() => (retried = true));

    const retryBtn = fixture.nativeElement.querySelector(
      '.magary-orderlist-error button',
    ) as HTMLButtonElement;
    retryBtn.click();
    fixture.detectChanges();

    expect(retried).toBe(true);
  });
});
