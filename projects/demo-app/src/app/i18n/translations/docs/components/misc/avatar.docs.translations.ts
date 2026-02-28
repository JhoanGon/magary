import { DemoLanguage } from '../../../../types';

export const AVATAR_DOC_TEXT = {
  es: {
    'components.misc.avatar.title': 'MagaryAvatar',
    'components.misc.avatar.import.title': 'Import',
    'components.misc.avatar.import.desc':
      'Importa el componente en tu modulo o usalo como componente standalone.',
    'components.misc.avatar.basic.title': 'Ejemplos basicos',
    'components.misc.avatar.basic.desc': 'Tamanos y formas disponibles.',
    'components.misc.avatar.basic.card.sizes': 'Tamanos',
    'components.misc.avatar.label.title': 'Avatar con etiqueta',
    'components.misc.avatar.label.desc':
      'Extrae automaticamente las iniciales del texto proporcionado.',
    'components.misc.avatar.label.card': 'Formas y badges',
    'components.misc.avatar.demo.activeUser': 'Usuario Activo',
    'components.misc.avatar.demo.adminSystem': 'Admin System',
    'components.misc.avatar.demo.fallbackTest': 'Fallback Test',
    'components.misc.avatar.icon.title': 'Avatar con icono',
    'components.misc.avatar.icon.desc':
      'Utiliza iconos para representar estados o roles.',
    'components.misc.avatar.icon.card': 'Iconos con notificaciones',
    'components.misc.avatar.image.title': 'Avatar con imagen',
    'components.misc.avatar.image.desc':
      'Manejo automatico de errores de carga con fallback a iniciales.',
    'components.misc.avatar.image.card': 'Imagenes con badges',
    'components.misc.avatar.interactive.title': 'Avatares interactivos',
    'components.misc.avatar.interactive.desc': 'Avatares con eventos de click.',
    'components.misc.avatar.interactive.card': 'Eventos de click',
    'components.misc.avatar.interactive.lastClick': 'Ultimo click',
    'components.misc.avatar.interactive.status.none': 'Ninguno',
    'components.misc.avatar.click.avatar': 'Avatar clickeado',
    'components.misc.avatar.click.badge': 'Badge clickeado',
    'components.misc.avatar.click.fallbackUser': 'usuario',
    'components.misc.avatar.alert.criticalPrefix': 'Tienes ',
    'components.misc.avatar.alert.criticalSuffix': ' alertas criticas',
    'components.misc.avatar.alert.messagesPrefix': 'Tienes ',
    'components.misc.avatar.alert.messagesSuffix': ' mensajes nuevos',
    'components.misc.avatar.inputs.title': 'Propiedades (Inputs)',
    'components.misc.avatar.inputs.desc':
      'Todas las propiedades disponibles del componente.',
    'components.misc.avatar.inputs.header.name': 'Nombre',
    'components.misc.avatar.inputs.header.type': 'Tipo',
    'components.misc.avatar.inputs.header.default': 'Valor por Defecto',
    'components.misc.avatar.inputs.header.description': 'Descripcion',
    'components.misc.avatar.inputs.label.desc':
      'Texto para generar iniciales automaticamente.',
    'components.misc.avatar.inputs.image.desc': 'URL de la imagen del avatar.',
    'components.misc.avatar.inputs.icon.desc': 'Nombre del icono.',
    'components.misc.avatar.inputs.shape.desc': 'Forma del avatar.',
    'components.misc.avatar.inputs.size.desc': 'Tamano del avatar.',
    'components.misc.avatar.inputs.badgeValue.desc':
      'Valor del badge de notificacion.',
    'components.misc.avatar.inputs.badgeSeverity.desc': 'Color/tipo del badge.',
    'components.misc.avatar.inputs.customStyle.desc':
      'Estilos CSS personalizados.',
    'components.misc.avatar.outputs.title': 'Eventos (Outputs)',
    'components.misc.avatar.outputs.desc':
      'Eventos emitidos por el componente.',
    'components.misc.avatar.outputs.header.name': 'Nombre',
    'components.misc.avatar.outputs.header.type': 'Tipo',
    'components.misc.avatar.outputs.header.description': 'Descripcion',
    'components.misc.avatar.outputs.avatarClick.desc':
      'Se emite cuando se hace click en el avatar o en el badge.',
    'components.misc.avatar.a11y.title': 'Accesibilidad',
    'components.misc.avatar.a11y.item.aria':
      'ARIA labels descriptivos automaticos.',
    'components.misc.avatar.a11y.item.keyboard':
      'Navegacion por teclado con Enter y Espacio.',
    'components.misc.avatar.a11y.item.focus':
      'Indicadores visuales de foco claramente visibles.',
    'components.misc.avatar.a11y.item.contrast':
      'Colores accesibles con buen contraste por defecto.',
    'components.misc.avatar.a11y.item.fallback':
      'Fallbacks apropiados para imagenes no disponibles.',
  },
  en: {
    'components.misc.avatar.title': 'MagaryAvatar',
    'components.misc.avatar.import.title': 'Import',
    'components.misc.avatar.import.desc':
      'Import the component in your module or use it as a standalone component.',
    'components.misc.avatar.basic.title': 'Basic examples',
    'components.misc.avatar.basic.desc': 'Available sizes and shapes.',
    'components.misc.avatar.basic.card.sizes': 'Sizes',
    'components.misc.avatar.label.title': 'Avatar with label',
    'components.misc.avatar.label.desc':
      'Automatically extracts initials from provided text.',
    'components.misc.avatar.label.card': 'Shapes and badges',
    'components.misc.avatar.demo.activeUser': 'Active User',
    'components.misc.avatar.demo.adminSystem': 'Admin System',
    'components.misc.avatar.demo.fallbackTest': 'Fallback Test',
    'components.misc.avatar.icon.title': 'Avatar with icon',
    'components.misc.avatar.icon.desc':
      'Use icons to represent states or roles.',
    'components.misc.avatar.icon.card': 'Icons with notifications',
    'components.misc.avatar.image.title': 'Avatar with image',
    'components.misc.avatar.image.desc':
      'Automatic image error handling with initials fallback.',
    'components.misc.avatar.image.card': 'Images with badges',
    'components.misc.avatar.interactive.title': 'Interactive avatars',
    'components.misc.avatar.interactive.desc': 'Avatars with click events.',
    'components.misc.avatar.interactive.card': 'Click events',
    'components.misc.avatar.interactive.lastClick': 'Last click',
    'components.misc.avatar.interactive.status.none': 'None',
    'components.misc.avatar.click.avatar': 'Avatar clicked',
    'components.misc.avatar.click.badge': 'Badge clicked',
    'components.misc.avatar.click.fallbackUser': 'user',
    'components.misc.avatar.alert.criticalPrefix': 'You have ',
    'components.misc.avatar.alert.criticalSuffix': ' critical alerts',
    'components.misc.avatar.alert.messagesPrefix': 'You have ',
    'components.misc.avatar.alert.messagesSuffix': ' new messages',
    'components.misc.avatar.inputs.title': 'Properties (Inputs)',
    'components.misc.avatar.inputs.desc':
      'All available component properties.',
    'components.misc.avatar.inputs.header.name': 'Name',
    'components.misc.avatar.inputs.header.type': 'Type',
    'components.misc.avatar.inputs.header.default': 'Default',
    'components.misc.avatar.inputs.header.description': 'Description',
    'components.misc.avatar.inputs.label.desc':
      'Text used to generate initials automatically.',
    'components.misc.avatar.inputs.image.desc': 'Avatar image URL.',
    'components.misc.avatar.inputs.icon.desc': 'Icon name.',
    'components.misc.avatar.inputs.shape.desc': 'Avatar shape.',
    'components.misc.avatar.inputs.size.desc': 'Avatar size.',
    'components.misc.avatar.inputs.badgeValue.desc':
      'Notification badge value.',
    'components.misc.avatar.inputs.badgeSeverity.desc':
      'Badge color/severity.',
    'components.misc.avatar.inputs.customStyle.desc': 'Custom CSS styles.',
    'components.misc.avatar.outputs.title': 'Events (Outputs)',
    'components.misc.avatar.outputs.desc': 'Events emitted by the component.',
    'components.misc.avatar.outputs.header.name': 'Name',
    'components.misc.avatar.outputs.header.type': 'Type',
    'components.misc.avatar.outputs.header.description': 'Description',
    'components.misc.avatar.outputs.avatarClick.desc':
      'Emitted when avatar or badge is clicked.',
    'components.misc.avatar.a11y.title': 'Accessibility',
    'components.misc.avatar.a11y.item.aria':
      'Automatic descriptive ARIA labels.',
    'components.misc.avatar.a11y.item.keyboard':
      'Keyboard navigation with Enter and Space.',
    'components.misc.avatar.a11y.item.focus':
      'Clear visible focus indicators.',
    'components.misc.avatar.a11y.item.contrast':
      'Accessible high-contrast default colors.',
    'components.misc.avatar.a11y.item.fallback':
      'Appropriate fallbacks for unavailable images.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
