import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Highlight } from 'ngx-highlightjs';
import { MagaryInputNumber, MagaryTab, MagaryTabs } from 'ng-magary';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type InputNumberApiRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type InputNumberOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'app-view-input-number',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MagaryInputNumber,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-input-number.html',
  styleUrl: './view-input-number.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewInputNumber {
  readonly i18n = inject(DemoI18nService);

  val1: number | null = null;
  val2: number | null = 50.5;
  val3: number | null = 1500;
  val4: number | null = 2500;
  val5: number | null = 45000;
  val6: number | null = 10;
  val7: number | null = 20;
  val8: number | null = 5;
  val9: number | null = 10;

  importRef = `import { MagaryInputNumber } from 'ng-magary';`;

  basicHTML = `<div class="formgrid">
  <div class="field">
      <label>Basic</label>
      <magary-input-number [(value)]="val1" mode="decimal" [min]="0" [max]="100" />
  </div>

  <div class="field">
      <label>Currency (USD)</label>
      <magary-input-number [(value)]="val3" mode="currency" currency="USD" locale="en-US" />
  </div>
</div>`;

  basicTS = `export class MyComponent {
  val1: number = 0;
  val3: number = 1500;
}`;

  inputs: InputNumberApiRow[] = [
    {
      name: 'value',
      type: 'number',
      default: 'null',
      descriptionKey: 'components.form.inputNumber.inputs.value.desc',
    },
    {
      name: 'format',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.form.inputNumber.inputs.format.desc',
    },
    {
      name: 'showButtons',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.form.inputNumber.inputs.showButtons.desc',
    },
    {
      name: 'buttonLayout',
      type: 'string',
      default: 'stacked',
      descriptionKey: 'components.form.inputNumber.inputs.buttonLayout.desc',
    },
    {
      name: 'incrementButtonIcon',
      type: 'string',
      default: 'chevron-up',
      descriptionKey:
        'components.form.inputNumber.inputs.incrementButtonIcon.desc',
    },
    {
      name: 'decrementButtonIcon',
      type: 'string',
      default: 'chevron-down',
      descriptionKey:
        'components.form.inputNumber.inputs.decrementButtonIcon.desc',
    },
    {
      name: 'mode',
      type: 'string',
      default: 'decimal',
      descriptionKey: 'components.form.inputNumber.inputs.mode.desc',
    },
    {
      name: 'min',
      type: 'number',
      default: 'null',
      descriptionKey: 'components.form.inputNumber.inputs.min.desc',
    },
    {
      name: 'max',
      type: 'number',
      default: 'null',
      descriptionKey: 'components.form.inputNumber.inputs.max.desc',
    },
    {
      name: 'step',
      type: 'number',
      default: '1',
      descriptionKey: 'components.form.inputNumber.inputs.step.desc',
    },
    {
      name: 'suffix',
      type: 'string',
      default: 'null',
      descriptionKey: 'components.form.inputNumber.inputs.suffix.desc',
    },
    {
      name: 'prefix',
      type: 'string',
      default: 'null',
      descriptionKey: 'components.form.inputNumber.inputs.prefix.desc',
    },
    {
      name: 'currency',
      type: 'string',
      default: 'null',
      descriptionKey: 'components.form.inputNumber.inputs.currency.desc',
    },
    {
      name: 'currencyDisplay',
      type: 'string',
      default: 'symbol',
      descriptionKey: 'components.form.inputNumber.inputs.currencyDisplay.desc',
    },
    {
      name: 'useGrouping',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.form.inputNumber.inputs.useGrouping.desc',
    },
    {
      name: 'minFractionDigits',
      type: 'number',
      default: 'null',
      descriptionKey:
        'components.form.inputNumber.inputs.minFractionDigits.desc',
    },
    {
      name: 'maxFractionDigits',
      type: 'number',
      default: 'null',
      descriptionKey:
        'components.form.inputNumber.inputs.maxFractionDigits.desc',
    },
  ];

  outputs: InputNumberOutputRow[] = [
    {
      name: 'onInput',
      type: 'EventEmitter<Event>',
      descriptionKey: 'components.form.inputNumber.outputs.onInput.desc',
    },
    {
      name: 'onFocus',
      type: 'EventEmitter<Event>',
      descriptionKey: 'components.form.inputNumber.outputs.onFocus.desc',
    },
    {
      name: 'onBlur',
      type: 'EventEmitter<Event>',
      descriptionKey: 'components.form.inputNumber.outputs.onBlur.desc',
    },
    {
      name: 'onKeyDown',
      type: 'EventEmitter<KeyboardEvent>',
      descriptionKey: 'components.form.inputNumber.outputs.onKeyDown.desc',
    },
  ];
}
