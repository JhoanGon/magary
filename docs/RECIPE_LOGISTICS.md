# Recipe: Logistics Operations Console

Date: `2026-02-26`
Target: integrate shipment tracking + status management flow in `< 1 day`.

## Scope
- Left navigation for operation modules.
- Shipment table with status, priority, and ETA.
- Sidebar details for selected shipment.
- Toast feedback for action results.

## Recommended Components
- `MagarySidebar`
- `MagaryTable`
- `MagarySelect`
- `MagaryOverlayPanel`
- `MagaryDialog`
- `MagaryTag`
- `MagaryToast`

## Starter Structure
```txt
src/app/logistics/
  logistics.page.ts
  logistics.page.html
  logistics.page.scss
  logistics.models.ts
  logistics.facade.ts
```

## Core Models
```ts
export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'BLOCKED';
  eta: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface ShipmentAction {
  type: 'DISPATCH' | 'HOLD' | 'RELEASE' | 'MARK_DELIVERED';
  shipmentId: string;
}
```

## Minimal Composition
```ts
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  MagarySidebar,
  MagaryTable,
  MagarySelect,
  MagaryOverlayPanel,
  MagaryDialog,
  MagaryTag,
  MagaryToast,
} from 'ng-magary';

@Component({
  selector: 'app-logistics-page',
  standalone: true,
  imports: [
    MagarySidebar,
    MagaryTable,
    MagarySelect,
    MagaryOverlayPanel,
    MagaryDialog,
    MagaryTag,
    MagaryToast,
  ],
  templateUrl: './logistics.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogisticsPage {
  readonly selectedShipmentId = signal<string | null>(null);
}
```

## Quality Checklist
- Shipment status uses semantic tags with sufficient contrast.
- Escape closes all active overlays/dialogs.
- Sidebar mobile behavior validated with smoke test.
- Action payloads are strictly typed end-to-end.
