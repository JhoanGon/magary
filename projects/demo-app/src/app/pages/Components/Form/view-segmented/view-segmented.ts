import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MagaryCard,
  MagarySegmented,
  MagarySegmentedValue,
  MagaryTab,
  MagaryTabs,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';

const CODE_EXAMPLES = {
  BASIC_HTML: `<magary-segmented
  [options]="languageOptions"
  optionLabel="label"
  optionValue="value"
  [value]="language()"
  (valueChange)="language.set($event)"
></magary-segmented>`,
  BASIC_TS: `readonly language = signal<MagarySegmentedValue>('es');

readonly languageOptions = [
  { label: 'ES', value: 'es' },
  { label: 'EN', value: 'en' },
];`,
  OBJECT_OPTIONS: `<magary-segmented
  [options]="planOptions"
  optionLabel="label"
  optionValue="value"
  [value]="selectedPlan()"
  (valueChange)="selectedPlan.set($event)"
></magary-segmented>`,
  SIZES: `<magary-segmented
  [options]="languageOptions"
  optionLabel="label"
  optionValue="value"
  [value]="language()"
  (valueChange)="language.set($event)"
  size="small"
></magary-segmented>

<magary-segmented
  [options]="languageOptions"
  optionLabel="label"
  optionValue="value"
  [value]="language()"
  (valueChange)="language.set($event)"
  size="normal"
></magary-segmented>

<magary-segmented
  [options]="languageOptions"
  optionLabel="label"
  optionValue="value"
  [value]="language()"
  (valueChange)="language.set($event)"
  size="large"
></magary-segmented>`,
  FORM_BINDING_HTML: `<magary-segmented
  [options]="localeOptions"
  [(ngModel)]="locale"
></magary-segmented>`,
  FORM_BINDING_TS: `locale = 'en';
readonly localeOptions = ['es', 'en'];`,
} as const;

@Component({
  selector: 'app-view-segmented',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MagarySegmented,
    MagaryCard,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-segmented.html',
  styleUrl: './view-segmented.scss',
})
export class ViewSegmented {
  readonly i18n = inject(DemoI18nService);
  readonly language = signal<MagarySegmentedValue>('es');
  readonly selectedPlan = signal<MagarySegmentedValue>('pro');

  locale = 'en';
  readonly localeOptions = ['es', 'en'];

  readonly languageOptions = [
    { label: 'ES', value: 'es' },
    { label: 'EN', value: 'en' },
  ];

  readonly planOptions = [
    { label: 'Starter', value: 'starter' },
    { label: 'Pro', value: 'pro' },
    { label: 'Enterprise', value: 'enterprise' },
  ];

  readonly importExample = "import { MagarySegmented } from 'ng-magary';";
  readonly exampleBasicHtml = CODE_EXAMPLES.BASIC_HTML;
  readonly exampleBasicTs = CODE_EXAMPLES.BASIC_TS;
  readonly exampleObjectOptions = CODE_EXAMPLES.OBJECT_OPTIONS;
  readonly exampleSizes = CODE_EXAMPLES.SIZES;
  readonly exampleFormBindingHtml = CODE_EXAMPLES.FORM_BINDING_HTML;
  readonly exampleFormBindingTs = CODE_EXAMPLES.FORM_BINDING_TS;
}
