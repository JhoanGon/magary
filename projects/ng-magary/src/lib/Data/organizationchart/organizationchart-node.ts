import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  inject,
  forwardRef,
  computed,
  input,
  contentChild,
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
import { MagaryTreeNode } from '../tree/tree-node.interface';
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
          (click)="onNodeClick($event)"
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
          <div
            *ngIf="!isLeaf() && collapsible()"
            class="magary-organizationchart-toggler"
            (click)="toggle($event)"
          >
            <lucide-icon
              [name]="internalExpanded() ? 'chevron-down' : 'chevron-up'"
              [size]="14"
            ></lucide-icon>
          </div>
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
  readonly selectionMode = input<string | null>(null);
  readonly selection = input<any>(null);
  readonly collapsible = input<boolean>(false);
  readonly itemTemplate = input<TemplateRef<any> | null | undefined>(null);

  readonly template = computed(() => this.itemTemplate());

  readonly nodeSelect = output<any>();
  readonly nodeUnselect = output<any>();
  readonly nodeExpand = output<any>();
  readonly nodeCollapse = output<any>();

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
    if (!sel) return false;
    if (Array.isArray(sel)) return sel.includes(this.node());
    return sel === this.node();
  });

  onNodeClick(event: Event) {
    if (this.selectionMode()) {
      if (this.isSelected()) {
        this.nodeUnselect.emit({ originalEvent: event, node: this.node() });
      } else {
        this.nodeSelect.emit({ originalEvent: event, node: this.node() });
      }
    }
  }

  toggle(event: Event) {
    event.stopPropagation();
    this.internalExpanded.update((v) => !v);
    const expanded = this.internalExpanded();
    this.node().expanded = expanded;

    if (expanded) {
      this.nodeExpand.emit(this.node());
    } else {
      this.nodeCollapse.emit(this.node());
    }
  }
}
