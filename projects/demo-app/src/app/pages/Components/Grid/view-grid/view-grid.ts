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
  MagaryGridLayoutItem,
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
  col: number;
  row: number;
  cols: number;
  rows: number;
  contentKey: DocsTextKey;
  resizable: boolean;
  movable: boolean;
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
  item: MagaryGridLayoutItem;
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
  basic: `<magary-grid
  [columns]="12"
  [rowHeight]="100"
  [gap]="10"
  [editable]="true"
>
  @for (item of basicWidgets; track $index) {
    <magary-grid-item
      [col]="item.col"
      [row]="item.row"
      [cols]="item.cols"
      [rows]="item.rows"
      [resizable]="item.resizable"
      [movable]="item.movable"
      [locked]="item.locked"
    >
      <div class="basic-item" style="background: var(--primary-500)">
        {{ item.content }}
      </div>
    </magary-grid-item>
  }
</magary-grid>`,
  dashboardSimple: `<magary-grid
  [columns]="dashboardColumns"
  [rowHeight]="dashboardRowHeight"
  [gap]="dashboardGap"
  [editable]="dashboardEditable"
  [options]="dashboardOptions"
  (itemsChange)="onDashboardItemsChange($event)"
>
  @for (widget of dashboardWidgets(); track widget.id) {
    <magary-grid-item [item]="widget.item">
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
  dashboardAdvanced: `<magary-grid [options]="dashboardOptions" (change)="onGridChange($event)">
  @for (widget of dashboardWidgets(); track widget.id) {
    <magary-grid-item
      [id]="widget.id"
      [x]="widget.item.col"
      [y]="widget.item.row"
      [w]="widget.item.cols"
      [h]="widget.item.rows"
    >
      <magary-card [shadow]="2">
        <!-- Widget content -->
      </magary-card>
    </magary-grid-item>
  }
