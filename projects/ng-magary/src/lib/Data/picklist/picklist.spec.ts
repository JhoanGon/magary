import { ComponentFixture, TestBed } from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryPickList } from './picklist';

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
  {} as Record<string, any>,
);

describe('MagaryPickList behavior', () => {
  let fixture: ComponentFixture<MagaryPickList>;
  let component: MagaryPickList;

  const sourceItems = [{ label: 'A' }, { label: 'B' }, { label: 'C' }];
  const targetItems = [{ label: 'X' }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryPickList],
      providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryPickList);
    component = fixture.componentInstance;
    component.source.set([...sourceItems]);
    component.target.set([...targetItems]);
    fixture.detectChanges();
  });

  it('moves selected source items to target and emits onMoveToTarget', () => {
    const moved: any[] = [];
    component.onMoveToTarget.subscribe((event) => moved.push(...event.items));
    component.selectedSource.set([sourceItems[1]]);

    component.moveRight();
    fixture.detectChanges();

    expect(component.source().map((item) => item.label)).toEqual(['A', 'C']);
    expect(component.target().map((item) => item.label)).toEqual(['X', 'B']);
    expect(component.selectedSource()).toEqual([]);
    expect(moved.map((item) => item.label)).toEqual(['B']);
  });

  it('moves all source items to target and emits onMoveAllToTarget', () => {
    const movedAll: string[][] = [];
    component.onMoveAllToTarget.subscribe((event) =>
      movedAll.push(event.items.map((item: any) => item.label)),
    );

    component.moveAllRight();
    fixture.detectChanges();

    expect(component.source()).toEqual([]);
    expect(component.target().map((item) => item.label)).toEqual([
      'X',
      'A',
      'B',
      'C',
    ]);
    expect(movedAll).toEqual([['A', 'B', 'C']]);
  });

  it('moves selected target items back to source and emits onMoveToSource', () => {
    const moved: any[] = [];
    component.onMoveToSource.subscribe((event) => moved.push(...event.items));
    component.selectedTarget.set([targetItems[0]]);

    component.moveLeft();
    fixture.detectChanges();

    expect(component.target()).toEqual([]);
    expect(component.source().map((item) => item.label)).toEqual([
      'A',
      'B',
      'C',
      'X',
    ]);
    expect(component.selectedTarget()).toEqual([]);
    expect(moved.map((item) => item.label)).toEqual(['X']);
  });

  it('supports single and meta multi-selection in source list', () => {
    component.onSourceItemClick(
      { metaKey: false, ctrlKey: false } as MouseEvent,
      sourceItems[0],
    );
    expect(component.selectedSource().map((item) => item.label)).toEqual(['A']);

    component.onSourceItemClick(
      { metaKey: true, ctrlKey: false } as MouseEvent,
      sourceItems[1],
    );
    expect(component.selectedSource().map((item) => item.label)).toEqual([
      'A',
      'B',
    ]);

    component.onSourceItemClick(
      { metaKey: true, ctrlKey: false } as MouseEvent,
      sourceItems[0],
    );
    expect(component.selectedSource().map((item) => item.label)).toEqual(['B']);
  });
});
