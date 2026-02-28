import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { MagaryCard, MagaryTab, MagaryTabs } from 'ng-magary';
import {
  MagarySplitButton,
  MagaryToastService,
  MenuItem,
} from 'ng-magary';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type SplitButtonInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type SplitButtonOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

type SplitButtonMenuItemRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'view-split-button',
  standalone: true,
  imports: [
    CommonModule,
    MagarySplitButton,
    MagaryCard,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-split-button.html',
  styleUrl: './view-split-button.scss',
})
export class ViewSplitButton {
  private readonly toastService = inject(MagaryToastService);
  readonly i18n = inject(DemoI18nService);

  get saveItems(): MenuItem[] {
    return [
      {
        label: this.i18n.translateDocs('components.buttons.splitButton.action.update'),
        icon: 'refresh-cw',
        command: () =>
          this.save('components.buttons.splitButton.action.update', 'info'),
      },
      {
        label: this.i18n.translateDocs('components.buttons.splitButton.action.delete'),
        icon: 'trash',
        command: () =>
          this.save('components.buttons.splitButton.action.delete', 'error'),
      },
      {
        label: this.i18n.translateDocs('components.buttons.splitButton.action.export'),
        icon: 'download',
        command: () =>
          this.save('components.buttons.splitButton.action.export', 'success'),
      },
    ];
  }

  save(
    actionKey: DocsTextKey,
    type: 'success' | 'info' | 'warning' | 'error' = 'info',
  ) {
    this.toastService.add({
      type,
      title: this.i18n.translateDocs(actionKey),
      message: this.i18n.translateDocs('components.buttons.splitButton.toast.actionMessage'),
    });
  }

  onSave() {
    this.toastService.add({
      type: 'success',
      title: this.i18n.translateDocs('components.buttons.splitButton.toast.savedTitle'),
      message: this.i18n.translateDocs('components.buttons.splitButton.toast.savedMessage'),
    });
  }

  readonly itemsConfig: SplitButtonInputRow[] = [
    {
      name: 'label',
      type: 'string',
      default: 'Save',
      descriptionKey: 'components.buttons.splitButton.apiInputs.label.desc',
    },
    {
      name: 'icon',
      type: 'string',
      default: 'null',
      descriptionKey: 'components.buttons.splitButton.apiInputs.icon.desc',
    },
    {
      name: 'iconSize',
      type: 'number',
      default: '18',
      descriptionKey: 'components.buttons.splitButton.apiInputs.iconSize.desc',
    },
    {
      name: 'model',
      type: 'MenuItem[]',
      default: '[]',
      descriptionKey: 'components.buttons.splitButton.apiInputs.model.desc',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.buttons.splitButton.apiInputs.disabled.desc',
    },
    {
      name: 'styleClass',
      type: 'string',
      default: 'null',
      descriptionKey: 'components.buttons.splitButton.apiInputs.styleClass.desc',
    },
    {
      name: 'backgroundColor',
      type: 'string | null',
      default: 'null',
      descriptionKey:
        'components.buttons.splitButton.apiInputs.backgroundColor.desc',
    },
    {
      name: 'textColor',
      type: 'string | null',
      default: 'null',
      descriptionKey: 'components.buttons.splitButton.apiInputs.textColor.desc',
    },
    {
      name: 'severity',
      type: "'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger'",
      default: "'primary'",
      descriptionKey: 'components.buttons.splitButton.apiInputs.severity.desc',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      descriptionKey: 'components.buttons.splitButton.apiInputs.size.desc',
    },
    {
      name: 'menuPosition',
      type: "'start' | 'end'",
      default: "'start'",
      descriptionKey: 'components.buttons.splitButton.apiInputs.menuPosition.desc',
    },
    {
      name: 'menuAriaLabel',
      type: 'string | null',
      default: 'null',
      descriptionKey: 'components.buttons.splitButton.apiInputs.menuAriaLabel.desc',
    },
    {
      name: 'closeOnItemSelect',
      type: 'boolean',
      default: 'true',
      descriptionKey:
        'components.buttons.splitButton.apiInputs.closeOnItemSelect.desc',
    },
  ];

