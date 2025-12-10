import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryTree, MagaryTreeNode } from 'ng-magary';
import { MagaryTabs, MagaryTab } from 'ng-magary';
import { MagaryCard } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'view-tree',
  standalone: true,
  imports: [
    CommonModule,
    MagaryTree,
    MagaryTabs,
    MagaryTab,
    MagaryCard,
    Highlight,
  ],
  templateUrl: './view-tree.html',
  styleUrls: ['./view-tree.scss'],
})
export class ViewTree {
  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  files: MagaryTreeNode[] = [
    {
      key: '0',
      label: 'Documents',
      data: 'Documents Folder',
      icon: 'folder',
      children: [
        {
          key: '0-0',
          label: 'Work',
          data: 'Work Folder',
          icon: 'folder',
          children: [
            {
              key: '0-0-0',
              label: 'Expenses.doc',
              icon: 'file-text',
              data: 'Expenses Document',
            },
            {
              key: '0-0-1',
              label: 'Resume.doc',
              icon: 'file-text',
              data: 'Resume Document',
            },
          ],
        },
        {
          key: '0-1',
          label: 'Home',
          data: 'Home Folder',
          icon: 'folder',
          children: [
            {
              key: '0-1-0',
              label: 'Invoices.txt',
              icon: 'file-text',
              data: 'Invoices for this month',
            },
          ],
        },
      ],
    },
    {
      key: '1',
      label: 'Pictures',
      data: 'Pictures Folder',
      icon: 'folder',
      children: [
        {
          key: '1-0',
          label: 'barcelona.jpg',
          icon: 'image',
          data: 'Barcelona Photo',
        },
        { key: '1-1', label: 'logo.png', icon: 'image', data: 'Magary Logo' },
        {
          key: '1-2',
          label: 'primeui.png',
          icon: 'image',
          data: 'PrimeUI Logo',
        },
      ],
    },
    {
      key: '2',
      label: 'Movies',
      data: 'Movies Folder',
      icon: 'folder',
      children: [
        {
          key: '2-0',
          label: 'Al Pacino',
          data: 'Pacino Movies',
          children: [
            {
              key: '2-0-0',
              label: 'Scarface',
              icon: 'film',
              data: 'Scarface Movie',
            },
            {
              key: '2-0-1',
              label: 'Serpico',
              icon: 'film',
              data: 'Serpico Movie',
            },
          ],
        },
        {
          key: '2-1',
          label: 'Robert De Niro',
          data: 'De Niro Movies',
          children: [
            {
              key: '2-1-0',
              label: 'Goodfellas',
              icon: 'film',
              data: 'Goodfellas Movie',
            },
            {
              key: '2-1-1',
              label: 'Untouchables',
              icon: 'film',
              data: 'Untouchables Movie',
            },
          ],
        },
      ],
    },
  ];

  selectedFile: MagaryTreeNode | null = null;
  selectedFiles: MagaryTreeNode[] = [];

  onNodeSelect(event: any) {}

  onNodeUnselect(event: any) {}

  exampleHTML = `
<magary-tree 
    [value]="files" 
    selectionMode="single" 
    [(selection)]="selectedFile"
    (onNodeSelect)="onNodeSelect($event)">
</magary-tree>
    `;

  exampleTS = `
import { MagaryTree, MagaryTreeNode } from 'ng-magary';

export class MyComponent {
    files: MagaryTreeNode[] = [...]; // Data structure
    selectedFile: MagaryTreeNode | null = null;

    onNodeSelect(event: any) {
        console.log('Selected', event.node.label);
    }
}
    `;
}
