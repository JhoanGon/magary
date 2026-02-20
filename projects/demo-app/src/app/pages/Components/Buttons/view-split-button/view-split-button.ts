import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagarySplitButton,
  MenuItem,
  MagaryToastService,
  MagaryToast,
} from 'ng-magary';
import { MagaryCard, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'view-split-button',
  standalone: true,
  imports: [
    CommonModule,
    MagarySplitButton,
    MagaryCard,
    MagaryToast,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-split-button.html',
  styleUrl: './view-split-button.scss',
})
export class ViewSplitButton {
  private toastService = inject(MagaryToastService);

  saveItems: MenuItem[] = [
    {
      label: 'Update',
      icon: 'refresh-cw',
      command: () => this.save('Update', 'info'),
    },
    {
      label: 'Delete',
      icon: 'trash',
      command: () => this.save('Delete', 'error'),
    },
    {
      label: 'Export',
      icon: 'download',
      command: () => this.save('Export', 'success'),
    },
  ];

  nestedItems: MenuItem[] = [
    { label: 'Website', icon: 'globe' },
    { label: 'App', icon: 'smartphone' },
  ];

  save(
    action: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'info',
  ) {
    this.toastService.add({
      type,
      title: action,
      message: `Data ${action.toLowerCase()}d successfully`,
    });
  }

  onSave() {
    this.toastService.add({
      type: 'success',
      title: 'Saved',
      message: 'Default action triggered',
    });
  }

  // Documentation
  itemsConfig = [
    {
      name: 'label',
      type: 'string',
      default: 'Save',
      description: 'Text to display on the default button.',
    },
    {
      name: 'icon',
      type: 'string',
      default: 'null',
      description: 'Nombre del icono (Lucide) para el botón principal.',
    },
    {
      name: 'iconSize',
      type: 'number',
      default: '18',
      description: 'Tamaño del icono en píxeles.',
    },
    {
      name: 'model',
      type: 'MenuItem[]',
      default: '[]',
      description: 'Array of menu items for the dropdown.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description:
        'When present, it specifies that the component should be disabled.',
    },
    {
      name: 'styleClass',
      type: 'string',
      default: 'null',
      description: 'External styling class.',
    },
  ];

  eventsConfig = [
    {
      name: 'onClick',
      type: 'EventEmitter<MouseEvent>',
      description:
        'Callback to invoke when the default (main) button is clicked.',
    },
    {
      name: 'onDropdownClick',
      type: 'EventEmitter<MouseEvent>',
      description:
        'Callback to invoke when the dropdown trigger button is clicked.',
    },
  ];

  menuItemConfig = [
    {
      name: 'label',
      type: 'string',
      description: 'Text to display for the menu item.',
    },
    {
      name: 'icon',
      type: 'string',
      description: 'Icon name (Lucide) to display.',
    },
    {
      name: 'command',
      type: '(event: { originalEvent: Event, item: MenuItem }) => void',
      description: 'Callback to execute when the item is clicked.',
    },
    {
      name: 'url',
      type: 'string',
      description: 'External link to navigate to.',
    },
    {
      name: 'routerLink',
      type: 'any[] | string',
      description: 'Router link for internal navigation.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'If true, the item is disabled.',
    },
  ];

  // Code Examples
  importCode = `import { MagarySplitButton } from 'ng-magary';`;

  basicUsageCode = `<magary-split-button 
  label="Save" 
  icon="save" 
  [model]="saveItems" 
  (onClick)="onSave()">
</magary-split-button>`;

  severityCode = `<magary-split-button label="Secondary" [model]="saveItems" styleClass="p-button-secondary"></magary-split-button>
<magary-split-button label="Success" icon="check" [model]="saveItems" styleClass="p-button-success"></magary-split-button>
<magary-split-button label="Info" icon="info" [model]="saveItems" styleClass="p-button-info"></magary-split-button>
<magary-split-button label="Warning" icon="triangle-alert" [model]="saveItems" styleClass="p-button-warning"></magary-split-button>
<magary-split-button label="Danger" icon="x" [model]="saveItems" styleClass="p-button-danger"></magary-split-button>`;

  sizesCode = `<magary-split-button label="Small" icon="minimize" [model]="saveItems" styleClass="p-button-sm"></magary-split-button>
<magary-split-button label="Normal" icon="layout-grid" [model]="saveItems"></magary-split-button>
<magary-split-button label="Large" icon="maximize" [model]="saveItems" styleClass="p-button-lg"></magary-split-button>`;

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
