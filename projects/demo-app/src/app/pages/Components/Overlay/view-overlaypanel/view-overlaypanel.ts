import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryButton,
  MagaryOverlayPanel,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

interface OverlayProduct {
  id: string;
  code: string;
  name: string;
  price: number;
  image: string;
}

type OverlayInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type OverlayEventState = 'none' | 'open' | 'closed';

@Component({
  selector: 'app-view-overlaypanel',
  standalone: true,
  imports: [
    CommonModule,
    MagaryButton,
    MagaryOverlayPanel,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-overlaypanel.html',
  styleUrl: './view-overlaypanel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewOverlayPanel {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  importRef = `import { MagaryOverlayPanel } from 'ng-magary';`;

  private overlayEventState: OverlayEventState = 'none';
  overlayEventSummary = '';

  readonly inputRows: OverlayInputRow[] = [
    {
      name: 'dismissable',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.overlay.overlayPanel.api.dismissable.desc',
    },
    {
      name: 'showCloseIcon',
      type: 'boolean',
      default: 'false',
      descriptionKey:
        'components.overlay.overlayPanel.api.showCloseIcon.desc',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      descriptionKey:
        'components.overlay.overlayPanel.api.closeOnEscape.desc',
    },
    {
      name: 'panelAriaLabel',
      type: 'string',
      default: "'Overlay panel'",
      descriptionKey:
        'components.overlay.overlayPanel.api.panelAriaLabel.desc',
    },
  ];

  products: OverlayProduct[] = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      price: 65,
      image: 'bamboo-watch.jpg',
    },
    {
      id: '1001',
      code: 'nvklal433',
      name: 'Black Watch',
      price: 72,
      image: 'black-watch.jpg',
    },
  ];

  selectedProduct: OverlayProduct | null = null;

  codeBasic = `<div style="display: flex; justify-content: center;">
    <magary-button
      (buttonClick)="op.toggle($event)"
      label="Show Overlay"
    ></magary-button>
</div>

<magary-overlaypanel
    #op
    panelAriaLabel="Quick information"
    [closeOnEscape]="true"
    (onShow)="onOverlayShow()"
    (onHide)="onOverlayHide()"
>
    <div style="width: 300px;">
        <h4>Custom Content</h4>
        <p>You can put custom content here.</p>
    </div>
</magary-overlaypanel>`;

  codeTable = `<div class="p-3 border-round surface-card">
    <table class="w-full" style="border-collapse: collapse;">
        <thead>
            <tr class="border-bottom-1 surface-border">
                <th class="p-2 text-left">Name</th>
                <th class="p-2 text-center">Image</th>
                <th class="p-2 text-right">Price</th>
            </tr>
        </thead>
        <tbody>
            @for (product of products; track product.id) {
                <tr class="border-bottom-1 surface-border">
                    <td class="p-2">{{product.name}}</td>
                    <td class="p-2 text-center">
                        <magary-button icon="image"
                                     variant="text"
                                     (buttonClick)="selectProduct($event, product, op2)">
                        </magary-button>
                    </td>
                    <td class="p-2 text-right">{{product.price}}</td>
                </tr>
            }
        </tbody>
    </table>
</div>

<magary-overlaypanel
    #op2
    [showCloseIcon]="true"
    panelAriaLabel="Product detail"
>
    @if (selectedProduct) {
        <div class="p-3 text-center">
            <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + selectedProduct.image"
                 [alt]="selectedProduct.name"
                 style="width: 100px; display: block; margin: 0 auto 1rem auto;">
            <span class="font-bold block mb-2">{{selectedProduct.name}}</span>
            <span class="text-secondary">{{selectedProduct.price}}</span>
        </div>
    }
</magary-overlaypanel>`;

  tsCode = `export class ViewOverlayPanel {
    selectedProduct: OverlayProduct | null = null;
    overlayEventSummary = 'No events for now.';

    selectProduct(event: Event, product: OverlayProduct, overlay: MagaryOverlayPanel) {
        this.selectedProduct = product;
        overlay.toggle(event);
    }

    onOverlayShow() {
        this.overlayEventSummary = 'Overlay opened';
    }

    onOverlayHide() {
        this.overlayEventSummary = 'Overlay closed';
    }
}`;

  constructor() {
    effect(() => {
      this.i18n.language();
      this.overlayEventSummary = this.resolveEventSummary();
    });
  }

  private resolveEventSummary(): string {
    if (this.overlayEventState === 'open') {
      return this.t('components.overlay.overlayPanel.event.open');
    }

    if (this.overlayEventState === 'closed') {
      return this.t('components.overlay.overlayPanel.event.closed');
    }

    return this.t('components.overlay.overlayPanel.event.none');
  }

  selectProduct(
    event: Event,
    product: OverlayProduct,
    overlay: MagaryOverlayPanel,
  ) {
    this.selectedProduct = product;
    overlay.toggle(event);
  }

  onOverlayShow() {
    this.overlayEventState = 'open';
    this.overlayEventSummary = this.resolveEventSummary();
  }

  onOverlayHide() {
    this.overlayEventState = 'closed';
    this.overlayEventSummary = this.resolveEventSummary();
  }
}
