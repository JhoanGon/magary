import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagaryKanban, MagaryKanbanColumn, MagaryKanbanItem } from './kanban';

function createItem(id: string, label?: string): MagaryKanbanItem {
  return { id, label };
}

describe('MagaryKanban rendering', () => {
  let fixture: ComponentFixture<MagaryKanban>;
  let component: MagaryKanban;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryKanban],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryKanban);
    component = fixture.componentInstance;
  });

  function setColumns(columns: MagaryKanbanColumn[]) {
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('dragDrop', false);
    fixture.detectChanges();
  }

  it('renders columns and items from model', () => {
    setColumns([
      { id: 'todo', title: 'To Do', items: [createItem('1', 'Task A')] },
      { id: 'done', title: 'Done', items: [createItem('2', 'Task B')] },
    ]);

    const columns = fixture.nativeElement.querySelectorAll('.magary-kanban-column');
    expect(columns.length).toBe(2);

    const items = fixture.nativeElement.querySelectorAll('.magary-kanban-item');
    expect(items.length).toBe(2);

    const titles = fixture.nativeElement.querySelectorAll('.magary-kanban-column-title');
    expect(titles[0].textContent.trim()).toBe('To Do');
    expect(titles[1].textContent.trim()).toBe('Done');
  });

  it('renders item label via default template', () => {
    setColumns([
      { id: 'col1', title: 'Column', items: [createItem('item-1', 'My Task')] },
    ]);

    const itemContent = fixture.nativeElement.querySelector(
      '.magary-kanban-item-default',
    );
    expect(itemContent.textContent.trim()).toBe('My Task');
  });

  it('falls back to item.id when no label or name', () => {
    setColumns([
      { id: 'col1', title: 'Col', items: [{ id: 'fallback-id' }] },
    ]);

    const itemContent = fixture.nativeElement.querySelector(
      '.magary-kanban-item-default',
    );
    expect(itemContent.textContent.trim()).toBe('fallback-id');
  });

  it('renders empty board when columns are empty', () => {
    setColumns([]);

    const columns = fixture.nativeElement.querySelectorAll('.magary-kanban-column');
    expect(columns.length).toBe(0);
  });

  it('renders empty column when column has no items', () => {
    setColumns([
      { id: 'empty', title: 'Empty Col', items: [] },
    ]);

    const items = fixture.nativeElement.querySelectorAll('.magary-kanban-item');
    expect(items.length).toBe(0);
    const title = fixture.nativeElement.querySelector('.magary-kanban-column-title');
    expect(title.textContent.trim()).toBe('Empty Col');
  });

  it('accepts listStyle input', () => {
    expect(component.listStyle()).toBeNull();
  });

  it('assigns data attributes to items for drag-drop identifiers', () => {
    setColumns([
      { id: 'c1', title: 'C1', items: [createItem('i1', 'Item 1')] },
    ]);

    const item = fixture.nativeElement.querySelector(
      '.magary-kanban-item',
    ) as HTMLElement;
    expect(item.dataset['columnId']).toBe('c1');
    expect(item.dataset['itemId']).toBe('i1');
    expect(item.dataset['itemIndex']).toBe('0');
    expect(item.dataset['magaryKanbanItem']).toBe('true');
  });

  it('assigns data column id to column drop target', () => {
    setColumns([
      { id: 'c1', title: 'C1', items: [] },
    ]);

    const columnElement = fixture.nativeElement.querySelector(
      '[data-column-id]',
    ) as HTMLElement;
    expect(columnElement.dataset['columnId']).toBe('c1');
  });
});

describe('MagaryKanban item helpers', () => {
  let component: MagaryKanban;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryKanban],
    }).compileComponents();

    const fixture = TestBed.createComponent(MagaryKanban);
    component = fixture.componentInstance;
  });

  it('getItemId returns id string from object', () => {
    expect(component.getItemId({ id: 'abc' })).toBe('abc');
    expect(component.getItemId({})).toBe('');
    expect(component.getItemId(null)).toBe('');
  });

  it('getItemLabel prefers label over name over id', () => {
    const item: MagaryKanbanItem = { id: 'id1', label: 'Label Text', name: 'Name Text' };
    expect(component.getItemLabel(item)).toBe('Label Text');

    const noLabel = { id: 'id2', name: 'Name Only' };
    expect(component.getItemLabel(noLabel)).toBe('Name Only');

    const onlyId = { id: 'id3' };
    expect(component.getItemLabel(onlyId)).toBe('id3');
  });

  it('getItemIndex finds item position in column', () => {
    const fixture = TestBed.createComponent(MagaryKanban);
    const cmp = fixture.componentInstance;
    cmp.columns.set([
      { id: 'col', title: 'Col', items: [createItem('a'), createItem('b'), createItem('c')] },
    ]);
    fixture.detectChanges();

    expect(cmp.getItemIndex('col', 'a')).toBe(0);
    expect(cmp.getItemIndex('col', 'b')).toBe(1);
    expect(cmp.getItemIndex('col', 'c')).toBe(2);
    expect(cmp.getItemIndex('col', 'z')).toBe(-1);
    expect(cmp.getItemIndex('nonexistent', 'a')).toBe(-1);
    expect(cmp.getItemIndex('col', '')).toBe(-1);
  });
});

describe('MagaryKanban with templates', () => {
  let component: MagaryKanban;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryKanban],
    }).compileComponents();

    const fixture = TestBed.createComponent(MagaryKanban);
    component = fixture.componentInstance;
  });

  it('exposes kanbanItemTemplate content child', () => {
    expect(component.kanbanItemTemplate()).toBeUndefined();
  });

  it('exposes kanbanColumnHeaderTemplate content child', () => {
    expect(component.kanbanColumnHeaderTemplate()).toBeUndefined();
  });
});

describe('MagaryKanban model binding', () => {
  let fixture: ComponentFixture<MagaryKanban>;
  let component: MagaryKanban;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryKanban],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryKanban);
    component = fixture.componentInstance;
  });

  it('columns model is writable', () => {
    component.columns.set([
      { id: 'new-col', title: 'New', items: [{ id: 'x', label: 'X' }] },
    ]);
    fixture.componentRef.setInput('dragDrop', false);
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.magary-kanban-column-title');
    expect(title.textContent.trim()).toBe('New');
  });

  it('dragDrop input defaults to true via template binding', () => {
    // Default binding sets dragDrop=false in the host template, so verify
    // the bare component input default is true via its initial value.
    expect(component.dragDrop()).toBe(true);
  });
});
