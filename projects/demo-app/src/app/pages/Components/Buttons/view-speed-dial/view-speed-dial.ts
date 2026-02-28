import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { MagarySpeedDial, MagaryTab, MagaryTabs } from 'ng-magary';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

interface SpeedDialItem {
  icon: string;
  tooltip?: string;
  command?: (event?: Event) => void;
}

interface SpeedDialConfig {
  class: string;
  direction?:
    | 'left'
    | 'right'
    | 'up'
    | 'down'
    | 'up-left'
    | 'up-right'
    | 'down-left'
    | 'down-right';
  type?: 'linear' | 'circle' | 'semicircle' | 'quartercircle';
  showMask?: boolean;
  items: string;
  style?: string;
  background?: string;
}

interface CodeExample {
  label: string;
  code: string;
  language: string;
}

interface SpeedDialTableRow {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
  default?: string;
}

interface Section {
  id: string;
  titleKey: DocsTextKey;
  descriptionKey: DocsTextKey;
  type: 'code' | 'demo' | 'single-demo' | 'custom-demo' | 'table' | 'list';
  content?: { code: string; language: string };
  configs?: SpeedDialConfig[];
  config?: SpeedDialConfig;
  customConfig?: SpeedDialConfig;
  codeExamples?: CodeExample[];
  tableData?: SpeedDialTableRow[];
  listItemKeys?: DocsTextKey[];
}

@Component({
  selector: 'magary-view-speed-dial',
  imports: [CommonModule, MagarySpeedDial, MagaryTabs, MagaryTab, Highlight],
  templateUrl: './view-speed-dial.html',
  styleUrl: './view-speed-dial.scss',
})
export class ViewSpeedDial {
  readonly i18n = inject(DemoI18nService);

  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  readonly speedDialConfigs = {
    basic: [
      { class: 'top', direction: 'down' as const, items: 'actionItems' },
      { class: 'left', direction: 'right' as const, items: 'actionItems' },
      { class: 'right', direction: 'left' as const, items: 'actionItems' },
      { class: 'bottom', direction: 'up' as const, items: 'actionItems' },
    ],
    semicircle: [
      {
        class: 'top',
        direction: 'down' as const,
        type: 'semicircle' as const,
        showMask: false,
        items: 'actionItems',
      },
      {
        class: 'left',
        direction: 'right' as const,
        type: 'semicircle' as const,
        showMask: false,
        items: 'actionItems',
      },
      {
        class: 'right',
        direction: 'left' as const,
        type: 'semicircle' as const,
        showMask: false,
        items: 'actionItems',
      },
      {
        class: 'bottom',
        direction: 'up' as const,
        type: 'semicircle' as const,
        showMask: false,
        items: 'actionItems',
      },
    ],
    quartercircle: [
      {
        class: 'top-left',
        direction: 'down-right' as const,
        type: 'quartercircle' as const,
        showMask: false,
        items: 'actionItems',
      },
      {
        class: 'down-left',
        direction: 'up-right' as const,
        type: 'quartercircle' as const,
        showMask: false,
        items: 'actionItems',
      },
      {
        class: 'top-right',
        direction: 'down-left' as const,
        type: 'quartercircle' as const,
        showMask: false,
        items: 'actionItems',
      },
      {
        class: 'down-right',
        direction: 'up-left' as const,
        type: 'quartercircle' as const,
        showMask: false,
        items: 'actionItems',
      },
    ],
  };

