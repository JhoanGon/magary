import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryBreadcrumb,
  MagaryCard,
  MagaryTabs,
  MagaryTab,
  BreadcrumbItem,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type BreadcrumbInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type BreadcrumbOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'view-breadcrumb',
  standalone: true,
  imports: [
    CommonModule,
    MagaryBreadcrumb,
    MagaryCard,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-breadcrumb.html',
  styleUrls: ['./view-breadcrumb.scss'],
})
export class ViewBreadcrumb implements OnInit {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  items: BreadcrumbItem[] = [];
  house: BreadcrumbItem | undefined;

  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  inputsConfig: BreadcrumbInputRow[] = [
    {
      name: 'model',
      type: 'BreadcrumbItem[]',
      default: 'null',
      descriptionKey: 'components.menu.breadcrumb.apiInputs.model.desc',
    },
    {
      name: 'home',
      type: 'BreadcrumbItem',
      default: 'null',
      descriptionKey: 'components.menu.breadcrumb.apiInputs.home.desc',
    },
    {
      name: 'style',
      type: 'object',
      default: 'null',
      descriptionKey: 'components.menu.breadcrumb.apiInputs.style.desc',
    },
    {
      name: 'styleClass',
      type: 'string',
      default: 'null',
      descriptionKey: 'components.menu.breadcrumb.apiInputs.styleClass.desc',
    },
  ];

  outputsConfig: BreadcrumbOutputRow[] = [
    {
      name: 'onItemClick',
      type: 'EventEmitter',
      descriptionKey: 'components.menu.breadcrumb.apiOutputs.onItemClick.desc',
    },
  ];

  ngOnInit() {
    this.items = [
      { label: 'Computer' },
      { label: 'Notebook' },
      { label: 'Accessories' },
      { label: 'Backpacks' },
      { label: 'Item' },
    ];

    this.house = { icon: 'house', url: '/' };
  }

  exampleHTML = `
<magary-breadcrumb [model]="items" [house]="house"></magary-breadcrumb>
`;

  exampleTS = `
import { BreadcrumbItem } from 'ng-magary';

export class ViewBreadcrumb implements OnInit {
    items: BreadcrumbItem[] | undefined;
    house: BreadcrumbItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Computer' },
            { label: 'Notebook' },
            { label: 'Accessories' },
            { label: 'Backpacks' },
            { label: 'Item' }
        ];

        this.house = { icon: 'house', url: '/' };
    }
}
`;
}
