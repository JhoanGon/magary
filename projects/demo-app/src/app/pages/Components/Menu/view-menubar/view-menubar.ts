import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryMenubar,
  MenuItem,
  MagaryTabs,
  MagaryTab,
  MagaryToastService,
  MagaryToast,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-view-menubar',
  standalone: true,
  imports: [
    CommonModule,
    MagaryMenubar,
    MagaryTabs,
    MagaryTab,
    Highlight,
    MagaryToast,
  ],
  templateUrl: './view-menubar.html',
  styleUrl: './view-menubar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewMenubar implements OnInit {
  private toastService: MagaryToastService = inject(MagaryToastService);
  items: MenuItem[] = [];

  importRef = `import { MagaryMenubar } from 'ng-magary';`;

  basicHTML = `<magary-menubar [model]="items"></magary-menubar>`;

  basicTS = `export class MyComponent implements OnInit {
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            {
                label: 'File',
                icon: 'file',
                items: [
                    {
                        label: 'New',
                        icon: 'plus',
                        items: [
                            { label: 'Bookmark', icon: 'bookmark' },
                            { label: 'Video', icon: 'video' },
                        ]
                    },
                    { 
                        label: 'Delete', 
                        icon: 'trash',
                        command: () => this.toastService.add({ type: 'info', title: 'Deleted', message: 'Item deleted', duration: 3000 })
                    },
                    { separator: true },
                    { 
                        label: 'Export', 
                        icon: 'external-link',
                         command: () => this.toastService.add({ type: 'success', title: 'Exported', message: 'Data exported', duration: 3000 })
                    }
                ]
            },
            {
                label: 'Edit',
                icon: 'pencil',
                items: [
                    { label: 'Left', icon: 'align-start-vertical' },
                    { label: 'Right', icon: 'align-end-vertical' },
                    { label: 'Center', icon: 'align-center-vertical' },
                    { label: 'Justify', icon: 'align-vertical-justify-center' },
                ]
            },
            {
                label: 'Users',
                icon: 'user',
                items: [
                    {
                        label: 'New',
                        icon: 'user-plus',
                    },
                    {
                        label: 'Delete',
                        icon: 'user-minus',
                    },
                    {
                        label: 'Search',
                        icon: 'users',
                        items: [
                            {
                                label: 'Filter',
                                icon: 'funnel',
                                items: [
                                    { label: 'Print', icon: 'printer' }
                                ]
                            },
                            {
                                label: 'List',
                                icon: 'list'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Events',
                icon: 'calendar',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pencil',
                        items: [
                            { label: 'Save', icon: 'save' },
                            { label: 'Update', icon: 'refresh-cw' },
                        ]
                    },
                    {
                        label: 'Archived',
                        icon: 'archive',
                        items: [
                            { label: 'Remove', icon: 'trash' }
                        ]
                    }
                ]
            },
            {
                label: 'Quit',
                icon: 'power'
            }
        ];
    }
}`;

  ngOnInit() {
    this.items = [
      {
        label: 'File',
        icon: 'file',
        items: [
          {
            label: 'New',
            icon: 'plus',
            items: [
              { label: 'Bookmark', icon: 'bookmark' },
              { label: 'Video', icon: 'video' },
            ],
          },
          {
            label: 'Delete',
            icon: 'trash',
            command: () =>
              this.toastService.add({
                type: 'info',
                title: 'Deleted',
                message: 'Item deleted',
                duration: 3000,
              }),
          },
          { separator: true },
          {
            label: 'Export',
            icon: 'external-link',
            command: () =>
              this.toastService.add({
                type: 'success',
                title: 'Exported',
                message: 'Data exported',
                duration: 3000,
              }),
          },
        ],
      },
      {
        label: 'Edit',
        icon: 'pencil',
        items: [
          { label: 'Left', icon: 'align-start-vertical' },
          { label: 'Right', icon: 'align-end-vertical' },
          { label: 'Center', icon: 'align-center-vertical' },
          { label: 'Justify', icon: 'align-vertical-justify-center' },
        ],
      },
      {
        label: 'Users',
        icon: 'user',
        items: [
          {
            label: 'New',
            icon: 'user-plus',
          },
          {
            label: 'Delete',
            icon: 'user-minus',
          },
          {
            label: 'Search',
            icon: 'users',
            items: [
              {
                label: 'Filter',
                icon: 'funnel',
                items: [{ label: 'Print', icon: 'printer' }],
              },
              {
                label: 'List',
                icon: 'list',
              },
            ],
          },
        ],
      },
      {
        label: 'Events',
        icon: 'calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pencil',
            items: [
              { label: 'Save', icon: 'save' },
              { label: 'Update', icon: 'refresh-cw' },
            ],
          },
          {
            label: 'Archived',
            icon: 'archive',
            items: [{ label: 'Remove', icon: 'trash' }],
          },
        ],
      },
      {
        label: 'Quit',
        icon: 'power',
      },
    ];
  }
}