  get sections(): Section[] {
    return [
      {
        id: 'import',
        titleKey: 'components.buttons.speedDial.import.title',
        descriptionKey: 'components.buttons.speedDial.import.desc',
        type: 'code',
        content: {
          code: "import { MagarySpeedDial } from 'ng-magary';",
          language: 'typescript',
        },
      },
      {
        id: 'basic',
        titleKey: 'components.buttons.speedDial.basic.title',
        descriptionKey: 'components.buttons.speedDial.basic.desc',
        type: 'demo',
        configs: this.speedDialConfigs.basic,
        codeExamples: [
          { label: 'HTML', code: this.exampleBasicHtml, language: 'html' },
          { label: 'TS', code: this.exampleTs, language: 'typescript' },
        ],
      },
      {
        id: 'circle',
        titleKey: 'components.buttons.speedDial.circle.title',
        descriptionKey: 'components.buttons.speedDial.circle.desc',
        type: 'single-demo',
        config: {
          class: 'center',
          type: 'circle' as const,
          items: 'actionItems',
          showMask: false,
        },
        codeExamples: [
          { label: 'HTML', code: this.exampleCircleHtml, language: 'html' },
          { label: 'TS', code: this.exampleTs, language: 'typescript' },
        ],
      },
      {
        id: 'semicircle',
        titleKey: 'components.buttons.speedDial.semicircle.title',
        descriptionKey: 'components.buttons.speedDial.semicircle.desc',
        type: 'demo',
        configs: this.speedDialConfigs.semicircle,
        codeExamples: [
          { label: 'HTML', code: this.exampleSemiCircleHtml, language: 'html' },
          { label: 'TS', code: this.exampleTs, language: 'typescript' },
        ],
      },
      {
        id: 'quartercircle',
        titleKey: 'components.buttons.speedDial.quartercircle.title',
        descriptionKey: 'components.buttons.speedDial.quartercircle.desc',
        type: 'demo',
        configs: this.speedDialConfigs.quartercircle,
        codeExamples: [
          {
            label: 'HTML',
            code: this.exampleQuarterCircleHtml,
            language: 'html',
          },
          { label: 'TS', code: this.exampleTs, language: 'typescript' },
        ],
      },
      {
        id: 'tooltip',
        titleKey: 'components.buttons.speedDial.tooltip.title',
        descriptionKey: 'components.buttons.speedDial.tooltip.desc',
        type: 'custom-demo',
        customConfig: {
          class: 'center',
          style: 'top: 10%',
          direction: 'right' as const,
          items: 'actionItemsTooltip',
          showMask: false,
          background: '#0eb4d7',
        },
        codeExamples: [
          { label: 'HTML', code: this.exampleTooltipHtml, language: 'html' },
          { label: 'TS', code: this.exampleTooltipTs, language: 'typescript' },
        ],
      },
      {
        id: 'properties',
        titleKey: 'components.buttons.speedDial.properties.title',
        descriptionKey: 'components.buttons.speedDial.properties.desc',
        type: 'table',
        tableData: [
          {
            name: 'items',
            type: 'SpeedDialItem[]',
            default: 'REQUIRED',
            descriptionKey: 'components.buttons.speedDial.props.items.desc',
          },
          {
            name: 'icon',
            type: 'string',
            default: "'plus'",
            descriptionKey: 'components.buttons.speedDial.props.icon.desc',
          },
          {
            name: 'activeIcon',
            type: 'string',
            default: "'x'",
            descriptionKey: 'components.buttons.speedDial.props.activeIcon.desc',
          },
          {
            name: 'type',
            type: "'linear' | 'circle' | 'semicircle' | 'quartercircle'",
            default: "'linear'",
            descriptionKey: 'components.buttons.speedDial.props.type.desc',
          },
          {
            name: 'direction',
            type: "'up' | 'down' | 'left' | 'right' | ...",
            default: 'undefined',
            descriptionKey: 'components.buttons.speedDial.props.direction.desc',
          },
          {
            name: 'radius',
            type: 'number',
            default: '80',
            descriptionKey: 'components.buttons.speedDial.props.radius.desc',
          },
          {
            name: 'showMask',
            type: 'boolean',
            default: 'false',
            descriptionKey: 'components.buttons.speedDial.props.showMask.desc',
          },
          {
            name: 'background',
            type: 'string',
            default: "'#007bff'",
            descriptionKey: 'components.buttons.speedDial.props.background.desc',
          },
          {
            name: 'triggerSize',
            type: 'number',
            default: '56',
            descriptionKey: 'components.buttons.speedDial.props.triggerSize.desc',
          },
          {
            name: 'itemSize',
            type: 'number',
            default: '40',
            descriptionKey: 'components.buttons.speedDial.props.itemSize.desc',
          },
          {
            name: 'itemGap',
            type: 'number',
            default: '64',
            descriptionKey: 'components.buttons.speedDial.props.itemGap.desc',
          },
          {
            name: 'closeOnItemSelect',
            type: 'boolean',
            default: 'true',
            descriptionKey:
              'components.buttons.speedDial.props.closeOnItemSelect.desc',
          },
          {
            name: 'ariaLabel',
            type: 'string',
            default: "'Speed dial menu'",
            descriptionKey: 'components.buttons.speedDial.props.ariaLabel.desc',
          },
        ],
      },
      {
        id: 'events',
        titleKey: 'components.buttons.speedDial.events.title',
        descriptionKey: 'components.buttons.speedDial.events.desc',
        type: 'table',
        tableData: [
          {
            name: 'speedDialToggle',
            type: 'boolean',
            descriptionKey:
              'components.buttons.speedDial.events.speedDialToggle.desc',
          },
          {
            name: 'itemSelect',
            type: '{ item: SpeedDialItem; event: Event }',
            descriptionKey: 'components.buttons.speedDial.events.itemSelect.desc',
          },
        ],
      },
      {
        id: 'accessibility',
        titleKey: 'components.buttons.speedDial.accessibility.title',
        descriptionKey: 'components.buttons.speedDial.accessibility.desc',
        type: 'list',
        listItemKeys: [
          'components.buttons.speedDial.a11y.keyboard',
          'components.buttons.speedDial.a11y.aria',
          'components.buttons.speedDial.a11y.focus',
          'components.buttons.speedDial.a11y.outsideClick',
        ],
      },
    ];
  }

