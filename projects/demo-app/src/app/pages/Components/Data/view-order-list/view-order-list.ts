import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryOrderList } from 'ng-magary';
import { MagaryCard } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { MagaryTabs, MagaryTab } from 'ng-magary';

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

  // Config Documentation
  inputsConfig = [
    {
      name: 'value',
      type: 'unknown[]',
      default: '[]',
      description: 'Array de elementos a ordenar.',
    },
    {
      name: 'selection',
      type: 'unknown[]',
      default: '[]',
      description: 'Elementos seleccionados.',
    },
    {
      name: 'header',
      type: 'string',
      default: 'null',
      description: 'Texto del encabezado.',
    },
    {
      name: 'listStyle',
      type: 'object',
      default: 'null',
      description: 'Estilo inline para la lista.',
    },
  ];

  outputsConfig = [
    {
      name: 'onReorder',
      type: 'EventEmitter',
      description: 'Callback al reordenar la lista.',
    },
    {
      name: 'onSelectionChange',
      type: 'EventEmitter',
      description: 'Callback al cambiar la selección.',
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
