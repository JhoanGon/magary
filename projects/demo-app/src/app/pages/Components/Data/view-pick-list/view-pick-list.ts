import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryPickList } from 'ng-magary';
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

type PickListInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type PickListOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'view-pick-list',
  standalone: true,
  imports: [
    CommonModule,
    MagaryPickList,
    MagaryCard,
    Highlight,
    MagaryTabs,
    MagaryTab,
  ],
  templateUrl: './view-pick-list.html',
  styleUrl: './view-pick-list.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewPickList {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  sourceProducts = signal<Product[]>([
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
    {
      id: '1003',
      code: '244wgerg2',
      name: 'Blue T-Shirt',
      description: 'Product Description',
      image: 'blue-t-shirt.jpg',
      price: 29,
      category: 'Clothing',
      quantity: 25,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1004',
      code: 'h456wer53',
      name: 'Bracelet',
      description: 'Product Description',
      image: 'bracelet.jpg',
      price: 15,
      category: 'Accessories',
      quantity: 73,
      inventoryStatus: 'INSTOCK',
      rating: 4,
    },
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
    {
      id: '1003',
      code: '244wgerg2',
      name: 'Blue T-Shirt',
      description: 'Product Description',
      image: 'blue-t-shirt.jpg',
      price: 29,
      category: 'Clothing',
      quantity: 25,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1004',
      code: 'h456wer53',
      name: 'Bracelet',
      description: 'Product Description',
      image: 'bracelet.jpg',
      price: 15,
      category: 'Accessories',
      quantity: 73,
      inventoryStatus: 'INSTOCK',
      rating: 4,
    },
    {
      id: '1005',
      code: 'av2231fwg',
      name: 'Brown Purse',
      description: 'Product Description',
      image: 'brown-purse.jpg',
      price: 120,
      category: 'Accessories',
      quantity: 0,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4,
    },
  ]);

  targetProducts = signal<Product[]>([]);

  // Array for Example 2: No Drag Drop
  sourceProducts2 = signal<Product[]>([...this.sourceProducts()]);
  targetProducts2 = signal<Product[]>([]);

  // Array for Example 3: Only Drag Drop (No Transfer Buttons)
  sourceProducts3 = signal<Product[]>([...this.sourceProducts()]);
  targetProducts3 = signal<Product[]>([]);

  // Config Documentation
  inputsConfig: PickListInputRow[] = [
    {
      name: 'source',
      type: 'unknown[]',
      default: '[]',
      descriptionKey: 'components.data.pickList.apiInputs.source.desc',
    },
    {
      name: 'target',
      type: 'unknown[]',
      default: '[]',
      descriptionKey: 'components.data.pickList.apiInputs.target.desc',
    },
    {
      name: 'sourceHeader',
      type: 'string',
      default: 'Source',
      descriptionKey: 'components.data.pickList.apiInputs.sourceHeader.desc',
    },
    {
      name: 'targetHeader',
      type: 'string',
      default: 'Target',
      descriptionKey: 'components.data.pickList.apiInputs.targetHeader.desc',
    },
    {
      name: 'dragDrop',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.data.pickList.apiInputs.dragDrop.desc',
    },
    {
      name: 'showSourceControls',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.data.pickList.apiInputs.showSourceControls.desc',
    },
    {
      name: 'showTargetControls',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.data.pickList.apiInputs.showTargetControls.desc',
    },
    {
      name: 'sourceStyle',
      type: 'object',
      default: 'null',
      descriptionKey: 'components.data.pickList.apiInputs.sourceStyle.desc',
    },
    {
      name: 'targetStyle',
      type: 'object',
      default: 'null',
      descriptionKey: 'components.data.pickList.apiInputs.targetStyle.desc',
    },
  ];

  outputsConfig: PickListOutputRow[] = [
    {
      name: 'onMoveToTarget',
      type: 'EventEmitter',
      descriptionKey: 'components.data.pickList.apiOutputs.onMoveToTarget.desc',
    },
    {
      name: 'onMoveToSource',
      type: 'EventEmitter',
      descriptionKey: 'components.data.pickList.apiOutputs.onMoveToSource.desc',
    },
    {
      name: 'onMoveAllToTarget',
      type: 'EventEmitter',
      descriptionKey:
        'components.data.pickList.apiOutputs.onMoveAllToTarget.desc',
    },
    {
      name: 'onMoveAllToSource',
      type: 'EventEmitter',
      descriptionKey:
        'components.data.pickList.apiOutputs.onMoveAllToSource.desc',
    },
  ];

  // Example 1: Basic View (Buttons + Drag & Drop)
  exampleTS = `
import { Component, signal } from '@angular/core';
import { MagaryPickList } from 'ng-magary';

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
}

@Component({
    selector: 'view-pick-list',
    standalone: true,
    imports: [ MagaryPickList ],
    templateUrl: './view-pick-list.html'
})
export class ViewPickList {
    sourceList = signal<Product[]>([
        { id: '1000', name: 'Bamboo Watch', category: 'Accessories', price: 65 },
        { id: '1001', name: 'Black Watch', category: 'Accessories', price: 72 }
    ]);
    targetList = signal<Product[]>([]);
}`;

  exampleHTML = `
<magary-pick-list
    [(source)]="sourceList"
    [(target)]="targetList"
    [dragDrop]="true"
    [sourceStyle]="{'height':'20rem'}"
    [targetStyle]="{'height':'20rem'}">
    <ng-template #itemTemplate let-product>
        <div class="product-item">
            <span class="font-bold">{{product.name}}</span>
            <span class="text-sm text-secondary">{{product.category}}</span>
            <span class="font-bold">\${{product.price}}</span>
        </div>
    </ng-template>
</magary-pick-list>
`;

  // Example 2: Non-Draggable (Classic Buttons Only)
  exampleButtonsOnlyTS = `
import { Component, signal } from '@angular/core';
import { MagaryPickList } from 'ng-magary';

interface Product {
    id: string;
    name: string;
}

@Component({
    selector: 'view-pick-list',
    standalone: true,
    imports: [ MagaryPickList ],
    templateUrl: './view-pick-list.html'
})
export class ViewPickList {
    sourceList = signal<Product[]>([
        { id: '1002', name: 'Blue Band' },
        { id: '1003', name: 'Blue T-Shirt' }
    ]);
    targetList = signal<Product[]>([]);
}`;

  exampleButtonsOnlyHTML = `
<magary-pick-list
    [(source)]="sourceList"
    [(target)]="targetList"
    [dragDrop]="false"
    sourceHeader="Available"
    targetHeader="Selected"
    [sourceStyle]="{'height':'15rem'}"
    [targetStyle]="{'height':'15rem'}">
    <ng-template #itemTemplate let-product>
        <div class="product-item">
            <span class="font-bold">{{product.name}}</span>
        </div>
    </ng-template>
</magary-pick-list>
`;

  // Example 3: Pure Drag & Drop (No Controls)
  exampleNoControlsTS = `
import { Component, signal } from '@angular/core';
import { MagaryPickList } from 'ng-magary';

interface Product {
    id: string;
    name: string;
}

@Component({
    selector: 'view-pick-list',
    standalone: true,
    imports: [ MagaryPickList ],
    templateUrl: './view-pick-list.html'
})
export class ViewPickList {
    sourceList = signal<Product[]>([
        { id: '1004', name: 'Bracelet' },
        { id: '1005', name: 'Brown Purse' }
    ]);
    targetList = signal<Product[]>([]);
}`;

  exampleNoControlsHTML = `
<magary-pick-list
    [(source)]="sourceList"
    [(target)]="targetList"
    [dragDrop]="true"
    [showSourceControls]="false"
    [showTargetControls]="false"
    sourceHeader="Available"
    targetHeader="Selected"
    [sourceStyle]="{'height':'15rem'}"
    [targetStyle]="{'height':'15rem'}">
    <ng-template #itemTemplate let-product>
        <div class="product-item">
            <span class="font-bold">{{product.name}}</span>
        </div>
    </ng-template>
</magary-pick-list>
`;

  importCode = `import { MagaryPickList } from 'ng-magary';`;
}
