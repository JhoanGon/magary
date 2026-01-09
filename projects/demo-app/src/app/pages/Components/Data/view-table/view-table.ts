import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryTable,
  MagaryCard,
  MagaryTableColumn,
  MagaryTabs,
  MagaryTab,
  MagaryTemplate,
  MagaryInput,
  MagaryButton,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { FormsModule } from '@angular/forms';

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
<magary-table [value]="products" [columns]="cols">
  <ng-template magaryTemplate="header">
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Actions</th>
    </tr>
  </ng-template>
  <ng-template magaryTemplate="body" let-product>
    <tr>
      <td>{{product.name}}</td>
      <td>
        <magary-input [(value)]="product.price" type="number" prefixIcon="dollar-sign"></magary-input>
      </td>
      <td>
        <magary-button icon="trash" severity="danger" variant="text"></magary-button>
      </td>
    </tr>
  </ng-template>
</magary-table>`,
  ts: `
  cols: MagaryTableColumn[] = [
    { field: 'name', header: 'Name', type: 'text', width: '25%' },
    { field: 'image', header: 'Image', type: 'avatar', width: '15%' },
    { field: 'price', header: 'Price', type: 'currency', width: '15%' },
    { field: 'category', header: 'Category', type: 'text', width: '20%' },
    { field: 'status', header: 'Status', type: 'badge', width: '15%' },
    { field: 'date', header: 'Date', type: 'date', width: '10%' }
  ];

  products = [
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
  readonly tsExample = CODE_EXAMPLES.ts;

  cols: MagaryTableColumn[] = [
    { field: 'name', header: 'Name', type: 'text', width: '25%' },
    { field: 'image', header: 'Image', type: 'avatar', width: '10%' },
    { field: 'price', header: 'Price', type: 'currency', width: '15%' },
    { field: 'category', header: 'Category', type: 'text', width: '20%' },
    { field: 'status', header: 'Status', type: 'badge', width: '15%' },
    { field: 'date', header: 'Date', type: 'date', width: '15%' },
  ];

  products = [
    {
      name: 'Bamboo Watch',
      image: '',
      price: 65,
      category: 'Accessories',
      status: 'INSTOCK',
      date: new Date(),
    },
    {
      name: 'Black Watch',
      image: '',
      price: 72,
      category: 'Accessories',
      status: 'OUTOFSTOCK',
      date: new Date(),
    },
    {
      name: 'Blue Band',
      image: '',
      price: 79,
      category: 'Fitness',
      status: 'LOWSTOCK',
      date: new Date(),
    },
    {
      name: 'Blue T-Shirt',
      image: '',
      price: 29,
      category: 'Clothing',
      status: 'INSTOCK',
      date: new Date(),
    },
    {
      name: 'Bracelet',
      image: '',
      price: 15,
      category: 'Accessories',
      status: 'INSTOCK',
      date: new Date(),
    },
    {
      name: 'Brown Purse',
      image: '',
      price: 120,
      category: 'Accessories',
      status: 'OUTOFSTOCK',
      date: new Date(),
    },
    {
      name: 'Chakra Bracelet',
      image: '',
      price: 32,
      category: 'Accessories',
      status: 'LOWSTOCK',
      date: new Date(),
    },
    {
      name: 'Galaxy Earrings',
      image: '',
      price: 34,
      category: 'Accessories',
      status: 'INSTOCK',
      date: new Date(),
    },
    {
      name: 'Game Controller',
      image: '',
      price: 99,
      category: 'Electronics',
      status: 'INSTOCK',
      date: new Date(),
    },
    {
      name: 'Gaming Set',
      image: '',
      price: 299,
      category: 'Electronics',
      status: 'INSTOCK',
      date: new Date(),
    },
    {
      name: 'Gold Phone Case',
      image: '',
      price: 24,
      category: 'Accessories',
      status: 'LOWSTOCK',
      date: new Date(),
    },
  ];
}
