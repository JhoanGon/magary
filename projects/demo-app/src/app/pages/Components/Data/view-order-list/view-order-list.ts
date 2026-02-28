import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryOrderList } from 'ng-magary';
import { MagaryCard } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { MagaryTabs, MagaryTab } from 'ng-magary';
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

@Component({
  selector: 'view-order-list',
  standalone: true,
  imports: [
    CommonModule,
    MagaryOrderList,
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

  importCode = `import { MagaryOrderList } from 'ng-magary';`;
}
