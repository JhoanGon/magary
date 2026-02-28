import { DemoLanguage } from '../../../../types';

export const TOAST_DOC_TEXT = {
  es: {
    'components.messages.toast.title': 'Toast',
    'components.messages.toast.subtitle':
      'Notificaciones flotantes con estilo premium, animaciones fluidas y soporte para multiples tipos de mensajes.',
    'components.messages.toast.sections.import.title': 'Import',
    'components.messages.toast.sections.import.desc':
      'Importa el servicio y el componente en tu aplicacion. El componente <magary-toast> debe colocarse en el root (ej. app.component.html).',
    'components.messages.toast.sections.basic.title': 'Uso Basico',
    'components.messages.toast.sections.basic.desc':
      'Inyecta MagaryToastService y usa add() para mostrar notificaciones.',
    'components.messages.toast.sections.types.title': 'Tipos de Mensaje',
    'components.messages.toast.sections.types.desc':
      'Existen 4 tipos de notificaciones: success, info, warning y error.',
    'components.messages.toast.sections.sticky.title': 'Sticky',
    'components.messages.toast.sections.sticky.desc':
      'Las notificaciones sticky no desaparecen automaticamente y requieren accion del usuario para cerrarse.',
    'components.messages.toast.sections.apiToast.title': 'Toast Interface',
    'components.messages.toast.sections.apiToast.desc':
      'Propiedades del objeto Toast.',
    'components.messages.toast.sections.apiComponent.title':
      'MagaryToast (Component)',
    'components.messages.toast.sections.apiComponent.desc':
      'Inputs del componente contenedor <magary-toast>.',
    'components.messages.toast.buttons.show': 'Mostrar Notificacion',
    'components.messages.toast.buttons.success': 'Success',
    'components.messages.toast.buttons.info': 'Info',
    'components.messages.toast.buttons.warning': 'Warning',
    'components.messages.toast.buttons.error': 'Error',
    'components.messages.toast.buttons.sticky': 'Mostrar Sticky',
    'components.messages.toast.table.header.name': 'Nombre',
    'components.messages.toast.table.header.type': 'Tipo',
    'components.messages.toast.table.header.default': 'Default',
    'components.messages.toast.table.header.description': 'Descripcion',
    'components.messages.toast.apiToast.type.desc':
      'Define el estilo visual y el icono de la notificacion.',
    'components.messages.toast.apiToast.title.desc': 'Titulo de la notificacion.',
    'components.messages.toast.apiToast.message.desc': 'Contenido del mensaje.',
    'components.messages.toast.apiToast.duration.desc':
      'Tiempo en ms antes del cierre automatico.',
    'components.messages.toast.apiToast.life.desc':
      'Alias para duration (compatibilidad).',
    'components.messages.toast.apiToast.sticky.desc':
      'Si es true, no se cierra automaticamente.',
    'components.messages.toast.apiToast.icon.desc':
      'Nombre de icono personalizado (ej. "user").',
    'components.messages.toast.apiToast.id.desc':
      'Identificador unico (opcional).',
    'components.messages.toast.apiToast.data.desc':
      'Datos arbitrarios asociados al toast.',
    'components.messages.toast.apiComponent.position.desc':
      'Posicion de las notificaciones en pantalla.',
    'components.messages.toast.apiComponent.baseZIndex.desc':
      'Z-index base para el contenedor.',
    'components.messages.toast.apiComponent.offsetX.desc':
      'Separacion horizontal desde el borde en posiciones left/right.',
    'components.messages.toast.apiComponent.offsetY.desc':
      'Separacion vertical desde el borde en posiciones top/bottom.',
    'components.messages.toast.toast.success.title': 'Exito',
    'components.messages.toast.toast.success.message':
      'Operacion completada correctamente.',
    'components.messages.toast.toast.info.title': 'Informacion',
    'components.messages.toast.toast.info.message': 'Nueva version disponible.',
    'components.messages.toast.toast.warning.title': 'Advertencia',
    'components.messages.toast.toast.warning.message':
      'Tu sesion expirara pronto.',
    'components.messages.toast.toast.error.title': 'Error',
    'components.messages.toast.toast.error.message':
      'Ha ocurrido un error inesperado.',
    'components.messages.toast.toast.sticky.title': 'Sticky Toast',
    'components.messages.toast.toast.sticky.message':
      'Este mensaje permanecera hasta que lo cierres.',
    'components.messages.toast.tabs.html': 'HTML',
    'components.messages.toast.tabs.ts': 'TS',
  },
  en: {
    'components.messages.toast.title': 'Toast',
    'components.messages.toast.subtitle':
      'Floating notifications with premium styling, smooth animations, and support for multiple message types.',
    'components.messages.toast.sections.import.title': 'Import',
    'components.messages.toast.sections.import.desc':
      'Import the service and the component in your application. Place <magary-toast> in the root (e.g. app.component.html).',
    'components.messages.toast.sections.basic.title': 'Basic Usage',
    'components.messages.toast.sections.basic.desc':
      'Inject MagaryToastService and use add() to display notifications.',
    'components.messages.toast.sections.types.title': 'Message Types',
    'components.messages.toast.sections.types.desc':
      'There are 4 notification types: success, info, warning, and error.',
    'components.messages.toast.sections.sticky.title': 'Sticky',
    'components.messages.toast.sections.sticky.desc':
      'Sticky notifications do not close automatically and require user action.',
    'components.messages.toast.sections.apiToast.title': 'Toast Interface',
    'components.messages.toast.sections.apiToast.desc':
      'Properties of the Toast object.',
    'components.messages.toast.sections.apiComponent.title':
      'MagaryToast (Component)',
    'components.messages.toast.sections.apiComponent.desc':
      'Inputs of the <magary-toast> container component.',
    'components.messages.toast.buttons.show': 'Show Notification',
    'components.messages.toast.buttons.success': 'Success',
    'components.messages.toast.buttons.info': 'Info',
    'components.messages.toast.buttons.warning': 'Warning',
    'components.messages.toast.buttons.error': 'Error',
    'components.messages.toast.buttons.sticky': 'Show Sticky',
    'components.messages.toast.table.header.name': 'Name',
    'components.messages.toast.table.header.type': 'Type',
    'components.messages.toast.table.header.default': 'Default',
    'components.messages.toast.table.header.description': 'Description',
    'components.messages.toast.apiToast.type.desc':
      'Defines the visual style and icon of the notification.',
    'components.messages.toast.apiToast.title.desc':
      'Notification title.',
    'components.messages.toast.apiToast.message.desc':
      'Message content.',
    'components.messages.toast.apiToast.duration.desc':
      'Time in ms before auto-close.',
    'components.messages.toast.apiToast.life.desc':
      'Alias for duration (compatibility).',
    'components.messages.toast.apiToast.sticky.desc':
      'If true, it does not auto-close.',
    'components.messages.toast.apiToast.icon.desc':
      'Custom icon name (e.g. "user").',
    'components.messages.toast.apiToast.id.desc':
      'Unique identifier (optional).',
    'components.messages.toast.apiToast.data.desc':
      'Arbitrary data attached to the toast.',
    'components.messages.toast.apiComponent.position.desc':
      'Notification position on screen.',
    'components.messages.toast.apiComponent.baseZIndex.desc':
      'Base z-index for the container.',
    'components.messages.toast.apiComponent.offsetX.desc':
      'Horizontal spacing from screen edge for left/right positions.',
    'components.messages.toast.apiComponent.offsetY.desc':
      'Vertical spacing from screen edge for top/bottom positions.',
    'components.messages.toast.toast.success.title': 'Success',
    'components.messages.toast.toast.success.message':
      'Operation completed successfully.',
    'components.messages.toast.toast.info.title': 'Information',
    'components.messages.toast.toast.info.message': 'New version available.',
    'components.messages.toast.toast.warning.title': 'Warning',
    'components.messages.toast.toast.warning.message':
      'Your session will expire soon.',
    'components.messages.toast.toast.error.title': 'Error',
    'components.messages.toast.toast.error.message':
      'An unexpected error occurred.',
    'components.messages.toast.toast.sticky.title': 'Sticky Toast',
    'components.messages.toast.toast.sticky.message':
      'This message will remain until you close it.',
    'components.messages.toast.tabs.html': 'HTML',
    'components.messages.toast.tabs.ts': 'TS',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
