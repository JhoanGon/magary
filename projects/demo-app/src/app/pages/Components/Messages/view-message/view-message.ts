import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryButton,
  MagaryMessage,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type MessageSeverity =
  | 'success'
  | 'info'
  | 'warn'
  | 'error'
  | 'secondary'
  | 'contrast';

interface DynamicMessage {
  severity: MessageSeverity;
  textKey: DocsTextKey;
  detailKey: DocsTextKey;
}

type MessageInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type MessageOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

const CODE_EXAMPLES = {
  import: `import { MagaryMessage } from 'ng-magary';`,
  basic: `<magary-message severity="success" text="Success" detail="Message Content"></magary-message>
<magary-message severity="info" text="Info" detail="Message Content"></magary-message>
<magary-message severity="warn" text="Warning" detail="Message Content"></magary-message>
<magary-message severity="error" text="Error" detail="Message Content"></magary-message>`,
  closable: `<magary-message
  severity="info"
  text="Closable Message"
  [closable]="true"
  (onClose)="onClose($event)">
</magary-message>`,
  custom: `<magary-message
  severity="secondary"
  text="Custom Icon"
  icon="settings">
</magary-message>`,
};

@Component({
  selector: 'view-message',
  standalone: true,
  imports: [
    CommonModule,
    MagaryMessage,
    MagaryButton,
    Highlight,
    MagaryTabs,
    MagaryTab,
  ],
  templateUrl: './view-message.html',
  styleUrl: './view-message.scss',
})
export class ViewMessage {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  readonly importExample = CODE_EXAMPLES.import;
  readonly exampleBasic = CODE_EXAMPLES.basic;
  readonly exampleClosable = CODE_EXAMPLES.closable;
  readonly exampleCustom = CODE_EXAMPLES.custom;

  msgs: DynamicMessage[] = [];

  inputsConfig: MessageInputRow[] = [
    {
      name: 'severity',
      type: "'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'",
      default: "'info'",
      descriptionKey: 'components.messages.message.apiInputs.severity.desc',
    },
    {
      name: 'text',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.messages.message.apiInputs.text.desc',
    },
    {
      name: 'detail',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.messages.message.apiInputs.detail.desc',
    },
    {
      name: 'icon',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.messages.message.apiInputs.icon.desc',
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.messages.message.apiInputs.closable.desc',
    },
    {
      name: 'life',
      type: 'number',
      default: 'undefined',
      descriptionKey: 'components.messages.message.apiInputs.life.desc',
    },
  ];

  outputsConfig: MessageOutputRow[] = [
    {
      name: 'onClose',
      type: 'EventEmitter<Event>',
      descriptionKey: 'components.messages.message.apiOutputs.onClose.desc',
    },
  ];

  showViaService() {
    this.msgs = [
      {
        severity: 'success',
        textKey: 'components.messages.message.dynamic.msg1.text',
        detailKey: 'components.messages.message.dynamic.msg1.detail',
      },
      {
        severity: 'info',
        textKey: 'components.messages.message.dynamic.msg2.text',
        detailKey: 'components.messages.message.dynamic.msg2.detail',
      },
      {
        severity: 'warn',
        textKey: 'components.messages.message.dynamic.msg3.text',
        detailKey: 'components.messages.message.dynamic.msg3.detail',
      },
    ];
  }

  clear() {
    this.msgs = [];
  }

  onClose(event: Event) {}
}
