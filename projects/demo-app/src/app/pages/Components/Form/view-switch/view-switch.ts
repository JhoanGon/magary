import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Highlight } from 'ngx-highlightjs';
import { MagaryCard, MagarySwitch } from 'ng-magary';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';

const CODE_EXAMPLES = {
  BASIC: `
  <magary-switch
    [(ngModel)]="notifications"
    label="Notifications"
  ></magary-switch>`,
  FORMS: `
  <form [formGroup]="preferencesForm">
    <magary-switch
      formControlName="enabled"
      label="Notifications"
      [errorMessage]="'Enable notifications'"
      [helpText]="'Optional preference'"
    ></magary-switch>
  </form>`,
  STATES: `
  <!-- Checked -->
  <magary-switch [ngModel]="true" label="Checked"></magary-switch>

  <!-- Unchecked -->
  <magary-switch [ngModel]="false" label="Unchecked"></magary-switch>

  <!-- Disabled Checked -->
  <magary-switch [ngModel]="true" [disabled]="true" label="Disabled Checked"></magary-switch>

  <!-- Disabled Unchecked -->
  <magary-switch [ngModel]="false" [disabled]="true" label="Disabled Unchecked"></magary-switch>`,
  COLORS: `
  <magary-switch [(ngModel)]="valPrimary" label="Primary" color="primary"></magary-switch>
  <magary-switch [(ngModel)]="valSuccess" label="Success" color="success"></magary-switch>
  <magary-switch [(ngModel)]="valDanger" label="Danger" color="danger"></magary-switch>
  <magary-switch [(ngModel)]="valWarning" label="Warning" color="warning"></magary-switch>
  <magary-switch [(ngModel)]="valInfo" label="Info" color="info"></magary-switch>`,
} as const;

@Component({
  selector: 'app-view-switch',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MagarySwitch,
    MagaryCard,
    Highlight,
  ],
  templateUrl: './view-switch.html',
  styleUrl: './view-switch.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSwitch {
  readonly i18n = inject(DemoI18nService);

  notifications = false;
  checked2 = true;
  readonly preferencesForm = new FormGroup({
    enabled: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });

  valPrimary = true;
  valSuccess = true;
  valDanger = true;
  valWarning = true;
  valInfo = true;

  readonly importExample = "import { MagarySwitch } from 'ng-magary';";
  readonly exampleBasic = CODE_EXAMPLES.BASIC;
  readonly exampleForms = CODE_EXAMPLES.FORMS;
  readonly exampleStates = CODE_EXAMPLES.STATES;
  readonly exampleColors = CODE_EXAMPLES.COLORS;

  get switchEnabledInForm(): boolean {
    return this.preferencesForm.controls.enabled.value;
  }
}
