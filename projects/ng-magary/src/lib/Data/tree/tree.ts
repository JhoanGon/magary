import {
  Component,
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
  selection = input<unknown>(null);
  filter = input<boolean>(false);
  filterPlaceholder = input<string>('Search...');
  filterMode = input<'lenient' | 'strict'>('lenient');
  draggable = input<boolean>(false);
  droppable = input<boolean>(false);
  validateDrop = input<boolean>(false);

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
    const val = (event.target as HTMLInputElement).value;
    this.filterValue.set(val);
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
    // This is the root level handler (or when bubbled up if configured that way)
    if (this.validateDrop()) {
      // Logic to validate if needed
    }

    // Emit the raw event for the consumer to handle data updates
    // They can use moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    this.onNodeDrop.emit({
      originalEvent: event,
      parent: parent,
      dragNode: event.item.data as MagaryTreeNode,
    });
  }
}
