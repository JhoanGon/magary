import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryImage, MagaryCard, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

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

type ImageInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type ImageOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
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
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  readonly importExample = CODE_EXAMPLES.import;
  readonly exampleBasic = CODE_EXAMPLES.basic;
  readonly examplePreview = CODE_EXAMPLES.preview;
  readonly exampleSizes = CODE_EXAMPLES.sizes;
  readonly exampleEvents = CODE_EXAMPLES.events;

  readonly inputRows: ImageInputRow[] = [
    {
      name: 'src',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.media.image.apiInputs.src.desc',
    },
    {
      name: 'alt',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.media.image.apiInputs.alt.desc',
    },
    {
      name: 'width',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.media.image.apiInputs.width.desc',
    },
    {
      name: 'height',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.media.image.apiInputs.height.desc',
    },
    {
      name: 'preview',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.media.image.apiInputs.preview.desc',
    },
  ];

  readonly outputRows: ImageOutputRow[] = [
    {
      name: 'onLoad',
      type: 'EventEmitter<Event>',
      descriptionKey: 'components.media.image.apiOutputs.onLoad.desc',
    },
    {
      name: 'onError',
      type: 'EventEmitter<Event>',
      descriptionKey: 'components.media.image.apiOutputs.onError.desc',
    },
  ];

  handleLoad(event: Event) {}

  handleError(event: Event) {}
}
