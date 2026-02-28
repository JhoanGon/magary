import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryPaginator, PaginatorState, MagaryCard } from 'ng-magary';
import { MagaryTabs } from 'ng-magary';
import { MagaryTab } from 'ng-magary';

import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

@Component({
  selector: 'view-paginator',
  standalone: true,
  imports: [
    CommonModule,
    MagaryPaginator,
    MagaryTabs,
    MagaryTab,
    MagaryCard,
    Highlight,
  ],
  templateUrl: './view-paginator.html',
  styleUrls: ['./view-paginator.scss'],
})
export class ViewPaginator {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  first: number = 0;
  rows: number = 10;
  totalRecords: number = 120;

  // Example 2
  first2: number = 0;
  rows2: number = 5;

  // Generate dummy data
  items: string[] = Array.from({ length: 120 }).map((_, i) => `Item #${i + 1}`);

  // Example 2 items
  items2: string[] = Array.from({ length: 50 }).map(
    (_, i) => `Product #${i + 1}`,
  );

  get visibleItems2(): string[] {
    return this.items2.slice(this.first2, this.first2 + this.rows2);
  }

  get visibleItems(): string[] {
    return this.items.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first;
    this.rows = event.rows;
  }

  onPageChange2(event: PaginatorState) {
    this.first2 = event.first;
    this.rows2 = event.rows;
  }

  exampleHTML = `
<!-- Display paginated items -->
<div class="item-list">
    @for (item of visibleItems; track item) {
        <div class="list-item">
            {{ item }}
        </div>
    }
</div>

<magary-paginator 
    [first]="first" 
    [rows]="rows" 
    [totalRecords]="items.length" 
    (onPageChange)="onPageChange($event)"
    [rowsPerPageOptions]="[10, 20, 30]">
</magary-paginator>
    `;

  exampleTS = `
import { MagaryPaginator, PaginatorState } from 'ng-magary';
import { CommonModule } from '@angular/common';

export class MyComponent {
    // Generate 120 dummy items
    items: string[] = Array.from({ length: 120 }).map((_, i) => 'Item #' + (i + 1));
    
    first: number = 0;
    rows: number = 10;

    // Helper to get items for current page
    get visibleItems(): string[] {
        return this.items.slice(this.first, this.first + this.rows);
    }

    onPageChange(event: PaginatorState) {
        this.first = event.first;
        this.rows = event.rows;
    }
}
    `;
}
