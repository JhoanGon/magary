import { DemoLanguage } from '../../../../types';

export const IMAGE_DOC_TEXT = {
  es: {
    'components.media.image.title': 'MagaryImage',
    'components.media.image.subtitle':
      'Componente para mostrar imagenes con funcionalidades avanzadas como previsualizacion, zoom y rotacion.',
    'components.media.image.import.title': 'Import',
    'components.media.image.import.desc':
      'Importa el componente en tu modulo o componente standalone.',
    'components.media.image.basic.title': 'Ejemplo Basico',
    'components.media.image.basic.desc':
      'Visualizacion simple de una imagen.',
    'components.media.image.basic.cardTitle': 'Basic',
    'components.media.image.basic.alt': 'Imagen basica',
    'components.media.image.preview.title': 'Previsualizacion (Premium)',
    'components.media.image.preview.desc':
      'Habilita la previsualizacion a pantalla completa con zoom, rotacion y descarga.',
    'components.media.image.preview.cardTitle': 'Preview Mode',
    'components.media.image.preview.alt': 'Imagen con preview',
    'components.media.image.apiInputs.title': 'Propiedades (Inputs)',
    'components.media.image.apiInputs.desc':
      'Todas las propiedades disponibles del componente.',
    'components.media.image.apiInputs.header.name': 'Nombre',
    'components.media.image.apiInputs.header.type': 'Tipo',
    'components.media.image.apiInputs.header.default': 'Valor por defecto',
    'components.media.image.apiInputs.header.description': 'Descripcion',
    'components.media.image.apiInputs.src.desc': 'URL de la imagen.',
    'components.media.image.apiInputs.alt.desc':
      'Texto alternativo para la imagen.',
    'components.media.image.apiInputs.width.desc':
      "Ancho de la imagen (ej: '100%', '250px').",
    'components.media.image.apiInputs.height.desc': 'Alto de la imagen.',
    'components.media.image.apiInputs.preview.desc':
      'Habilita el modo de previsualizacion al hacer click.',
    'components.media.image.apiOutputs.title': 'Eventos (Outputs)',
    'components.media.image.apiOutputs.desc':
      'Eventos emitidos por el componente.',
    'components.media.image.apiOutputs.header.name': 'Nombre',
    'components.media.image.apiOutputs.header.type': 'Tipo',
    'components.media.image.apiOutputs.header.description': 'Descripcion',
    'components.media.image.apiOutputs.onLoad.desc':
      'Se emite cuando la imagen se carga exitosamente.',
    'components.media.image.apiOutputs.onError.desc':
      'Se emite si ocurre un error al cargar la imagen.',
    'components.media.image.a11y.title': 'Accesibilidad',
    'components.media.image.a11y.desc':
      'Consideraciones para lectores de pantalla y navegacion por teclado.',
    'components.media.image.a11y.alt.title': 'Texto Alternativo',
    'components.media.image.a11y.alt.desc':
      'Utiliza siempre la propiedad alt para describir la imagen.',
    'components.media.image.a11y.keyboard.title': 'Teclado',
    'components.media.image.a11y.keyboard.desc':
      'En modo previsualizacion, los controles de zoom y rotacion son accesibles por teclado.',
  },
  en: {
    'components.media.image.title': 'MagaryImage',
    'components.media.image.subtitle':
      'Component to render images with advanced features such as preview, zoom, and rotation.',
    'components.media.image.import.title': 'Import',
    'components.media.image.import.desc':
      'Import the component in your module or standalone component.',
    'components.media.image.basic.title': 'Basic Example',
    'components.media.image.basic.desc': 'Simple image rendering.',
    'components.media.image.basic.cardTitle': 'Basic',
    'components.media.image.basic.alt': 'Basic image',
    'components.media.image.preview.title': 'Preview (Premium)',
    'components.media.image.preview.desc':
      'Enables fullscreen preview with zoom, rotation, and download.',
    'components.media.image.preview.cardTitle': 'Preview Mode',
    'components.media.image.preview.alt': 'Preview image',
    'components.media.image.apiInputs.title': 'Properties (Inputs)',
    'components.media.image.apiInputs.desc':
      'All available properties for this component.',
    'components.media.image.apiInputs.header.name': 'Name',
    'components.media.image.apiInputs.header.type': 'Type',
    'components.media.image.apiInputs.header.default': 'Default',
    'components.media.image.apiInputs.header.description': 'Description',
    'components.media.image.apiInputs.src.desc': 'Image source URL.',
    'components.media.image.apiInputs.alt.desc':
      'Alternative text for the image.',
    'components.media.image.apiInputs.width.desc':
      "Image width (e.g. '100%', '250px').",
    'components.media.image.apiInputs.height.desc': 'Image height.',
    'components.media.image.apiInputs.preview.desc':
      'Enables preview mode on click.',
    'components.media.image.apiOutputs.title': 'Events (Outputs)',
    'components.media.image.apiOutputs.desc':
      'Events emitted by the component.',
    'components.media.image.apiOutputs.header.name': 'Name',
    'components.media.image.apiOutputs.header.type': 'Type',
    'components.media.image.apiOutputs.header.description': 'Description',
    'components.media.image.apiOutputs.onLoad.desc':
      'Emitted when the image loads successfully.',
    'components.media.image.apiOutputs.onError.desc':
      'Emitted if an error occurs while loading the image.',
    'components.media.image.a11y.title': 'Accessibility',
    'components.media.image.a11y.desc':
      'Considerations for screen readers and keyboard navigation.',
    'components.media.image.a11y.alt.title': 'Alternative Text',
    'components.media.image.a11y.alt.desc':
      'Always use the alt property to describe the image.',
    'components.media.image.a11y.keyboard.title': 'Keyboard',
    'components.media.image.a11y.keyboard.desc':
      'In preview mode, zoom and rotation controls are keyboard accessible.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
