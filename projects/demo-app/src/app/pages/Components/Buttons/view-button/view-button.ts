import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { MagaryButton, MagaryCard } from 'ng-magary';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type ButtonInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type ButtonOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

const CODE_EXAMPLES = {
  import: `import { MagaryButton } from 'ng-magary';`,
  basic: `    <magary-button label="Button"></magary-button>
    <magary-button label="Home" icon="house"></magary-button>
    <magary-button icon="heart"></magary-button>
    <magary-button label="Loading..." [loading]="true"></magary-button>`,
  severity: `<magary-button label="Primary" severity="primary"></magary-button>
<magary-button label="Secondary" severity="secondary"></magary-button>
<magary-button label="Success" severity="success"></magary-button>
<magary-button label="Info" severity="info"></magary-button>
<magary-button label="Warning" severity="warning"></magary-button>
<magary-button label="Danger" severity="danger"></magary-button>
<magary-button label="Help" severity="help"></magary-button>`,
  sizes: `<magary-button label="Small" size="small" severity="primary"></magary-button>
<magary-button label="Normal" size="normal" severity="primary"></magary-button>
<magary-button label="Large" size="large" severity="primary"></magary-button>`,
  variants: `<magary-button label="Solid" variant="solid"></magary-button>
<magary-button label="Outlined" variant="outlined" severity="primary"></magary-button>
<magary-button label="Text" variant="text" severity="primary"></magary-button>`,
  custom: `<magary-button label="Shadow 1" [shadow]="1"></magary-button>
<magary-button label="Shadow 3" [shadow]="3"></magary-button>
<magary-button label="Rounded" [rounded]="true"></magary-button>
<magary-button label="32px Icon" icon="heart" [iconSize]="32"></magary-button>`,
  states: `<magary-button label="Normal"></magary-button>
<magary-button label="Disabled" [disabled]="true"></magary-button>
<magary-button label="Loading..." [loading]="true"></magary-button>`,
} as const;

@Component({
  selector: 'magary-view-button',
  imports: [CommonModule, MagaryButton, MagaryCard, Highlight],
  templateUrl: './view-button.html',
  styleUrl: './view-button.scss',
})
export class ViewButton {
  readonly i18n = inject(DemoI18nService);

  readonly importExample = CODE_EXAMPLES.import;
  readonly exampleBasic = CODE_EXAMPLES.basic;
  readonly exampleSeveritys = CODE_EXAMPLES.severity;
  readonly exampleSizes = CODE_EXAMPLES.sizes;
  readonly exampleVariants = CODE_EXAMPLES.variants;
  readonly exampleCustom = CODE_EXAMPLES.custom;
  readonly exampleState = CODE_EXAMPLES.states;

  readonly inputRows: ButtonInputRow[] = [
    {
      name: 'label',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.buttons.button.apiInputs.label.desc',
    },
    {
      name: 'icon',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.buttons.button.apiInputs.icon.desc',
    },
    {
      name: 'iconPos',
      type: "'left' | 'right'",
      default: "'left'",
      descriptionKey: 'components.buttons.button.apiInputs.iconPos.desc',
    },
    {
      name: 'severity',
      type: "'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help'",
      default: "'primary'",
      descriptionKey: 'components.buttons.button.apiInputs.severity.desc',
    },
    {
      name: 'variant',
      type: "'solid' | 'outlined' | 'text'",
      default: "'solid'",
      descriptionKey: 'components.buttons.button.apiInputs.variant.desc',
    },
    {
      name: 'size',
      type: "'small' | 'normal' | 'large'",
      default: "'normal'",
      descriptionKey: 'components.buttons.button.apiInputs.size.desc',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.buttons.button.apiInputs.disabled.desc',
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.buttons.button.apiInputs.loading.desc',
    },
    {
      name: 'rounded',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.buttons.button.apiInputs.rounded.desc',
    },
    {
      name: 'shadow',
      type: 'number',
      default: '0',
      descriptionKey: 'components.buttons.button.apiInputs.shadow.desc',
    },
    {
      name: 'iconSize',
      type: 'number',
      default: 'undefined',
      descriptionKey: 'components.buttons.button.apiInputs.iconSize.desc',
    },
  ];

  readonly outputRows: ButtonOutputRow[] = [
    {
      name: 'buttonClick',
      type: 'EventEmitter<Event>',
      descriptionKey: 'components.buttons.button.apiOutputs.buttonClick.desc',
    },
  ];
}
