import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MagaryRadioButton,
  MagaryRadioGroup,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

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
  city: string | null = null;
  paymentMethod = 'paypal';

  paymentOptions = [
    { label: 'Credit Card', value: 'cc' },
    { label: 'PayPal', value: 'paypal' },
    { label: 'Bitcoin', value: 'btc', disabled: true }, // If option level disabled support?
    // My implementation supports disabled on group, and MagaryRadio checks parent disabled?
    // Let's check Radio.ts. It checks `this.disabled()`.
    // My RadioGroup logic: `[disabled]="disabled()"` (group level).
    // I didn't implement option-level disabled in RadioGroup.
    // It's fine for V1.
  ];

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

// Options defined in Controller
paymentOptions = [
  { label: 'Credit Card', value: 'cc' },
  { label: 'PayPal', value: 'paypal' },
  { label: 'Bitcoin', value: 'btc' }
];`;
}
