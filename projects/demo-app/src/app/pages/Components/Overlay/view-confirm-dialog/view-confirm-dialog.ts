import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from 'ngx-highlightjs';
import {
  MagaryButton,
  MagaryConfirmDialog,
  MagaryConfirmationService,
  MagaryCard,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type ConfirmDialogServiceRow = {
  property: string;
  type: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'app-view-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    Highlight,
    MagaryButton,
    MagaryConfirmDialog,
    MagaryCard,
    MagaryTabs,
    MagaryTab,
  ],
  providers: [MagaryConfirmationService],
  templateUrl: './view-confirm-dialog.html',
  styleUrl: './view-confirm-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewConfirmDialog {
  private confirmationService = inject(MagaryConfirmationService);
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  readonly tabsConfig = {
    backgroundLine: 'rgba(255, 255, 255, 0.1)',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  readonly importCode =
    "import { MagaryConfirmDialog, MagaryConfirmationService } from 'ng-magary';";

  readonly serviceRows: ConfirmDialogServiceRow[] = [
    {
      property: 'header',
      type: 'string',
      descriptionKey: 'components.overlay.confirmDialog.service.header.desc',
    },
    {
      property: 'message',
      type: 'string',
      descriptionKey: 'components.overlay.confirmDialog.service.message.desc',
    },
    {
      property: 'icon',
      type: 'string',
      descriptionKey: 'components.overlay.confirmDialog.service.icon.desc',
    },
    {
      property: 'accept',
      type: 'Function',
      descriptionKey: 'components.overlay.confirmDialog.service.accept.desc',
    },
    {
      property: 'reject',
      type: 'Function',
      descriptionKey: 'components.overlay.confirmDialog.service.reject.desc',
    },
    {
      property: 'acceptLabel',
      type: 'string',
      descriptionKey:
        'components.overlay.confirmDialog.service.acceptLabel.desc',
    },
    {
      property: 'rejectLabel',
      type: 'string',
      descriptionKey:
        'components.overlay.confirmDialog.service.rejectLabel.desc',
    },
  ];

  readonly exampleHTML = `<!-- In your template -->
<magary-confirm-dialog></magary-confirm-dialog>
<magary-button (buttonClick)="confirm1()" label="Confirm"></magary-button>
`;

  readonly exampleTS = `
constructor(private confirmationService: MagaryConfirmationService) {}

confirm1() {
  this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Are you sure?',
      icon: 'triangle-alert',
      accept: () => {
          // Accepted
      }
  });
}
`;

  constructor() {
    effect(() => {
      this.i18n.language();
    });
  }

  confirm1() {
    this.confirmationService.confirm({
      header: this.t('components.overlay.confirmDialog.confirm1.header'),
      message: this.t('components.overlay.confirmDialog.confirm1.message'),
      icon: 'triangle-alert',
      accept: () => {
        console.log('Accepted');
      },
      reject: () => {
        console.log('Rejected');
      },
    });
  }

  confirm2() {
    this.confirmationService.confirm({
      header: this.t('components.overlay.confirmDialog.confirm2.header'),
      message: this.t('components.overlay.confirmDialog.confirm2.message'),
      icon: 'trash-2',
      acceptLabel: this.t('components.overlay.confirmDialog.confirm2.accept'),
      rejectLabel: this.t('components.overlay.confirmDialog.confirm2.reject'),
      accept: () => {
        // Delete logic
      },
    });
  }
}
