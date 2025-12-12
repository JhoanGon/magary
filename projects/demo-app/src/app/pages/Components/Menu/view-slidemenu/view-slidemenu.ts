import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagarySlideMenu,
  MenuItem,
  MagaryTabs,
  MagaryTab,
  MagaryToastService,
  MagaryToast,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-view-slidemenu',
  standalone: true,
  imports: [
    CommonModule,
    MagarySlideMenu,
    MagaryTabs,
    MagaryTab,
    Highlight,
    MagaryToast,
  ],
  templateUrl: './view-slidemenu.html',
  styleUrl: './view-slidemenu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSlideMenu implements OnInit {
  private toastService = inject(MagaryToastService);

  items: MenuItem[] = [];

  importRef = `import { MagarySlideMenu, MenuItem } from 'ng-magary';`;

  htmlCode = `<div style="width: 300px; height: 350px; position: relative;">
     <magary-slidemenu [model]="items" [style]="{'width':'100%', 'height':'100%'}"></magary-slidemenu>
</div>`;

  tsCode = `export class MyComponent {
      items = [
         {
             label: 'Users',
             icon: 'users',
             items: [
                 { label: 'New', icon: 'plus' },
                 { label: 'Delete', icon: 'trash' },
                 {
                     label: 'Search',
                     icon: 'search',
                     items: [
                         { label: 'Filter', icon: 'funnel' },
                         { label: 'List', icon: 'list' }
                     ]
                 }
             ]
         }
      ];
  }`;

  ngOnInit() {
    this.items = [
      {
        label: 'Files',
        icon: 'file',
        items: [
          {
            label: 'New',
            icon: 'plus',
            items: [
              {
                label: 'Video',
                icon: 'video',
                command: () => this.msg('Video Created'),
              },
              {
                label: 'Audio',
                icon: 'mic',
                command: () => this.msg('Audio Created'),
              },
              {
                label: 'Image',
                icon: 'image',
                command: () => this.msg('Image Created'),
              },
            ],
          },
          { label: 'Open', icon: 'folder-open' },
          { label: 'Print', icon: 'printer' },
        ],
      },
      {
        label: 'Edit',
        icon: 'pencil',
        items: [
          { label: 'Undo', icon: 'undo' },
          { label: 'Redo', icon: 'redo' },
        ],
      },
      {
        label: 'Users',
        icon: 'users',
        items: [
          {
            label: 'Search',
            icon: 'search',
            items: [
              {
                label: 'Filter',
                icon: 'funnel',
                items: [{ label: 'Print', icon: 'printer' }],
              },
              {
                label: 'List',
                icon: 'list',
                command: () => this.msg('List View'),
              },
            ],
          },
        ],
      },
      {
        label: 'Calendar',
        icon: 'calendar',
        items: [
          { label: 'Edit', icon: 'pencil' },
          { label: 'Archived', icon: 'archive' },
        ],
      },
    ];
  }

  msg(text: string) {
    this.toastService.add({
      type: 'success',
      title: 'Action',
      message: text,
      duration: 3000,
    });
  }
}
