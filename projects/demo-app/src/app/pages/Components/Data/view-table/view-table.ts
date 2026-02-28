import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryTable,
  MagaryCard,
  MagaryTableColumn,
  MagaryTableSortState,
  MagaryTabs,
  MagaryTab,
  MagaryTemplate,
  MagaryInput,
  MagaryButton,
  PaginatorState,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { FormsModule } from '@angular/forms';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

const STABLE_SAMPLE_DATE = new Date('2026-02-18T12:00:00.000Z');

interface TableProduct {
  name: string;
  image: string;
  price: number;
  category: string;
  status: string;
  date: Date;
}

interface InlineEditProduct {
  name: string;
  price: number;
}

const CODE_EXAMPLES = {
  import: `import { MagaryTable } from 'ng-magary';`,
  basic: `<magary-table [value]="products" [columns]="cols"></magary-table>`,
  paginator: `<magary-table 
    [value]="products" 
    [columns]="cols" 
    [paginator]="true" 
    [rows]="5"
    title="Products List">
</magary-table>`,
  filter: `<magary-table 
    [value]="products" 
    [columns]="cols" 
    [paginator]="true" 
    [rows]="5"
    [globalFilterFields]="['name', 'category', 'status']"
    [responsiveLayout]="false"
    title="Searchable Table">
</magary-table>`,
  filterResponsive: `<magary-table 
    [value]="products" 
    [columns]="cols" 
    [paginator]="true" 
    [rows]="5"
    [globalFilterFields]="['name', 'category', 'status']"
    title="Searchable Table">
</magary-table>`,
  fixed: `<magary-table 
    [value]="products" 
    [columns]="cols" 
    [responsiveLayout]="false"
    title="Fixed Height Table">
</magary-table>`,
  loading: `<magary-table 
    [value]="[]" 
    [columns]="cols" 
    [loading]="true"
    title="Loading State">
</magary-table>`,
  template: `
<magary-table
  [value]="inlineEditProducts"
  [columns]="inlineEditCols"
  [paginator]="true"
  [rows]="5"
  [rowsPerPageOptions]="[5, 10]"
>
  <ng-template magaryTemplate="header">
    <tr class="inline-edit-header-row">
      <th>Name</th>
      <th>Price</th>
      <th>Actions</th>
    </tr>
  </ng-template>
  <ng-template magaryTemplate="body" let-product>
    <tr class="table-row inline-edit-row">
      <td>
        <span class="table-cell-value">{{product.name}}</span>
      </td>
      <td class="inline-edit-price-cell">
        <span class="table-cell-value">
          <magary-input
            [(value)]="product.price"
            type="number"
            size="small"
            width="12rem"
            prefixIcon="dollar-sign"
          ></magary-input>
        </span>
      </td>
      <td class="inline-edit-actions-cell">
        <span class="table-cell-value">
          <magary-button icon="trash" severity="danger" variant="text"></magary-button>
        </span>
      </td>
    </tr>
  </ng-template>
</magary-table>`,
  templateGuidelines: `
<!-- Keep template rows/cells aligned with table visual system -->
<ng-template magaryTemplate="header">
  <tr class="table-row">
    <th>Name</th>
    <th>Price</th>
    <th>Actions</th>
  </tr>
</ng-template>

<ng-template magaryTemplate="body" let-row>
  <tr class="table-row">
    <td><span class="table-cell-value">{{ row.name }}</span></td>
    <td class="inline-edit-price-cell">
      <span class="table-cell-value">
        <magary-input size="small" width="12rem"></magary-input>
      </span>
    </td>
    <td class="inline-edit-actions-cell">
      <span class="table-cell-value">
        <magary-button icon="trash" variant="text"></magary-button>
      </span>
    </td>
  </tr>
</ng-template>`,
  enterpriseRecipe: `
<magary-table
  [value]="products"
  [columns]="cols"
  [paginator]="true"
  [rows]="10"
  [rowsPerPageOptions]="[10, 25, 50]"
  [globalFilterFields]="['name', 'category', 'status']"
  [responsiveLayout]="false"
  title="Inventory Control"
  (onPageChange)="onEnterprisePageChange($event)"
  (onSortChange)="onEnterpriseSortChange($event)"
></magary-table>`,
  enterpriseTs: `
enterprisePageEventSummary = 'No page event yet';
enterpriseSortEventSummary = 'No sort event yet';

onEnterprisePageChange(event: PaginatorState): void {
  this.enterprisePageEventSummary =
    'Page ' + (event.page + 1) + ' - first: ' + event.first + ', rows: ' + event.rows;
}

onEnterpriseSortChange(event: MagaryTableSortState): void {
  this.enterpriseSortEventSummary =
    'Field: ' + (event.field ?? 'none') + ', order: ' + event.order;
}`,
  ts: `
  cols: MagaryTableColumn[] = [
    { field: 'name', header: 'Name', type: 'text', sortable: true, width: '25%' },
    { field: 'image', header: 'Image', type: 'avatar', width: '15%' },
    { field: 'price', header: 'Price', type: 'currency', sortable: true, width: '15%' },
    { field: 'category', header: 'Category', type: 'text', sortable: true, width: '20%' },
    { field: 'status', header: 'Status', type: 'badge', sortable: true, width: '15%' },
    { field: 'date', header: 'Date', type: 'date', sortable: true, width: '10%' }
  ];

  products: TableProduct[] = [
    { name: 'Bamboo Watch', image: '', price: 65, category: 'Accessories', status: 'INSTOCK', date: new Date() },
    { name: 'Black Watch', image: '', price: 72, category: 'Accessories', status: 'OUTOFSTOCK', date: new Date() },
    // ... more data
  ];`,
};

