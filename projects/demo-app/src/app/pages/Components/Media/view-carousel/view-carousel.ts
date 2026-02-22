import { Component, OnInit, NgModule, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MagaryCarouselComponent,
  MagaryButton,
  MagaryTabs,
  MagaryTab,
  CarouselResponsiveOptions,
  CarouselEffect,
  CarouselIndicatorStyle,
  CarouselNavPosition,
  MagaryCard,
  MagaryTag,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import {
  LucideAngularModule,
  Search,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Plus,
} from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({
      Search,
      Star,
      ShoppingCart,
      Heart,
      Share2,
      Plus,
    }),
  ],
  exports: [LucideAngularModule],
})
export class CarouselDemoIconsModule {}

type InventoryStatus = 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';

interface CarouselProduct {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: InventoryStatus;
  rating: number;
}

@Component({
  selector: 'app-view-carousel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MagaryCarouselComponent,
    MagaryButton,
    Highlight,
    MagaryTabs,
    MagaryTab,
    MagaryCard,
    MagaryTag,
    CarouselDemoIconsModule,
  ],
  templateUrl: './view-carousel.html',
  styleUrl: './view-carousel.scss',
})
export class ViewCarousel implements OnInit {
  products: CarouselProduct[] = [];
  responsiveOptions: CarouselResponsiveOptions[] = [];
  verticalResponsiveOptions: CarouselResponsiveOptions[] = [];

  // Effects Demo
  effects: CarouselEffect[] = [
    'slide',
    'fade',
    'cube',
    'flip',
    'coverflow',
    'cards',
  ];
  currentEffect = signal<CarouselEffect>('coverflow');
  isStackedEffect = computed(() => {
    const effect = this.currentEffect();
    return (
      effect === 'fade' ||
      effect === 'cube' ||
      effect === 'flip' ||
      effect === 'cards'
    );
  });

  // Indicators Demo
  indicatorStyles: CarouselIndicatorStyle[] = [
    'dots',
    'lines',
    'fraction',
    'progress',
    'thumbnails',
  ];
  currentIndicatorStyle = signal<CarouselIndicatorStyle>('dots');

  // Navigation Demo Remove top, bottom
  navPositions: CarouselNavPosition[] = ['default', 'outside'];
  currentNavPosition = signal<CarouselNavPosition>('outside');

  constructor() {}

