import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryAccordion,
  MagaryAccordionTab,
  MagaryCard,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'view-accordion',
  standalone: true,
  imports: [
    CommonModule,
    MagaryAccordion,
    MagaryAccordionTab,
    MagaryCard,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-accordion.html',
  styleUrls: ['./view-accordion.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewAccordion {
  // Config for tabs
  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  // Examples
  readonly exampleHTML = `
<!-- Basic Single Selection -->
<magary-accordion>
    <magary-accordion-tab header="Header I">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
    </magary-accordion-tab>
    <magary-accordion-tab header="Header II">
        <p>Sed do eiusmod tempor incididunt ut labore et dolore...</p>
    </magary-accordion-tab>
    <magary-accordion-tab header="Header III">
        <p>Ut enim ad minim veniam, quis nostrud exercitation...</p>
    </magary-accordion-tab>
</magary-accordion>
`;

  readonly exampleMultipleHTML = `
<!-- Multiple Selection -->
<magary-accordion [multiple]="true">
    <magary-accordion-tab header="Header I">
        <p>Content I</p>
    </magary-accordion-tab>
    <magary-accordion-tab header="Header II">
        <p>Content II</p>
    </magary-accordion-tab>
    <magary-accordion-tab header="Header III">
        <p>Content III</p>
    </magary-accordion-tab>
</magary-accordion>
`;

  readonly exampleDisabledHTML = `
<magary-accordion>
    <magary-accordion-tab header="Header I">
        <p>Content I</p>
    </magary-accordion-tab>
    <magary-accordion-tab header="Header II" [disabled]="true">
        <p>Content II (Disabled)</p>
    </magary-accordion-tab>
    <magary-accordion-tab header="Header III">
        <p>Content III</p>
    </magary-accordion-tab>
</magary-accordion>
`;

  readonly exampleSelectedHTML = `
<magary-accordion>
    <magary-accordion-tab header="Header I" [selected]="true">
        <p>Content I (Open by default)</p>
    </magary-accordion-tab>
    <magary-accordion-tab header="Header II">
        <p>Content II</p>
    </magary-accordion-tab>
</magary-accordion>
`;

  onTabClose(event: unknown) {
    console.log('Tab Closed', event);
  }

  onTabOpen(event: unknown) {
    console.log('Tab Open', event);
  }
}
