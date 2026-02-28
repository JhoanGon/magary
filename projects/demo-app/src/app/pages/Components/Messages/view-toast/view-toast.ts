import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MagaryButton,
  MagaryToastService,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

interface CodeExample {
  labelKey: DocsTextKey;
  code: string;
  language: string;
}

interface ApiTableRow {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
  default?: string;
}

interface Section {
  id: string;
  titleKey: DocsTextKey;
  descriptionKey: DocsTextKey;
  type: 'code' | 'demo' | 'table';
  content?: { code: string; language: string };
  codeExamples?: CodeExample[];
  tableData?: ApiTableRow[];
}

@Component({
  selector: 'app-view-toast',
  imports: [CommonModule, MagaryButton, Highlight, MagaryTabs, MagaryTab],
  templateUrl: './view-toast.html',
  styleUrl: './view-toast.scss',
})
export class ViewToast {
  private toastService = inject(MagaryToastService);
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  get sections(): Section[] {
    return [
    {
      id: 'import',
      titleKey: 'components.messages.toast.sections.import.title',
      descriptionKey: 'components.messages.toast.sections.import.desc',
      type: 'code',
      content: {
        code: `import { MagaryToastService, MagaryToast } from 'ng-magary';`,
        language: 'typescript',
      },
    },
    {
      id: 'basic',
      titleKey: 'components.messages.toast.sections.basic.title',
      descriptionKey: 'components.messages.toast.sections.basic.desc',
      type: 'demo',
      codeExamples: [
        {
          labelKey: 'components.messages.toast.tabs.html',
          code: this.exampleBasicHtml,
          language: 'html',
        },
        {
          labelKey: 'components.messages.toast.tabs.ts',
          code: this.exampleBasicTs,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'types',
      titleKey: 'components.messages.toast.sections.types.title',
      descriptionKey: 'components.messages.toast.sections.types.desc',
      type: 'demo',
      codeExamples: [
        {
          labelKey: 'components.messages.toast.tabs.ts',
          code: this.exampleTypesTs,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'sticky',
      titleKey: 'components.messages.toast.sections.sticky.title',
      descriptionKey: 'components.messages.toast.sections.sticky.desc',
      type: 'demo',
      codeExamples: [
        {
          labelKey: 'components.messages.toast.tabs.ts',
          code: this.exampleStickyTs,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'api-toast',
      titleKey: 'components.messages.toast.sections.apiToast.title',
      descriptionKey: 'components.messages.toast.sections.apiToast.desc',
      type: 'table',
      tableData: [
        {
          name: 'type',
          type: "'success' | 'info' | 'warning' | 'error'",
          default: "'info'",
          descriptionKey: 'components.messages.toast.apiToast.type.desc',
        },
        {
          name: 'title',
          type: 'string',
          default: '-',
          descriptionKey: 'components.messages.toast.apiToast.title.desc',
        },
        {
          name: 'message',
          type: 'string',
          default: '-',
          descriptionKey: 'components.messages.toast.apiToast.message.desc',
        },
        {
          name: 'duration',
          type: 'number',
          default: '3000',
          descriptionKey: 'components.messages.toast.apiToast.duration.desc',
        },
        {
          name: 'life',
          type: 'number',
          default: '3000',
          descriptionKey: 'components.messages.toast.apiToast.life.desc',
        },
        {
          name: 'sticky',
          type: 'boolean',
          default: 'false',
          descriptionKey: 'components.messages.toast.apiToast.sticky.desc',
        },
        {
          name: 'icon',
          type: 'string',
          default: '-',
          descriptionKey: 'components.messages.toast.apiToast.icon.desc',
        },
        {
          name: 'id',
          type: 'string',
          default: 'auto',
          descriptionKey: 'components.messages.toast.apiToast.id.desc',
        },
        {
          name: 'data',
          type: 'unknown',
          default: '-',
          descriptionKey: 'components.messages.toast.apiToast.data.desc',
        },
      ],
    },
    {
      id: 'api-component',
      titleKey: 'components.messages.toast.sections.apiComponent.title',
      descriptionKey: 'components.messages.toast.sections.apiComponent.desc',
      type: 'table',
      tableData: [
        {
          name: 'position',
          type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' ...",
          default: "'top-right'",
          descriptionKey: 'components.messages.toast.apiComponent.position.desc',
        },
        {
          name: 'baseZIndex',
          type: 'number',
          default: '1100',
          descriptionKey: 'components.messages.toast.apiComponent.baseZIndex.desc',
        },
        {
          name: 'offsetX',
          type: 'string',
          default: "'1rem'",
          descriptionKey: 'components.messages.toast.apiComponent.offsetX.desc',
        },
        {
          name: 'offsetY',
          type: 'string',
          default: "'1rem'",
          descriptionKey: 'components.messages.toast.apiComponent.offsetY.desc',
        },
      ],
    },
    ];
  }

  showSuccess() {
    this.toastService.add({
      type: 'success',
      title: this.t('components.messages.toast.toast.success.title'),
      message: this.t('components.messages.toast.toast.success.message'),
    });
  }

  showInfo() {
    this.toastService.add({
      type: 'info',
      title: this.t('components.messages.toast.toast.info.title'),
      message: this.t('components.messages.toast.toast.info.message'),
    });
  }

  showWarning() {
    this.toastService.add({
      type: 'warning',
      title: this.t('components.messages.toast.toast.warning.title'),
      message: this.t('components.messages.toast.toast.warning.message'),
    });
  }

  showError() {
    this.toastService.add({
      type: 'error',
      title: this.t('components.messages.toast.toast.error.title'),
      message: this.t('components.messages.toast.toast.error.message'),
    });
  }

  showSticky() {
    this.toastService.add({
      type: 'info',
      title: this.t('components.messages.toast.toast.sticky.title'),
      message: this.t('components.messages.toast.toast.sticky.message'),
      sticky: true,
    });
  }

  exampleBasicTs = `import { Component, inject } from '@angular/core';
import { MagaryToastService } from 'ng-magary';

@Component({ ... })
export class MyComponent {
  private toastService = inject(MagaryToastService);

  showToast() {
    this.toastService.add({
      type: 'success',
      title: 'Hello World',
      message: 'This is a complete notification.',
      duration: 5000,
      icon: 'rocket',
      sticky: false,
    });
  }
}`;

  exampleBasicHtml = `<!-- In your main layout (e.g. app.component.html) -->
<magary-toast position="top-right" offsetY="5rem"></magary-toast>

<!-- In your template -->
<magary-button (click)="showToast()" label="Show Toast"></magary-button>`;

  exampleTypesTs = `this.toastService.add({ type: 'success', title: 'Success', message: 'All good' });
this.toastService.add({ type: 'info', title: 'Info', message: 'Useful information' });
this.toastService.add({ type: 'warning', title: 'Warning', message: 'Something looks wrong' });
this.toastService.add({ type: 'error', title: 'Error', message: 'The operation failed' });`;

  exampleStickyTs = `this.toastService.add({
  type: 'info',
  title: 'Sticky',
  message: 'I will stay until manually closed.',
  sticky: true
});`;
}
