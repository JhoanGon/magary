import { DemoLanguage } from '../../../../types';

export const TOOLBAR_DOC_TEXT = {
  es: {
    'components.panel.toolbar.title': 'Toolbar',
    'components.panel.toolbar.subtitle':
      'Componente de agrupacion para botones y otros contenidos.',
    'components.panel.toolbar.import.title': 'Importacion',
    'components.panel.toolbar.basic.title': 'Basico',
    'components.panel.toolbar.basic.desc':
      'Toolbar con grupos start, center y end.',
    'components.panel.toolbar.basic.new': 'Nuevo',
    'components.panel.toolbar.basic.upload': 'Subir',
    'components.panel.toolbar.basic.centerTitle': 'Gestion de Archivos',
    'components.panel.toolbar.basic.searchPlaceholder': 'Buscar...',
    'components.panel.toolbar.inputs.title': 'Propiedades (Inputs)',
    'components.panel.toolbar.table.header.name': 'Nombre',
    'components.panel.toolbar.table.header.type': 'Tipo',
    'components.panel.toolbar.table.header.default': 'Predeterminado',
    'components.panel.toolbar.table.header.description': 'Descripcion',
    'components.panel.toolbar.inputs.style.desc':
      'Estilos en linea del componente.',
    'components.panel.toolbar.inputs.styleClass.desc':
      'Clase CSS del componente.',
    'components.panel.toolbar.tabs.html': 'HTML',
  },
  en: {
    'components.panel.toolbar.title': 'Toolbar',
    'components.panel.toolbar.subtitle':
      'Grouping component for buttons and other content.',
    'components.panel.toolbar.import.title': 'Import',
    'components.panel.toolbar.basic.title': 'Basic',
    'components.panel.toolbar.basic.desc':
      'Toolbar with start, center, and end groups.',
    'components.panel.toolbar.basic.new': 'New',
    'components.panel.toolbar.basic.upload': 'Upload',
    'components.panel.toolbar.basic.centerTitle': 'File Management',
    'components.panel.toolbar.basic.searchPlaceholder': 'Search...',
    'components.panel.toolbar.inputs.title': 'Properties (Inputs)',
    'components.panel.toolbar.table.header.name': 'Name',
    'components.panel.toolbar.table.header.type': 'Type',
    'components.panel.toolbar.table.header.default': 'Default',
    'components.panel.toolbar.table.header.description': 'Description',
    'components.panel.toolbar.inputs.style.desc': 'Inline styles for component.',
    'components.panel.toolbar.inputs.styleClass.desc': 'CSS class for component.',
    'components.panel.toolbar.tabs.html': 'HTML',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
