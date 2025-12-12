export interface MagaryTreeNode {
  label?: string;
  header?: string;
  data?: any;
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
