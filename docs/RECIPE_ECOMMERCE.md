# Recipe: Ecommerce Flow

Date: `2026-02-26`
Target: integrate a complete product discovery + cart confirmation flow in `< 1 day`.

## Scope
- Landing hero and featured products carousel.
- Product list with filters and sorting.
- Product detail dialog and add-to-cart confirmation.
- Cart summary table with inline quantity edit.

## Recommended Components
- `MagaryCarousel`
- `MagarySelect`
- `MagaryInput`
- `MagaryTable`
- `MagaryDialog`
- `MagaryButton`
- `MagaryTag`
- `MagaryToast`

## Starter Structure
```txt
src/app/ecommerce/
  ecommerce.page.ts
  ecommerce.page.html
  ecommerce.page.scss
  ecommerce.models.ts
  ecommerce.service.ts
```

## Core Models
```ts
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
  image: string;
}

export interface CartLine {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}
```

## Minimal Composition
```ts
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  MagaryButton,
  MagaryCarousel,
  MagaryDialog,
  MagaryInput,
  MagarySelect,
  MagaryTable,
  MagaryTag,
  MagaryToast,
} from 'ng-magary';

@Component({
  selector: 'app-ecommerce-page',
  standalone: true,
  imports: [
    MagaryCarousel,
    MagarySelect,
    MagaryInput,
    MagaryTable,
    MagaryDialog,
    MagaryButton,
    MagaryTag,
    MagaryToast,
  ],
  templateUrl: './ecommerce.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcommercePage {
  readonly search = signal('');
  readonly selectedCategory = signal<string | null>(null);
}
```

## Quality Checklist
- Product list keyboard operable (`Tab`, `Enter`, `Escape` in overlays).
- Form controls have labels and helper text.
- Table inline edit emits typed payloads and no runtime console errors.
- Smoke route added for main ecommerce page interactions.
