import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef,
  OnDestroy,
  booleanAttribute,
  effect,
  inject,
  input,
  model,
  output,
  TemplateRef,
  ViewEncapsulation,
  signal,
  viewChildren,
  viewChild,
  NgZone,
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

const PICK_LIST_DND_ITEM_TYPE = 'magary-pick-list-item';

type MagaryPickListItem = object & {
  label?: unknown;
};

@Component({
  selector: 'magary-pick-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, MagaryButton],
  templateUrl: './picklist.html',
  styleUrl: './picklist.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'magary-pick-list',
  },
})
export class MagaryPickList implements AfterViewInit, OnDestroy {
  // Inputs
  sourceHeader = input<string>('Source');
  targetHeader = input<string>('Target');
  sourceStyle = input<Record<string, string | number | null | undefined> | null>(
    null,
  );
  targetStyle = input<Record<string, string | number | null | undefined> | null>(
    null,
  );
  showSourceControls = input<boolean>(true);
  showTargetControls = input<boolean>(true);
  dragDrop = input(false, { transform: booleanAttribute });

  // Data Models
  source = model<MagaryPickListItem[]>([]);
  target = model<MagaryPickListItem[]>([]);

  // Selection
  selectedSource = signal<MagaryPickListItem[]>([]);
  selectedTarget = signal<MagaryPickListItem[]>([]);

  // View Queries & State
  sourceItemElements = viewChildren<ElementRef<HTMLLIElement>>('sourceItem');
  targetItemElements = viewChildren<ElementRef<HTMLLIElement>>('targetItem');
  
  sourceListElement = viewChild<ElementRef<HTMLUListElement>>('sourceList');
  targetListElement = viewChild<ElementRef<HTMLUListElement>>('targetList');

  private ngZone = inject(NgZone);
  private viewInitialized = false;
  private dndCleanup: Array<() => void> = [];

