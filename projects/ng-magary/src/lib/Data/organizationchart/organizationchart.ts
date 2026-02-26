import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  booleanAttribute,
  input,
  output,
  contentChild,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryTreeNode,
  MagaryTreeNodeSelectionEvent,
  MagaryTreeSelectionValue,
} from '../tree/tree-node.interface';
import { MagaryOrganizationChartNode } from './organizationchart-node';

@Component({
  selector: 'magary-organization-chart',
  standalone: true,
  imports: [CommonModule, MagaryOrganizationChartNode],
  templateUrl: './organizationchart.html',
  styleUrls: ['./organizationchart.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagaryOrganizationChart {
  readonly value = input<MagaryTreeNode[]>([]);
  readonly selectionMode = input<'single' | 'multiple' | null>(null);
  readonly selection = input<MagaryTreeSelectionValue>(null);
  readonly collapsible = input(false, { transform: booleanAttribute });
  readonly chartAriaLabel = input<string>('Organization chart');

  // Custom template support
  readonly template = contentChild(TemplateRef);

  readonly onNodeSelect = output<MagaryTreeNodeSelectionEvent>();
  readonly onNodeUnselect = output<MagaryTreeNodeSelectionEvent>();
  readonly onNodeExpand = output<MagaryTreeNode>();
  readonly onNodeCollapse = output<MagaryTreeNode>();

  // Helper to handle root nodes array
  // Typically org chart has one root, but we support array just in case
  // If array has multiple items, it creates multiple trees side-by-side or needs a virtual root?
  // Standard is usually an array where each item is a root of a tree.
}
