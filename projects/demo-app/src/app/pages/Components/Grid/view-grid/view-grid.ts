import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryGrid,
  MagaryGridItem,
  MagaryCard,
  MagaryButton,
  MagaryImage,
  MagaryAvatar,
  MagaryTable,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { FormsModule } from '@angular/forms';
import { GridStackOptions } from 'gridstack';

const CODE_EXAMPLES = {
  import: `import { MagaryGrid, MagaryGridItem } from 'ng-magary';`,
  basic: `<magary-grid [options]="basicOptions">
  @for (item of basicWidgets; track $index) {
    <magary-grid-item
      [x]="item.x"
      [y]="item.y"
      [w]="item.w"
      [h]="item.h"
      [noResize]="item.noResize"
      [noMove]="item.noMove"
      [locked]="item.locked"
    >
      <div class="basic-item" style="background: var(--primary-500)">
        {{ item.content }}
      </div>
    </magary-grid-item>
  }
</magary-grid>`,
  dashboard: `<magary-grid [options]="dashboardOptions">
  @for (widget of dashboardWidgets(); track widget.id) {
    <magary-grid-item
      [id]="widget.id"
      [x]="widget.x"
      [y]="widget.y"
      [w]="widget.w"
      [h]="widget.h"
    >
      <magary-card
        [shadow]="2"
        [padding]="widget.type === 'image' ? '0' : '1rem'"
      >
        <!-- Widget content based on type -->
        @if (widget.type === "stats") { ... }
        @if (widget.type === "card") { ... }
      </magary-card>
    </magary-grid-item>
  }
</magary-grid>`,
  basicTS: `
  // Options
  basicOptions: GridStackOptions = {
    margin: 10,
    float: true,
    minRow: 1,
    cellHeight: 100,
  };

  // Widgets Data
  basicWidgets = [
    { x: 0, y: 0, w: 4, h: 2, content: 'Widget A', noResize: true },
    { x: 4, y: 0, w: 4, h: 2, content: 'Widget B', noMove: true },
    { x: 8, y: 0, w: 4, h: 2, content: 'Widget C', locked: true },
  ];`,
  dashboardTS: `
  // Dashboard Options
  dashboardOptions: GridStackOptions = {
    margin: 10,
    cellHeight: 'auto',
    float: true,
    animate: true,
  };

  // Signal for reactive updates
  dashboardWidgets = signal<any[]>([
    {
      id: 'stats-users',
      x: 0, y: 0, w: 3, h: 2,
      type: 'stats',
      title: 'Total Users',
      value: '12,450'
    },
    // ... more widgets
  ]);

  addWidget(type: string) {
    // Add new widget to signal
    this.dashboardWidgets.update(w => [...w, newWidget]);
  }

  // Event Handler
  onGridChange(event: any) {
    console.log('Layout changed:', event);
    // { node: GridStackNode, ... }
  }
  `,
  galleryHTML: `
<magary-grid [options]="galleryOptions">
  @for (img of galleryImages; track img.id) {
    <magary-grid-item [x]="img.x" [y]="img.y" [w]="img.w" [h]="img.h">
      <div class="gallery-item">
        <magary-image
          [src]="img.src"
          [preview]="true"
          width="100%"
          height="100%"
        ></magary-image>
      </div>
    </magary-grid-item>
  }
</magary-grid>`,
  galleryTS: `
  galleryOptions: GridStackOptions = {
    margin: 5,
    cellHeight: 150,
    float: true,
  };

  galleryImages = [
    { id: '1', x: 0, y: 0, w: 4, h: 2, src: '...' },
    { id: '2', x: 4, y: 0, w: 8, h: 2, src: '...' },
    // Large items span multiple columns
  ];`,
};

@Component({
  selector: 'app-view-grid',
  standalone: true,
  imports: [
    CommonModule,
    MagaryGrid,
    MagaryGridItem,
    MagaryCard,
    Highlight,
    FormsModule,
    MagaryButton,
    MagaryImage,
    MagaryAvatar,
    MagaryTable,
    MagaryTabs,
    MagaryTab,
  ],
  templateUrl: './view-grid.html',
  styleUrl: './view-grid.scss',
})
export class ViewGrid {
  // Examples Code
  readonly importExample = CODE_EXAMPLES.import;
  readonly basicExample = CODE_EXAMPLES.basic;
  readonly basicTS = CODE_EXAMPLES.basicTS;
  readonly dashboardExample = CODE_EXAMPLES.dashboard;
  readonly dashboardTS = CODE_EXAMPLES.dashboardTS;
  readonly galleryHTML = CODE_EXAMPLES.galleryHTML;
  readonly galleryTS = CODE_EXAMPLES.galleryTS;

  // 1. Basic Example Data
  basicOptions: GridStackOptions = {
    margin: 10,
    float: true,
    minRow: 1,
    cellHeight: 100,
  };

