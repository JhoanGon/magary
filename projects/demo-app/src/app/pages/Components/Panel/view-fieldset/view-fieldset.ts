import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryFieldset, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type FieldsetInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type FieldsetOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'app-view-fieldset',
  standalone: true,
  imports: [CommonModule, MagaryFieldset, MagaryTabs, MagaryTab, Highlight],
  templateUrl: './view-fieldset.html',
  styleUrl: './view-fieldset.scss',
})
export class ViewFieldset {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

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

  readonly inputRows: FieldsetInputRow[] = [
    {
      name: 'legend',
      type: 'string',
      default: 'null',
      descriptionKey: 'components.panel.fieldset.inputs.legend.desc',
    },
    {
      name: 'toggleable',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.panel.fieldset.inputs.toggleable.desc',
    },
    {
      name: 'collapsed',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.panel.fieldset.inputs.collapsed.desc',
    },
  ];

  readonly outputRows: FieldsetOutputRow[] = [
    {
      name: 'onBeforeToggle',
      type: 'EventEmitter<unknown>',
      descriptionKey: 'components.panel.fieldset.outputs.beforeToggle.desc',
    },
    {
      name: 'onAfterToggle',
      type: 'EventEmitter<unknown>',
      descriptionKey: 'components.panel.fieldset.outputs.afterToggle.desc',
    },
  ];
}
