import { DemoLanguage } from '../../../../types';

export const SPEED_DIAL_DOC_TEXT = {
  es: {
    'components.buttons.speedDial.title': 'Magary Speed Dial',
    'components.buttons.speedDial.subtitle':
      'Componente de menu flotante para accesos rapidos y acciones frecuentes.',
    'components.buttons.speedDial.import.title': 'Import',
    'components.buttons.speedDial.import.desc':
      'Importa el componente en tu modulo o componente standalone.',
    'components.buttons.speedDial.basic.title': 'Uso Basico',
    'components.buttons.speedDial.basic.desc':
      'Ejemplo simple con configuracion por defecto.',
    'components.buttons.speedDial.circle.title': 'Circulo',
    'components.buttons.speedDial.circle.desc': 'Ejemplo de menu en circulo.',
    'components.buttons.speedDial.semicircle.title': 'Semi Circulo',
    'components.buttons.speedDial.semicircle.desc':
      'Ejemplo de menu en semicirculo.',
    'components.buttons.speedDial.quartercircle.title': 'Cuarto de Circulo',
    'components.buttons.speedDial.quartercircle.desc':
      'Ejemplo de menu en cuarto de circulo.',
    'components.buttons.speedDial.tooltip.title': 'Tooltip',
    'components.buttons.speedDial.tooltip.desc':
      'El tooltip es opcional y configurable por item.',
    'components.buttons.speedDial.properties.title': 'Propiedades (Inputs)',
    'components.buttons.speedDial.properties.desc':
      'Todas las propiedades disponibles del componente.',
    'components.buttons.speedDial.events.title': 'Eventos (Outputs)',
    'components.buttons.speedDial.events.desc':
      'Eventos emitidos por el componente.',
    'components.buttons.speedDial.accessibility.title': 'Accesibilidad',
    'components.buttons.speedDial.accessibility.desc':
      'Caracteristicas de accesibilidad integradas.',
    'components.buttons.speedDial.complete.title': 'Ejemplos completos',
    'components.buttons.speedDial.complete.desc':
      'Casos de uso comunes para integrar en tu aplicacion.',
    'components.buttons.speedDial.table.header.name': 'Nombre',
    'components.buttons.speedDial.table.header.type': 'Tipo',
    'components.buttons.speedDial.table.header.default': 'Valor por defecto',
    'components.buttons.speedDial.table.header.description': 'Descripcion',
    'components.buttons.speedDial.table.events.header.name': 'Nombre',
    'components.buttons.speedDial.table.events.header.type': 'Tipo',
    'components.buttons.speedDial.table.events.header.description': 'Descripcion',
    'components.buttons.speedDial.props.items.desc':
      'Array de objetos que define las acciones del menu.',
    'components.buttons.speedDial.props.icon.desc':
      'Icono del boton principal cuando el menu esta cerrado.',
    'components.buttons.speedDial.props.activeIcon.desc':
      'Icono del boton principal cuando el menu esta abierto.',
    'components.buttons.speedDial.props.type.desc':
      'Disposicion geometrica de los items (linear, circle, semicircle, quartercircle).',
    'components.buttons.speedDial.props.direction.desc':
      'Direccion de despliegue de las acciones.',
    'components.buttons.speedDial.props.radius.desc':
      'Distancia en pixeles entre el boton principal y los items.',
    'components.buttons.speedDial.props.showMask.desc':
      'Muestra fondo oscuro detras del menu para resaltar acciones.',
    'components.buttons.speedDial.props.background.desc':
      'Color de fondo del boton disparador.',
    'components.buttons.speedDial.props.triggerSize.desc':
      'Tamano en pixeles del boton principal.',
    'components.buttons.speedDial.props.itemSize.desc':
      'Tamano en pixeles de los botones secundarios.',
    'components.buttons.speedDial.props.itemGap.desc':
      'Separacion entre boton principal e items en modo lineal.',
    'components.buttons.speedDial.props.closeOnItemSelect.desc':
      'Si es false, mantiene abierto el menu tras seleccionar.',
    'components.buttons.speedDial.props.ariaLabel.desc':
      'Etiqueta accesible para lectores de pantalla.',
    'components.buttons.speedDial.events.speedDialToggle.desc':
      'Notifica cambios de visibilidad: true abierto, false cerrado.',
    'components.buttons.speedDial.events.itemSelect.desc':
      'Se emite al seleccionar una accion con el item y evento nativo.',
    'components.buttons.speedDial.a11y.keyboard':
      '<strong>Teclado:</strong> Soporte completo por teclado. <code>Escape</code> cierra el menu.',
    'components.buttons.speedDial.a11y.aria':
      '<strong>ARIA:</strong> Uso de <code>aria-label</code> configurable y roles apropiados.',
    'components.buttons.speedDial.a11y.focus':
      '<strong>Foco:</strong> Gestion de foco al abrir/cerrar y al navegar entre items.',
    'components.buttons.speedDial.a11y.outsideClick':
      '<strong>Click outside:</strong> Cierra el menu al hacer click fuera del componente.',
    'components.buttons.speedDial.action.edit': 'Editar',
    'components.buttons.speedDial.action.delete': 'Eliminar',
    'components.buttons.speedDial.action.share': 'Compartir',
    'components.buttons.speedDial.events.exampleLabel': 'Ejemplo',
  },
  en: {
    'components.buttons.speedDial.title': 'Magary Speed Dial',
    'components.buttons.speedDial.subtitle':
      'Floating menu component for quick access and frequent actions.',
    'components.buttons.speedDial.import.title': 'Import',
    'components.buttons.speedDial.import.desc':
      'Import the component in your module or standalone component.',
    'components.buttons.speedDial.basic.title': 'Basic Usage',
    'components.buttons.speedDial.basic.desc':
      'Simple example with default configuration.',
    'components.buttons.speedDial.circle.title': 'Circle',
    'components.buttons.speedDial.circle.desc': 'Circle menu example.',
    'components.buttons.speedDial.semicircle.title': 'Semi Circle',
    'components.buttons.speedDial.semicircle.desc': 'Semi-circle menu example.',
    'components.buttons.speedDial.quartercircle.title': 'Quarter Circle',
    'components.buttons.speedDial.quartercircle.desc':
      'Quarter-circle menu example.',
    'components.buttons.speedDial.tooltip.title': 'Tooltip',
    'components.buttons.speedDial.tooltip.desc':
      'Tooltip is optional and configurable per item.',
    'components.buttons.speedDial.properties.title': 'Properties (Inputs)',
    'components.buttons.speedDial.properties.desc':
      'All available properties for the component.',
    'components.buttons.speedDial.events.title': 'Events (Outputs)',
    'components.buttons.speedDial.events.desc':
      'Events emitted by the component.',
    'components.buttons.speedDial.accessibility.title': 'Accessibility',
    'components.buttons.speedDial.accessibility.desc':
      'Built-in accessibility features.',
    'components.buttons.speedDial.complete.title': 'Complete Examples',
    'components.buttons.speedDial.complete.desc':
      'Common use cases to integrate in your application.',
    'components.buttons.speedDial.table.header.name': 'Name',
    'components.buttons.speedDial.table.header.type': 'Type',
    'components.buttons.speedDial.table.header.default': 'Default',
    'components.buttons.speedDial.table.header.description': 'Description',
    'components.buttons.speedDial.table.events.header.name': 'Name',
    'components.buttons.speedDial.table.events.header.type': 'Type',
    'components.buttons.speedDial.table.events.header.description': 'Description',
    'components.buttons.speedDial.props.items.desc':
      'Array of objects that defines menu actions.',
    'components.buttons.speedDial.props.icon.desc':
      'Main button icon when menu is closed.',
    'components.buttons.speedDial.props.activeIcon.desc':
      'Main button icon when menu is open.',
    'components.buttons.speedDial.props.type.desc':
      'Geometric layout of items (linear, circle, semicircle, quartercircle).',
    'components.buttons.speedDial.props.direction.desc':
      'Direction used to expand actions.',
    'components.buttons.speedDial.props.radius.desc':
      'Distance in pixels from main button to items.',
    'components.buttons.speedDial.props.showMask.desc':
      'Displays a dark backdrop behind the menu.',
    'components.buttons.speedDial.props.background.desc':
      'Background color for the trigger button.',
    'components.buttons.speedDial.props.triggerSize.desc':
      'Size in pixels of the main trigger button.',
    'components.buttons.speedDial.props.itemSize.desc':
      'Size in pixels of secondary action buttons.',
    'components.buttons.speedDial.props.itemGap.desc':
      'Spacing between main button and items in linear mode.',
    'components.buttons.speedDial.props.closeOnItemSelect.desc':
      'If false, keeps the menu open after selecting an item.',
    'components.buttons.speedDial.props.ariaLabel.desc':
      'Accessible label for screen readers.',
    'components.buttons.speedDial.events.speedDialToggle.desc':
      'Notifies visibility changes: true open, false closed.',
    'components.buttons.speedDial.events.itemSelect.desc':
      'Emitted when an action is selected with item and native event.',
    'components.buttons.speedDial.a11y.keyboard':
      '<strong>Keyboard:</strong> Full keyboard support. <code>Escape</code> closes the menu.',
    'components.buttons.speedDial.a11y.aria':
      '<strong>ARIA:</strong> Configurable <code>aria-label</code> and proper roles.',
    'components.buttons.speedDial.a11y.focus':
      '<strong>Focus:</strong> Focus management when opening/closing and navigating items.',
    'components.buttons.speedDial.a11y.outsideClick':
      '<strong>Click outside:</strong> Closes the menu when clicking outside the component.',
    'components.buttons.speedDial.action.edit': 'Edit',
    'components.buttons.speedDial.action.delete': 'Delete',
    'components.buttons.speedDial.action.share': 'Share',
    'components.buttons.speedDial.events.exampleLabel': 'Example',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
