import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MagaryGalleria } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { MagaryTabs, MagaryTab } from 'ng-magary';

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
  images: any[] = [];

  responsiveOptions: any[] = [
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
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
        alt: 'Description for Image 2',
        title: 'Title 2',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
        alt: 'Description for Image 3',
        title: 'Title 3',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg',
        alt: 'Description for Image 4',
        title: 'Title 4',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg',
        thumbnailImageSrc:
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
    images: any[] = [...];
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
}
