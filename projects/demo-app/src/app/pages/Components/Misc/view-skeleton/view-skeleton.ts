import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagarySkeleton } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

const CODE_EXAMPLES = {
  import: `import { MagarySkeleton } from 'ng-magary';`,
  basic: `<magary-skeleton width="10rem" height="2rem"></magary-skeleton>
<magary-skeleton width="5rem" height="1rem"></magary-skeleton>`,
  shapes: `<magary-skeleton shape="circle" size="4rem"></magary-skeleton>
<magary-skeleton shape="rectangle" width="100%" height="150px"></magary-skeleton>`,
  animation: `<magary-skeleton animation="none" width="100%" height="2rem"></magary-skeleton>
<magary-skeleton animation="shimmer" width="100%" height="2rem"></magary-skeleton>`,
  card: `<div class="custom-skeleton-card">
    <div class="flex mb-3">
        <magary-skeleton shape="circle" size="4rem" class="mr-2"></magary-skeleton>
        <div>
            <magary-skeleton width="10rem" class="mb-2"></magary-skeleton>
            <magary-skeleton width="5rem" height=".5rem"></magary-skeleton>
        </div>
    </div>
    <magary-skeleton width="100%" height="150px"></magary-skeleton>
</div>`,
};

type SkeletonApiRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'magary-view-skeleton',
  standalone: true,
  imports: [CommonModule, MagarySkeleton, Highlight],
  templateUrl: './view-skeleton.html',
  styleUrls: ['./view-skeleton.scss'],
})
export class ViewSkeleton {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  readonly importExample = CODE_EXAMPLES.import;
  readonly basicExample = CODE_EXAMPLES.basic;
  readonly shapesExample = CODE_EXAMPLES.shapes;
  readonly animationExample = CODE_EXAMPLES.animation;
  readonly cardExample = CODE_EXAMPLES.card;

  readonly apiRows: SkeletonApiRow[] = [
    {
      name: 'shape',
      type: 'string',
      default: 'rectangle',
      descriptionKey: 'components.misc.skeleton.api.shape.desc',
    },
    {
      name: 'size',
      type: 'string',
      default: 'null',
      descriptionKey: 'components.misc.skeleton.api.size.desc',
    },
    {
      name: 'width',
      type: 'string',
      default: '100%',
      descriptionKey: 'components.misc.skeleton.api.width.desc',
    },
    {
      name: 'height',
      type: 'string',
      default: '1rem',
      descriptionKey: 'components.misc.skeleton.api.height.desc',
    },
    {
      name: 'borderRadius',
      type: 'string',
      default: 'null',
      descriptionKey: 'components.misc.skeleton.api.borderRadius.desc',
    },
    {
      name: 'animation',
      type: 'string',
      default: 'shimmer',
      descriptionKey: 'components.misc.skeleton.api.animation.desc',
    },
  ];
}
