import {
  Component,
  input,
  output,
  signal,
  computed,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  MagaryTreeNode,
  MagaryTreeNodeDropEvent,
  MagaryTreeNodeSelectionEvent,
  MagaryTreeSelectionValue,
} from './tree-node.interface';

@Component({
  selector: 'magary-uitree-node',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    DragDropModule,
    forwardRef(() => MagaryUITreeNode),
  ],
  template: `
    <li
      class="magary-treenode"
      [ngClass]="node().styleClass || ''"
      role="treeitem"
      [attr.data-node-key]="node().key || null"
      [attr.aria-expanded]="!isLeaf ? !!isExpanded : null"
      [attr.aria-selected]="isSelectable ? isSelected() : null"
      cdkDrag
      [cdkDragData]="node()"
      [cdkDragDisabled]="!draggable()"
    >
      <div class="magary-tree-custom-placeholder" *cdkDragPlaceholder></div>
      <div
        class="magary-treenode-content"
        [class.magary-treenode-selectable]="selectionMode() !== null"
        [class.magary-treenode-selected]="isSelected()"
        tabindex="0"
        (click)="onNodeClick($event)"
        (keydown)="onNodeKeydown($event)"
      >
        <!-- Toggler -->
        <button
          type="button"
          class="magary-tree-toggler"
          [class.expanded]="isExpanded"
          [attr.aria-label]="getTogglerAriaLabel()"
          (click)="toggle($event)"
          *ngIf="!isLeaf"
        >
          <lucide-icon name="chevron-right" [size]="16"></lucide-icon>
        </button>
        <span class="magary-tree-toggler-placeholder" *ngIf="isLeaf"></span>

        <!-- Checkbox (if mode is checkbox) -->
        <div
          class="magary-treenode-checkbox"
          *ngIf="selectionMode() === 'checkbox'"
          (click)="onCheckboxClick($event)"
        >
          <div
            class="magary-checkbox-box"
            [class.highlight]="isSelected() || node().partialSelected"
          >
            <lucide-icon
              name="check"
              [size]="12"
              *ngIf="isSelected()"
            ></lucide-icon>
            <lucide-icon
              name="minus"
              [size]="12"
              *ngIf="node().partialSelected && !isSelected()"
            ></lucide-icon>
          </div>
        </div>

        <!-- Icon -->
        <span
          class="magary-treenode-icon"
          *ngIf="node().icon || node().expandedIcon || node().collapsedIcon"
        >
          <lucide-icon [name]="getIcon()" [size]="16"></lucide-icon>
        </span>

        <!-- Label -->
        <span class="magary-treenode-label">{{ node().label }}</span>
      </div>

      <!-- Children (Recursion) -->
      <ul
        class="magary-treenode-children"
        *ngIf="isExpanded && !isLeaf"
        role="group"
        cdkDropList
        [cdkDropListDisabled]="!droppable()"
        [cdkDropListData]="node().children || []"
        (cdkDropListDropped)="onDrop($event)"
      >
        <magary-uitree-node
          *ngFor="let childNode of node().children"
          [node]="childNode"
          [selectionMode]="selectionMode()"
          [selection]="selection()"
          [draggable]="draggable()"
          [droppable]="droppable()"
          (nodeSelect)="nodeSelect.emit($event)"
          (nodeUnselect)="nodeUnselect.emit($event)"
          (nodeExpand)="nodeExpand.emit($event)"
          (nodeCollapse)="nodeCollapse.emit($event)"
          (nodeDrop)="nodeDrop.emit($event)"
        >
        </magary-uitree-node>
      </ul>
    </li>
  `,
  host: {
    class: 'magary-uitree-node-host',
  },
})
export class MagaryUITreeNode {
  node = input.required<MagaryTreeNode>();
  selectionMode = input<string | null>(null);
  selection = input<MagaryTreeSelectionValue>(null);
  draggable = input<boolean>(false);
  droppable = input<boolean>(false);

  // Outputs to bubble up events
  nodeSelect = output<MagaryTreeNodeSelectionEvent>();
  nodeUnselect = output<MagaryTreeNodeSelectionEvent>();
  nodeExpand = output<MagaryTreeNode>();
  nodeCollapse = output<MagaryTreeNode>();
  nodeDrop = output<MagaryTreeNodeDropEvent>();

