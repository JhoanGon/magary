import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryGrid,
  MagaryGridItem,
  MagaryCard,
  MagaryButton,
  MagaryImage,
  MagaryAvatar,
  MagaryGridEvent,
  MagaryTable,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { FormsModule } from '@angular/forms';
import { GridStackOptions } from 'gridstack';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type DashboardWidgetType =
  | 'stats'
  | 'actions'
  | 'media'
  | 'profile'
  | 'card'
  | 'table'
  | 'image';

interface BasicWidget {
  x: number;
  y: number;
  w: number;
  h: number;
  contentKey: DocsTextKey;
  noResize: boolean;
  noMove: boolean;
  locked: boolean;
}

interface DashboardTableRow {
  id: number;
  nameKey: DocsTextKey;
  statusKey: DocsTextKey;
}

interface DashboardTableDisplayRow {
  id: number;
  name: string;
  status: string;
}

interface DashboardWidget {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: DashboardWidgetType;
  titleKey: DocsTextKey;
  value?: string;
  icon?: string;
  color?: string;
  trend?: string;
  images?: string[];
  nameKey?: DocsTextKey;
  roleKey?: DocsTextKey;
  contentKey?: DocsTextKey;
  data?: DashboardTableRow[];
  src?: string;
}

interface GalleryImage {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  src: string;
  altKey: DocsTextKey;
}

