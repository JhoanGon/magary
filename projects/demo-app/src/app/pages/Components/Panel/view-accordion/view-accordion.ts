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
import { inject } from '@angular/core';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type AccordionRow = {
  name: string;
  type: string;
  default?: string;
  descriptionKey: DocsTextKey;
};

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
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

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

  readonly accordionRows: AccordionRow[] = [
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.panel.accordion.inputs.multiple.desc',
    },
  ];

  readonly tabRows: AccordionRow[] = [
    {
      name: 'header',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.panel.accordion.inputs.header.desc',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.panel.accordion.inputs.disabled.desc',
    },
    {
      name: 'selected',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.panel.accordion.inputs.selected.desc',
    },
  ];

  readonly outputRows: AccordionRow[] = [
    {
      name: 'onOpen',
      type: 'EventEmitter',
      descriptionKey: 'components.panel.accordion.outputs.onOpen.desc',
    },
    {
      name: 'onClose',
      type: 'EventEmitter',
      descriptionKey: 'components.panel.accordion.outputs.onClose.desc',
    },
  ];

  onTabClose(event: unknown) {
    console.log('Tab Closed', event);
  }

  onTabOpen(event: unknown) {
    console.log('Tab Open', event);
  }
}
