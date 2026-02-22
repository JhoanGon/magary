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
});
