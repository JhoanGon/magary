import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MagarySpeedDial, MagaryTab, MagaryTabs } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
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
interface Section {
  id: string;
  title: string;
  description: string;
  type: 'code' | 'demo' | 'single-demo' | 'custom-demo' | 'table' | 'list';
  content?: { code: string; language: string };
  configs?: SpeedDialConfig[];
  config?: SpeedDialConfig;
  customConfig?: SpeedDialConfig;
  codeExamples?: CodeExample[];
  tableData?: any[];
  listItems?: string[];
}
@Component({
  selector: 'magary-view-speed-dial',
  imports: [CommonModule, MagarySpeedDial, MagaryTabs, MagaryTab, Highlight],
  templateUrl: './view-speed-dial.html',
  styleUrl: './view-speed-dial.scss',
})
export class ViewSpeedDial {
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
        title: 'Import',
        description:
          'Importa el componente en tu módulo o componente standalone',
        type: 'code',
        content: {
          code: "import { MagarySpeedDial } from 'ng-magary';",
          language: 'typescript',
        },
      },
      {
        id: 'basic',
        title: 'Uso Básico',
        description: 'Ejemplo simple con configuración por defecto',
        type: 'demo',
        configs: this.speedDialConfigs.basic,
        codeExamples: [
          { label: 'HTML', code: this.exampleBasicHtml, language: 'html' },
          { label: 'TS', code: this.exampleTs, language: 'typescript' },
        ],
      },
      {
        id: 'circle',
        title: 'Círculo',
        description: 'Ejemplo de menu en círculo',
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
        title: 'Semi Círculo',
        description: 'Ejemplo de menu en semicírculo',
        type: 'demo',
        configs: this.speedDialConfigs.semicircle,
        codeExamples: [
          { label: 'HTML', code: this.exampleSemiCircleHtml, language: 'html' },
          { label: 'TS', code: this.exampleTs, language: 'typescript' },
        ],
      },
      {
        id: 'quartercircle',
        title: 'Quarto de Círculo',
        description: 'Ejemplo de menu en cuarto de círculo',
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
        title: 'Tooltip',
        description:
          'El tooltip es opcional, se puede agregar o quitar a gusto por cada item',
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
        title: 'Propiedades (Inputs)',
        description: 'Todas las propiedades disponibles del componente',
        type: 'table',
        tableData: [
          {
            name: 'items',
            type: 'SpeedDialItem[]',
            default: '—',
            description: 'Lista de acciones con ícono, tooltip y comando',
          },
          {
            name: 'icon',
            type: 'string',
            default: "'fas fa-plus'",
            description: 'Ícono del botón inicial',
          },
          {
            name: 'activeIcon',
            type: 'string',
            default: "'fas fa-times'",
            description: 'Ícono al estar abierto',
          },
          {
            name: 'type',
            type: "'linear' | 'circle' | 'semicircle' | 'quartercircle'",
            default: "'linear'",
            description: 'Tipo de disposición',
          },
          {
            name: 'direction',
            type: "'up' | 'down' | 'left' | 'right' | 'up-left' | ...",
            default: '—',
            description: 'Dirección del despliegue (solo para linear)',
          },
          {
            name: 'radius',
            type: 'number',
            default: '80',
            description: 'Radio de expansión',
          },
          {
            name: 'showMask',
            type: 'boolean',
            default: 'true',
            description: 'Activa máscara al abrir',
          },
          {
            name: 'background',
            type: 'string',
            default: "'#007bff'",
            description: 'Color del botón trigger',
          },
        ],
      },
      {
        id: 'events',
        title: 'Eventos (Outputs)',
        description: 'Eventos emitidos por cada acción',
        type: 'table',
        tableData: [
          {
            name: 'command',
            type: '(event: Event) => void',
            description: 'Función que se ejecuta al hacer clic en un ítem',
          },
        ],
      },
      {
        id: 'accessibility',
        title: 'Accesibilidad',
        description: 'Características de accesibilidad del SpeedDial',
        type: 'list',
        listItems: [
          '<strong>Foco:</strong> El botón principal y los ítems pueden ser navegados con teclado',
          '<strong>ARIA:</strong> Puedes agregar <code>aria-label</code> a los ítems en tu propia lógica',
          '<strong>Visual:</strong> Indicadores visuales de estado abierto/cerrado y foco',
        ],
      },
    ];
  }
  importExample = "import { MagarySpeedDial } from 'ng-magary';";
  actionItems: SpeedDialItem[] = [
    {
      icon: 'fas fa-pencil',
      tooltip: 'Editar',
      command: () => console.log('Editar'),
    },
    {
      icon: 'fas fa-trash',
      tooltip: 'Eliminar',
      command: () => console.log('Eliminar'),
    },
    {
      icon: 'fas fa-share-alt',
      tooltip: 'Compartir',
      command: () => console.log('Compartir'),
    },
  ];
  actionItemsTooltip: SpeedDialItem[] = [
    {
      icon: 'fas fa-pencil',
      tooltip: 'Editar',
      command: () => console.log('Editar'),
    },
    {
      icon: 'fas fa-trash',
      command: () => console.log('Eliminar'),
    },
    {
      icon: 'fas fa-share-alt',
      tooltip: '',
      command: () => console.log('Compartir'),
    },
  ];
  exampleTs = `actionItems: SpeedDialItem[] = [
    {
      icon: 'fas fa-pencil',
      tooltip: 'Editar',
      command: () => console.log('Editar'),
    },
    {
      icon: 'fas fa-trash',
      tooltip: 'Eliminar',
      command: () => console.log('Eliminar'),
    },
    {
      icon: 'fas fa-share-alt',
      tooltip: 'Compartir',
      command: () => console.log('Compartir'),
    },
  ];`;
  exampleTooltipTs = `actionItems: SpeedDialItem[] = [
    {
      icon: 'fas fa-pencil',
      tooltip: 'Editar',
      command: () => console.log('Editar'),
    },
    {
      icon: 'fas fa-trash',
      command: () => console.log('Eliminar'),
    },
    {
      icon: 'fas fa-share-alt',
      tooltip: '',
      command: () => console.log('Compartir'),
    },
  ];`;
  exampleBasicHtml: string = `
  <magary-speed-dial [items]="actionItems" direction="up"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="down"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="left"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="right"></magary-speed-dial>`;
  exampleCircleHtml: string = `
  <magary-speed-dial
    [type]="'circle'"
    [items]="actionItems">
  </magary-speed-dial>`;
  exampleSemiCircleHtml: string = `
  <magary-speed-dial [items]="actionItems" direction="down" [type]="'semicircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="up" [type]="'semicircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="left" [type]="'semicircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="right" [type]="'semicircle'"></magary-speed-dial>`;
  exampleQuarterCircleHtml: string = `
  <magary-speed-dial [items]="actionItems" direction="down-right" [type]="'quartercircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="up-right" [type]="'quartercircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="down-left" [type]="'quartercircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="up-left" [type]="'quartercircle'"></magary-speed-dial>`;
  exampleTooltipHtml: string = `
  <magary-speed-dial
    [direction]="'right'"
    [items]="actionItemsTooltip"
    [background]="'#0eb4d7'">
  </magary-speed-dial>`;
  exampleCommand: string = `
  items = [
    {
      icon: 'fas fa-plus',
      tooltip: 'Crear',
      command: (e) => console.log('Crear', e)
    }
  ];`;
  exampleRandom: string = `
  <magary-speed-dial
    [items]="[
      { icon: 'fas fa-plus', tooltip: 'Nuevo', command: create },
      { icon: 'fas fa-edit', tooltip: 'Editar', command: edit },
      { icon: 'fas fa-trash', tooltip: 'Eliminar', command: remove }
    ]"
    [type]="'circle'"
    [background]="'#0d6efd'"
  ></magary-speed-dial>`;
  trackByIndex(index: number): number {
    return index;
  }
  trackBySection(index: number, section: Section): string {
    return section.id;
  }
  trackByConfig(index: number, config: SpeedDialConfig): string {
    return `${config.class}-${config.direction}-${config.type}`;
  }
  getItems(itemsName: string): SpeedDialItem[] {
    return itemsName === 'actionItemsTooltip'
      ? this.actionItemsTooltip
      : this.actionItems;
  }
  getCodeExamples(section: Section): CodeExample[] {
    if (section.id === 'events') {
      return [
        { label: 'Ejemplo', code: this.exampleCommand, language: 'typescript' },
      ];
    }
    return section.codeExamples || [];
  }
}
