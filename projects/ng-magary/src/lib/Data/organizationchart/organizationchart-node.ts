import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  forwardRef,
  computed,
  input,
  TemplateRef,
  signal,
  output,
  OnInit,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  MagaryTreeNode,
  MagaryTreeNodeSelectionEvent,
  MagaryTreeSelectionValue,
} from '../tree/tree-node.interface';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: '[magary-organizationchart-node]',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    forwardRef(() => MagaryOrganizationChartNode),
  ],
  template: `
    <!-- Connector Line Up (connects to parent bus) -->
    <tr *ngIf="node()">
      <td [attr.colspan]="colspan()">
        <div class="magary-organizationchart-line-up"></div>
      </td>
    </tr>

    <tr *ngIf="node()">
      <td [attr.colspan]="colspan()">
        <div
          class="magary-organizationchart-node-content"
          [class.magary-organizationchart-selectable]="selectionMode() !== null"
          [class.magary-organizationchart-selected]="isSelected()"
          [attr.tabindex]="isSelectable() || (collapsible() && !isLeaf()) ? 0 : -1"
          (click)="onNodeClick($event)"
          (keydown)="onNodeKeydown($event)"
        >
          <!-- Display content based on template or fallback -->
          <ng-container *ngIf="template(); else defaultContent">
            <ng-container
              *ngTemplateOutlet="template(); context: { $implicit: node() }"
            ></ng-container>
          </ng-container>

          <ng-template #defaultContent>
            <div
              *ngIf="node().header"
              class="magary-organizationchart-node-header"
            >
              {{ node().header }}
            </div>
            <div class="magary-organizationchart-node-label">
              {{ node().label }}
            </div>
          </ng-template>

          <!-- Toggler -->
          <button
            type="button"
            *ngIf="!isLeaf() && collapsible()"
            class="magary-organizationchart-toggler"
            [attr.aria-label]="getTogglerAriaLabel()"
            (click)="toggle($event)"
          >
            <lucide-icon
              [name]="internalExpanded() ? 'chevron-down' : 'chevron-up'"
              [size]="14"
            ></lucide-icon>
          </button>
        </div>
      </td>
    </tr>

    <!-- Connector Lines Down -->
    <tr
      class="magary-organizationchart-lines"
      *ngIf="!isLeaf() && internalExpanded()"
      [@slideDown]
    >
      <td [attr.colspan]="colspan()">
        <div class="magary-organizationchart-line-down"></div>
      </td>
    </tr>

    <!-- Connector Lines Horizontal -->
    <tr
      class="magary-organizationchart-lines"
      *ngIf="!isLeaf() && internalExpanded()"
      [@slideDown]
    >
      <ng-container
        *ngFor="
          let child of node().children;
          let first = first;
          let last = last
        "
      >
        <td
          class="magary-organizationchart-line-left"
          [class.magary-organizationchart-line-top]="!first"
        ></td>
        <td
          class="magary-organizationchart-line-right"
          [class.magary-organizationchart-line-top]="!last"
        ></td>
      </ng-container>
    </tr>

    <!-- Children Row -->
    <tr
      class="magary-organizationchart-nodes"
      *ngIf="!isLeaf() && internalExpanded()"
      [@slideDown]
    >
      <ng-container *ngFor="let child of node().children">
        <td colspan="2">
          <table class="magary-organizationchart-table">
            <tbody
              magary-organizationchart-node
              [node]="child"
              [level]="level() + 1"
              [selectionMode]="selectionMode()"
              [selection]="selection()"
              [collapsible]="collapsible()"
              [itemTemplate]="itemTemplate()"
              (nodeSelect)="nodeSelect.emit($event)"
              (nodeUnselect)="nodeUnselect.emit($event)"
              (nodeExpand)="nodeExpand.emit($event)"
              (nodeCollapse)="nodeCollapse.emit($event)"
            ></tbody>
          </table>
        </td>
      </ng-container>
    </tr>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ height: '0', opacity: 0, overflow: 'hidden' }),
        animate('200ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1, overflow: 'hidden' }),
        animate('200ms ease-in', style({ height: '0', opacity: 0 })),
      ]),
    ]),
  ],
})
export class MagaryOrganizationChartNode implements OnInit {
  readonly node = input.required<MagaryTreeNode>();
  readonly level = input<number>(1);
  readonly selectionMode = input<'single' | 'multiple' | null>(null);
  readonly selection = input<MagaryTreeSelectionValue>(null);
  readonly collapsible = input<boolean>(false);
  readonly itemTemplate = input<TemplateRef<unknown> | null | undefined>(null);

  readonly template = computed(() => this.itemTemplate());

  readonly nodeSelect = output<MagaryTreeNodeSelectionEvent>();
  readonly nodeUnselect = output<MagaryTreeNodeSelectionEvent>();
  readonly nodeExpand = output<MagaryTreeNode>();
  readonly nodeCollapse = output<MagaryTreeNode>();

  // Local signal for expansion state to ensure UI updates
  // Initialized from node().expanded but then managed locally for this component instance
  internalExpanded = signal<boolean>(false);

  // Initialize the signal from the input when it changes (or initially)
  constructor() {
    // In a real scenario we might want an effect() here if the input changes later
    // But for now, we just initialize. Since inputs are signals, we can read them.
    // However, constructor runs before inputs are bound in standard Angular...
    // but signal inputs are available.
    // A better way is to use effect or just initialize it.
    // Effect(() => this.internalExpanded.set(!!this.node().expanded));
  }

  // Actually, let's just use effect to sync from input to internal state if input changes
  // and interactions update internal state.
  // Ideally, 'expanded' should be two-way binding or event driven.
  // For this component, we'll initialize it lazily or use an effect.

  ngOnInit() {
    this.internalExpanded.set(!!this.node().expanded);
  }

  isLeaf = computed(
    () => !this.node().children || this.node().children!.length === 0,
  );

  colspan = computed(() => {
    if (!this.node().children || this.node().children!.length === 0) return 1;
    return this.node().children!.length * 2;
  });

  isSelected = computed(() => {
    const sel = this.selection();
    const currentNode = this.node();
    if (!sel) {
      return false;
    }
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

  onNodeClick(event: Event) {
    event.stopPropagation();
    if (!this.isSelectable()) {
      return;
    }

    if (this.isSelected()) {
      this.nodeUnselect.emit({ originalEvent: event, node: this.node() });
    } else {
      this.nodeSelect.emit({ originalEvent: event, node: this.node() });
    }
  }

  toggle(event: Event) {
    event.stopPropagation();
    this.setExpanded(!this.internalExpanded());
  }

  onNodeKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight' && this.collapsible() && !this.isLeaf()) {
      event.preventDefault();
      if (!this.internalExpanded()) {
        this.setExpanded(true);
      }
      return;
    }

    if (event.key === 'ArrowLeft' && this.collapsible() && !this.isLeaf()) {
      event.preventDefault();
      if (this.internalExpanded()) {
        this.setExpanded(false);
      }
      return;
    }

    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    if (!this.isSelectable()) {
      return;
    }

    event.preventDefault();
    this.onNodeClick(event);
  }

  getTogglerAriaLabel(): string {
    const label = this.node().label || 'node';
    return this.internalExpanded() ? `Collapse ${label}` : `Expand ${label}`;
  }

  isSelectable(): boolean {
    return this.selectionMode() !== null;
  }

  private setExpanded(expanded: boolean) {
    this.internalExpanded.set(expanded);
    this.node().expanded = expanded;

    if (expanded) {
      this.nodeExpand.emit(this.node());
    } else {
      this.nodeCollapse.emit(this.node());
    }
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