</magary-grid>`,
  basicTS: `
  // Simple API
  basicColumns = 12;
  basicRowHeight = 100;
  basicGap = 10;
  basicEditable = true;

  // Widgets Data
  basicWidgets = [
    { col: 0, row: 0, cols: 4, rows: 2, content: 'Widget A', resizable: false, movable: true },
    { col: 4, row: 0, cols: 4, rows: 2, content: 'Widget B', resizable: true, movable: false },
    { col: 8, row: 0, cols: 4, rows: 2, content: 'Widget C', resizable: false, movable: false, locked: true },
  ];`,
  dashboardSimpleTS: `
  dashboardColumns = 12;
  dashboardRowHeight: number | 'auto' = 'auto';
  dashboardGap = 10;
  dashboardEditable = true;

  // You can still use advanced options when needed.
  dashboardOptions: GridStackOptions = {
    margin: 10,
    cellHeight: 'auto',
    float: true,
    animate: true,
  };

  // Single layout object per widget.
  dashboardWidgets = signal<DashboardWidget[]>([
    {
      id: 'stats-users',
      item: {
        id: 'stats-users',
        col: 0,
        row: 0,
        cols: 3,
        rows: 2,
        movable: true,
        resizable: true,
        locked: false,
      },
      type: 'stats',
      title: 'Total Users',
      value: '12,450'
    },
    // ... more widgets
  ]);

  onDashboardItemsChange(layout: MagaryGridLayoutItem[]) {
    this.dashboardWidgets.update((widgets) =>
      widgets.map((widget) => {
        const next = layout.find((item) => item.id === widget.id);
        return next ? { ...widget, item: next } : widget;
      }),
    );
  }
  `,
  dashboardAdvancedTS: `
  // Advanced mode: raw GridStack options + explicit coordinates.
  dashboardOptions: GridStackOptions = {
    margin: 10,
    cellHeight: 'auto',
    float: true,
    animate: true,
  };

  onGridChange(event: MagaryGridEvent) {
    console.log('Layout changed:', event.items);
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
  readonly dashboardSimpleExample = CODE_EXAMPLES.dashboardSimple;
  readonly dashboardSimpleTS = CODE_EXAMPLES.dashboardSimpleTS;
  readonly dashboardAdvancedExample = CODE_EXAMPLES.dashboardAdvanced;
  readonly dashboardAdvancedTS = CODE_EXAMPLES.dashboardAdvancedTS;
  readonly galleryHTML = CODE_EXAMPLES.galleryHTML;
  readonly galleryTS = CODE_EXAMPLES.galleryTS;

  readonly basicColumns = 12;
  readonly basicRowHeight = 100;
  readonly basicGap = 10;
  readonly basicEditable = true;

  readonly basicWidgets: BasicWidget[] = [
    {
      col: 0,
      row: 0,
      cols: 4,
      rows: 2,
      contentKey: 'components.grid.grid.basic.widgetA',
      resizable: false,
      movable: true,
      locked: false,
    },
    {
      col: 4,
      row: 0,
      cols: 4,
      rows: 2,
      contentKey: 'components.grid.grid.basic.widgetB',
      resizable: true,
      movable: false,
      locked: false,
    },
    {
      col: 8,
      row: 0,
      cols: 4,
      rows: 2,
      contentKey: 'components.grid.grid.basic.widgetC',
      resizable: false,
      movable: false,
      locked: true,
    },
  ];

  readonly dashboardOptions: GridStackOptions = {
    margin: 10,
    cellHeight: 'auto',
    float: true,
    animate: true,
  };
  readonly dashboardColumns = 12;
  readonly dashboardRowHeight: number | 'auto' = 'auto';
  readonly dashboardGap = 10;
  readonly dashboardEditable = true;

  readonly dashboardWidgets = signal<DashboardWidget[]>([
    {
      id: 'stats-users',
      item: {
        id: 'stats-users',
        col: 0,
        row: 0,
        cols: 3,
        rows: 2,
        movable: true,
        resizable: true,
        locked: false,
      },
      type: 'stats',
      titleKey: 'components.grid.grid.dashboard.widget.totalUsers',
      value: '12,450',
      icon: 'users',
      color: 'primary',
      trend: '+15%',
    },
    {
      id: 'stats-revenue',
      item: {
        id: 'stats-revenue',
        col: 3,
        row: 0,
        cols: 3,
        rows: 2,
        movable: true,
        resizable: true,
        locked: false,
      },
      type: 'stats',
      titleKey: 'components.grid.grid.dashboard.widget.revenue',
      value: '$45.2k',
      icon: 'dollar-sign',
      color: 'success',
      trend: '+8%',
    },
    {
      id: 'quick-actions',
      item: {
        id: 'quick-actions',
        col: 6,
        row: 0,
        cols: 3,
        rows: 4,
        movable: true,
        resizable: true,
        locked: false,
      },
      type: 'actions',
      titleKey: 'components.grid.grid.dashboard.widget.quickActions',
    },
    {
      id: 'media-widget',
      item: {
        id: 'media-widget',
        col: 0,
        row: 2,
        cols: 6,
        rows: 2,
        movable: true,
        resizable: true,
        locked: false,
      },
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
      item: {
        id: 'profile-card',
        col: 9,
        row: 0,
        cols: 3,
        rows: 4,
        movable: true,
        resizable: true,
        locked: false,
      },
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
      property: 'columns',
      type: 'number',
      descriptionKey: 'components.grid.grid.api.row.columns.desc',
    },
    {
      component: 'magary-grid',
      property: 'rowHeight',
      type: "number | 'auto'",
      descriptionKey: 'components.grid.grid.api.row.rowHeight.desc',
    },
    {
      component: 'magary-grid',
      property: 'gap',
      type: 'number | string',
      descriptionKey: 'components.grid.grid.api.row.gap.desc',
    },
    {
      component: 'magary-grid',
      property: 'editable',
      type: 'boolean',
      descriptionKey: 'components.grid.grid.api.row.editable.desc',
    },
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
      component: 'magary-grid',
      property: 'itemsChange',
      type: 'EventEmitter<MagaryGridLayoutItem[]>',
      descriptionKey: 'components.grid.grid.api.row.itemsChange.desc',
    },
    {
      component: 'magary-grid-item',
      property: 'item',
      type: 'MagaryGridLayoutItem',
      descriptionKey: 'components.grid.grid.api.row.item.desc',
    },
    {
      component: 'magary-grid-item',
      property: 'col, row, cols, rows',
      type: 'number',
      descriptionKey: 'components.grid.grid.api.row.simpleCoords.desc',
    },
    {
      component: 'magary-grid-item',
      property: 'movable',
      type: 'boolean',
      descriptionKey: 'components.grid.grid.api.row.movable.desc',
    },
    {
      component: 'magary-grid-item',
      property: 'resizable',
      type: 'boolean',
      descriptionKey: 'components.grid.grid.api.row.resizable.desc',
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
      item: {
        id,
        col: 0,
        row: 0,
        cols: 4,
        rows: 4,
        movable: true,
        resizable: true,
        locked: false,
      },
      type: 'card',
      titleKey: 'components.grid.grid.dashboard.widget.genericCard',
    };

    switch (type) {
      case 'card':
        newWidget = {
          ...newWidget,
          item: {
            ...newWidget.item,
            cols: 6,
            rows: 3,
          },
          type: 'card',
          titleKey: 'components.grid.grid.dashboard.widget.genericCard',
          contentKey: 'components.grid.grid.dashboard.widget.genericCardContent',
        };
        break;
      case 'table':
        newWidget = {
          ...newWidget,
          item: {
            ...newWidget.item,
            cols: 6,
            rows: 5,
          },
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
          item: {
            ...newWidget.item,
            cols: 4,
            rows: 4,
          },
          type: 'image',
          titleKey: 'components.grid.grid.dashboard.widget.singleImage',
          src: 'https://picsum.photos/600/400?random=' + Date.now(),
        };
        break;
    }

    this.dashboardWidgets.update((widgets) => [...widgets, newWidget]);
  }

  onDashboardItemsChange(layout: MagaryGridLayoutItem[]) {
    this.dashboardWidgets.update((widgets) =>
      widgets.map((widget) => {
        const next = layout.find((item) => item.id === widget.id);
        if (!next) {
          return widget;
        }
        if (this.layoutEquals(widget.item, next)) {
          return widget;
        }
        return {
          ...widget,
          item: {
            ...next,
            id: widget.id,
          },
        };
      }),
    );
  }

  private layoutEquals(
    current: MagaryGridLayoutItem,
    incoming: MagaryGridLayoutItem,
  ): boolean {
    return (
      current.col === incoming.col &&
      current.row === incoming.row &&
      current.cols === incoming.cols &&
      current.rows === incoming.rows &&
      current.movable === incoming.movable &&
      current.resizable === incoming.resizable &&
      current.locked === incoming.locked
    );
  }
}
