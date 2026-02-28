import { DemoLanguage } from '../../../../types';

export const BREADCRUMB_DOC_TEXT = {
  es: {
    'components.menu.breadcrumb.title': 'Magary Breadcrumb',
    'components.menu.breadcrumb.subtitle':
      'Indica la ubicacion de la pagina actual dentro de una jerarquia de navegacion.',
    'components.menu.breadcrumb.basic.title': 'Ejemplo Basico',
    'components.menu.breadcrumb.basic.desc':
      'Uso estandar con un icono de inicio y rutas.',
    'components.menu.breadcrumb.apiInputs.title': 'Propiedades (Inputs)',
    'components.menu.breadcrumb.apiInputs.desc':
      'Atributos para configurar el componente.',
    'components.menu.breadcrumb.apiInputs.header.name': 'Nombre',
    'components.menu.breadcrumb.apiInputs.header.type': 'Tipo',
    'components.menu.breadcrumb.apiInputs.header.default': 'Por Defecto',
    'components.menu.breadcrumb.apiInputs.header.description': 'Descripcion',
    'components.menu.breadcrumb.apiInputs.model.desc':
      'Array de items del menu.',
    'components.menu.breadcrumb.apiInputs.home.desc':
      'Item inicial, usualmente el home.',
    'components.menu.breadcrumb.apiInputs.style.desc':
      'Estilos inline del componente.',
    'components.menu.breadcrumb.apiInputs.styleClass.desc':
      'Clase CSS externa.',
    'components.menu.breadcrumb.apiOutputs.title': 'Eventos (Outputs)',
    'components.menu.breadcrumb.apiOutputs.desc':
      'Eventos emitidos por el componente.',
    'components.menu.breadcrumb.apiOutputs.header.name': 'Nombre',
    'components.menu.breadcrumb.apiOutputs.header.type': 'Tipo',
    'components.menu.breadcrumb.apiOutputs.header.description': 'Descripcion',
    'components.menu.breadcrumb.apiOutputs.onItemClick.desc':
      'Callback invocado al hacer click en un item.',
  },
  en: {
    'components.menu.breadcrumb.title': 'Magary Breadcrumb',
    'components.menu.breadcrumb.subtitle':
      'Indicates the current page location within a navigation hierarchy.',
    'components.menu.breadcrumb.basic.title': 'Basic Example',
    'components.menu.breadcrumb.basic.desc':
      'Standard usage with a home icon and routes.',
    'components.menu.breadcrumb.apiInputs.title': 'Properties (Inputs)',
    'components.menu.breadcrumb.apiInputs.desc':
      'Attributes used to configure the component.',
    'components.menu.breadcrumb.apiInputs.header.name': 'Name',
    'components.menu.breadcrumb.apiInputs.header.type': 'Type',
    'components.menu.breadcrumb.apiInputs.header.default': 'Default',
    'components.menu.breadcrumb.apiInputs.header.description': 'Description',
    'components.menu.breadcrumb.apiInputs.model.desc':
      'Array of menu items.',
    'components.menu.breadcrumb.apiInputs.home.desc':
      'Initial item, usually the home link.',
    'components.menu.breadcrumb.apiInputs.style.desc':
      'Inline styles for the component.',
    'components.menu.breadcrumb.apiInputs.styleClass.desc':
      'External CSS class.',
    'components.menu.breadcrumb.apiOutputs.title': 'Events (Outputs)',
    'components.menu.breadcrumb.apiOutputs.desc':
      'Events emitted by the component.',
    'components.menu.breadcrumb.apiOutputs.header.name': 'Name',
    'components.menu.breadcrumb.apiOutputs.header.type': 'Type',
    'components.menu.breadcrumb.apiOutputs.header.description': 'Description',
    'components.menu.breadcrumb.apiOutputs.onItemClick.desc':
      'Callback invoked when a breadcrumb item is clicked.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
