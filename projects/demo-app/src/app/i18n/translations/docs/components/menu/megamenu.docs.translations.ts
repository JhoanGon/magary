import { DemoLanguage } from '../../../../types';

export const MEGAMENU_DOC_TEXT = {
  es: {
    'components.menu.megamenu.title': 'Magary MegaMenu',
    'components.menu.megamenu.subtitle':
      'Menu de navegacion avanzado que muestra submenus en columnas.',
    'components.menu.megamenu.import.title': 'Importacion',
    'components.menu.megamenu.horizontal.title': 'Ejemplo Horizontal',
    'components.menu.megamenu.tabs.html': 'HTML',
    'components.menu.megamenu.tabs.typescript': 'TypeScript',
    'components.menu.megamenu.apiInputs.title': 'Propiedades (Inputs)',
    'components.menu.megamenu.apiInputs.desc':
      'Todas las propiedades disponibles del componente.',
    'components.menu.megamenu.apiInputs.header.name': 'Nombre',
    'components.menu.megamenu.apiInputs.header.type': 'Tipo',
    'components.menu.megamenu.apiInputs.header.default': 'Por Defecto',
    'components.menu.megamenu.apiInputs.header.description': 'Descripcion',
    'components.menu.megamenu.apiInputs.model.desc':
      'Array de objetos MenuItem. La estructura define columnas.',
    'components.menu.megamenu.apiInputs.orientation.desc':
      'Orientacion del menu.',
    'components.menu.megamenu.apiInputs.style.desc': 'Estilos en linea.',
    'components.menu.megamenu.apiInputs.styleClass.desc':
      'Clase CSS personalizada.',
    'components.menu.megamenu.apiOutputs.title': 'Eventos (Outputs)',
    'components.menu.megamenu.apiOutputs.desc':
      'Eventos gestionados a traves del modelo MenuItem.',
    'components.menu.megamenu.apiOutputs.header.name': 'Nombre',
    'components.menu.megamenu.apiOutputs.header.type': 'Tipo',
    'components.menu.megamenu.apiOutputs.header.description': 'Descripcion',
    'components.menu.megamenu.apiOutputs.command.desc':
      'Callback en MenuItem que se ejecuta al hacer click.',
    'components.menu.megamenu.items.videos': 'Videos',
    'components.menu.megamenu.items.video': 'Video',
    'components.menu.megamenu.items.users': 'Usuarios',
    'components.menu.megamenu.items.user': 'Usuario',
    'components.menu.megamenu.items.events': 'Eventos',
    'components.menu.megamenu.items.event': 'Evento',
    'components.menu.megamenu.items.settings': 'Ajustes',
    'components.menu.megamenu.items.setting': 'Ajuste',
    'components.menu.megamenu.toast.title': 'Seleccionado',
  },
  en: {
    'components.menu.megamenu.title': 'Magary MegaMenu',
    'components.menu.megamenu.subtitle':
      'Advanced navigation menu that displays submenus in columns.',
    'components.menu.megamenu.import.title': 'Import',
    'components.menu.megamenu.horizontal.title': 'Horizontal Example',
    'components.menu.megamenu.tabs.html': 'HTML',
    'components.menu.megamenu.tabs.typescript': 'TypeScript',
    'components.menu.megamenu.apiInputs.title': 'Properties (Inputs)',
    'components.menu.megamenu.apiInputs.desc':
      'All available component properties.',
    'components.menu.megamenu.apiInputs.header.name': 'Name',
    'components.menu.megamenu.apiInputs.header.type': 'Type',
    'components.menu.megamenu.apiInputs.header.default': 'Default',
    'components.menu.megamenu.apiInputs.header.description': 'Description',
    'components.menu.megamenu.apiInputs.model.desc':
      'Array of MenuItem objects. The structure defines columns.',
    'components.menu.megamenu.apiInputs.orientation.desc':
      'Menu orientation.',
    'components.menu.megamenu.apiInputs.style.desc': 'Inline styles.',
    'components.menu.megamenu.apiInputs.styleClass.desc':
      'Custom CSS class.',
    'components.menu.megamenu.apiOutputs.title': 'Events (Outputs)',
    'components.menu.megamenu.apiOutputs.desc':
      'Events handled through the MenuItem model.',
    'components.menu.megamenu.apiOutputs.header.name': 'Name',
    'components.menu.megamenu.apiOutputs.header.type': 'Type',
    'components.menu.megamenu.apiOutputs.header.description': 'Description',
    'components.menu.megamenu.apiOutputs.command.desc':
      'MenuItem callback executed on click.',
    'components.menu.megamenu.items.videos': 'Videos',
    'components.menu.megamenu.items.video': 'Video',
    'components.menu.megamenu.items.users': 'Users',
    'components.menu.megamenu.items.user': 'User',
    'components.menu.megamenu.items.events': 'Events',
    'components.menu.megamenu.items.event': 'Event',
    'components.menu.megamenu.items.settings': 'Settings',
    'components.menu.megamenu.items.setting': 'Setting',
    'components.menu.megamenu.toast.title': 'Clicked',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
