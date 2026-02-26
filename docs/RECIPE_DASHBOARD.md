# Recipe: Analytics Dashboard

Date: `2026-02-26`
Target: integrate a KPI dashboard with drill-down interactions in `< 1 day`.

## Scope
- KPI cards and summary metrics.
- Tabbed data sections with table/detail views.
- Tree/organization views for hierarchy exploration.
- Context overlays for quick drill-down.

## Recommended Components
- `MagaryCard`
- `MagaryTabs`
- `MagaryTable`
- `MagaryTree`
- `MagaryOrganizationChart`
- `MagaryOverlayPanel`
- `MagarySelect`

## Starter Structure
```txt
src/app/dashboard/
  dashboard.page.ts
  dashboard.page.html
  dashboard.page.scss
  dashboard.models.ts
  dashboard.repository.ts
```

## Core Models
```ts
export interface Kpi {
  id: string;
  label: string;
  value: number;
  delta: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
}

export interface DashboardRow {
  name: string;
  owner: string;
  status: 'OK' | 'WARN' | 'CRITICAL';
  updatedAt: string;
}
```

## Minimal Composition
```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  MagaryCard,
  MagaryTabs,
  MagaryTab,
  MagaryTable,
  MagaryTree,
  MagaryOrganizationChart,
  MagaryOverlayPanel,
  MagarySelect,
} from 'ng-magary';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    MagaryCard,
    MagaryTabs,
    MagaryTab,
    MagaryTable,
    MagaryTree,
    MagaryOrganizationChart,
    MagaryOverlayPanel,
    MagarySelect,
  ],
  templateUrl: './dashboard.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {}
```

## Quality Checklist
- Tab/tabpanel ARIA contract validated.
- Tree and chart keyboard traversal covered by smoke tests.
- Critical routes have no serious/critical a11y blockers.
- Empty/loading/error states are visually consistent.
