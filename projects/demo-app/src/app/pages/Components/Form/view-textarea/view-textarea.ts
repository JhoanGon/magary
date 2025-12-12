import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MagaryTextArea, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

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
