import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryOrganizationChart,
  MagaryTreeNode,
  MagaryTreeNodeSelectionEvent,
} from 'ng-magary';
import { MagaryCard, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

@Component({
  selector: 'view-organizationchart',
  standalone: true,
  imports: [
    CommonModule,
    MagaryOrganizationChart,
    MagaryCard,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-organizationchart.html',
  styleUrls: ['./view-organizationchart.scss'],
})
export class ViewOrganizationChart {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  data1: MagaryTreeNode[] = [
    {
      label: 'CEO',
      type: 'person',
      expanded: true,
      data: { name: 'Walter White', title: 'CEO' },
      children: [
        {
          label: 'CFO',
          type: 'person',
          expanded: true,
          data: { name: 'Saul Goodman', title: 'CFO' },
          children: [
            {
              label: 'Tax',
              expanded: true,
              data: { name: 'Francesca Liddy', title: 'Tax Accountant' },
            },
          ],
        },
        {
          label: 'COO',
          type: 'person',
          expanded: true,
          data: { name: 'Jesse Pinkman', title: 'COO' },
          children: [
            {
              label: 'Operations',
              expanded: true,
              data: { name: 'Skinny Pete', title: 'Director of Ops' },
            },
            {
              label: 'Logistics',
              expanded: true,
              data: { name: 'Badger', title: 'Head of Logistics' },
            },
          ],
        },
      ],
    },
  ];

  selectedNode: MagaryTreeNode | null = null;
  chartEventSummary = this.t('components.data.organizationChart.events.none');

  exampleHTML = `
<magary-organization-chart 
    [value]="data1" 
    selectionMode="single" 
    chartAriaLabel="Company organization chart"
    [selection]="selectedNode"
    (onNodeSelect)="onNodeSelect($event)"
    (onNodeUnselect)="onNodeUnselect($event)"
    (onNodeExpand)="onNodeExpand($event)"
    (onNodeCollapse)="onNodeCollapse($event)">
</magary-organization-chart>
`;

  exampleTS = `
import { MagaryTreeNode } from 'ng-magary';

export class MyComponent {
    data: MagaryTreeNode[] = [
        {
            label: 'CEO',
            expanded: true,
            children: [
                {
                    label: 'CFO',
                    expanded: true,
                    children: [{ label: 'Tax' }]
                },
                {
                    label: 'COO',
                    expanded: true,
                    children: [
                        { label: 'Operations' },
                        { label: 'Logistics' }
                    ]
                }
            ]
        }
    ];
}
`;

  onNodeSelect(event: MagaryTreeNodeSelectionEvent) {
    this.selectedNode = event.node;
    this.chartEventSummary =
      this.t('components.data.organizationChart.events.selected') +
      (event.node.label ??
        this.t('components.data.organizationChart.events.unknownNode'));
  }

  onNodeUnselect(event: MagaryTreeNodeSelectionEvent) {
    this.selectedNode = null;
    this.chartEventSummary =
      this.t('components.data.organizationChart.events.unselected') +
      (event.node.label ??
        this.t('components.data.organizationChart.events.unknownNode'));
  }

  onNodeExpand(node: MagaryTreeNode) {
    this.chartEventSummary =
      this.t('components.data.organizationChart.events.expanded') +
      (node.label ?? this.t('components.data.organizationChart.events.unknownNode'));
  }

  onNodeCollapse(node: MagaryTreeNode) {
    this.chartEventSummary =
      this.t('components.data.organizationChart.events.collapsed') +
      (node.label ?? this.t('components.data.organizationChart.events.unknownNode'));
  }
}
