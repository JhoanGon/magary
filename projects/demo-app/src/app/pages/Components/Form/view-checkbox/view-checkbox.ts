import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Highlight } from 'ngx-highlightjs';
import { MagaryCard, MagaryCheckbox } from 'ng-magary';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';

const CODE_EXAMPLES = {
  BASIC: `
  <magary-checkbox
    [(ngModel)]="accepted"
    label="Accept Terms"
  ></magary-checkbox>`,
  FORMS: `
  <form [formGroup]="preferencesForm">
    <magary-checkbox
      formControlName="accepted"
      label="Accept terms"
      [errorMessage]="'You must accept the terms'"
      [helpText]="'Required to continue'"
    ></magary-checkbox>
  </form>`,
  STATES: `
  <!-- Checked -->
  <magary-checkbox [ngModel]="true" label="Checked"></magary-checkbox>

  <!-- Unchecked -->
  <magary-checkbox [ngModel]="false" label="Unchecked"></magary-checkbox>

  <!-- Disabled Checked -->
  <magary-checkbox [ngModel]="true" [disabled]="true" label="Disabled Checked"></magary-checkbox>

  <!-- Disabled Unchecked -->
  <magary-checkbox [ngModel]="false" [disabled]="true" label="Disabled Unchecked"></magary-checkbox>`,
  COLORS: `
  <magary-checkbox [(ngModel)]="valPrimary" label="Primary" color="primary"></magary-checkbox>
  <magary-checkbox [(ngModel)]="valSuccess" label="Success" color="success"></magary-checkbox>
  <magary-checkbox [(ngModel)]="valDanger" label="Danger" color="danger"></magary-checkbox>
  <magary-checkbox [(ngModel)]="valWarning" label="Warning" color="warning"></magary-checkbox>
  <magary-checkbox [(ngModel)]="valInfo" label="Info" color="info"></magary-checkbox>`,
} as const;

@Component({
  selector: 'app-view-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MagaryCheckbox,
    MagaryCard,
    Highlight,
  ],
  templateUrl: './view-checkbox.html',
  styleUrl: './view-checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCheckbox {
  readonly i18n = inject(DemoI18nService);

  accepted = false;
  checked2 = true;
  readonly preferencesForm = new FormGroup({
    accepted: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });

  valPrimary = true;
  valSuccess = true;
  valDanger = true;
  valWarning = true;
  valInfo = true;

  readonly importExample = "import { MagaryCheckbox } from 'ng-magary';";
  readonly exampleBasic = CODE_EXAMPLES.BASIC;
  readonly exampleForms = CODE_EXAMPLES.FORMS;
  readonly exampleStates = CODE_EXAMPLES.STATES;
  readonly exampleColors = CODE_EXAMPLES.COLORS;

  get acceptedInForm(): boolean {
    return this.preferencesForm.controls.accepted.value;
  }
}