type GridApiRow = {
  component: string;
  property: string;
  type: string;
  descriptionKey: DocsTextKey;
};

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
  dashboardWidgets = signal<DashboardWidget[]>([
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
  onGridChange(event: MagaryGridEvent) {
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
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  readonly importExample = CODE_EXAMPLES.import;
  readonly basicExample = CODE_EXAMPLES.basic;
  readonly basicTS = CODE_EXAMPLES.basicTS;
  readonly dashboardExample = CODE_EXAMPLES.dashboard;
  readonly dashboardTS = CODE_EXAMPLES.dashboardTS;
  readonly galleryHTML = CODE_EXAMPLES.galleryHTML;
  readonly galleryTS = CODE_EXAMPLES.galleryTS;

  readonly basicOptions: GridStackOptions = {
    margin: 10,
    float: true,
    minRow: 1,
    cellHeight: 100,
  };

  readonly basicWidgets: BasicWidget[] = [
    {
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      contentKey: 'components.grid.grid.basic.widgetA',
      noResize: true,
      noMove: false,
      locked: false,
    },
    {
      x: 4,
      y: 0,
      w: 4,
      h: 2,
      contentKey: 'components.grid.grid.basic.widgetB',
      noResize: false,
      noMove: true,
      locked: false,
    },
    {
      x: 8,
      y: 0,
      w: 4,
      h: 2,
      contentKey: 'components.grid.grid.basic.widgetC',
      noResize: true,
      noMove: true,
      locked: true,
    },
  ];

  readonly dashboardOptions: GridStackOptions = {
    margin: 10,
    cellHeight: 'auto',
    float: true,
    animate: true,
  };

  readonly dashboardWidgets = signal<DashboardWidget[]>([
    {
      id: 'stats-users',
      x: 0,
      y: 0,
      w: 3,
      h: 2,
      type: 'stats',
      titleKey: 'components.grid.grid.dashboard.widget.totalUsers',
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
      titleKey: 'components.grid.grid.dashboard.widget.revenue',
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
      titleKey: 'components.grid.grid.dashboard.widget.quickActions',
    },
    {
      id: 'media-widget',
      x: 0,
      y: 2,
      w: 6,
      h: 2,
      type: 'media',
      titleKey: 'components.grid.grid.dashboard.widget.mediaGallery',
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
      titleKey: 'components.grid.grid.dashboard.widget.profile',
      nameKey: 'components.grid.grid.dashboard.widget.profileName',
      roleKey: 'components.grid.grid.dashboard.widget.profileRole',
    },
  ]);

  readonly galleryOptions: GridStackOptions = {
    margin: 5,
    cellHeight: 150,
    float: true,
  };

  readonly galleryImages: GalleryImage[] = [
    {
      id: 'img1',
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      src: 'https://picsum.photos/id/1015/400/400',
      altKey: 'components.grid.grid.gallery.alt.river',
    },
    {
      id: 'img2',
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      src: 'https://picsum.photos/id/1016/400/400',
      altKey: 'components.grid.grid.gallery.alt.canyon',
    },
    {
      id: 'img3',
      x: 4,
      y: 0,
      w: 8,
      h: 2,
      src: 'https://picsum.photos/id/1018/800/400',
      altKey: 'components.grid.grid.gallery.alt.mountains',
    },
    {
      id: 'img4',
      x: 4,
      y: 2,
      w: 4,
      h: 1,
      src: 'https://picsum.photos/id/1019/800/400',
      altKey: 'components.grid.grid.gallery.alt.forest',
    },
    {
      id: 'img5',
      x: 8,
      y: 1,
      w: 4,
      h: 2,
      src: 'https://picsum.photos/id/1020/400/400',
      altKey: 'components.grid.grid.gallery.alt.bear',
    },
    {
      id: 'img6',
      x: 4,
      y: 2,
      w: 4,
      h: 1,
      src: 'https://picsum.photos/id/1019/800/400',
      altKey: 'components.grid.grid.gallery.alt.forest',
    },
  ];

  readonly apiRows: GridApiRow[] = [
    {
      component: 'magary-grid',
      property: 'options',
      type: 'GridStackOptions',
      descriptionKey: 'components.grid.grid.api.row.options.desc',
    },
    {
      component: 'magary-grid',
      property: 'change',
      type: 'EventEmitter',
      descriptionKey: 'components.grid.grid.api.row.change.desc',
    },
    {
      component: 'magary-grid-item',
      property: 'x, y, w, h',
      type: 'number',
      descriptionKey: 'components.grid.grid.api.row.coords.desc',
    },
    {
      component: 'magary-grid-item',
      property: 'noResize',
      type: 'boolean',
      descriptionKey: 'components.grid.grid.api.row.noResize.desc',
    },
    {
      component: 'magary-grid-item',
      property: 'noMove',
      type: 'boolean',
      descriptionKey: 'components.grid.grid.api.row.noMove.desc',
    },
    {
      component: 'magary-grid-item',
      property: 'locked',
      type: 'boolean',
      descriptionKey: 'components.grid.grid.api.row.locked.desc',
    },
  ];

  get tableColumns(): Array<{
    field: keyof DashboardTableDisplayRow;
    header: string;
    sortable?: boolean;
  }> {
    return [
      {
        field: 'id',
        header: this.t('components.grid.grid.table.header.id'),
        sortable: true,
      },
      {
        field: 'name',
        header: this.t('components.grid.grid.table.header.name'),
        sortable: true,
      },
      {
        field: 'status',
        header: this.t('components.grid.grid.table.header.status'),
      },
    ];
  }

  onGridChange(_event: MagaryGridEvent) {}

  widgetTitle(widget: DashboardWidget): string {
    return this.t(widget.titleKey);
  }

  widgetName(widget: DashboardWidget): string {
    return widget.nameKey ? this.t(widget.nameKey) : '';
  }

  widgetRole(widget: DashboardWidget): string {
    return widget.roleKey ? this.t(widget.roleKey) : '';
  }

  widgetContent(widget: DashboardWidget): string {
    return widget.contentKey ? this.t(widget.contentKey) : '';
  }

  resolveTableData(rows: DashboardTableRow[]): DashboardTableDisplayRow[] {
    return rows.map((row) => ({
      id: row.id,
      name: this.t(row.nameKey),
      status: this.t(row.statusKey),
    }));
  }

  addWidget(type: 'card' | 'table' | 'image') {
    const id = `widget-${Date.now()}`;
    let newWidget: DashboardWidget = {
      id,
      x: 0,
      y: 0,
      w: 4,
      h: 4,
      type: 'card',
      titleKey: 'components.grid.grid.dashboard.widget.genericCard',
    };

    switch (type) {
      case 'card':
        newWidget = {
          ...newWidget,
          w: 6,
          h: 3,
          type: 'card',
          titleKey: 'components.grid.grid.dashboard.widget.genericCard',
          contentKey: 'components.grid.grid.dashboard.widget.genericCardContent',
        };
        break;
      case 'table':
        newWidget = {
          ...newWidget,
          w: 6,
          h: 5,
          type: 'table',
          titleKey: 'components.grid.grid.dashboard.widget.dataTable',
          data: [
            {
              id: 101,
              nameKey: 'components.grid.grid.table.row.projectA',
              statusKey: 'components.grid.grid.table.status.active',
            },
            {
              id: 102,
              nameKey: 'components.grid.grid.table.row.projectB',
              statusKey: 'components.grid.grid.table.status.pending',
            },
            {
              id: 103,
              nameKey: 'components.grid.grid.table.row.projectC',
              statusKey: 'components.grid.grid.table.status.completed',
            },
            {
              id: 104,
              nameKey: 'components.grid.grid.table.row.projectD',
              statusKey: 'components.grid.grid.table.status.active',
            },
            {
              id: 105,
              nameKey: 'components.grid.grid.table.row.projectE',
              statusKey: 'components.grid.grid.table.status.delayed',
            },
          ],
        };
        break;
      case 'image':
        newWidget = {
          ...newWidget,
          w: 4,
          h: 4,
          type: 'image',
          titleKey: 'components.grid.grid.dashboard.widget.singleImage',
          src: 'https://picsum.photos/600/400?random=' + Date.now(),
        };
        break;
    }

    this.dashboardWidgets.update((widgets) => [...widgets, newWidget]);
  }
}