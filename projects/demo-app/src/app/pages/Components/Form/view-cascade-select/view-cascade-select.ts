import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Highlight } from 'ngx-highlightjs';
import {
  MagaryCard,
  MagaryCascadeSelect,
  MagaryTab,
  MagaryTabs,
} from 'ng-magary';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';

interface CascadeCity {
  cname: string;
  code: string;
}

type CascadeCityOption = CascadeCity & Record<string, unknown>;

interface CascadeState {
  name: string;
  cities: CascadeCityOption[];
}

type CascadeStateOption = CascadeState & Record<string, unknown>;

interface CascadeCountry {
  name: string;
  code: string;
  states: CascadeStateOption[];
}

type CascadeCountryOption = CascadeCountry & Record<string, unknown>;
type CascadeSelection =
  | CascadeCountryOption
  | CascadeStateOption
  | CascadeCityOption
  | null;

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
  readonly i18n = inject(DemoI18nService);

  selectedCityBasic: CascadeSelection = null;
  selectedCityGroup: CascadeSelection = null;

  countries: CascadeCountryOption[] = [
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
  placeholder="Select a city"
></magary-cascade-select>`;

  exampleGroupHTML = `
<magary-cascade-select
  [(ngModel)]="selectedCityGroup"
  [options]="countries"
  optionLabel="cname"
  optionGroupLabel="name"
  [optionGroupChildren]="['states', 'cities']"
  [optionGroupSelectable]="true"
  placeholder="Select a city or region"
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
      }
    ]
  }
];`;

  get selectedPathBasic(): string {
    return this.buildPath(this.selectedCityBasic);
  }

  get selectedPathGroup(): string {
    return this.buildPath(this.selectedCityGroup);
  }

  private buildPath(city: CascadeSelection): string {
    const empty = this.i18n.translateDocs('components.form.cascadeSelect.common.none');

    if (!city) return empty;

    const parts: string[] = [];

    if (this.isCascadeCountry(city)) {
      parts.push(city.name);
      if (city.states[0]?.name) {
        parts.push(city.states[0].name);
      }
      if (city.states[0]?.cities[0]?.cname) {
        parts.push(city.states[0].cities[0].cname);
      }
    } else if (this.isCascadeState(city)) {
      parts.push(city.name);
      if (city.cities[0]?.cname) {
        parts.push(city.cities[0].cname);
      }
    } else if (this.isCascadeCity(city)) {
      parts.push(city.cname);
    }

    return parts.length > 0 ? parts.join(' -> ') : empty;
  }

  onCityChange(_event: CascadeSelection) {}

  private isCascadeCountry(
    option: CascadeSelection,
  ): option is CascadeCountryOption {
    if (!option || typeof option !== 'object') return false;

    const candidate = option as { states?: unknown };
    return Array.isArray(candidate.states);
  }

  private isCascadeState(option: CascadeSelection): option is CascadeStateOption {
    if (!option || typeof option !== 'object') return false;

    const candidate = option as { cities?: unknown };
    return Array.isArray(candidate.cities);
  }

  private isCascadeCity(option: CascadeSelection): option is CascadeCityOption {
    if (!option || typeof option !== 'object') return false;

    const candidate = option as { cname?: unknown };
    return typeof candidate.cname === 'string';
  }
}
