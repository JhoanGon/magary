import {
  Component,
  OnInit,
  NgModule,
  computed,
  inject,
  signal,
} from '@angular/core';
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
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';
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

type CarouselInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type CarouselOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

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
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

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

  codeHTMLHero = `<magary-carousel
  [ariaLabel]="'Hero featured products carousel'"
  [value]="products"
  [numVisible]="1"
  [numScroll]="1"
  [circular]="true"
  [autoplayInterval]="4000"
  [showProgress]="true"
  [progressStyle]="'bar'"
  [indicatorStyle]="'dots'"
  [indicatorPosition]="'inside'"
  [showNavigators]="true"
>
  <ng-template #item let-product>
    <div class="hero-slide">
      <div class="hero-slide-image">
        <img [src]="product.image" [alt]="product.name" />
      </div>
      <div class="hero-slide-content">
        <span class="hero-category">{{ product.category }}</span>
        <h2 class="hero-title">{{ product.name }}</h2>
        <p class="hero-price">\${{ product.price }}</p>
      </div>
    </div>
  </ng-template>
</magary-carousel>`;

  codeTSHero = `products: CarouselProduct[] = [];

ngOnInit() {
  this.products = fetchProducts();
}`;

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

  codeHTMLIndicators = `<magary-carousel
  [ariaLabel]="'Navigation and indicators carousel'"
  [value]="products"
  [numVisible]="3"
  [numScroll]="3"
  [circular]="false"
  [responsiveOptions]="responsiveOptions"
  [indicatorStyle]="currentIndicatorStyle()"
  [navPosition]="currentNavPosition()"
  [spaceBetween]="24"
  [showNavigators]="true"
  [showIndicators]="true"
>
  <ng-template #item let-product>
    <magary-card [img]="product.image" [altText]="product.name" [width]="'100%'">
      <div class="absolute top-0 left-0 m-3 z-1">
        <magary-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></magary-tag>
      </div>
      <div slot="header">
        <h4 class="m-0 text-base font-semibold">{{ product.name }}</h4>
      </div>
    </magary-card>
  </ng-template>
</magary-carousel>`;

  codeTSIndicators = `indicatorStyles: CarouselIndicatorStyle[] = ['dots', 'lines', 'fraction', 'progress', 'thumbnails'];
currentIndicatorStyle = signal<CarouselIndicatorStyle>('dots');

navPositions: CarouselNavPosition[] = ['default', 'outside'];
currentNavPosition = signal<CarouselNavPosition>('outside');`;

  readonly inputRows: CarouselInputRow[] = [
    {
      name: 'value',
      type: 'unknown[]',
      default: '[]',
      descriptionKey: 'components.media.carousel.apiInputs.value.desc',
    },
    {
      name: 'numVisible',
      type: 'number',
      default: '1',
      descriptionKey: 'components.media.carousel.apiInputs.numVisible.desc',
    },
    {
      name: 'numScroll',
      type: 'number',
      default: '1',
      descriptionKey: 'components.media.carousel.apiInputs.numScroll.desc',
    },
    {
      name: 'circular',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.media.carousel.apiInputs.circular.desc',
    },
    {
      name: 'responsiveOptions',
      type: 'CarouselResponsiveOptions[]',
      default: '[]',
      descriptionKey:
        'components.media.carousel.apiInputs.responsiveOptions.desc',
    },
    {
      name: 'indicatorStyle',
      type: 'CarouselIndicatorStyle',
      default: "'dots'",
      descriptionKey: 'components.media.carousel.apiInputs.indicatorStyle.desc',
    },
    {
      name: 'navPosition',
      type: 'CarouselNavPosition',
      default: "'default'",
      descriptionKey: 'components.media.carousel.apiInputs.navPosition.desc',
    },
    {
      name: 'autoplayInterval',
      type: 'number',
      default: '0',
      descriptionKey:
        'components.media.carousel.apiInputs.autoplayInterval.desc',
    },
    {
      name: 'showNavigators',
      type: 'boolean',
      default: 'true',
      descriptionKey:
        'components.media.carousel.apiInputs.showNavigators.desc',
    },
    {
      name: 'showIndicators',
      type: 'boolean',
      default: 'true',
      descriptionKey:
        'components.media.carousel.apiInputs.showIndicators.desc',
    },
    {
      name: 'effect',
      type: 'CarouselEffect',
      default: "'slide'",
      descriptionKey: 'components.media.carousel.apiInputs.effect.desc',
    },
    {
      name: 'transitionDuration',
      type: 'number',
      default: '300',
      descriptionKey:
        'components.media.carousel.apiInputs.transitionDuration.desc',
    },
  ];

  readonly outputRows: CarouselOutputRow[] = [
    {
      name: 'pageChange',
      type: 'number',
      descriptionKey: 'components.media.carousel.apiOutputs.pageChange.desc',
    },
    {
      name: 'slideChange',
      type: 'CarouselSlideEvent<T>',
      descriptionKey: 'components.media.carousel.apiOutputs.slideChange.desc',
    },
    {
      name: 'slideChanged',
      type: 'CarouselSlideEvent<T>',
      descriptionKey: 'components.media.carousel.apiOutputs.slideChanged.desc',
    },
    {
      name: 'itemClick',
      type: '{ item: T; index: number }',
      descriptionKey: 'components.media.carousel.apiOutputs.itemClick.desc',
    },
    {
      name: 'autoplayStart',
      type: 'void',
      descriptionKey: 'components.media.carousel.apiOutputs.autoplayStart.desc',
    },
    {
      name: 'autoplayStop',
      type: 'void',
      descriptionKey: 'components.media.carousel.apiOutputs.autoplayStop.desc',
    },
  ];

  getIndicatorStyleLabel(style: CarouselIndicatorStyle): string {
    return this.t(`components.media.carousel.indicatorStyle.${style}` as DocsTextKey);
  }

  getNavPositionLabel(position: CarouselNavPosition): string {
    return this.t(`components.media.carousel.navPosition.${position}` as DocsTextKey);
  }
}
