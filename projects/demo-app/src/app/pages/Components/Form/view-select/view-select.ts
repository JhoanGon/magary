import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MagarySelect, MagaryTabsModule } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-view-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MagarySelect,
    MagaryTabsModule,
    Highlight,
  ],
  templateUrl: './view-select.html',
  styleUrl: './view-select.scss',
})
export class ViewSelect {
  // Demo Data
  cities = ['New York', 'London', 'Paris', 'Tokyo'];

  users = [
    { id: '1', name: 'Alice Johnson' },
    { id: '2', name: 'Bob Smith' },
    { id: '3', name: 'Charlie Brown' },
  ];

  selectedUserId: string | null = null;

  get selectedUser() {
    return this.users.find((u) => u.id === this.selectedUserId);
  }

  onUserChange(val: any) {}

  // Code Examples
  importRef = `import { MagarySelect } from 'ng-magary';`;

  basicHTML = `<magary-select 
  [options]="cities" 
  placeholder="Select a city">
</magary-select>

<magary-select 
  loading 
  placeholder="Loading...">
</magary-select>

<magary-select 
  [options]="cities" 
  placeholder="Disabled" 
  disabled>
</magary-select>`;

  basicTS = `cities = ['New York', 'London', 'Paris'];`;

  reactiveHTML = `<magary-select
  [options]="users"
  optionLabel="name"
  optionValue="id"
  [(ngModel)]="selectedUserId">
</magary-select>`;

  reactiveTS = `users = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' }
];
selectedUserId = '1';`;

  // Filter Demo
  selectedCountry: any = null;
  countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'MX', name: 'Mexico' },
    { code: 'CO', name: 'Colombia' },
    { code: 'BR', name: 'Brazil' },
    { code: 'AR', name: 'Argentina' },
    { code: 'ES', name: 'Spain' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'IT', name: 'Italy' },
    { code: 'JP', name: 'Japan' },
    { code: 'CN', name: 'China' },
  ];

  filterHTML = `<magary-select
  [options]="countries"
  optionLabel="name"
  filter
  showClear
  [(ngModel)]="selectedCountry"
  placeholder="Select a country (with filter)">
</magary-select>`;

  filterTS = `// Filter is client-side by default
countries = [
  { code: 'US', name: 'United States' },
  { code: 'CO', name: 'Colombia' },
  // ... more countries
];

// Stores the selected Object
selectedCountry = null;`;
}
