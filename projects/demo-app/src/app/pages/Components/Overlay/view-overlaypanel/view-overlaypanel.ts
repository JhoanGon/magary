import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryButton,
  MagaryOverlayPanel,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

interface OverlayProduct {
  id: string;
  code: string;
  name: string;
  price: number;
  image: string;
}

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
  importRef = `import { MagaryOverlayPanel } from 'ng-magary';`;

  // Data for table example
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
    <magary-button (buttonClick)="op.toggle($event)" label="Show Overlay"></magary-button>
</div>

<magary-overlaypanel #op>
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

<magary-overlaypanel #op2 [showCloseIcon]="true">
    @if (selectedProduct) {
        <div class="p-3 text-center">
            <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + selectedProduct.image" 
                 [alt]="selectedProduct.name" 
                 style="width: 100px; display: block; margin: 0 auto 1rem auto;">
            <span class="font-bold block mb-2">{{selectedProduct.name}}</span>
            <span class="text-secondary">{{product.price}}</span>
        </div>
    }
</magary-overlaypanel>`;

  tsCode = `export class ViewOverlayPanel {
    selectedProduct: OverlayProduct | null = null;
    
    selectProduct(event: Event, product: OverlayProduct, overlay: MagaryOverlayPanel) {
        this.selectedProduct = product;
        overlay.toggle(event);
    }
}`;

  selectProduct(
    event: Event,
    product: OverlayProduct,
    overlay: MagaryOverlayPanel,
  ) {
    this.selectedProduct = product;
    overlay.toggle(event);
  }
}
