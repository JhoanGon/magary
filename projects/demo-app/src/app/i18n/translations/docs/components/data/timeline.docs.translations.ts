import { DemoLanguage } from '../../../../types';

export const TIMELINE_DOC_TEXT = {
  es: {
    'components.data.timeline.title': 'MagaryTimeline',
    'components.data.timeline.subtitle':
      'MagaryTimeline visualiza una serie de eventos en orden cronologico.',
    'components.data.timeline.basic.title': 'Timeline Basico',
    'components.data.timeline.basic.desc':
      'Timeline vertical por defecto con alineacion a la izquierda.',
    'components.data.timeline.alternate.title':
      'Alineacion Alternada y Marcadores Personalizados',
    'components.data.timeline.alternate.desc':
      'Timeline con alineacion alternada e iconos personalizados.',
    'components.data.timeline.horizontal.title': 'Timeline Horizontal',
    'components.data.timeline.horizontal.desc':
      'Visualizacion horizontal de eventos.',
    'components.data.timeline.readMore': 'Leer mas',
    'components.data.timeline.apiInputs.title': 'Propiedades (Inputs)',
    'components.data.timeline.apiInputs.desc':
      'Atributos para controlar el comportamiento del componente.',
    'components.data.timeline.apiInputs.header.name': 'Nombre',
    'components.data.timeline.apiInputs.header.type': 'Tipo',
    'components.data.timeline.apiInputs.header.default': 'Por Defecto',
    'components.data.timeline.apiInputs.header.description': 'Descripcion',
    'components.data.timeline.apiInputs.value.desc':
      'Array de eventos a mostrar.',
    'components.data.timeline.apiInputs.layout.desc':
      'Orientacion del timeline.',
    'components.data.timeline.apiInputs.align.desc':
      'Alineacion del contenido y posicion.',
    'components.data.timeline.apiTemplates.title': 'Templates',
    'components.data.timeline.apiTemplates.desc':
      'Templates disponibles para personalizar el contenido.',
    'components.data.timeline.apiTemplates.header.name': 'Nombre',
    'components.data.timeline.apiTemplates.header.context': 'Contexto',
    'components.data.timeline.apiTemplates.header.description': 'Descripcion',
    'components.data.timeline.apiTemplates.content.desc':
      'Template para el contenido principal del evento.',
    'components.data.timeline.apiTemplates.opposite.desc':
      'Template para el lado opuesto (ej. fecha).',
    'components.data.timeline.apiTemplates.marker.desc':
      'Template para el marcador central.',
  },
  en: {
    'components.data.timeline.title': 'MagaryTimeline',
    'components.data.timeline.subtitle':
      'MagaryTimeline renders a series of events in chronological order.',
    'components.data.timeline.basic.title': 'Basic Timeline',
    'components.data.timeline.basic.desc':
      'Default vertical timeline with left alignment.',
    'components.data.timeline.alternate.title':
      'Alternate Alignment and Custom Markers',
    'components.data.timeline.alternate.desc':
      'Timeline with alternate alignment and custom icons.',
    'components.data.timeline.horizontal.title': 'Horizontal Timeline',
    'components.data.timeline.horizontal.desc':
      'Horizontal event visualization.',
    'components.data.timeline.readMore': 'Read more',
    'components.data.timeline.apiInputs.title': 'Properties (Inputs)',
    'components.data.timeline.apiInputs.desc':
      'Attributes used to control component behavior.',
    'components.data.timeline.apiInputs.header.name': 'Name',
    'components.data.timeline.apiInputs.header.type': 'Type',
    'components.data.timeline.apiInputs.header.default': 'Default',
    'components.data.timeline.apiInputs.header.description': 'Description',
    'components.data.timeline.apiInputs.value.desc':
      'Array of events to render.',
    'components.data.timeline.apiInputs.layout.desc':
      'Timeline orientation.',
    'components.data.timeline.apiInputs.align.desc':
      'Content alignment and position.',
    'components.data.timeline.apiTemplates.title': 'Templates',
    'components.data.timeline.apiTemplates.desc':
      'Available templates to customize content.',
    'components.data.timeline.apiTemplates.header.name': 'Name',
    'components.data.timeline.apiTemplates.header.context': 'Context',
    'components.data.timeline.apiTemplates.header.description': 'Description',
    'components.data.timeline.apiTemplates.content.desc':
      'Template for main event content.',
    'components.data.timeline.apiTemplates.opposite.desc':
      'Template for opposite side content (e.g. date).',
    'components.data.timeline.apiTemplates.marker.desc':
      'Template for center marker.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
