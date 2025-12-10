import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryTreeNode } from './tree-node.interface';
import { MagaryUITreeNode } from './uitree-node';

@Component({
  selector: 'magary-tree',
  standalone: true,
  imports: [CommonModule, MagaryUITreeNode],
  templateUrl: './tree.html',
  styleUrls: ['./tree.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MagaryTree {
  value = input<MagaryTreeNode[]>([]);
  selectionMode = input<'single' | 'multiple' | 'checkbox' | null>(null);
  selection = input<any>(null); // Can be single node or array of nodes

  onNodeSelect = output<any>();
  onNodeUnselect = output<any>();
  onNodeExpand = output<any>();
  onNodeCollapse = output<any>();

  // Pass through events
  handleNodeSelect(event: any) {
    this.onNodeSelect.emit(event);
  }
  handleNodeUnselect(event: any) {
    this.onNodeUnselect.emit(event);
  }
  handleNodeExpand(event: any) {
    this.onNodeExpand.emit(event);
  }
  handleNodeCollapse(event: any) {
    this.onNodeCollapse.emit(event);
  }
}
