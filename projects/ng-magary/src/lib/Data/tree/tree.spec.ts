import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { LucideAngularModule, icons } from 'lucide-angular';
import {
  MagaryTreeNode,
  MagaryTreeNodeDropEvent,
  MagaryTreeNodeSelectionEvent,
} from './tree-node.interface';
import { MagaryTree } from './tree';

const kebabCase = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

type LucideIconData = (typeof icons)[keyof typeof icons];

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, LucideIconData>,
);

describe('MagaryTree behavior', () => {
  let fixture: ComponentFixture<MagaryTree>;
  let component: MagaryTree;

  const nodes: MagaryTreeNode[] = [
    {
      key: '0',
      label: 'Documents',
      icon: 'folder',
      children: [
        {
          key: '0-0',
          label: 'Work',
          icon: 'folder',
          children: [{ key: '0-0-0', label: 'Expenses.doc', icon: 'file-text' }],
        },
      ],
    },
    { key: '1', label: 'Pictures', icon: 'image' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryTree],
      providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryTree);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', nodes);
    fixture.detectChanges();
  });

  it('filters tree nodes in lenient mode from filter input', () => {
    fixture.componentRef.setInput('filter', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      '.magary-tree-filter-input',
    ) as HTMLInputElement;
    input.value = 'work';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.filteredValue()).toHaveLength(1);
    expect(component.filteredValue()[0].label).toBe('Documents');
    expect(component.filteredValue()[0].children?.[0].label).toBe('Work');
    expect(fixture.nativeElement.textContent).toContain('Work');
    expect(fixture.nativeElement.textContent).not.toContain('Pictures');
  });

  it('applies strict filter mode and shows empty state when there is no exact match', () => {
    fixture.componentRef.setInput('filter', true);
    fixture.componentRef.setInput('filterMode', 'strict');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      '.magary-tree-filter-input',
    ) as HTMLInputElement;
    input.value = 'wor';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.filteredValue()).toHaveLength(0);
    expect(fixture.nativeElement.textContent).toContain('No records found');

    input.value = 'work';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.filteredValue()).toHaveLength(1);
    expect(component.filteredValue()[0].label).toBe('Documents');
  });

  it('emits node select and unselect events from node content click', () => {
    fixture.componentRef.setInput('selectionMode', 'single');
    fixture.componentRef.setInput('selection', null);
    fixture.detectChanges();

    const selectEvents: MagaryTreeNodeSelectionEvent[] = [];
    const unselectEvents: MagaryTreeNodeSelectionEvent[] = [];
    component.onNodeSelect.subscribe((event) => selectEvents.push(event));
    component.onNodeUnselect.subscribe((event) => unselectEvents.push(event));

    const firstNodeContent = fixture.nativeElement.querySelector(
      '.magary-treenode-content',
    ) as HTMLElement;
    firstNodeContent.click();
    fixture.detectChanges();

    expect(selectEvents).toHaveLength(1);
    expect(selectEvents[0].node.label).toBe('Documents');

    fixture.componentRef.setInput('selection', selectEvents[0].node);
    fixture.detectChanges();

    firstNodeContent.click();
    fixture.detectChanges();

    expect(unselectEvents).toHaveLength(1);
    expect(unselectEvents[0].node.label).toBe('Documents');
  });

  it('emits expand and collapse events from toggler click', () => {
    const expandEvents: MagaryTreeNode[] = [];
    const collapseEvents: MagaryTreeNode[] = [];
    component.onNodeExpand.subscribe((event) => expandEvents.push(event));
    component.onNodeCollapse.subscribe((event) => collapseEvents.push(event));

    const toggler = fixture.nativeElement.querySelector(
      '.magary-tree-toggler',
    ) as HTMLButtonElement;
    toggler.click();
    fixture.detectChanges();

    expect(expandEvents).toHaveLength(1);
    expect(expandEvents[0].label).toBe('Documents');

    toggler.click();
    fixture.detectChanges();

    expect(collapseEvents).toHaveLength(1);
    expect(collapseEvents[0].label).toBe('Documents');
  });

  it('emits onNodeDrop payload from root drop handler', () => {
    const dropEvents: MagaryTreeNodeDropEvent[] = [];
    component.onNodeDrop.subscribe((event) => dropEvents.push(event));

    const mockDropEvent = {
      item: {
        data: { key: 'drag-1', label: 'Dragged Node' },
      },
    } as unknown as CdkDragDrop<MagaryTreeNode[]>;

    component.handleDrop(mockDropEvent, null);

    expect(dropEvents).toHaveLength(1);
    expect(dropEvents[0]).toMatchObject({
      parent: null,
      dragNode: { key: 'drag-1', label: 'Dragged Node' },
    });
  });
});
