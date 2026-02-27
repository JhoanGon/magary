import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagaryPickList } from './picklist';

describe('MagaryPickList behavior', () => {
  let fixture: ComponentFixture<MagaryPickList>;
  let component: MagaryPickList;

  const sourceItems = [{ label: 'A' }, { label: 'B' }, { label: 'C' }];
  const targetItems = [{ label: 'X' }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryPickList],
    })
      // These tests validate list transfer/selection logic and don't require child rendering.
      .overrideComponent(MagaryPickList, {
        set: { template: '<div></div>' },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MagaryPickList);
    component = fixture.componentInstance;
    component.source.set([...sourceItems]);
    component.target.set([...targetItems]);
    fixture.detectChanges();
  });

  it('moves selected source items to target and emits onMoveToTarget', () => {
    const moved: string[] = [];
    component.onMoveToTarget.subscribe((event) =>
      moved.push(...event.items.map((item) => String(item.label ?? ''))),
    );
    component.selectedSource.set([sourceItems[1]]);

    component.moveRight();
    fixture.detectChanges();

    expect(component.source().map((item) => item.label)).toEqual(['A', 'C']);
    expect(component.target().map((item) => item.label)).toEqual(['X', 'B']);
    expect(component.selectedSource()).toEqual([]);
    expect(moved).toEqual(['B']);
  });

  it('moves all source items to target and emits onMoveAllToTarget', () => {
    const movedAll: string[][] = [];
    component.onMoveAllToTarget.subscribe((event) =>
      movedAll.push(event.items.map((item) => String(item.label ?? ''))),
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
    const moved: string[] = [];
    component.onMoveToSource.subscribe((event) =>
      moved.push(...event.items.map((item) => String(item.label ?? ''))),
    );
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
    expect(moved).toEqual(['X']);
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