  readonly eventsConfig: SplitButtonOutputRow[] = [
    {
      name: 'onClick',
      type: 'EventEmitter<MouseEvent>',
      descriptionKey: 'components.buttons.splitButton.apiOutputs.onClick.desc',
    },
    {
      name: 'onDropdownClick',
      type: 'EventEmitter<MouseEvent>',
      descriptionKey:
        'components.buttons.splitButton.apiOutputs.onDropdownClick.desc',
    },
    {
      name: 'itemClick',
      type: 'EventEmitter<{ item: MenuItem; originalEvent: MouseEvent }>',
      descriptionKey: 'components.buttons.splitButton.apiOutputs.itemClick.desc',
    },
  ];

  readonly menuItemConfig: SplitButtonMenuItemRow[] = [
    {
      name: 'label',
      type: 'string',
      descriptionKey: 'components.buttons.splitButton.menuItem.label.desc',
    },
    {
      name: 'icon',
      type: 'string',
      descriptionKey: 'components.buttons.splitButton.menuItem.icon.desc',
    },
    {
      name: 'command',
      type: '(event: { originalEvent: Event, item: MenuItem }) => void',
      descriptionKey: 'components.buttons.splitButton.menuItem.command.desc',
    },
    {
      name: 'url',
      type: 'string',
      descriptionKey: 'components.buttons.splitButton.menuItem.url.desc',
    },
    {
      name: 'routerLink',
      type: '(string | number)[] | string',
      descriptionKey: 'components.buttons.splitButton.menuItem.routerLink.desc',
    },
    {
      name: 'disabled',
      type: 'boolean',
      descriptionKey: 'components.buttons.splitButton.menuItem.disabled.desc',
    },
  ];

  importCode = `import { MagarySplitButton } from 'ng-magary';`;

  basicUsageCode = `<magary-split-button
  label="Save"
  icon="save"
  [model]="saveItems"
  (onClick)="onSave()">
</magary-split-button>`;

  severityCode = `<magary-split-button label="Secondary" [model]="saveItems" severity="secondary"></magary-split-button>
<magary-split-button label="Success" icon="check" [model]="saveItems" severity="success"></magary-split-button>
<magary-split-button label="Info" icon="info" [model]="saveItems" severity="info"></magary-split-button>
<magary-split-button label="Warning" icon="triangle-alert" [model]="saveItems" severity="warning"></magary-split-button>
<magary-split-button label="Danger" icon="x" [model]="saveItems" severity="danger"></magary-split-button>`;

  customColorsCode = `<magary-split-button
  label="Custom"
  icon="palette"
  [model]="saveItems"
  [backgroundColor]="'#0f766e'"
  [textColor]="'#ecfeff'">
</magary-split-button>`;

  sizesCode = `<magary-split-button label="Small" icon="minimize" [model]="saveItems" size="sm"></magary-split-button>
<magary-split-button label="Normal" icon="layout-grid" [model]="saveItems"></magary-split-button>
<magary-split-button label="Large" icon="maximize" [model]="saveItems" size="lg"></magary-split-button>`;

  tsCode = `import { Component, inject } from '@angular/core';
import { MagarySplitButton, MenuItem, MagaryToastService } from 'ng-magary';

@Component({
    ...
    imports: [ MagarySplitButton ]
})
export class ExampleComponent {
    private toastService = inject(MagaryToastService);

    saveItems: MenuItem[] = [
        { label: 'Update', icon: 'refresh-cw', command: () => this.save('Update', 'info') },
        { label: 'Delete', icon: 'trash-2', command: () => this.save('Delete', 'error') },
        { label: 'Export', icon: 'download', command: () => this.save('Export', 'success') }
    ];

    onSave() {
        this.toastService.add({ severity: 'success', summary: 'Saved', detail: 'Default action' });
    }

    save(action: string, severity: string) {
        this.toastService.add({ severity, summary: action, detail: 'Item clicked' });
    }
}`;
}
