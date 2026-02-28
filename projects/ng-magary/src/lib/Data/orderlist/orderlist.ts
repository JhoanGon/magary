import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef,
  OnDestroy,
  booleanAttribute,
  effect,
  input,
  model,
  output,
  TemplateRef,
  ViewEncapsulation,
  viewChildren,
  NgZone,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';
import { LucideAngularModule } from 'lucide-angular';
import { MagaryButton } from '../../Button/button/button';

const ORDER_LIST_DND_ITEM_TYPE = 'magary-order-list-item';

type MagaryOrderListItem = object & {
  label?: unknown;
};

@Component({
  selector: 'magary-order-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, MagaryButton],
  templateUrl: './orderlist.html',
  styleUrl: './orderlist.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'magary-order-list',
  },
})
export class MagaryOrderList implements AfterViewInit, OnDestroy {
  header = input<string | null>(null);
  listStyle = input<Record<string, string | number | null | undefined> | null>(
    null,
  );
  dragDrop = input(false, { transform: booleanAttribute });
  showControls = input(true, { transform: booleanAttribute });

  // Data
  value = model<MagaryOrderListItem[]>([]);
  selection = model<MagaryOrderListItem[]>([]);

  // Templates
  itemTemplate =
    contentChild<TemplateRef<{ $implicit: MagaryOrderListItem }>>('itemTemplate');

  // Outputs
  onReorder = output<MagaryOrderListItem[]>();
  onSelectionChange = output<MagaryOrderListItem[]>();

  itemElements = viewChildren<ElementRef<HTMLLIElement>>('orderListItem');
  private ngZone = inject(NgZone);
  private viewInitialized = false;
  private dndCleanup: Array<() => void> = [];

  constructor() {
    effect(() => {
      const enabled = this.dragDrop();
      this.value();
      this.itemElements();

      if (!this.viewInitialized) {
        return;
      }

      this.bindDragDrop(enabled);
    });
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.bindDragDrop(this.dragDrop());
  }

  ngOnDestroy(): void {
    this.unbindDragDrop();
  }

  onItemClick(event: MouseEvent, item: MagaryOrderListItem, index: number) {
    const metaKey = event.metaKey || event.ctrlKey;
    let selected = [...this.selection()];

    if (metaKey) {
      if (selected.includes(item)) {
        selected = selected.filter((i) => i !== item);
      } else {
        selected.push(item);
      }
    } else {
      if (selected.includes(item) && selected.length === 1) {
        this.selection.set([]);
        this.onSelectionChange.emit(this.selection());
        return;
      }
      selected = [item];
    }
    this.selection.set(selected);
    this.onSelectionChange.emit(this.selection());
  }

  moveUp() {
    const selected = this.selection();
    if (selected.length === 0) return;

    let list = [...this.value()];
    for (let i = 0; i < selected.length; i++) {
      const item = selected[i];
      const index = list.indexOf(item);
      if (index > 0) {
        list[index] = list[index - 1];
        list[index - 1] = item;
      }
    }
    this.value.set(list);
    this.onReorder.emit(list);
  }

  moveTop() {
    const selected = this.selection();
    if (selected.length === 0) return;

    let list = [...this.value()];
    for (let i = selected.length - 1; i >= 0; i--) {
      const item = selected[i];
      const index = list.indexOf(item);
      if (index > 0) {
        list.splice(index, 1);
        list.unshift(item);
      }
    }
    this.value.set(list);
    this.onReorder.emit(list);
  }

  moveDown() {
    const selected = this.selection();
    if (selected.length === 0) return;

    let list = [...this.value()];
    // Process in reverse order for moving down correctly
    for (let i = selected.length - 1; i >= 0; i--) {
      const item = selected[i];
      const index = list.indexOf(item);
      if (index < list.length - 1) {
        const nextItem = list[index + 1];
        list[index + 1] = item;
        list[index] = nextItem;
      }
    }
    this.value.set(list);
    this.onReorder.emit(list);
  }

  moveBottom() {
    const selected = this.selection();
    if (selected.length === 0) return;

    let list = [...this.value()];
    for (let i = 0; i < selected.length; i++) {
      const item = selected[i];
      const index = list.indexOf(item);
      if (index < list.length - 1) {
        list.splice(index, 1);
        list.push(item);
      }
    }
    this.value.set(list);
    this.onReorder.emit(list);
  }

  getItemLabel(item: unknown): string {
    if (typeof item === 'string' || typeof item === 'number') {
      return String(item);
    }

    if (this.isRecord(item) && typeof item['label'] === 'string') {
      return item['label'];
    }

    return String(item ?? '');
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private bindDragDrop(enabled: boolean): void {
    this.unbindDragDrop();

    if (!enabled) {
      return;
    }

    const items = this.itemElements();
    if (items.length === 0) {
      return;
    }

    for (const [index, itemRef] of items.entries()) {
      const element = itemRef.nativeElement;

      const cleanup = combine(
        draggable({
          element,
          getInitialData: () => ({
            type: ORDER_LIST_DND_ITEM_TYPE,
            index,
          }),
          onDragStart: () => {
            element.classList.add('orderlist-item-dragging');
          },
          onDrop: () => {
            element.classList.remove('orderlist-item-dragging');
          },
        }),
        dropTargetForElements({
          element,
          canDrop: ({ source }) => this.getDragIndex(source.data) !== null,
          getData: () => ({
            type: ORDER_LIST_DND_ITEM_TYPE,
            index,
          }),
          onDragEnter: () => element.classList.add('orderlist-item-over'),
          onDragLeave: () => element.classList.remove('orderlist-item-over'),
          onDrop: ({ source, self }) => {
            element.classList.remove('orderlist-item-over');
            const sourceIndex = this.getDragIndex(source.data);
            const targetIndex = this.getDragIndex(self.data);

            if (sourceIndex === null || targetIndex === null) {
              return;
            }

            this.ngZone.run(() => {
              this.reorderFromDrag(sourceIndex, targetIndex);
            });
          },
        }),
      );

      this.dndCleanup.push(cleanup);
    }
  }

  private unbindDragDrop(): void {
    for (const cleanup of this.dndCleanup.splice(0)) {
      cleanup();
    }

    for (const itemRef of this.itemElements()) {
      itemRef.nativeElement.classList.remove('orderlist-item-dragging');
    }
  }

  private getDragIndex(data: Record<string | symbol, unknown>): number | null {
    const type = data['type'];
    const index = data['index'];

    if (
      type !== ORDER_LIST_DND_ITEM_TYPE ||
      typeof index !== 'number' ||
      !Number.isInteger(index)
    ) {
      return null;
    }

    return index;
  }

  private reorderFromDrag(sourceIndex: number, targetIndex: number): void {
    if (sourceIndex === targetIndex) {
      return;
    }

    const list = this.value();
    const maxIndex = list.length - 1;
    if (
      sourceIndex < 0 ||
      targetIndex < 0 ||
      sourceIndex > maxIndex ||
      targetIndex > maxIndex
    ) {
      return;
    }

    const reordered = reorder({
      list,
      startIndex: sourceIndex,
      finishIndex: targetIndex,
    });
    this.value.set(reordered);
    this.onReorder.emit(reordered);
  }
}
