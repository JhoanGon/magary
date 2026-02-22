import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MagaryDataView,
  MagaryButton,
  MagaryTag,
  MagaryRating,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

type ProductInventoryStatus = 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';

interface DataViewProduct {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: ProductInventoryStatus;
  rating: number;
}

@Component({
  selector: 'app-view-dataview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MagaryDataView,
    MagaryButton,
    MagaryTag,
    MagaryRating,
    Highlight,
    MagaryTabs,
    MagaryTab,
  ],
  templateUrl: './view-dataview.html',
  styleUrl: './view-dataview.scss',
})
export class ViewDataView {
  layout = signal<'list' | 'grid'>('grid');

  products: DataViewProduct[] = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image:
        'https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg',
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
      image:
        'https://primefaces.org/cdn/primeng/images/demo/product/black-watch.jpg',
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
      image:
        'https://primefaces.org/cdn/primeng/images/demo/product/blue-band.jpg',
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
      image:
        'https://primefaces.org/cdn/primeng/images/demo/product/blue-t-shirt.jpg',
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
      image:
        'https://primefaces.org/cdn/primeng/images/demo/product/bracelet.jpg',
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
      image:
        'https://primefaces.org/cdn/primeng/images/demo/product/brown-purse.jpg',
      price: 120,
      category: 'Accessories',
      quantity: 0,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4,
    },
    {
      id: '1006',
      code: 'bib36pfvm',
      name: 'Chakra Bracelet',
      description: 'Product Description',
      image:
        'https://primefaces.org/cdn/primeng/images/demo/product/chakra-bracelet.jpg',
      price: 32,
      category: 'Accessories',
      quantity: 5,
      inventoryStatus: 'LOWSTOCK',
      rating: 3,
    },
    {
      id: '1007',
      code: 'mbvjkgip5',
      name: 'Galaxy Earrings',
      description: 'Product Description',
      image:
        'https://primefaces.org/cdn/primeng/images/demo/product/galaxy-earrings.jpg',
      price: 34,
      category: 'Accessories',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1008',
      code: 'vbb124btr',
      name: 'Game Controller',
      description: 'Product Description',
      image:
        'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg',
      price: 99,
      category: 'Electronics',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 4,
    },
    {
      id: '1009',
      code: 'cm230f032',
      name: 'Gaming Set',
      description: 'Product Description',
      image:
        'https://primefaces.org/cdn/primeng/images/demo/product/gaming-set.jpg',
      price: 299,
      category: 'Electronics',
      quantity: 63,
      inventoryStatus: 'INSTOCK',
      rating: 3,
    },
  ];

  getSeverity(product: DataViewProduct) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }

  codeHTML = `<magary-dataview [value]="products" [layout]="layout()" [paginator]="true" [rows]="6">
    <ng-template #header>
        <div class="flex justify-content-end gap-2">
             <magary-button icon="list" (click)="layout.set('list')" [severity]="layout() === 'list' ? 'primary' : 'secondary'" [variant]="'text'"></magary-button>
             <magary-button icon="layout-grid" (click)="layout.set('grid')" [severity]="layout() === 'grid' ? 'primary' : 'secondary'" [variant]="'text'"></magary-button>
        </div>
    </ng-template>

    <ng-template #listItem let-product>
        <div class="col-12 p-4 border-bottom-1 surface-border">
            <div class="flex flex-column xl:flex-row xl:align-items-start gap-4">
                <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" [src]="product.image" [alt]="product.name" style="width: 150px;" />
                <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div class="text-2xl font-bold">{{ product.name }}</div>
                        <magary-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></magary-rating>
                        <div class="flex align-items-center gap-3">
                            <magary-tag [value]="product.inventoryStatus" [severity]="getSeverity(product)"></magary-tag>
                            <span class="font-semibold">{{ product.category }}</span>
                        </div>
                    </div>
                    <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span class="text-2xl font-semibold">\${{ product.price }}</span>
                        <magary-button icon="shopping-cart" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"></magary-button>
                    </div>
                </div>
            </div>
        </div>
    </ng-template>

    <ng-template #gridItem let-product>
        <div class="col-12 sm:col-6 lg:col-4 xl:col-4 p-2">
            <div class="p-4 border-1 surface-border surface-card border-round flex flex-column align-items-center gap-3">
                <div class="flex w-full justify-content-between align-items-center">
                    <magary-tag [value]="product.inventoryStatus" [severity]="getSeverity(product)"></magary-tag>
                    <span class="font-semibold">{{ product.category }}</span>
                </div>
                <div class="flex flex-column align-items-center gap-3 py-5">
                    <img class="w-9 shadow-2 border-round" [src]="product.image" [alt]="product.name" style="width: 150px;" />
                    <div class="text-2xl font-bold">{{ product.name }}</div>
                    <magary-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></magary-rating>
                </div>
                <div class="flex align-items-center justify-content-between w-full">
                    <span class="text-2xl font-semibold">\${{ product.price }}</span>
                    <magary-button icon="shopping-cart" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"></magary-button>
                </div>
            </div>
        </div>
    </ng-template>
</magary-dataview>`;

  codeTS = `import { Component, signal } from '@angular/core';
import { MagaryDataView, MagaryButton, MagaryTag, MagaryRating } from 'ng-magary';

@Component({
    selector: 'app-view-dataview',
    standalone: true,
    imports: [MagaryDataView, MagaryButton, MagaryTag, MagaryRating],
    templateUrl: './view-dataview.html'
})
export class ViewDataView {
    layout = signal<'list' | 'grid'>('grid');
    products = [...]; // Data array

    getSeverity(product: DataViewProduct) {
        switch (product.inventoryStatus) {
            case 'INSTOCK': return 'success';
            case 'LOWSTOCK': return 'warning';
            case 'OUTOFSTOCK': return 'danger';
            default: return 'info';
        }
    }
}`;
}
