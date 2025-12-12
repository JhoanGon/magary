import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryOrganizationChart, MagaryTreeNode } from 'ng-magary';
import { MagaryCard, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

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

  selectedNode: any;

  exampleHTML = `
<magary-organization-chart 
    [value]="data1" 
    selectionMode="single" 
    [selection]="selectedNode"
    (onNodeSelect)="onNodeSelect($event)">
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

  onNodeSelect(event: any) {
    this.selectedNode = event.node;
  }
}
