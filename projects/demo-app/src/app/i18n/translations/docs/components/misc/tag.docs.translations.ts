import { DemoLanguage } from '../../../../types';

export const TAG_DOC_TEXT = {
  es: {
    'components.misc.tag.title': 'MagaryTag',
    'components.misc.tag.subtitle':
      'Etiquetas para categorizar contenido o indicar estado.',
    'components.misc.tag.states.title': 'Estados y Severidad',
    'components.misc.tag.states.desc':
      'Estados predefinidos para comunicar semantica (exito, error, info, etc).',
    'components.misc.tag.rounded.title': 'Redondeado e Iconos',
    'components.misc.tag.rounded.desc':
      'Opcionalmente bordes de pildora e iconos integrados.',
    'components.misc.tag.api.title': 'Propiedades (Inputs)',
    'components.misc.tag.api.desc': 'Configuracion del componente Tag.',
    'components.misc.tag.api.header.name': 'Nombre',
    'components.misc.tag.api.header.type': 'Tipo',
    'components.misc.tag.api.header.default': 'Defecto',
    'components.misc.tag.api.header.description': 'Descripcion',
    'components.misc.tag.api.value.desc': 'Texto a mostrar.',
    'components.misc.tag.api.severity.desc':
      'Color semantico de la etiqueta.',
    'components.misc.tag.api.rounded.desc':
      'Si es verdadero, redondea completamente los bordes.',
    'components.misc.tag.api.icon.desc': 'Nombre del icono a mostrar.',
    'components.misc.tag.demo.primary': 'Primary',
    'components.misc.tag.demo.secondary': 'Secondary',
    'components.misc.tag.demo.success': 'Success',
    'components.misc.tag.demo.info': 'Info',
    'components.misc.tag.demo.warning': 'Warning',
    'components.misc.tag.demo.danger': 'Danger',
    'components.misc.tag.demo.contrast': 'Contrast',
    'components.misc.tag.demo.rounded': 'Rounded',
    'components.misc.tag.demo.scoreTop': 'Score Top',
    'components.misc.tag.demo.pending': 'Pending',
    'components.misc.tag.tabs.html': 'HTML',
  },
  en: {
    'components.misc.tag.title': 'MagaryTag',
    'components.misc.tag.subtitle':
      'Labels to categorize content or indicate status.',
    'components.misc.tag.states.title': 'States and Severity',
    'components.misc.tag.states.desc':
      'Predefined states to communicate semantics (success, error, info, etc).',
    'components.misc.tag.rounded.title': 'Rounded and Icons',
    'components.misc.tag.rounded.desc':
      'Optional pill borders and integrated icons.',
    'components.misc.tag.api.title': 'Properties (Inputs)',
    'components.misc.tag.api.desc': 'Configuration options for Tag component.',
    'components.misc.tag.api.header.name': 'Name',
    'components.misc.tag.api.header.type': 'Type',
    'components.misc.tag.api.header.default': 'Default',
    'components.misc.tag.api.header.description': 'Description',
    'components.misc.tag.api.value.desc': 'Text to display.',
    'components.misc.tag.api.severity.desc': 'Semantic color for the tag.',
    'components.misc.tag.api.rounded.desc':
      'If true, rounds all borders fully.',
    'components.misc.tag.api.icon.desc': 'Icon name to display.',
    'components.misc.tag.demo.primary': 'Primary',
    'components.misc.tag.demo.secondary': 'Secondary',
    'components.misc.tag.demo.success': 'Success',
    'components.misc.tag.demo.info': 'Info',
    'components.misc.tag.demo.warning': 'Warning',
    'components.misc.tag.demo.danger': 'Danger',
    'components.misc.tag.demo.contrast': 'Contrast',
    'components.misc.tag.demo.rounded': 'Rounded',
    'components.misc.tag.demo.scoreTop': 'Score Top',
    'components.misc.tag.demo.pending': 'Pending',
    'components.misc.tag.tabs.html': 'HTML',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
