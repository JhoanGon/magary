import { DemoLanguage } from '../../../../types';

export const MESSAGE_DOC_TEXT = {
  es: {
    'components.messages.message.title': 'MagaryMessage',
    'components.messages.message.subtitle':
      'Componente para mostrar mensajes y alertas en linea.',
    'components.messages.message.import.title': 'Import',
    'components.messages.message.import.desc':
      'Importa el componente en tu modulo o componente standalone.',
    'components.messages.message.severity.title': 'Severidades',
    'components.messages.message.severity.desc':
      'Diferentes niveles de severidad para comunicar el estado.',
    'components.messages.message.severity.success': 'Success',
    'components.messages.message.severity.info': 'Info',
    'components.messages.message.severity.warning': 'Warning',
    'components.messages.message.severity.error': 'Error',
    'components.messages.message.severity.secondary': 'Secondary',
    'components.messages.message.severity.contrast': 'Contrast',
    'components.messages.message.severity.detail': 'Contenido del mensaje',
    'components.messages.message.closable.title': 'Cerrable',
    'components.messages.message.closable.desc':
      'Mensajes que pueden ser descartados por el usuario.',
    'components.messages.message.closable.text': 'Mensaje cerrable',
    'components.messages.message.closable.detail':
      'Haz clic en la X para cerrarme',
    'components.messages.message.custom.title': 'Icono Personalizado',
    'components.messages.message.custom.desc':
      'Usa cualquier icono compatible (ej: Lucide).',
    'components.messages.message.custom.text': 'Actualizacion del sistema',
    'components.messages.message.custom.detail': 'Configuracion requerida',
    'components.messages.message.animation.title': 'Animaciones',
    'components.messages.message.animation.desc':
      'Entrada y salida suave utilizando Angular Animations.',
    'components.messages.message.animation.show': 'Mostrar Mensajes',
    'components.messages.message.animation.clear': 'Limpiar',
    'components.messages.message.dynamic.msg1.text': 'Mensaje 1',
    'components.messages.message.dynamic.msg1.detail':
      'Contenido dinamico del mensaje',
    'components.messages.message.dynamic.msg2.text': 'Mensaje 2',
    'components.messages.message.dynamic.msg2.detail':
      'Contenido dinamico del mensaje',
    'components.messages.message.dynamic.msg3.text': 'Mensaje 3',
    'components.messages.message.dynamic.msg3.detail':
      'Contenido dinamico del mensaje',
    'components.messages.message.apiInputs.title': 'Propiedades (Inputs)',
    'components.messages.message.apiInputs.desc':
      'Todas las propiedades disponibles del componente.',
    'components.messages.message.apiInputs.header.name': 'Nombre',
    'components.messages.message.apiInputs.header.type': 'Tipo',
    'components.messages.message.apiInputs.header.default': 'Valor por Defecto',
    'components.messages.message.apiInputs.header.description': 'Descripcion',
    'components.messages.message.apiInputs.severity.desc':
      'Nivel de severidad del mensaje.',
    'components.messages.message.apiInputs.text.desc':
      'Texto principal (resumen) del mensaje.',
    'components.messages.message.apiInputs.detail.desc':
      'Texto detallado del mensaje.',
    'components.messages.message.apiInputs.icon.desc':
      'Nombre del icono personalizado.',
    'components.messages.message.apiInputs.closable.desc':
      'Si es verdadero, muestra un boton de cerrar.',
    'components.messages.message.apiInputs.life.desc':
      'Tiempo en milisegundos para cerrar automaticamente el mensaje.',
    'components.messages.message.apiOutputs.title': 'Eventos (Outputs)',
    'components.messages.message.apiOutputs.desc':
      'Eventos emitidos por el componente.',
    'components.messages.message.apiOutputs.header.name': 'Nombre',
    'components.messages.message.apiOutputs.header.type': 'Tipo',
    'components.messages.message.apiOutputs.header.description': 'Descripcion',
    'components.messages.message.apiOutputs.onClose.desc':
      'Se emite cuando el usuario cierra el mensaje.',
    'components.messages.message.tabs.html': 'HTML',
    'components.messages.message.tabs.ts': 'TypeScript',
  },
  en: {
    'components.messages.message.title': 'MagaryMessage',
    'components.messages.message.subtitle':
      'Component to display inline messages and alerts.',
    'components.messages.message.import.title': 'Import',
    'components.messages.message.import.desc':
      'Import the component in your module or standalone component.',
    'components.messages.message.severity.title': 'Severities',
    'components.messages.message.severity.desc':
      'Different severity levels to communicate status.',
    'components.messages.message.severity.success': 'Success',
    'components.messages.message.severity.info': 'Info',
    'components.messages.message.severity.warning': 'Warning',
    'components.messages.message.severity.error': 'Error',
    'components.messages.message.severity.secondary': 'Secondary',
    'components.messages.message.severity.contrast': 'Contrast',
    'components.messages.message.severity.detail': 'Message Content',
    'components.messages.message.closable.title': 'Closable',
    'components.messages.message.closable.desc':
      'Messages that can be dismissed by the user.',
    'components.messages.message.closable.text': 'Closable Message',
    'components.messages.message.closable.detail': 'Click the X to close me',
    'components.messages.message.custom.title': 'Custom Icon',
    'components.messages.message.custom.desc':
      'Use any compatible icon (e.g. Lucide).',
    'components.messages.message.custom.text': 'System Update',
    'components.messages.message.custom.detail': 'Configuration required',
    'components.messages.message.animation.title': 'Animations',
    'components.messages.message.animation.desc':
      'Smooth entry and exit using Angular Animations.',
    'components.messages.message.animation.show': 'Show Messages',
    'components.messages.message.animation.clear': 'Clear',
    'components.messages.message.dynamic.msg1.text': 'Message 1',
    'components.messages.message.dynamic.msg1.detail':
      'Dynamic Message Content',
    'components.messages.message.dynamic.msg2.text': 'Message 2',
    'components.messages.message.dynamic.msg2.detail':
      'Dynamic Message Content',
    'components.messages.message.dynamic.msg3.text': 'Message 3',
    'components.messages.message.dynamic.msg3.detail':
      'Dynamic Message Content',
    'components.messages.message.apiInputs.title': 'Properties (Inputs)',
    'components.messages.message.apiInputs.desc':
      'All available component properties.',
    'components.messages.message.apiInputs.header.name': 'Name',
    'components.messages.message.apiInputs.header.type': 'Type',
    'components.messages.message.apiInputs.header.default': 'Default',
    'components.messages.message.apiInputs.header.description': 'Description',
    'components.messages.message.apiInputs.severity.desc':
      'Severity level of the message.',
    'components.messages.message.apiInputs.text.desc':
      'Main summary text of the message.',
    'components.messages.message.apiInputs.detail.desc':
      'Detailed message text.',
    'components.messages.message.apiInputs.icon.desc':
      'Custom icon name.',
    'components.messages.message.apiInputs.closable.desc':
      'If true, displays a close button.',
    'components.messages.message.apiInputs.life.desc':
      'Time in milliseconds before auto-closing the message.',
    'components.messages.message.apiOutputs.title': 'Events (Outputs)',
    'components.messages.message.apiOutputs.desc':
      'Events emitted by the component.',
    'components.messages.message.apiOutputs.header.name': 'Name',
    'components.messages.message.apiOutputs.header.type': 'Type',
    'components.messages.message.apiOutputs.header.description': 'Description',
    'components.messages.message.apiOutputs.onClose.desc':
      'Emitted when the user closes the message.',
    'components.messages.message.tabs.html': 'HTML',
    'components.messages.message.tabs.ts': 'TypeScript',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
