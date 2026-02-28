import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  effect,
  ElementRef,
  input,
  model,
  OnDestroy,
  output,
  TemplateRef,
  ViewEncapsulation,
  viewChild,
  viewChildren,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { MagaryOrderList } from '../orderlist/orderlist';

const KANBAN_SOURCE_TYPE = 'magary-kanban-source';
const KANBAN_CARD_TARGET_TYPE = 'magary-kanban-card-target';
const KANBAN_COLUMN_TARGET_TYPE = 'magary-kanban-column-target';

export type MagaryKanbanItem = Record<string, unknown> & {
  id: string;
  label?: unknown;
};

export type MagaryKanbanColumn<TItem extends MagaryKanbanItem = MagaryKanbanItem> =
  {
    id: string;
    title?: string;
    items: TItem[];
  };

export type MagaryKanbanMoveEvent<
  TItem extends MagaryKanbanItem = MagaryKanbanItem,
> = {
  item: TItem;
  fromColumnId: string;
  toColumnId: string;
  fromIndex: number;
  toIndex: number;
  columns: MagaryKanbanColumn<TItem>[];
};

type SourcePointer = {
  columnId: string;
  itemId: string;
};

type TargetPointer = {
  columnId: string;
  index: number;
};

type MoveResult = {
  columns: MagaryKanbanColumn[];
  moved: boolean;
  item: MagaryKanbanItem | null;
  fromIndex: number;
  toIndex: number;
};

@Component({
  selector: 'magary-kanban',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban.html',
  styleUrl: './kanban.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'magary-kanban-host',
  },
})
export class MagaryKanban implements AfterViewInit, OnDestroy {
  columns = model<MagaryKanbanColumn[]>([]);
  listStyle = input<Record<string, string | number | null | undefined> | null>(
    null,
  );
  dragDrop = input(true, { transform: booleanAttribute });

  onColumnsChange = output<MagaryKanbanColumn[]>();
  onMove = output<MagaryKanbanMoveEvent>();

  kanbanItemTemplate = contentChild<
    TemplateRef<{
      $implicit: MagaryKanbanItem;
      column: MagaryKanbanColumn;
      columnIndex: number;
      itemIndex: number;
    }>
  >('kanbanItemTemplate');
  kanbanColumnHeaderTemplate = contentChild<
    TemplateRef<{
      $implicit: MagaryKanbanColumn;
      index: number;
    }>
  >('kanbanColumnHeaderTemplate');

  boardRoot = viewChild<ElementRef<HTMLElement>>('kanbanRoot');
  columnDropTargets = viewChildren<ElementRef<HTMLElement>>(
    'kanbanColumnDropTarget',
  );

  private dndCleanup: Array<() => void> = [];
  private monitorCleanup: (() => void) | null = null;
  private viewInitialized = false;

  constructor() {
    effect(() => {
      const enabled = this.dragDrop();
      this.columns();
      this.boardRoot();
      this.columnDropTargets();

      if (!this.viewInitialized) {
        return;
      }

      queueMicrotask(() => {
        if (this.viewInitialized) {
          this.bindDragDrop(enabled);
        }
      });
    });
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.bindDragDrop(this.dragDrop());
  }

  ngOnDestroy(): void {
    this.unbindDragDrop();
  }

  getItemId(item: unknown): string {
    if (
      typeof item === 'object' &&
      item !== null &&
      typeof (item as Record<string, unknown>)['id'] === 'string'
    ) {
      return (item as Record<string, unknown>)['id'] as string;
    }

    return '';
  }

  getItemLabel(item: MagaryKanbanItem): string {
    if (typeof item['label'] === 'string' || typeof item['label'] === 'number') {
      return String(item['label']);
    }

    if (typeof item['name'] === 'string') {
      return item['name'];
    }

    return item.id;
  }

  getItemIndex(columnId: string, itemId: string): number {
    if (!itemId) {
      return -1;
    }

    return (
      this.columns()
        .find((column) => column.id === columnId)
        ?.items.findIndex((item) => item.id === itemId) ?? -1
    );
  }

