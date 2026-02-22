import type { CdkDragDrop } from '@angular/cdk/drag-drop';

export interface MagaryTreeNode {
  label?: string;
  header?: string;
  data?: unknown;
  icon?: string;
  expandedIcon?: string;
  collapsedIcon?: string;
  children?: MagaryTreeNode[];
  leaf?: boolean;
  expanded?: boolean;
  type?: string;
  parent?: MagaryTreeNode;
  partialSelected?: boolean;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
  selectable?: boolean;
  key?: string;
}

export interface MagaryTreeNodeSelectionEvent {
  originalEvent: Event;
  node: MagaryTreeNode;
}

export interface MagaryTreeNodeDropEvent {
  originalEvent: CdkDragDrop<MagaryTreeNode[]>;
  parent: MagaryTreeNode | null;
  dragNode: MagaryTreeNode;
}