  constructor() {
    effect(() => {
      const enabled = this.dragDrop();
      this.source();
      this.target();
      this.sourceItemElements();
      this.targetItemElements();

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

  // Templates
  itemTemplate =
    contentChild<TemplateRef<{ $implicit: MagaryPickListItem }>>('itemTemplate');

  // Outputs
  onMoveToTarget = output<{ items: MagaryPickListItem[] }>();
  onMoveToSource = output<{ items: MagaryPickListItem[] }>();
  onMoveAllToTarget = output<{ items: MagaryPickListItem[] }>();
  onMoveAllToSource = output<{ items: MagaryPickListItem[] }>();

  // Methods
  moveRight() {
    const selected = this.selectedSource();
    if (selected.length === 0) return;

    const source = [...this.source()];
    const target = [...this.target()];

    // Remove from source, add to target
    const newSource = source.filter((item) => !selected.includes(item));
    const newTarget = [...target, ...selected];

    this.source.set(newSource);
    this.target.set(newTarget);
    this.selectedSource.set([]);

    this.onMoveToTarget.emit({ items: selected });
  }

  moveAllRight() {
    const source = [...this.source()];
    if (source.length === 0) return;

    const target = [...this.target(), ...source];

    this.source.set([]);
    this.target.set(target);
    this.selectedSource.set([]);

    this.onMoveAllToTarget.emit({ items: source });
  }

  moveLeft() {
    const selected = this.selectedTarget();
    if (selected.length === 0) return;

    const source = [...this.source()];
    const target = [...this.target()];

    // Remove from target, add to source
    const newTarget = target.filter((item) => !selected.includes(item));
    const newSource = [...source, ...selected];

    this.target.set(newTarget);
    this.source.set(newSource);
    this.selectedTarget.set([]);

    this.onMoveToSource.emit({ items: selected });
  }

  moveAllLeft() {
    const target = [...this.target()];
    if (target.length === 0) return;

    const source = [...this.source(), ...target];

    this.target.set([]);
    this.source.set(source);
    this.selectedTarget.set([]);

    this.onMoveAllToSource.emit({ items: target });
  }

  onSourceItemClick(event: MouseEvent, item: MagaryPickListItem) {
    const metaKey = event.metaKey || event.ctrlKey;
    const selected = [...this.selectedSource()];
    const index = selected.indexOf(item);

    if (metaKey) {
      if (index > -1) {
        selected.splice(index, 1);
      } else {
        selected.push(item);
      }
    } else {
      // Simple selection for now, maybe add shift key support later
      if (index > -1 && selected.length === 1) {
        this.selectedSource.set([]);
        return;
      }
      this.selectedSource.set([item]);
      return;
    }
    this.selectedSource.set(selected);
  }

  onTargetItemClick(event: MouseEvent, item: MagaryPickListItem) {
    const metaKey = event.metaKey || event.ctrlKey;
    const selected = [...this.selectedTarget()];
    const index = selected.indexOf(item);

    if (metaKey) {
      if (index > -1) {
        selected.splice(index, 1);
      } else {
        selected.push(item);
      }
    } else {
      if (index > -1 && selected.length === 1) {
        this.selectedTarget.set([]);
        return;
      }
      this.selectedTarget.set([item]);
      return;
    }
    this.selectedTarget.set(selected);
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

  // --- DND Framework Integration ---

  private bindDragDrop(enabled: boolean): void {
    this.unbindDragDrop();

    if (!enabled) {
      return;
    }

    this.bindListDragDrop(this.sourceItemElements(), 'source');
    this.bindListDragDrop(this.targetItemElements(), 'target');

    this.bindContainerDrop(this.sourceListElement()?.nativeElement, 'source');
    this.bindContainerDrop(this.targetListElement()?.nativeElement, 'target');
  }

  private bindContainerDrop(element: HTMLUListElement | undefined, listType: 'source' | 'target'): void {
    if (!element) return;

    const cleanup = dropTargetForElements({
      element,
      canDrop: ({ source }) => {
        const data = this.getDragData(source.data);
        return data !== null && data.listType !== listType;
      },
      getData: () => ({
        type: PICK_LIST_DND_ITEM_TYPE,
        index: -1,
        listType,
      }),
      onDragEnter: () => element.classList.add('picklist-list-over'),
      onDragLeave: () => element.classList.remove('picklist-list-over'),
      onDrop: ({ source, self }) => {
        element.classList.remove('picklist-list-over');
        
        const sourceData = this.getDragData(source.data);
        const targetData = this.getDragData(self.data);

        if (sourceData === null || targetData === null) {
          return;
        }

        this.ngZone.run(() => {
          this.handleDrop(sourceData, targetData);
        });
      },
    });

    this.dndCleanup.push(cleanup);
  }

  private bindListDragDrop(items: readonly ElementRef<HTMLLIElement>[], listType: 'source' | 'target'): void {
    if (items.length === 0) {
      return;
    }

    for (const [index, itemRef] of items.entries()) {
      const element = itemRef.nativeElement;

      const cleanup = combine(
        draggable({
          element,
          getInitialData: () => ({
            type: PICK_LIST_DND_ITEM_TYPE,
            index,
            listType,
          }),
          onDragStart: () => {
            element.classList.add('picklist-item-dragging');
          },
          onDrop: () => {
            element.classList.remove('picklist-item-dragging');
          },
        }),
        dropTargetForElements({
          element,
          canDrop: ({ source }) => {
            const data = this.getDragData(source.data);
            return data !== null;
          },
          getData: () => ({
            type: PICK_LIST_DND_ITEM_TYPE,
            index,
            listType,
          }),
          onDragEnter: () => element.classList.add('picklist-item-over'),
          onDragLeave: () => element.classList.remove('picklist-item-over'),
          onDrop: ({ source, self }) => {
            element.classList.remove('picklist-item-over');
            const sourceData = this.getDragData(source.data);
            const targetData = this.getDragData(self.data);

            if (sourceData === null || targetData === null) {
              return;
            }

            this.ngZone.run(() => {
              this.handleDrop(sourceData, targetData);
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

    const allItems = [...this.sourceItemElements(), ...this.targetItemElements()];
    for (const itemRef of allItems) {
      itemRef.nativeElement.classList.remove('picklist-item-dragging', 'picklist-item-over');
    }

    this.sourceListElement()?.nativeElement.classList.remove('picklist-list-over');
    this.targetListElement()?.nativeElement.classList.remove('picklist-list-over');
  }

  private getDragData(data: Record<string | symbol, unknown>): { index: number; listType: 'source' | 'target' } | null {
    const type = data['type'];
    const index = data['index'];
    const listType = data['listType'];

    if (
      type !== PICK_LIST_DND_ITEM_TYPE ||
      typeof index !== 'number' ||
      !Number.isInteger(index) ||
      (listType !== 'source' && listType !== 'target')
    ) {
      return null;
    }

    return { index, listType: listType as 'source' | 'target' };
  }

  private handleDrop(sourceData: { index: number; listType: 'source' | 'target' }, targetData: { index: number; listType: 'source' | 'target' }): void {
    if (sourceData.listType === targetData.listType) {
      // Reorder within the same list
      if (sourceData.index === targetData.index) {
        return;
      }

      const listModel = sourceData.listType === 'source' ? this.source : this.target;
      const list = listModel();
      const maxIndex = list.length - 1;

      if (sourceData.index < 0 || targetData.index < 0 || sourceData.index > maxIndex || targetData.index > maxIndex) {
        return;
      }

      const reordered = reorder({
        list,
        startIndex: sourceData.index,
        finishIndex: targetData.index,
      });

      listModel.set(reordered);

    } else {
      // Transfer between lists
      const sourceListModel = sourceData.listType === 'source' ? this.source : this.target;
      const targetListModel = targetData.listType === 'source' ? this.source : this.target;

      const sourceList = [...sourceListModel()];
      const targetList = [...targetListModel()];

      if (sourceData.index < 0 || sourceData.index >= sourceList.length) {
        return;
      }

      let insertIndex = targetData.index;
      if (insertIndex === -1) {
        insertIndex = targetList.length;
      }

      if (insertIndex < 0 || insertIndex > targetList.length) {
        return;
      }

      // 1. Remove from source
      const [movedItem] = sourceList.splice(sourceData.index, 1);
      
      // 2. Add to target at targetIndex
      targetList.splice(insertIndex, 0, movedItem);

      sourceListModel.set(sourceList);
      targetListModel.set(targetList);

      // Emit correct events
      if (sourceData.listType === 'source') {
         this.onMoveToTarget.emit({ items: [movedItem] });
      } else {
         this.onMoveToSource.emit({ items: [movedItem] });
      }
    }
  }
}