  private bindDragDrop(enabled: boolean): void {
    this.unbindDragDrop();

    if (!enabled) {
      return;
    }

    const boardRoot = this.boardRoot()?.nativeElement;
    if (!boardRoot) {
      return;
    }

    const itemElements = boardRoot.querySelectorAll<HTMLElement>(
      '[data-magary-kanban-item="true"]',
    );

    for (const element of itemElements) {
      const itemId = element.dataset['itemId'];
      const columnId = element.dataset['columnId'];
      const itemIndex = Number.parseInt(element.dataset['itemIndex'] ?? '', 10);

      if (!itemId || !columnId || Number.isNaN(itemIndex) || itemIndex < 0) {
        continue;
      }

      const cleanup = combine(
        draggable({
          element,
          getInitialData: () => ({
            type: KANBAN_SOURCE_TYPE,
            itemId,
            columnId,
          }),
          onDragStart: () => {
            element.classList.add('magary-kanban-item-dragging');
          },
          onDrop: () => {
            element.classList.remove('magary-kanban-item-dragging');
          },
        }),
        dropTargetForElements({
          element,
          getData: () => ({
            type: KANBAN_CARD_TARGET_TYPE,
            columnId,
            index: itemIndex,
          }),
          onDragEnter: () => {
            element.classList.add('magary-kanban-item-over');
          },
          onDragLeave: () => {
            element.classList.remove('magary-kanban-item-over');
          },
          onDrop: () => {
            element.classList.remove('magary-kanban-item-over');
          },
        }),
      );

      this.dndCleanup.push(cleanup);
    }

    for (const columnRef of this.columnDropTargets()) {
      const element = columnRef.nativeElement;
      const columnId = element.dataset['columnId'];
      if (!columnId) {
        continue;
      }

      const cleanup = dropTargetForElements({
        element,
        getData: () => ({
          type: KANBAN_COLUMN_TARGET_TYPE,
          columnId,
          index: this.getColumnItemCount(columnId),
        }),
        onDragEnter: () => {
          element.classList.add('magary-kanban-column-over');
        },
        onDragLeave: () => {
          element.classList.remove('magary-kanban-column-over');
        },
        onDrop: () => {
          element.classList.remove('magary-kanban-column-over');
        },
      });

      this.dndCleanup.push(cleanup);
    }

    this.monitorCleanup = monitorForElements({
      canMonitor: ({ source }) => this.parseSource(source.data) !== null,
      onDrop: ({ source, location }) => {
        const dragSource = this.parseSource(source.data);
        if (!dragSource) {
          return;
        }

        const topDropTarget = location.current.dropTargets[0];
        if (!topDropTarget) {
          return;
        }

        const dropTarget = this.parseTarget(topDropTarget.data);
        if (!dropTarget) {
          return;
        }

        const move = this.moveItem(
          this.columns(),
          dragSource.columnId,
          dropTarget.columnId,
          dragSource.itemId,
          dropTarget.index,
        );

        if (!move.moved || !move.item) {
          return;
        }

        this.columns.set(move.columns);
        this.onColumnsChange.emit(move.columns);
        this.onMove.emit({
          item: move.item,
          fromColumnId: dragSource.columnId,
          toColumnId: dropTarget.columnId,
          fromIndex: move.fromIndex,
          toIndex: move.toIndex,
          columns: move.columns,
        });
      },
    });
  }

  private unbindDragDrop(): void {
    for (const cleanup of this.dndCleanup.splice(0)) {
      cleanup();
    }

    if (this.monitorCleanup) {
      this.monitorCleanup();
      this.monitorCleanup = null;
    }

    const boardRoot = this.boardRoot()?.nativeElement;
    if (boardRoot) {
      const itemElements = boardRoot.querySelectorAll<HTMLElement>(
        '[data-magary-kanban-item="true"]',
      );
      for (const element of itemElements) {
        element.classList.remove('magary-kanban-item-over');
        element.classList.remove('magary-kanban-item-dragging');
      }
    }

    for (const columnRef of this.columnDropTargets()) {
      columnRef.nativeElement.classList.remove('magary-kanban-column-over');
    }
  }

  private moveItem(
    columns: MagaryKanbanColumn[],
    fromColumnId: string,
    toColumnId: string,
    itemId: string,
    targetIndex: number,
  ): MoveResult {
    const nextColumns = columns.map((column) => ({
      ...column,
      items: [...column.items],
    }));

    const sourceColumn = nextColumns.find((column) => column.id === fromColumnId);
    const targetColumn = nextColumns.find((column) => column.id === toColumnId);

    if (!sourceColumn || !targetColumn) {
      return {
        columns,
        moved: false,
        item: null,
        fromIndex: -1,
        toIndex: -1,
      };
    }

    const sourceIndex = sourceColumn.items.findIndex((item) => item.id === itemId);
    if (sourceIndex < 0) {
      return {
        columns,
        moved: false,
        item: null,
        fromIndex: -1,
        toIndex: -1,
      };
    }

    const [item] = sourceColumn.items.splice(sourceIndex, 1);
    let insertIndex = Math.max(0, Math.min(targetIndex, targetColumn.items.length));

    if (fromColumnId === toColumnId && sourceIndex < insertIndex) {
      insertIndex -= 1;
    }

    if (fromColumnId === toColumnId && sourceIndex === insertIndex) {
      sourceColumn.items.splice(sourceIndex, 0, item);
      return {
        columns,
        moved: false,
        item: null,
        fromIndex: sourceIndex,
        toIndex: insertIndex,
      };
    }

    targetColumn.items.splice(insertIndex, 0, item);
    return {
      columns: nextColumns,
      moved: true,
      item,
      fromIndex: sourceIndex,
      toIndex: insertIndex,
    };
  }

  private parseSource(
    data: Record<string | symbol, unknown>,
  ): SourcePointer | null {
    const type = data['type'];
    const itemId = data['itemId'];
    const columnId = data['columnId'];

    if (
      type !== KANBAN_SOURCE_TYPE ||
      typeof itemId !== 'string' ||
      typeof columnId !== 'string'
    ) {
      return null;
    }

    return { itemId, columnId };
  }

  private parseTarget(
    data: Record<string | symbol, unknown>,
  ): TargetPointer | null {
    const type = data['type'];
    const columnId = data['columnId'];
    const index = data['index'];

    if (
      (type !== KANBAN_CARD_TARGET_TYPE && type !== KANBAN_COLUMN_TARGET_TYPE) ||
      typeof columnId !== 'string' ||
      typeof index !== 'number' ||
      !Number.isInteger(index)
    ) {
      return null;
    }

    return { columnId, index };
  }

  private getColumnItemCount(columnId: string): number {
    return (
      this.columns().find((column) => column.id === columnId)?.items.length ?? 0
    );
  }
}
