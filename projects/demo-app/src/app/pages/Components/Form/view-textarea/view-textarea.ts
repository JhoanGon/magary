import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Highlight } from 'ngx-highlightjs';
import { MagaryTab, MagaryTabs, MagaryTextArea } from 'ng-magary';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';

@Component({
  selector: 'app-view-textarea',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MagaryTextArea,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-textarea.html',
  styleUrl: './view-textarea.scss',
})
export class ViewTextArea {
  readonly i18n = inject(DemoI18nService);
  readonly bioControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  importRef = `import { MagaryTextArea } from 'ng-magary';`;

  basicHTML = `<magary-textarea placeholder="Basic"></magary-textarea>

<!-- Auto Resize -->
<magary-textarea
  [autoResize]="true"
  rows="1"
  placeholder="Auto Resize">
</magary-textarea>

<magary-textarea [disabled]="true" placeholder="Disabled"></magary-textarea>`;

  basicTS = `text = '';`;

  counterHTML = `<magary-textarea
  rows="5"
  cols="30"
  placeholder="Max 20 chars"
  [maxlength]="20"
  [showCounter]="true">
</magary-textarea>`;

  validationHTML = `<label id="bio-label" for="bio-field">Biography</label>
<magary-textarea
  [formControl]="bioControl"
  inputId="bio-field"
  ariaLabelledby="bio-label"
  errorMessage="Biography is required"
  helpText="Tell us about your role"
></magary-textarea>`;

  validationTS = `readonly bioControl = new FormControl('', {
  nonNullable: true,
  validators: [Validators.required],
});`;
}
