import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryImage, MagaryCard, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

const CODE_EXAMPLES = {
  import: `import { MagaryImage } from 'ng-magary';`,
  basic: `<magary-image 
  src="https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg" 
  alt="Basic Image" 
  width="250">
</magary-image>`,
  preview: `<magary-image 
  src="https://primefaces.org/cdn/primeng/images/galleria/galleria12.jpg" 
  alt="Preview Image" 
  width="250" 
  [preview]="true">
</magary-image>`,
  sizes: `<magary-image src="..." alt="Small" width="100"></magary-image>
<magary-image src="..." alt="Medium" width="200"></magary-image>
<magary-image src="..." alt="Large" width="300"></magary-image>`,
  events: `<magary-image 
  src="..." 
  (onLoad)="handleLoad($event)" 
  (onError)="handleError($event)">
</magary-image>`,
};

@Component({
  selector: 'view-image',
  standalone: true,
  imports: [
    CommonModule,
    MagaryImage,
    MagaryCard,
    Highlight,
    MagaryTabs,
    MagaryTab,
  ],
  templateUrl: './view-image.html',
  styleUrl: './view-image.scss',
})
export class ViewImage {
  readonly importExample = CODE_EXAMPLES.import;
  readonly exampleBasic = CODE_EXAMPLES.basic;
  readonly examplePreview = CODE_EXAMPLES.preview;
  readonly exampleSizes = CODE_EXAMPLES.sizes;
  readonly exampleEvents = CODE_EXAMPLES.events;

  handleLoad(event: Event) {}

  handleError(event: Event) {}
}