  get actionItems(): SpeedDialItem[] {
    return [
      {
        icon: 'pencil',
        tooltip: this.i18n.translateDocs('components.buttons.speedDial.action.edit'),
        command: () => {},
      },
      {
        icon: 'trash',
        tooltip: this.i18n.translateDocs('components.buttons.speedDial.action.delete'),
        command: () => {},
      },
      {
        icon: 'share-2',
        tooltip: this.i18n.translateDocs('components.buttons.speedDial.action.share'),
        command: () => {},
      },
    ];
  }

  get actionItemsTooltip(): SpeedDialItem[] {
    return [
      {
        icon: 'pencil',
        tooltip: this.i18n.translateDocs('components.buttons.speedDial.action.edit'),
        command: () => {},
      },
      {
        icon: 'trash',
        command: () => {},
      },
      {
        icon: 'share-2',
        tooltip: '',
        command: () => {},
      },
    ];
  }

  exampleTs = `actionItems: SpeedDialItem[] = [
    {
      icon: 'pencil',
      tooltip: 'Edit',
      command: () => console.log('Edit'),
    },
    {
      icon: 'trash',
      tooltip: 'Delete',
      command: () => console.log('Delete'),
    },
    {
      icon: 'share-2',
      tooltip: 'Share',
      command: () => console.log('Share'),
    },
  ];`;

  exampleTooltipTs = `actionItems: SpeedDialItem[] = [
    {
      icon: 'pencil',
      tooltip: 'Edit',
      command: () => console.log('Edit'),
    },
    {
      icon: 'trash',
      command: () => console.log('Delete'),
    },
    {
      icon: 'share-2',
      tooltip: '',
      command: () => console.log('Share'),
    },
  ];`;

  exampleBasicHtml = `
  <magary-speed-dial [items]="actionItems" direction="up"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="down"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="left"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="right"></magary-speed-dial>`;

  exampleCircleHtml = `
  <magary-speed-dial
    [type]="'circle'"
    [items]="actionItems">
  </magary-speed-dial>`;

  exampleSemiCircleHtml = `
  <magary-speed-dial [items]="actionItems" direction="down" [type]="'semicircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="up" [type]="'semicircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="left" [type]="'semicircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="right" [type]="'semicircle'"></magary-speed-dial>`;

  exampleQuarterCircleHtml = `
  <magary-speed-dial [items]="actionItems" direction="down-right" [type]="'quartercircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="up-right" [type]="'quartercircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="down-left" [type]="'quartercircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="up-left" [type]="'quartercircle'"></magary-speed-dial>`;

  exampleTooltipHtml = `
  <magary-speed-dial
    [direction]="'right'"
    [items]="actionItemsTooltip"
    [background]="'#0eb4d7'">
  </magary-speed-dial>`;

  exampleCommand = `
  items = [
    {
      icon: 'plus',
      tooltip: 'Create',
      command: (e) => console.log('Create', e)
    }
  ];`;

  exampleRandom = `
  <div class="relative-container">
    <magary-speed-dial
      [items]="[
        { icon: 'plus', tooltip: 'New', command: create },
        { icon: 'pencil', tooltip: 'Edit', command: edit },
        { icon: 'trash', tooltip: 'Delete', command: remove }
      ]"
      [type]="'circle'"
      [background]="'#0d6efd'"
    ></magary-speed-dial>
  </div>`;

  trackBySection(_index: number, section: Section): string {
    return section.id;
  }

  getItems(itemsName: string): SpeedDialItem[] {
    return itemsName === 'actionItemsTooltip'
      ? this.actionItemsTooltip
      : this.actionItems;
  }

  getCodeExamples(section: Section): CodeExample[] {
    if (section.id === 'events') {
      return [
        {
          label: this.i18n.translateDocs(
            'components.buttons.speedDial.events.exampleLabel',
          ),
          code: this.exampleCommand,
          language: 'typescript',
        },
      ];
    }
    return section.codeExamples || [];
  }
}
