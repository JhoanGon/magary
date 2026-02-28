import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryOrderList, MagaryKanban, MagaryKanbanColumn, MagaryCard, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

type OrderListInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type OrderListOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

type ComparisonCard = {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
};

type ComparisonColumn = MagaryKanbanColumn<ComparisonCard> & {
  titleKey: DocsTextKey;
};

const COMPARISON_BOARD_TEMPLATE: ReadonlyArray<ComparisonColumn> = [
  {
    id: 'confluence',
    titleKey: 'components.data.orderList.comparison.columns.confluence',
    items: [
      {
        id: 'tanya',
        name: 'Tanya',
        role: 'Content Designer',
        initials: 'TA',
        color: '#f59e0b',
      },
      {
        id: 'vania',
        name: 'Vania',
        role: 'Program Manager',
        initials: 'VA',
        color: '#10b981',
      },
      {
        id: 'alexander',
        name: 'Alexander',
        role: 'Engineer',
        initials: 'AL',
        color: '#f97316',
      },
      {
        id: 'alvin',
        name: 'Alvin',
        role: 'Principal Engineer',
        initials: 'AV',
        color: '#3b82f6',
      },
    ],
  },
  {
    id: 'jira',
    titleKey: 'components.data.orderList.comparison.columns.jira',
    items: [
      {
        id: 'blair',
        name: 'Blair',
        role: 'Senior Designer',
        initials: 'BL',
        color: '#2563eb',
      },
      {
        id: 'claudia',
        name: 'Claudia',
        role: 'Lead Designer',
        initials: 'CL',
        color: '#fbbf24',
      },
      {
        id: 'lydia',
        name: 'Lydia',
        role: 'Product Manager',
        initials: 'LY',
        color: '#1d4ed8',
      },
      {
        id: 'aliza',
        name: 'Aliza',
        role: 'Senior Engineer',
        initials: 'AZ',
        color: '#34d399',
      },
    ],
  },
  {
    id: 'trello',
    titleKey: 'components.data.orderList.comparison.columns.trello',
    items: [
      {
        id: 'lara',
        name: 'Lara',
        role: 'Design Manager',
        initials: 'LA',
        color: '#f97316',
      },
      {
        id: 'leo',
        name: 'Leo',
        role: 'Content Designer',
        initials: 'LE',
        color: '#06b6d4',
      },
      {
        id: 'maribel',
        name: 'Maribel',
        role: 'Program Manager',
        initials: 'MA',
        color: '#fb7185',
      },
      {
        id: 'milo',
        name: 'Milo',
        role: 'Engineer',
        initials: 'MI',
        color: '#facc15',
      },
    ],
  },
];