@Component({
  selector: 'magary-view-table',
  standalone: true,
  imports: [
    CommonModule,
    MagaryTable,
    MagaryCard,
    Highlight,
    MagaryTabs,
    MagaryTab,
    MagaryTemplate,
    MagaryInput,
    MagaryButton,
    FormsModule,
  ],
  templateUrl: './view-table.html',
  styleUrls: ['./view-table.scss'],
})
export class ViewTable {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  readonly importExample = CODE_EXAMPLES.import;
  readonly basicExample = CODE_EXAMPLES.basic;
  readonly paginatorExample = CODE_EXAMPLES.paginator;
  readonly filterExample = CODE_EXAMPLES.filter;
  readonly filterResponsiveExample = CODE_EXAMPLES.filterResponsive;
  readonly fixedLayoutExample = CODE_EXAMPLES.fixed;
  readonly loadingExample = CODE_EXAMPLES.loading;
  readonly templateExample = CODE_EXAMPLES.template;
  readonly templateGuidelinesExample = CODE_EXAMPLES.templateGuidelines;
  readonly enterpriseRecipeExample = CODE_EXAMPLES.enterpriseRecipe;
  readonly enterpriseRecipeTsExample = CODE_EXAMPLES.enterpriseTs;
  readonly tsExample = CODE_EXAMPLES.ts;

  enterprisePageEventSummary = this.t('components.data.table.enterprise.pageEvent.none');
  enterpriseSortEventSummary = this.t('components.data.table.enterprise.sortEvent.none');

  onEnterprisePageChange(event: PaginatorState): void {
    this.enterprisePageEventSummary =
      this.t('components.data.table.enterprise.pageEvent.pageLabel') +
      ' ' +
      (event.page + 1) +
      ' - ' +
      this.t('components.data.table.enterprise.pageEvent.firstLabel') +
      ': ' +
      event.first +
      ', ' +
      this.t('components.data.table.enterprise.pageEvent.rowsLabel') +
      ': ' +
      event.rows;
  }

  onEnterpriseSortChange(event: MagaryTableSortState): void {
    this.enterpriseSortEventSummary =
      this.t('components.data.table.enterprise.sortEvent.fieldLabel') +
      ': ' +
      (event.field ?? this.t('components.data.table.enterprise.sortEvent.noneField')) +
      ', ' +
      this.t('components.data.table.enterprise.sortEvent.orderLabel') +
      ': ' +
      event.order;
  }

  editPriceAriaLabel(productName: string): string {
    return this.t('components.data.table.templates.input.editPriceFor') + productName;
  }

  cols: MagaryTableColumn[] = [
    { field: 'name', header: 'Name', type: 'text', sortable: true, width: '25%' },
    { field: 'image', header: 'Image', type: 'avatar', width: '10%' },
    { field: 'price', header: 'Price', type: 'currency', sortable: true, width: '15%' },
    { field: 'category', header: 'Category', type: 'text', sortable: true, width: '20%' },
    { field: 'status', header: 'Status', type: 'badge', sortable: true, width: '15%' },
    { field: 'date', header: 'Date', type: 'date', sortable: true, width: '15%' },
  ];

  products = [
    {
      name: 'Bamboo Watch',
      image: '',
      price: 65,
      category: 'Accessories',
      status: 'INSTOCK',
      date: STABLE_SAMPLE_DATE,
    },
    {
      name: 'Black Watch',
      image: '',
      price: 72,
      category: 'Accessories',
      status: 'OUTOFSTOCK',
      date: STABLE_SAMPLE_DATE,
    },
    {
      name: 'Blue Band',
      image: '',
      price: 79,
      category: 'Fitness',
      status: 'LOWSTOCK',
      date: STABLE_SAMPLE_DATE,
    },
    {
      name: 'Blue T-Shirt',
      image: '',
      price: 29,
      category: 'Clothing',
      status: 'INSTOCK',
      date: STABLE_SAMPLE_DATE,
    },
    {
      name: 'Bracelet',
      image: '',
      price: 15,
      category: 'Accessories',
      status: 'INSTOCK',
      date: STABLE_SAMPLE_DATE,
    },
    {
      name: 'Brown Purse',
      image: '',
      price: 120,
      category: 'Accessories',
      status: 'OUTOFSTOCK',
      date: STABLE_SAMPLE_DATE,
    },
    {
      name: 'Chakra Bracelet',
      image: '',
      price: 32,
      category: 'Accessories',
      status: 'LOWSTOCK',
      date: STABLE_SAMPLE_DATE,
    },
    {
      name: 'Galaxy Earrings',
      image: '',
      price: 34,
      category: 'Accessories',
      status: 'INSTOCK',
      date: STABLE_SAMPLE_DATE,
    },
    {
      name: 'Game Controller',
      image: '',
      price: 99,
      category: 'Electronics',
      status: 'INSTOCK',
      date: STABLE_SAMPLE_DATE,
    },
    {
      name: 'Gaming Set',
      image: '',
      price: 299,
      category: 'Electronics',
      status: 'INSTOCK',
      date: STABLE_SAMPLE_DATE,
    },
    {
      name: 'Gold Phone Case',
      image: '',
      price: 24,
      category: 'Accessories',
      status: 'LOWSTOCK',
      date: STABLE_SAMPLE_DATE,
    },
  ];

  inlineEditCols: MagaryTableColumn[] = [
    { field: 'name', header: 'Name', width: '34%' },
    { field: 'price', header: 'Price', width: '46%' },
    { field: 'actions', header: 'Actions', width: '20%' },
  ];

  inlineEditProducts: InlineEditProduct[] = this.products.map((product) => ({
    name: product.name,
    price: product.price,
  }));
}
