import {
  Component,
  booleanAttribute,
  input,
  output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  computed,
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
import { MagaryUITreeNode } from './uitree-node';

@Component({
  selector: 'magary-tree',
  standalone: true,
  imports: [
    CommonModule,
    MagaryUITreeNode,
    LucideAngularModule,
    DragDropModule,
  ],
  templateUrl: './tree.html',
  styleUrls: ['./tree.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MagaryTree {
  value = input<MagaryTreeNode[]>([]);
  selectionMode = input<'single' | 'multiple' | 'checkbox' | null>(null);
  selection = input<MagaryTreeSelectionValue>(null);
  filter = input(false, { transform: booleanAttribute });
  filterPlaceholder = input<string>('Search...');
  filterAriaLabel = input<string>('Filter tree nodes');
  filterMode = input<'lenient' | 'strict'>('lenient');
  draggable = input(false, { transform: booleanAttribute });
  droppable = input(false, { transform: booleanAttribute });
  validateDrop = input(false, { transform: booleanAttribute });
  treeAriaLabel = input<string>('Tree data');

  onNodeSelect = output<MagaryTreeNodeSelectionEvent>();
  onNodeUnselect = output<MagaryTreeNodeSelectionEvent>();
  onNodeExpand = output<MagaryTreeNode>();
  onNodeCollapse = output<MagaryTreeNode>();
  onNodeDrop = output<MagaryTreeNodeDropEvent>();

  // Internal state for filter value
  filterValue = signal<string>('');

  // Computed filtered nodes
  filteredValue = computed(() => {
    const val = this.value();
    const filterText = this.filterValue().toLowerCase().trim();

    if (!filterText) {
      return val;
    }

    return this.filterTree(val, filterText);
  });

  filterTree(nodes: MagaryTreeNode[], term: string): MagaryTreeNode[] {
    const filtered: MagaryTreeNode[] = [];

    for (const node of nodes) {
      let copy = { ...node }; // Shallow copy to avoid mutating original for expansion logic
      let matches = this.isNodeMatching(node, term);
      let childMatches = false;

      if (node.children && node.children.length) {
        copy.children = this.filterTree(node.children, term);
        childMatches = copy.children.length > 0;
      }

      if (matches || childMatches) {
        // If children match, expand this node to show them
        if (childMatches) {
          copy.expanded = true;
        }
        filtered.push(copy);
      }
    }

    return filtered;
  }

  isNodeMatching(node: MagaryTreeNode, term: string): boolean {
    const label = (node.label || '').toLowerCase();
    if (this.filterMode() === 'strict') {
      return label === term;
    }
    return label.includes(term);
  }

  onFilterInput(event: Event) {
    const inputElement =
      event.target instanceof HTMLInputElement ? event.target : null;
    this.filterValue.set(inputElement?.value ?? '');
  }

  // Pass through events
  handleNodeSelect(event: MagaryTreeNodeSelectionEvent) {
    this.onNodeSelect.emit(event);
  }
  handleNodeUnselect(event: MagaryTreeNodeSelectionEvent) {
    this.onNodeUnselect.emit(event);
  }
  handleNodeExpand(event: MagaryTreeNode) {
    this.onNodeExpand.emit(event);
  }
  handleNodeCollapse(event: MagaryTreeNode) {
    this.onNodeCollapse.emit(event);
  }

  handleDrop(
    event: CdkDragDrop<MagaryTreeNode[]>,
    parent: MagaryTreeNode | null,
  ) {
    const dropEvent: MagaryTreeNodeDropEvent = {
      originalEvent: event,
      parent,
      dragNode: event.item.data as MagaryTreeNode,
    };

    if (this.validateDrop() && !this.isDropAllowed(dropEvent)) {
      return;
    }

    this.onNodeDrop.emit(dropEvent);
  }

  handleNodeDrop(event: MagaryTreeNodeDropEvent) {
    if (this.validateDrop() && !this.isDropAllowed(event)) {
      return;
    }

    this.onNodeDrop.emit(event);
  }

  private isDropAllowed(event: MagaryTreeNodeDropEvent): boolean {
    const targetParent = event.parent;
    if (!targetParent) {
      return true;
    }

    const dragNode = event.dragNode;
    if (this.isSameNode(dragNode, targetParent)) {
      return false;
    }

    return !this.containsNode(dragNode, targetParent);
  }

  private containsNode(root: MagaryTreeNode, target: MagaryTreeNode): boolean {
    if (!root.children || root.children.length === 0) {
      return false;
    }

    for (const child of root.children) {
      if (this.isSameNode(child, target) || this.containsNode(child, target)) {
        return true;
      }
    }

    return false;
  }

  private isSameNode(left: MagaryTreeNode, right: MagaryTreeNode): boolean {
    if (left === right) {
      return true;
    }

    if (left.key && right.key) {
      return left.key === right.key;
    }

    return false;
  }
}