  ngOnInit() {
    this.products = [
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
        name: 'Gaming Set',
        description: 'Product Description',
        image:
          'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg',
        price: 99,
        category: 'Electronics',
        quantity: 63,
        inventoryStatus: 'INSTOCK',
        rating: 4,
      },
      {
        id: '1007',
        code: 'mbvjkgip5',
        name: 'Gold Phone Case',
        description: 'Product Description',
        image:
          'https://primefaces.org/cdn/primeng/images/demo/product/gold-phone-case.jpg',
        price: 24,
        category: 'Accessories',
        quantity: 0,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 3,
      },
      {
        id: '1008',
        code: 'vbb124btr',
        name: 'Green Earbuds',
        description: 'Product Description',
        image:
          'https://primefaces.org/cdn/primeng/images/demo/product/green-earbuds.jpg',
        price: 89,
        category: 'Electronics',
        quantity: 23,
        inventoryStatus: 'INSTOCK',
        rating: 4,
      },
      {
        id: '1009',
        code: 'cm230f032',
        name: 'Green T-Shirt',
        description: 'Product Description',
        image:
          'https://primefaces.org/cdn/primeng/images/demo/product/green-t-shirt.jpg',
        price: 49,
        category: 'Clothing',
        quantity: 74,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.verticalResponsiveOptions = [
      {
        breakpoint: '991px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getSeverity(status: CarouselProduct['inventoryStatus']) {
    switch (status) {
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

  codeHTMLBasic = `<magary-carousel [value]="products" [numVisible]="3" [numScroll]="3" [circular]="false" [spaceBetween]="24" [responsiveOptions]="responsiveOptions">
    <ng-template let-product>
        <magary-card
            [img]="product.image"
            [altText]="product.name"
            [width]="'100%'"
        >
            <div class="absolute top-0 left-0 m-3 z-1">
                <magary-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></magary-tag>
            </div>
            <div slot="header">
                <h4 class="m-0 text-xl font-bold">{{ product.name }}</h4>
            </div>
            <div class="flex justify-content-between align-items-center mt-3">
                <span class="text-xl font-bold">\${{ product.price }}</span>
                <div class="flex gap-2">
                    <magary-button icon="heart" severity="secondary" [rounded]="true" [text]="true"></magary-button>
                    <magary-button icon="shopping-cart" [rounded]="true"></magary-button>
                </div>
            </div>
        </magary-card>
    </ng-template>
</magary-carousel>`;

  codeTSBasic = `
  products: Product[];
  responsiveOptions: CarouselResponsiveOptions[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductsSmall().then((products) => {
        this.products = products;
    });

    this.responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return '#22c55e';
      case 'LOWSTOCK':
        return '#f59e0b';
      case 'OUTOFSTOCK':
        return '#ef4444';
      default:
        return '#3b82f6';
    }
  }`;

  codeHTMLCircular = `<magary-carousel
  [value]="products"
  [numVisible]="3"
  [numScroll]="1"
  [circular]="true"
  [autoplayInterval]="3000"
  [spaceBetween]="24"
  [responsiveOptions]="responsiveOptions"
>
  <ng-template #item let-product>
    <magary-card [img]="product.image" [altText]="product.name" [width]="'100%'">
      <div class="absolute top-0 left-0 m-3 z-1">
        <magary-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></magary-tag>
      </div>
      <div slot="header">
        <h4 class="m-0 text-lg font-bold">{{ product.name }}</h4>
      </div>
      <div class="mt-2">
        <span class="text-lg font-semibold">\${{ product.price }}</span>
      </div>
    </magary-card>
  </ng-template>
</magary-carousel>`;

  codeTSCircular = `responsiveOptions = [
  { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
  { breakpoint: '991px', numVisible: 2, numScroll: 1 },
  { breakpoint: '767px', numVisible: 1, numScroll: 1 },
];`;

  codeHTMLVertical = `<magary-carousel
  [value]="products"
  [orientation]="'vertical'"
  [verticalViewPortHeight]="'360px'"
  [numVisible]="1"
  [numScroll]="1"
  [spaceBetween]="24"
  [responsiveOptions]="verticalResponsiveOptions"
>
  <ng-template #item let-product>
    <magary-card [img]="product.image" [altText]="product.name" [width]="'100%'">
      <div class="absolute top-0 left-0 m-3 z-1">
        <magary-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></magary-tag>
      </div>
      <div slot="header">
        <h4 class="m-0 text-lg font-bold">{{ product.name }}</h4>
      </div>
      <div class="mt-2">
        <span class="text-lg font-semibold">\${{ product.price }}</span>
      </div>
    </magary-card>
  </ng-template>
</magary-carousel>`;

  codeTSVertical = `verticalResponsiveOptions = [
  { breakpoint: '991px', numVisible: 1, numScroll: 1 },
  { breakpoint: '767px', numVisible: 1, numScroll: 1 },
];`;

  codeHTMLEffects = `<magary-carousel
  [value]="products"
  [numVisible]="isStackedEffect() ? 1 : 3"
  [numScroll]="1"
  [circular]="true"
  [spaceBetween]="24"
  [transitionDuration]="500"
  [centerMode]="currentEffect() === 'coverflow'"
  [effect]="currentEffect()"
  [responsiveOptions]="isStackedEffect() ? [] : responsiveOptions"
>
  <ng-template #item let-product>
    <magary-card [img]="product.image" [altText]="product.name" [width]="'100%'" [shadow]="4">
      <div slot="header" class="text-center">
        <h4 class="m-0">{{ product.name }}</h4>
        <p class="text-sm text-500 m-0 mt-1">{{ product.category }}</p>
      </div>
    </magary-card>
  </ng-template>
</magary-carousel>`;

  codeTSEffects = `effects = ['slide', 'fade', 'cube', 'flip', 'coverflow', 'cards'];
currentEffect = signal<'slide' | 'fade' | 'cube' | 'flip' | 'coverflow' | 'cards'>('coverflow');

isStackedEffect = computed(() => {
  const effect = this.currentEffect();
  return effect === 'fade' || effect === 'cube' || effect === 'flip' || effect === 'cards';
});`;
}
