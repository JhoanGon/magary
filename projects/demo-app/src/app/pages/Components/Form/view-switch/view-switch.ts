import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Highlight } from 'ngx-highlightjs';
import { MagaryCard, MagarySwitch } from 'ng-magary';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';

const CODE_EXAMPLES = {
  BASIC: `
  <magary-switch
    [(checked)]="checked"
    label="Notifications"
  ></magary-switch>`,
  STATES: `
  <!-- Checked -->
  <magary-switch [(checked)]="checked" label="Checked"></magary-switch>

  <!-- Unchecked -->
  <magary-switch [checked]="false" label="Unchecked"></magary-switch>

  <!-- Disabled Checked -->
  <magary-switch [checked]="true" [disabled]="true" label="Disabled Checked"></magary-switch>

  <!-- Disabled Unchecked -->
  <magary-switch [checked]="false" [disabled]="true" label="Disabled Unchecked"></magary-switch>`,
  COLORS: `
  <magary-switch [(checked)]="valPrimary" label="Primary" color="primary"></magary-switch>
  <magary-switch [(checked)]="valSuccess" label="Success" color="success"></magary-switch>
  <magary-switch [(checked)]="valDanger" label="Danger" color="danger"></magary-switch>
  <magary-switch [(checked)]="valWarning" label="Warning" color="warning"></magary-switch>
  <magary-switch [(checked)]="valInfo" label="Info" color="info"></magary-switch>`,
} as const;

@Component({
  selector: 'app-view-switch',
  imports: [CommonModule, FormsModule, MagarySwitch, MagaryCard, Highlight],
  templateUrl: './view-switch.html',
  styleUrl: './view-switch.scss',
})
export class ViewSwitch {
  readonly i18n = inject(DemoI18nService);

  checked1 = signal(false);
  checked2 = signal(true);

  valPrimary = signal(true);
  valSuccess = signal(true);
  valDanger = signal(true);
  valWarning = signal(true);
  valInfo = signal(true);

  readonly importExample = "import { MagarySwitch } from 'ng-magary';";
  readonly exampleBasic = CODE_EXAMPLES.BASIC;
  readonly exampleStates = CODE_EXAMPLES.STATES;
  readonly exampleColors = CODE_EXAMPLES.COLORS;
}
