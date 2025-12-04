import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Highlight } from 'ngx-highlightjs';
import {
  MagaryCascadeSelect,
  MagaryTabs,
  MagaryTab,
  MagaryCard,
} from 'ng-magary';

@Component({
  selector: 'app-view-cascade-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Highlight,
    MagaryCascadeSelect,
    MagaryCard,
    MagaryTabs,
    MagaryTab,
  ],
  templateUrl: './view-cascade-select.html',
  styleUrl: './view-cascade-select.scss',
})
export class ViewCascadeSelect {
  selectedCityBasic: any;
  selectedCityGroup: any;

  countries = [
    {
      name: 'Australia',
      code: 'AU',
      states: [
        {
          name: 'New South Wales',
          cities: [
            { cname: 'Sydney', code: 'A-SY' },
            { cname: 'Newcastle', code: 'A-NE' },
            { cname: 'Wollongong', code: 'A-WO' },
          ],
        },
        {
          name: 'Queensland',
          cities: [
            { cname: 'Brisbane', code: 'A-BR' },
            { cname: 'Townsville', code: 'A-TO' },
          ],
        },
      ],
    },
    {
      name: 'Canada',
      code: 'CA',
      states: [
        {
          name: 'Quebec',
          cities: [
            { cname: 'Montreal', code: 'C-MO' },
            { cname: 'Quebec City', code: 'C-QU' },
          ],
        },
        {
          name: 'Ontario',
          cities: [
            { cname: 'Ottawa', code: 'C-OT' },
            { cname: 'Toronto', code: 'C-TO' },
          ],
        },
      ],
    },
    {
      name: 'United States',
      code: 'US',
      states: [
        {
          name: 'California',
          cities: [
            { cname: 'Los Angeles', code: 'US-LA' },
            { cname: 'San Diego', code: 'US-SD' },
            { cname: 'San Francisco', code: 'US-SF' },
          ],
        },
        {
          name: 'Florida',
          cities: [
            { cname: 'Jacksonville', code: 'US-JA' },
            { cname: 'Miami', code: 'US-MI' },
            { cname: 'Tampa', code: 'US-TA' },
            { cname: 'Orlando', code: 'US-OR' },
          ],
        },
        {
          name: 'Texas',
          cities: [
            { cname: 'Austin', code: 'US-AU' },
            { cname: 'Dallas', code: 'US-DA' },
            { cname: 'Houston', code: 'US-HO' },
          ],
        },
      ],
    },
  ];

  exampleHTML = `
<magary-cascade-select
  [(ngModel)]="selectedCity"
  [options]="countries"
  optionLabel="cname"
  optionGroupLabel="name"
  [optionGroupChildren]="['states', 'cities']"
  [style]="{ minWidth: '14rem' }"
  placeholder="Selecciona una Ciudad"
></magary-cascade-select>`;

  exampleGroupHTML = `
<magary-cascade-select
  [(ngModel)]="selectedCityGroup"
  [options]="countries"
  optionLabel="cname"
  optionGroupLabel="name"
  [optionGroupChildren]="['states', 'cities']"
  [optionGroupSelectable]="true"
  placeholder="Selecciona una Ciudad o Región"
></magary-cascade-select>`;

  exampleTS = `
countries = [
  {
    name: 'Australia',
    code: 'AU',
    states: [
      {
        name: 'New South Wales',
        cities: [
          { cname: 'Sydney', code: 'A-SY' },
          { cname: 'Newcastle', code: 'A-NE' },
          { cname: 'Wollongong', code: 'A-WO' }
        ]
      },
      ...
    ]
  },
  ...
];`;

  get selectedPathBasic(): string {
    return this.buildPath(this.selectedCityBasic);
  }

  get selectedPathGroup(): string {
    return this.buildPath(this.selectedCityGroup);
  }

  private buildPath(city: any): string {
    if (!city) return 'Ninguno';

    const parts: string[] = [];

    // Caso 1: Objeto completo con toda la jerarquía
    if (city.name) {
      // País
      parts.push(city.name);

      // Estado
      if (city.states?.[0]?.name) {
        parts.push(city.states[0].name);
      }

      // Ciudad
      if (city.states?.[0]?.cities?.[0]?.cname) {
        parts.push(city.states[0].cities[0].cname);
      }
    }
    // Caso 2: Solo el objeto de la ciudad (nodo final)
    else if (city.cname) {
      parts.push(city.cname);
    }

    return parts.length > 0 ? parts.join(' → ') : 'Ninguno';
  }

  onCityChange(event: any) {
    console.log('Demo: selectedCity changed:', event);
  }
}
