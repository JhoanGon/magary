import { DemoLanguage } from '../../../../types';

export const FIELDSET_DOC_TEXT = {
  es: {
    'components.panel.fieldset.title': 'Fieldset',
    'components.panel.fieldset.subtitle':
      'Componente de agrupacion con area de contenido y leyenda.',
    'components.panel.fieldset.import.title': 'Importacion',
    'components.panel.fieldset.basic.title': 'Basico',
    'components.panel.fieldset.basic.desc':
      'Un fieldset simple con una leyenda.',
    'components.panel.fieldset.basic.legend': 'Header',
    'components.panel.fieldset.toggle.title': 'Colapsable',
    'components.panel.fieldset.toggle.desc':
      'El contenido puede colapsarse haciendo clic en la leyenda.',
    'components.panel.fieldset.toggle.legend': 'Toggleable',
    'components.panel.fieldset.lorem':
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'components.panel.fieldset.inputs.title': 'Propiedades (Inputs)',
    'components.panel.fieldset.outputs.title': 'Eventos (Outputs)',
    'components.panel.fieldset.table.header.name': 'Nombre',
    'components.panel.fieldset.table.header.type': 'Tipo',
    'components.panel.fieldset.table.header.default': 'Predeterminado',
    'components.panel.fieldset.table.header.description': 'Descripcion',
    'components.panel.fieldset.inputs.legend.desc': 'Texto del encabezado.',
    'components.panel.fieldset.inputs.toggleable.desc':
      'Cuando esta habilitado, el contenido se puede alternar.',
    'components.panel.fieldset.inputs.collapsed.desc':
      'Define el estado inicial colapsado.',
    'components.panel.fieldset.outputs.beforeToggle.desc':
      'Callback que se invoca antes de cambiar el estado de colapso.',
    'components.panel.fieldset.outputs.afterToggle.desc':
      'Callback que se invoca despues de cambiar el estado de colapso.',
    'components.panel.fieldset.tabs.html': 'HTML',
  },
  en: {
    'components.panel.fieldset.title': 'Fieldset',
    'components.panel.fieldset.subtitle':
      'Grouping component with a content area and legend.',
    'components.panel.fieldset.import.title': 'Import',
    'components.panel.fieldset.basic.title': 'Basic',
    'components.panel.fieldset.basic.desc': 'A simple fieldset with a legend.',
    'components.panel.fieldset.basic.legend': 'Header',
    'components.panel.fieldset.toggle.title': 'Toggleable',
    'components.panel.fieldset.toggle.desc':
      'Content can be collapsed by clicking the legend.',
    'components.panel.fieldset.toggle.legend': 'Toggleable',
    'components.panel.fieldset.lorem':
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'components.panel.fieldset.inputs.title': 'Properties (Inputs)',
    'components.panel.fieldset.outputs.title': 'Events (Outputs)',
    'components.panel.fieldset.table.header.name': 'Name',
    'components.panel.fieldset.table.header.type': 'Type',
    'components.panel.fieldset.table.header.default': 'Default',
    'components.panel.fieldset.table.header.description': 'Description',
    'components.panel.fieldset.inputs.legend.desc': 'Header text.',
    'components.panel.fieldset.inputs.toggleable.desc':
      'When enabled, content can be toggled.',
    'components.panel.fieldset.inputs.collapsed.desc':
      'Defines initial collapsed state.',
    'components.panel.fieldset.outputs.beforeToggle.desc':
      'Callback invoked before collapsed state changes.',
    'components.panel.fieldset.outputs.afterToggle.desc':
      'Callback invoked after collapsed state changes.',
    'components.panel.fieldset.tabs.html': 'HTML',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