  // 2. Data for Basic Usage (Static/Locked)
  basicWidgets = [
    {
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      content: 'Widget A (No Resize)',
      noResize: true,
      noMove: false,
      locked: false,
    },
    {
      x: 4,
      y: 0,
      w: 4,
      h: 2,
      content: 'Widget B (No Move)',
      noResize: false,
      noMove: true,
      locked: false,
    },
    {
      x: 8,
      y: 0,
      w: 4,
      h: 2,
      content: 'Widget C (Locked & Static)',
      noResize: true,
      noMove: true,
      locked: true,
    },
  ];

  // 3. Dashboard Example Data (Interactive)
  dashboardOptions: GridStackOptions = {
    margin: 10,
    cellHeight: 'auto',
    float: true,
    animate: true,
  };

  dashboardWidgets = signal<any[]>([
    {
      id: 'stats-users',
      x: 0,
      y: 0,
      w: 3,
      h: 2,
      type: 'stats',
      title: 'Total Users',
      value: '12,450',
      icon: 'users',
      color: 'primary',
      trend: '+15%',
    },
    {
      id: 'stats-revenue',
      x: 3,
      y: 0,
      w: 3,
      h: 2,
      type: 'stats',
      title: 'Revenue',
      value: '$45.2k',
      icon: 'dollar-sign',
      color: 'success',
      trend: '+8%',
    },
    {
      id: 'quick-actions',
      x: 6,
      y: 0,
      w: 3,
      h: 4,
      type: 'actions',
      title: 'Quick Actions',
    },
    {
      id: 'media-widget',
      x: 0,
      y: 2,
      w: 6,
      h: 2,
      type: 'media',
      title: 'Media Gallery',
      images: [
        'https://picsum.photos/id/10/300/200',
        'https://picsum.photos/id/11/300/200',
        'https://picsum.photos/id/12/300/200',
      ],
    },
    {
      id: 'profile-card',
      x: 9,
      y: 0,
      w: 3,
      h: 4,
      type: 'profile',
      name: 'Admin User',
      role: 'Administrator',
    },
  ]);

  // Gallery Example Data
  galleryOptions: GridStackOptions = {
    margin: 5,
    cellHeight: 150,
    float: true,
  };

  galleryImages = [
    {
      id: 'img1',
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      src: 'https://picsum.photos/id/1015/400/400',
      alt: 'River',
    },
    {
      id: 'img2',
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      src: 'https://picsum.photos/id/1016/400/400',
      alt: 'Canyon',
    },
    {
      id: 'img3',
      x: 4,
      y: 0,
      w: 8,
      h: 2,
      src: 'https://picsum.photos/id/1018/800/400',
      alt: 'Mountains',
    },
    {
      id: 'img4',
      x: 4,
      y: 2,
      w: 4,
      h: 1,
      src: 'https://picsum.photos/id/1019/800/400',
      alt: 'Forest',
    },
    {
      id: 'img5',
      x: 8,
      y: 1,
      w: 4,
      h: 2,
      src: 'https://picsum.photos/id/1020/400/400',
      alt: 'Bear',
    },
    {
      id: 'img6',
      x: 4,
      y: 2,
      w: 4,
      h: 1,
      src: 'https://picsum.photos/id/1019/800/400',
      alt: 'Forest',
    },
  ];

  onGridChange(event: any) {
    console.log('Grid changed:', event);
  }

  // Table config
  tableColumns = [
    { field: 'id', header: 'ID', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'status', header: 'Status' },
  ];

  addWidget(type: 'card' | 'table' | 'image') {
    const id = `widget-${Date.now()}`;
    let newWidget: any = { id, x: 0, y: 0 };

    switch (type) {
      case 'card':
        newWidget = {
          ...newWidget,
          w: 6,
          h: 3,
          type: 'card',
          title: 'Generic Card',
          content: 'This is a standard Magary Card.',
        };
        break;
      case 'table':
        newWidget = {
          ...newWidget,
          w: 6,
          h: 5,
          type: 'table',
          title: 'Data Table',
          data: [
            { id: 101, name: 'Project A', status: 'Active' },
            { id: 102, name: 'Project B', status: 'Pending' },
            { id: 103, name: 'Project C', status: 'Completed' },
            { id: 104, name: 'Project D', status: 'Active' },
            { id: 105, name: 'Project E', status: 'Delayed' },
          ],
        };
        break;
      case 'image':
        newWidget = {
          ...newWidget,
          w: 4,
          h: 4,
          type: 'image',
          title: 'Single Image',
          src: 'https://picsum.photos/600/400?random=' + Date.now(),
        };
        break;
    }

    this.dashboardWidgets.update((widgets) => [...widgets, newWidget]);
  }
}
