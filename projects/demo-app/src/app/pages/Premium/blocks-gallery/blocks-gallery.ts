import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero1Component } from '../../../../premium/blocks/hero/hero-1/hero-1.component';
import { Pricing1Component } from '../../../../premium/blocks/pricing/pricing-1/pricing-1.component';
import { DemoI18nService } from '../../../i18n/demo-i18n.service';

@Component({
  selector: 'mg-blocks-gallery',
  standalone: true,
  imports: [CommonModule, Hero1Component, Pricing1Component],
  templateUrl: './blocks-gallery.html',
  styleUrl: './blocks-gallery.scss'
})
export class BlocksGallery {
  readonly i18n = inject(DemoI18nService);
}
