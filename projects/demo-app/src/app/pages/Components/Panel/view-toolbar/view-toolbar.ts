import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryToolbar,
  MagaryButton,
  MagaryInput,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type ToolbarInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'app-view-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MagaryToolbar,
    MagaryButton,
    MagaryInput,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-toolbar.html',
  styleUrl: './view-toolbar.scss',
})
export class ViewToolbar {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  codeBasic = `<magary-toolbar>
    <div start>
        <magary-button label="New" icon="plus" class="mr-2"></magary-button>
        <magary-button label="Upload" icon="upload" severity="secondary"></magary-button>
    </div>
    <div center>
        <i class="pi pi-search"></i>
         <!-- Assuming separate icon, or input -->
         <span style="color: var(--text-secondary)">Titular Central</span>
    </div>
    <div end>
        <magary-input placeholder="Search..." icon="search"></magary-input>
    </div>
</magary-toolbar>`;

  readonly inputRows: ToolbarInputRow[] = [
    {
      name: 'style',
      type: 'object',
      default: 'null',
      descriptionKey: 'components.panel.toolbar.inputs.style.desc',
    },
    {
      name: 'styleClass',
      type: 'string',
      default: 'null',
      descriptionKey: 'components.panel.toolbar.inputs.styleClass.desc',
    },
  ];
}
