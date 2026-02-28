import { DemoLanguage } from '../../../../types';

export const GALLERIA_DOC_TEXT = {
  es: {
    'components.media.galleria.title': 'Galleria',
    'components.media.galleria.subtitle':
      'Componente avanzado para mostrar galerias de imagenes con thumbnails y navegacion.',
    'components.media.galleria.import.title': 'Importacion',
    'components.media.galleria.basic.title': 'Basico (Thumbnails Abajo)',
    'components.media.galleria.basic.desc':
      'Configuracion estandar con tira de imagenes en la parte inferior.',
    'components.media.galleria.left.title': 'Thumbnails a la Izquierda',
    'components.media.galleria.left.desc':
      'La tira de imagenes se posiciona verticalmente a la izquierda.',
    'components.media.galleria.indicators.title':
      'Indicadores (Sin Thumbnails)',
    'components.media.galleria.indicators.desc':
      'Navegacion mediante indicadores circulares superpuestos.',
    'components.media.galleria.autoplay.title': 'AutoPlay y Circular',
    'components.media.galleria.autoplay.desc':
      'Pase de diapositivas automatico con bucle infinito.',
    'components.media.galleria.apiInputs.title': 'Propiedades (Inputs)',
    'components.media.galleria.apiInputs.header.name': 'Nombre',
    'components.media.galleria.apiInputs.header.type': 'Tipo',
    'components.media.galleria.apiInputs.header.default': 'Predeterminado',
    'components.media.galleria.apiInputs.header.description': 'Descripcion',
    'components.media.galleria.apiInputs.value.desc':
      'Array de objetos a mostrar.',
    'components.media.galleria.apiInputs.showThumbnails.desc':
      'Muestra la cinta de miniaturas.',
    'components.media.galleria.apiInputs.showIndicators.desc':
      'Muestra los indicadores de pagina.',
    'components.media.galleria.apiInputs.autoPlay.desc':
      'Inicia el pase de diapositivas automaticamente.',
    'components.media.galleria.apiInputs.itemTemplateRef.desc':
      'Referencia a la plantilla del item principal.',
    'components.media.galleria.apiInputs.thumbnailTemplateRef.desc':
      'Referencia a la plantilla de la miniatura.',
    'components.media.galleria.apiInputs.width.desc':
      "Ancho maximo del componente (ej. '640px').",
  },
  en: {
    'components.media.galleria.title': 'Galleria',
    'components.media.galleria.subtitle':
      'Advanced component to display image galleries with thumbnails and navigation.',
    'components.media.galleria.import.title': 'Import',
    'components.media.galleria.basic.title': 'Basic (Bottom Thumbnails)',
    'components.media.galleria.basic.desc':
      'Standard setup with thumbnail strip at the bottom.',
    'components.media.galleria.left.title': 'Left Thumbnails',
    'components.media.galleria.left.desc':
      'Thumbnail strip is positioned vertically on the left.',
    'components.media.galleria.indicators.title':
      'Indicators (No Thumbnails)',
    'components.media.galleria.indicators.desc':
      'Navigation using overlay circular indicators.',
    'components.media.galleria.autoplay.title': 'AutoPlay and Circular',
    'components.media.galleria.autoplay.desc':
      'Automatic slideshow with infinite loop.',
    'components.media.galleria.apiInputs.title': 'Properties (Inputs)',
    'components.media.galleria.apiInputs.header.name': 'Name',
    'components.media.galleria.apiInputs.header.type': 'Type',
    'components.media.galleria.apiInputs.header.default': 'Default',
    'components.media.galleria.apiInputs.header.description': 'Description',
    'components.media.galleria.apiInputs.value.desc':
      'Array of items to render.',
    'components.media.galleria.apiInputs.showThumbnails.desc':
      'Shows thumbnail strip.',
    'components.media.galleria.apiInputs.showIndicators.desc':
      'Shows page indicators.',
    'components.media.galleria.apiInputs.autoPlay.desc':
      'Starts slideshow automatically.',
    'components.media.galleria.apiInputs.itemTemplateRef.desc':
      'Reference to main item template.',
    'components.media.galleria.apiInputs.thumbnailTemplateRef.desc':
      'Reference to thumbnail template.',
    'components.media.galleria.apiInputs.width.desc':
      "Maximum component width (e.g. '640px').",
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
