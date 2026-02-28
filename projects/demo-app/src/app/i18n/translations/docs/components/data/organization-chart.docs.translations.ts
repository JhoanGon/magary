import { DemoLanguage } from '../../../../types';

export const ORGANIZATION_CHART_DOC_TEXT = {
  es: {
    'components.data.organizationChart.title': 'Organization Chart',
    'components.data.organizationChart.subtitle':
      'Visualizacion de datos jerarquicos en estructura de arbol.',
    'components.data.organizationChart.basic.title': 'Basico',
    'components.data.organizationChart.basic.desc':
      'Ejemplo basico con estructura jerarquica y seleccion.',
    'components.data.organizationChart.basic.chartAriaLabel':
      'Organigrama de compania',
    'components.data.organizationChart.selectedLabel': 'Seleccionado:',
    'components.data.organizationChart.eventLabel': 'Evento:',
    'components.data.organizationChart.events.none': 'Sin eventos',
    'components.data.organizationChart.events.selected': 'Seleccionado: ',
    'components.data.organizationChart.events.unselected':
      'Deseleccionado: ',
    'components.data.organizationChart.events.expanded': 'Expandido: ',
    'components.data.organizationChart.events.collapsed': 'Colapsado: ',
    'components.data.organizationChart.events.unknownNode':
      'nodo desconocido',
    'components.data.organizationChart.apiInputs.title':
      'Propiedades (Inputs)',
    'components.data.organizationChart.apiInputs.header.name': 'Nombre',
    'components.data.organizationChart.apiInputs.header.type': 'Tipo',
    'components.data.organizationChart.apiInputs.header.default': 'Default',
    'components.data.organizationChart.apiInputs.header.description':
      'Descripcion',
    'components.data.organizationChart.apiInputs.value.desc':
      'Array de nodos raiz.',
    'components.data.organizationChart.apiInputs.selectionMode.desc':
      'Modo de seleccion.',
    'components.data.organizationChart.apiInputs.selection.desc':
      'Nodo o nodos seleccionados.',
    'components.data.organizationChart.apiInputs.collapsible.desc':
      'Permite colapsar ramas.',
    'components.data.organizationChart.apiInputs.chartAriaLabel.desc':
      'Etiqueta accesible del arbol organizacional.',
    'components.data.organizationChart.aria.inputsTable':
      'Tabla de propiedades del componente OrganizationChart',
  },
  en: {
    'components.data.organizationChart.title': 'Organization Chart',
    'components.data.organizationChart.subtitle':
      'Hierarchical data visualization in tree structure.',
    'components.data.organizationChart.basic.title': 'Basic',
    'components.data.organizationChart.basic.desc':
      'Basic example with hierarchical structure and selection.',
    'components.data.organizationChart.basic.chartAriaLabel':
      'Company organization chart',
    'components.data.organizationChart.selectedLabel': 'Selected:',
    'components.data.organizationChart.eventLabel': 'Event:',
    'components.data.organizationChart.events.none': 'No events yet',
    'components.data.organizationChart.events.selected': 'Selected: ',
    'components.data.organizationChart.events.unselected': 'Unselected: ',
    'components.data.organizationChart.events.expanded': 'Expanded: ',
    'components.data.organizationChart.events.collapsed': 'Collapsed: ',
    'components.data.organizationChart.events.unknownNode':
      'unknown node',
    'components.data.organizationChart.apiInputs.title':
      'Properties (Inputs)',
    'components.data.organizationChart.apiInputs.header.name': 'Name',
    'components.data.organizationChart.apiInputs.header.type': 'Type',
    'components.data.organizationChart.apiInputs.header.default': 'Default',
    'components.data.organizationChart.apiInputs.header.description':
      'Description',
    'components.data.organizationChart.apiInputs.value.desc':
      'Root node array.',
    'components.data.organizationChart.apiInputs.selectionMode.desc':
      'Selection mode.',
    'components.data.organizationChart.apiInputs.selection.desc':
      'Selected node or nodes.',
    'components.data.organizationChart.apiInputs.collapsible.desc':
      'Allows collapsing branches.',
    'components.data.organizationChart.apiInputs.chartAriaLabel.desc':
      'Accessible label for the organization tree.',
    'components.data.organizationChart.aria.inputsTable':
      'OrganizationChart component properties table',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
