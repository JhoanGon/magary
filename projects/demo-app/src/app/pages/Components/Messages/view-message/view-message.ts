import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryButton,
  MagaryMessage,
  MagaryCard,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

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
  contrast: `<magary-message severity="contrast" text="Contrast" detail="High contrast message"></magary-message>`,
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
  readonly importExample = CODE_EXAMPLES.import;
  readonly exampleBasic = CODE_EXAMPLES.basic;
  readonly exampleClosable = CODE_EXAMPLES.closable;
  readonly exampleCustom = CODE_EXAMPLES.custom;
  readonly exampleContrast = CODE_EXAMPLES.contrast;

  // Logic for dynamic example
  msgs: any[] = [];

  showViaService() {
    this.msgs = [
      {
        severity: 'success',
        text: 'Message 1',
        detail: 'Dynamic Message Content',
      },
      {
        severity: 'info',
        text: 'Message 2',
        detail: 'Dynamic Message Content',
      },
      {
        severity: 'warn',
        text: 'Message 3',
        detail: 'Dynamic Message Content',
      },
    ];
  }

  clear() {
    this.msgs = [];
  }

  onClose(event: Event) {
    console.log('Message closed', event);
  }
}
