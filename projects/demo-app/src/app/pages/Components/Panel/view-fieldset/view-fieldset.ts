import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryFieldset, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-view-fieldset',
  standalone: true,
  imports: [CommonModule, MagaryFieldset, MagaryTabs, MagaryTab, Highlight],
  templateUrl: './view-fieldset.html',
  styleUrl: './view-fieldset.scss',
})
export class ViewFieldset {
  codeBasic = `<magary-fieldset legend="Header">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
</magary-fieldset>`;

  codeToggleable = `<magary-fieldset legend="Toggleable" [toggleable]="true">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
</magary-fieldset>`;

  codeTS = `import { MagaryFieldset } from 'ng-magary';`;
}
