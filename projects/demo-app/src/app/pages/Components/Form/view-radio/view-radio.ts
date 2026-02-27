import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Highlight } from 'ngx-highlightjs';
import {
  MagaryRadioButton,
  MagaryRadioGroup,
  MagaryTab,
  MagaryTabs,
} from 'ng-magary';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';

@Component({
  selector: 'app-view-radio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MagaryRadioButton,
    MagaryRadioGroup,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-radio.html',
  styleUrl: './view-radio.scss',
})
export class ViewRadio {
  readonly i18n = inject(DemoI18nService);

  city: string | null = null;
  paymentMethod = 'paypal';

  get paymentOptions() {
    return [
      { label: 'Credit Card', value: 'cc' },
      { label: 'PayPal', value: 'paypal' },
      { label: 'Bitcoin', value: 'btc', disabled: true },
    ];
  }

  importRef = `import { MagaryRadioButton } from 'ng-magary';`;

  basicHTML = `<magary-radio name="city" value="NY" label="New York" [(ngModel)]="city"></magary-radio>
<magary-radio name="city" value="LDN" label="London" [(ngModel)]="city"></magary-radio>

<!-- Disabled -->
<magary-radio
  name="city"
  value="PAR"
  label="Paris (Disabled)"
  disabled>
</magary-radio>`;

  basicTS = `city: string | null = null;`;

  groupHTML = `<magary-radio-group
  [options]="paymentOptions"
  [(ngModel)]="paymentMethod"
  name="payment"
  layout="horizontal">
</magary-radio-group>`;

  groupTS = `paymentMethod = 'paypal';

paymentOptions = [
  { label: 'Credit Card', value: 'cc' },
  { label: 'PayPal', value: 'paypal' },
  { label: 'Bitcoin', value: 'btc' }
];`;
}
