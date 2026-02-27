import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Highlight } from 'ngx-highlightjs';
import { MagaryTab, MagaryTabs, MagaryTextArea } from 'ng-magary';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';

@Component({
  selector: 'app-view-textarea',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
}