  get isExpanded() {
    return this.node().expanded;
  }

  get isLeaf() {
    return (
      this.node().leaf === true ||
      !this.node().children ||
      this.node().children!.length === 0
    );
  }

  get isSelectable() {
    return this.selectionMode() !== null;
  }

  // Helper to check if this specific node is selected based on the selection input
  // This is simple for now, might need more complex logic for multiple selection
  isSelected = computed(() => {
    const sel = this.selection();
    const currentNode = this.node();
    if (!sel) return false;
    if (Array.isArray(sel)) {
      return sel.some((selectedNode) => this.isSameNode(selectedNode, currentNode));
    }
    if (this.isTreeNode(sel)) {
      return this.isSameNode(sel, currentNode);
    }
    if (this.isSelectionMap(sel)) {
      const nodeKey = currentNode.key;
      return typeof nodeKey === 'string' ? sel[nodeKey] === true : false;
    }

    return false;
  });

  getIcon() {
    const n = this.node();
    if (n.expanded && n.expandedIcon) return n.expandedIcon;
    if (!n.expanded && n.collapsedIcon) return n.collapsedIcon;
    return n.icon || '';
  }

  getTogglerAriaLabel(): string {
    const label = this.node().label || 'node';
    return this.isExpanded ? `Collapse ${label}` : `Expand ${label}`;
  }

  toggle(event: Event) {
    event.stopPropagation();
    this.setExpanded(!this.node().expanded, event);
  }

  onNodeClick(event: Event) {
    if (this.selectionMode() === null || this.selectionMode() === 'checkbox') {
      return;
    }

    event.stopPropagation();
    if (this.isSelected()) {
      this.nodeUnselect.emit({ originalEvent: event, node: this.node() });
    } else {
      this.nodeSelect.emit({ originalEvent: event, node: this.node() });
    }
  }

  onCheckboxClick(event: Event) {
    if (this.selectionMode() !== 'checkbox') {
      return;
    }

    event.stopPropagation();
    if (this.isSelected()) {
      this.nodeUnselect.emit({ originalEvent: event, node: this.node() });
    } else {
      this.nodeSelect.emit({ originalEvent: event, node: this.node() });
    }
  }

  onDrop(event: CdkDragDrop<MagaryTreeNode[]>) {
    event.event.stopPropagation(); // Stop bubbling immediately?
    // Actually we want to notify parent
    this.nodeDrop.emit({
      originalEvent: event,
      parent: this.node(), // The drop happened in this node's children list
      dragNode: event.item.data as MagaryTreeNode,
    });
  }

  onNodeKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight' && !this.isLeaf && !this.isExpanded) {
      event.preventDefault();
      this.setExpanded(true, event);
      return;
    }

    if (event.key === 'ArrowLeft' && !this.isLeaf && this.isExpanded) {
      event.preventDefault();
      this.setExpanded(false, event);
      return;
    }

    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    if (!this.isSelectable) {
      return;
    }

    event.preventDefault();
    if (this.selectionMode() === 'checkbox') {
      this.onCheckboxClick(event);
      return;
    }

    this.onNodeClick(event);
  }

  private setExpanded(expanded: boolean, event: Event) {
    this.node().expanded = expanded;
    if (expanded) {
      this.nodeExpand.emit(this.node());
      return;
    }

    this.nodeCollapse.emit(this.node());
  }

  private isSameNode(left: unknown, right: MagaryTreeNode): boolean {
    if (!this.isTreeNode(left)) {
      return false;
    }

    if (left === right) {
      return true;
    }

    if (left.key && right.key) {
      return left.key === right.key;
    }

    return false;
  }

  private isTreeNode(value: unknown): value is MagaryTreeNode {
    if (!this.isRecord(value) || Array.isArray(value)) {
      return false;
    }

    return (
      'key' in value ||
      'label' in value ||
      'data' in value ||
      'children' in value ||
      'icon' in value
    );
  }

  private isSelectionMap(value: unknown): value is Record<string, boolean> {
    if (!this.isRecord(value) || Array.isArray(value)) {
      return false;
    }

    return Object.values(value).every((entry) => typeof entry === 'boolean');
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
}
