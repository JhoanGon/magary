import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Highlight } from 'ngx-highlightjs';
import { MagaryCard, MagaryCheckbox } from 'ng-magary';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';

const CODE_EXAMPLES = {
  BASIC: `
  <magary-checkbox
    [(checked)]="checked"
    label="Accept Terms"
  ></magary-checkbox>`,
  STATES: `
  <!-- Checked -->
  <magary-checkbox [(checked)]="checked" label="Checked"></magary-checkbox>

  <!-- Unchecked -->
  <magary-checkbox [checked]="false" label="Unchecked"></magary-checkbox>

  <!-- Disabled Checked -->
  <magary-checkbox [checked]="true" [disabled]="true" label="Disabled Checked"></magary-checkbox>

  <!-- Disabled Unchecked -->
  <magary-checkbox [checked]="false" [disabled]="true" label="Disabled Unchecked"></magary-checkbox>`,
  COLORS: `
  <magary-checkbox [(checked)]="valPrimary" label="Primary" color="primary"></magary-checkbox>
  <magary-checkbox [(checked)]="valSuccess" label="Success" color="success"></magary-checkbox>
  <magary-checkbox [(checked)]="valDanger" label="Danger" color="danger"></magary-checkbox>
  <magary-checkbox [(checked)]="valWarning" label="Warning" color="warning"></magary-checkbox>
  <magary-checkbox [(checked)]="valInfo" label="Info" color="info"></magary-checkbox>`,
} as const;

@Component({
  selector: 'app-view-checkbox',
  imports: [CommonModule, FormsModule, MagaryCheckbox, MagaryCard, Highlight],
  templateUrl: './view-checkbox.html',
  styleUrl: './view-checkbox.scss',
})
export class ViewCheckbox {
  readonly i18n = inject(DemoI18nService);

  checked1 = signal(false);
  checked2 = signal(true);

  valPrimary = signal(true);
  valSuccess = signal(true);
  valDanger = signal(true);
  valWarning = signal(true);
  valInfo = signal(true);

  readonly importExample = "import { MagaryCheckbox } from 'ng-magary';";
  readonly exampleBasic = CODE_EXAMPLES.BASIC;
  readonly exampleStates = CODE_EXAMPLES.STATES;
  readonly exampleColors = CODE_EXAMPLES.COLORS;
}
