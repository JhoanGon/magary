import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryMegaMenu,
  MenuItem,
  MagaryTabs,
  MagaryTab,
  MagaryToastService,
  MagaryToast,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-view-megamenu',
  standalone: true,
  imports: [
    CommonModule,
    MagaryMegaMenu,
    MagaryTabs,
    MagaryTab,
    Highlight,
    MagaryToast,
  ],
  templateUrl: './view-megamenu.html',
  styleUrl: './view-megamenu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewMegaMenu implements OnInit {
  private toastService = inject(MagaryToastService);

  items: MenuItem[] = [];

  importRef = `import { MagaryMegaMenu, MenuItem } from 'ng-magary';`;

  htmlCode = `<magary-megamenu [model]="items" [orientation]="'horizontal'"></magary-megamenu>`;

  tsCode = `export class MyComponent {
      items: MenuItem[] = [
        {
          label: 'Fashion',
          icon: 'shirt',
          items: [
            [
              {
                label: 'Woman',
                items: [{ label: 'Woman Item' }, { label: 'Woman Item' }]
              },
              {
                label: 'Men',
                items: [{ label: 'Men Item' }, { label: 'Men Item' }]
              }
            ],
            [
              {
                label: 'Kids',
                items: [{ label: 'Kids Item' }, { label: 'Kids Item' }]
              }
            ]
          ]
        }
      ];
  }`;

  ngOnInit() {
    this.items = [
      {
        label: 'Videos',
        icon: 'video',
        items: [
          {
            label: 'Video 1',
            items: [
              { label: 'Video 1.1', icon: 'play' },
              { label: 'Video 1.2', icon: 'play' },
            ],
          },
          {
            label: 'Video 2',
            items: [
              {
                label: 'Video 2.1',
                icon: 'play',
                command: () => this.showToast('Video 2.1 Played'),
              },
              { label: 'Video 2.2', icon: 'play' },
            ],
          },
        ],
      },
      {
        label: 'Users',
        icon: 'users',
        items: [
          {
            label: 'User 1',
            items: [
              { label: 'User 1.1', icon: 'user' },
              { label: 'User 1.2', icon: 'user' },
            ],
          },
          {
            label: 'User 2',
            items: [
              { label: 'User 2.1', icon: 'user' },
              { label: 'User 2.2', icon: 'user' },
            ],
          },
          {
            label: 'User 3',
            items: [
              { label: 'User 3.1', icon: 'user' },
              { label: 'User 3.2', icon: 'user' },
            ],
          },
        ],
      },
      {
        label: 'Events',
        icon: 'calendar',
        items: [
          {
            label: 'Event 1',
            items: [
              { label: 'Event 1.1', icon: 'calendar-days' },
              { label: 'Event 1.2', icon: 'calendar-days' },
            ],
          },
          {
            label: 'Event 2',
            items: [
              { label: 'Event 2.1', icon: 'calendar-days' },
              { label: 'Event 2.2', icon: 'calendar-days' },
            ],
          },
          {
            label: 'Event 3',
            items: [
              { label: 'Event 3.1', icon: 'calendar-days' },
              { label: 'Event 3.2', icon: 'calendar-days' },
            ],
          },
          {
            label: 'Event 4',
            items: [
              { label: 'Event 4.1', icon: 'calendar-days' },
              { label: 'Event 4.2', icon: 'calendar-days' },
            ],
          },
        ],
      },
      {
        label: 'Settings',
        icon: 'settings',
        items: [
          {
            label: 'Setting 1',
            items: [
              { label: 'Setting 1.1', icon: 'settings-2' },
              { label: 'Setting 1.2', icon: 'settings-2' },
            ],
          },
        ],
      },
    ];
  }

  showToast(msg: string) {
    this.toastService.add({
      type: 'success',
      title: 'Clicked',
      message: msg,
      duration: 3000,
    });
  }
}
