import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  GalleriaItem,
  GalleriaResponsiveOptions,
  MagaryGalleria,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { MagaryTabs, MagaryTab } from 'ng-magary';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type GalleriaInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'app-view-galleria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MagaryGalleria,
    Highlight,
    MagaryTabs,
    MagaryTab,
  ],
  templateUrl: './view-galleria.html',
  styleUrl: './view-galleria.scss',
})
export class ViewGalleria implements OnInit {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  images: GalleriaItem[] = [];

  responsiveOptions: GalleriaResponsiveOptions[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  ngOnInit() {
    this.images = [
      {
        src:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
        thumbnail:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        src:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
        thumbnail:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
        alt: 'Description for Image 2',
        title: 'Title 2',
      },
      {
        src:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
        thumbnail:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
        alt: 'Description for Image 3',
        title: 'Title 3',
      },
      {
        src:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
        thumbnail:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg',
        alt: 'Description for Image 4',
        title: 'Title 4',
      },
      {
        src:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg',
        thumbnail:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria5s.jpg',
        alt: 'Description for Image 5',
        title: 'Title 5',
      },
    ];
  }

  codeHTMLBasic = `<magary-galleria 
    [value]="images" 
    [showThumbnails]="true" 
    [showIndicators]="false"
    [width]="'640px'">
</magary-galleria>`;

  codeTSBasic = `import { Component } from '@angular/core';
import { MagaryGalleria } from 'ng-magary';

@Component({
    imports: [MagaryGalleria],
    templateUrl: './view-galleria.html'
})
export class ViewGalleria {
    images: GalleriaItem[] = [...];
}`;

  codeHTMLLeft = `<magary-galleria 
    [value]="images" 
    [showThumbnails]="true" 
    [thumbnailsPosition]="'left'" 
    [width]="'700px'">
</magary-galleria>`;

  codeTSLeft = `// Same TS logic, just different HTML config`;

  codeHTMLIndicators = `<magary-galleria 
    [value]="images" 
    [showThumbnails]="false" 
    [showIndicators]="true" 
    [width]="'640px'">
</magary-galleria>`;

  codeTSIndicators = `// Same TS logic`;

  codeHTMLAutoPlay = `<magary-galleria 
    [value]="images" 
    [showThumbnails]="true" 
    [circular]="true" 
    [autoPlay]="true" 
    [transitionInterval]="2000" 
    [width]="'640px'">
</magary-galleria>`;

  codeTSAutoPlay = `// Same TS logic`;

  readonly importExample = `import { MagaryGalleria } from 'ng-magary';`;

  readonly inputRows: GalleriaInputRow[] = [
    {
      name: 'value',
      type: 'unknown[]',
      default: '[]',
      descriptionKey: 'components.media.galleria.apiInputs.value.desc',
    },
    {
      name: 'showThumbnails',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.media.galleria.apiInputs.showThumbnails.desc',
    },
    {
      name: 'showIndicators',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.media.galleria.apiInputs.showIndicators.desc',
    },
    {
      name: 'autoPlay',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.media.galleria.apiInputs.autoPlay.desc',
    },
    {
      name: 'itemTemplateRef',
      type: 'TemplateRef',
      default: 'null',
      descriptionKey: 'components.media.galleria.apiInputs.itemTemplateRef.desc',
    },
    {
      name: 'thumbnailTemplateRef',
      type: 'TemplateRef',
      default: 'null',
      descriptionKey:
        'components.media.galleria.apiInputs.thumbnailTemplateRef.desc',
    },
    {
      name: 'width',
      type: 'string',
      default: '100%',
      descriptionKey: 'components.media.galleria.apiInputs.width.desc',
    },
  ];
}
