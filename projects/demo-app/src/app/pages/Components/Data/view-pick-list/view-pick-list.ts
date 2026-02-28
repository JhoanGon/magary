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

  exampleTS = `
import { Component, signal } from '@angular/core';
import { MagaryPickList } from 'ng-magary';

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
    selector: 'view-pick-list',
    standalone: true,
    imports: [ MagaryPickList ],
    templateUrl: './view-pick-list.html'
})
export class ViewPickList {
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

    targetProducts = signal<Product[]>([]);
}`;

  exampleHTML = `
<magary-pick-list 
    [source]="sourceProducts()" 
    [target]="targetProducts()" 
    sourceHeader="Available" 
    targetHeader="Selected"
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

  importCode = `import { MagaryPickList } from 'ng-magary';`;
}