@Component({
  selector: 'view-order-list',
  standalone: true,
  imports: [
    CommonModule,
    MagaryOrderList,
    MagaryKanban,
    MagaryCard,
    Highlight,
    MagaryTabs,
    MagaryTab,
  ],
  templateUrl: './view-order-list.html',
  styleUrl: './view-order-list.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewOrderList {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  products = signal<Product[]>([
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1001',
      code: 'nvklal433',
      name: 'Black Watch',
      description: 'Product Description',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      quantity: 61,
      inventoryStatus: 'INSTOCK',
      rating: 4,
    },
    {
      id: '1002',
      code: 'zz21cz3c1',
      name: 'Blue Band',
      description: 'Product Description',
      image: 'blue-band.jpg',
      price: 79,
      category: 'Fitness',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 3,
    },
  ]);

  inputsConfig: OrderListInputRow[] = [
    {
      name: 'value',
      type: 'unknown[]',
      default: '[]',
      descriptionKey: 'components.data.orderList.apiInputs.value.desc',
    },
    {
      name: 'selection',
      type: 'unknown[]',
      default: '[]',
      descriptionKey: 'components.data.orderList.apiInputs.selection.desc',
    },
    {
      name: 'header',
      type: 'string',
      default: 'null',
      descriptionKey: 'components.data.orderList.apiInputs.header.desc',
    },
    {
      name: 'listStyle',
      type: 'object',
      default: 'null',
      descriptionKey: 'components.data.orderList.apiInputs.listStyle.desc',
    },
    {
      name: 'dragDrop',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.data.orderList.apiInputs.dragDrop.desc',
    },
  ];

  outputsConfig: OrderListOutputRow[] = [
    {
      name: 'onReorder',
      type: 'EventEmitter',
      descriptionKey: 'components.data.orderList.apiOutputs.onReorder.desc',
    },
    {
      name: 'onSelectionChange',
      type: 'EventEmitter',
      descriptionKey:
        'components.data.orderList.apiOutputs.onSelectionChange.desc',
    },
  ];
  readonly kanbanColumns = signal<ComparisonColumn[]>(
    this.createComparisonColumns(),
  );

  exampleTS = `
import { Component, signal } from '@angular/core';
import { MagaryOrderList } from 'ng-magary';

interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: string;
    rating: number;
}

@Component({
    selector: 'view-order-list',
    standalone: true,
    imports: [ MagaryOrderList ],
    templateUrl: './view-order-list.html'
})
export class ViewOrderList {
    products = signal<Product[]>([
        {
            id: '1000',
            code: 'f230fh0g3',
            name: 'Bamboo Watch',
            description: 'Product Description',
            image: 'bamboo-watch.jpg',
            price: 65,
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
        {
            id: '1001',
            code: 'nvklal433',
            name: 'Black Watch',
            description: 'Product Description',
            image: 'black-watch.jpg',
            price: 72,
            category: 'Accessories',
            quantity: 61,
            inventoryStatus: 'INSTOCK',
            rating: 4
        }
    ]);
}`;

  exampleHTML = `
<magary-order-list 
    [value]="products()" 
    [dragDrop]="true"
    [showControls]="true"
    header="Products" 
    [listStyle]="{'height':'20rem'}">
    <ng-template #itemTemplate let-product>
        <div class="product-item">
            <span class="font-bold">{{product.name}}</span>
            <span class="text-sm text-secondary">{{product.category}}</span>
            <span class="font-bold">\${{product.price}}</span>
        </div>
    </ng-template>
</magary-order-list>
  `;

  kanbanExampleTS = `
import { Component, signal } from '@angular/core';
import { MagaryKanban, MagaryKanbanColumn } from 'ng-magary';

type UserCard = { id: string; name: string; initials: string; role: string; color: string; };

@Component({
  selector: 'app-kanban-demo',
  standalone: true,
  imports: [MagaryKanban],
  templateUrl: './board.html',
})
export class KanbanExampleComponent {
  columns = signal<MagaryKanbanColumn<UserCard>[]>([
    {
      id: 'confluence',
      title: 'Confluence',
      items: [
        { id: '1', name: 'Alvin', initials: 'AV', role: 'Principal Engineer', color: '#3b82f6' },
      ],
    }
  ]);
}`;

  kanbanExampleHTML = `
<!-- Utiliza estilos magary-card y magary-kanban para recrear un tablero responsivo -->
<magary-kanban 
  [columns]="columns()"
  (onColumnsChange)="columns.set($any($event))"
  [listStyle]="{'height':'22rem'}"
>
  <!-- Cabecera de Columna Personalizada -->
  <ng-template #kanbanColumnHeaderTemplate let-column>
    <div style="display: flex; justify-content: space-between;">
      <h4 style="margin: 0;">{{ column.title }}</h4>
      <span style="border-radius: 1rem; padding: 0.1rem 0.5rem; background: var(--surface-200);">
        {{ column.items.length }}
      </span>
    </div>
  </ng-template>

  <!-- Tarjeta del Kanban Personalizada -->
  <ng-template #kanbanItemTemplate let-card>
    <div style="display: flex; align-items: center; gap: 0.75rem;">
      <span 
        style="width: 2rem; height: 2rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;"
        [style.background-color]="card.color"
      >
        {{ card.initials }}
      </span>
      <div style="display: flex; flex-direction: column;">
        <span style="font-weight: 600;">{{ card.name }}</span>
        <span style="font-size: 0.8rem; color: var(--text-secondary);">{{ card.role }}</span>
      </div>
    </div>
  </ng-template>
</magary-kanban>
  `;

  exampleNoControlsTS = `
import { Component, signal } from '@angular/core';
import { MagaryOrderList } from 'ng-magary';

@Component({
    selector: 'view-order-list-no-controls',
    standalone: true,
    imports: [ MagaryOrderList ],
    template: '...'
})
export class ViewOrderListNoControls {
    items = signal([{name: 'Bamboo Watch'}, {name: 'Black Watch'}]);
}`;

  exampleNoControlsHTML = `
<!-- Deshabilita [showControls] para no renderizar las flechas -->
<magary-order-list 
    [(value)]="items" 
    [showControls]="false" 
    header="Compact List" 
    [dragDrop]="true" 
    [listStyle]="{'height':'15rem'}">
    
    <ng-template #itemTemplate let-item>
        <span class="font-bold">{{item.name}}</span>
    </ng-template>
</magary-order-list>
  `;


  importCode = `import { MagaryOrderList, MagaryKanban } from 'ng-magary';`;

  private createComparisonColumns(): ComparisonColumn[] {
    return COMPARISON_BOARD_TEMPLATE.map((column) => ({
      ...column,
      items: column.items.map((card) => ({ ...card })),
    }));
  }
}
