import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MagaryInputNumber, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

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
        <label for="basic">Básico</label>
        <magary-input-number [(value)]="val1" inputId="basic" mode="decimal" [min]="0" [max]="100" />
    </div>
    
    <div class="field">
        <label for="currency">Moneda (USD)</label>
        <magary-input-number [(value)]="val3" mode="currency" currency="USD" locale="en-US" />
    </div>
</div>`;

  basicTS = `export class MyComponent {
    val1: number = 0;
    val3: number = 1500;
}`;

  inputs = [
    {
      name: 'value',
      type: 'number',
      default: 'null',
      description: 'Valor del componente.',
    },
    {
      name: 'format',
      type: 'boolean',
      default: 'true',
      description: 'Si se debe formatear el valor.',
    },
    {
      name: 'showButtons',
      type: 'boolean',
      default: 'false',
      description: 'Mostrar botones de incremento/decremento.',
    },
    {
      name: 'buttonLayout',
      type: 'string',
      default: 'stacked',
      description: 'Layout de botones: sticky, horizontal o vertical.',
    },
    {
      name: 'incrementButtonIcon',
      type: 'string',
      default: 'chevron-up',
      description: 'Icono del botón de incremento.',
    },
    {
      name: 'decrementButtonIcon',
      type: 'string',
      default: 'chevron-down',
      description: 'Icono del botón de decremento.',
    },
    {
      name: 'mode',
      type: 'string',
      default: 'decimal',
      description: 'decimal, currency o percent.',
    },
    {
      name: 'min',
      type: 'number',
      default: 'null',
      description: 'Valor mínimo.',
    },
    {
      name: 'max',
      type: 'number',
      default: 'null',
      description: 'Valor máximo.',
    },
    {
      name: 'step',
      type: 'number',
      default: '1',
      description: 'Paso de incremento.',
    },
    {
      name: 'suffix',
      type: 'string',
      default: 'null',
      description: 'Texto sufijo.',
    },
    {
      name: 'prefix',
      type: 'string',
      default: 'null',
      description: 'Texto prefijo.',
    },
    {
      name: 'currency',
      type: 'string',
      default: 'null',
      description: 'Código de moneda (ISO 4217).',
    },
    {
      name: 'currencyDisplay',
      type: 'string',
      default: 'symbol',
      description: 'Cómo mostrar la moneda.',
    },
    {
      name: 'useGrouping',
      type: 'boolean',
      default: 'true',
      description: 'Usar separador de miles.',
    },
    {
      name: 'minFractionDigits',
      type: 'number',
      default: 'null',
      description: 'Mínimo de decimales.',
    },
    {
      name: 'maxFractionDigits',
      type: 'number',
      default: 'null',
      description: 'Máximo de decimales.',
    },
  ];

  outputs = [
    {
      name: 'onInput',
      type: 'EventEmitter<any>',
      description: 'Emitido cuando el valor cambia por input manual.',
    },
    {
      name: 'onFocus',
      type: 'EventEmitter<Event>',
      description: 'Emitido cuando el input recibe el foco.',
    },
    {
      name: 'onBlur',
      type: 'EventEmitter<Event>',
      description: 'Emitido cuando el input pierde el foco.',
    },
    {
      name: 'onKeyDown',
      type: 'EventEmitter<KeyboardEvent>',
      description: 'Emitido al presionar una tecla.',
    },
  ];
}
