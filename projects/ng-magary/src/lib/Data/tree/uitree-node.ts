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
import { MagaryTreeNode } from './tree-node.interface';

@Component({
  selector: 'magary-uitree-node',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    forwardRef(() => MagaryUITreeNode),
  ],
  template: `
    <li class="magary-treenode" [ngClass]="node().styleClass || ''">
      <div
        class="magary-treenode-content"
        [class.magary-treenode-selectable]="selectionMode() !== null"
        [class.magary-treenode-selected]="isSelected()"
        (click)="onNodeClick($event)"
      >
        <!-- Toggler -->
        <button
          type="button"
          class="magary-tree-toggler"
          [class.expanded]="isExpanded"
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
        *ngIf="isExpanded && node().children && node().children!.length"
      >
        <magary-uitree-node
          *ngFor="let childNode of node().children"
          [node]="childNode"
          [selectionMode]="selectionMode()"
          [selection]="selection()"
          (nodeSelect)="nodeSelect.emit($event)"
          (nodeUnselect)="nodeUnselect.emit($event)"
          (nodeExpand)="nodeExpand.emit($event)"
          (nodeCollapse)="nodeCollapse.emit($event)"
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
  selection = input<any>(null); // Passed down selection state/signal if needed or handled via service/parent

  // Outputs to bubble up events
  nodeSelect = output<any>();
  nodeUnselect = output<any>();
  nodeExpand = output<any>();
  nodeCollapse = output<any>();

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

  // Helper to check if this specific node is selected based on the selection input
  // This is simple for now, might need more complex logic for multiple selection
  isSelected = computed(() => {
    const sel = this.selection();
    if (!sel) return false;
    if (Array.isArray(sel)) {
      return sel.includes(this.node());
    }
    return sel === this.node();
  });

  getIcon() {
    const n = this.node();
    if (n.expanded && n.expandedIcon) return n.expandedIcon;
    if (!n.expanded && n.collapsedIcon) return n.collapsedIcon;
    return n.icon || '';
  }

  toggle(event: Event) {
    event.stopPropagation();
    this.node().expanded = !this.node().expanded;
    if (this.node().expanded) {
      this.nodeExpand.emit(this.node());
    } else {
      this.nodeCollapse.emit(this.node());
    }
  }

  onNodeClick(event: Event) {
    if (this.selectionMode() === 'checkbox') return; // Handled by checkbox

    event.stopPropagation();
    if (this.isSelected()) {
      this.nodeUnselect.emit({ originalEvent: event, node: this.node() });
    } else {
      this.nodeSelect.emit({ originalEvent: event, node: this.node() });
    }
  }

  onCheckboxClick(event: Event) {
    event.stopPropagation();
    if (this.isSelected()) {
      this.nodeUnselect.emit({ originalEvent: event, node: this.node() });
    } else {
      this.nodeSelect.emit({ originalEvent: event, node: this.node() });
    }
  }
}
