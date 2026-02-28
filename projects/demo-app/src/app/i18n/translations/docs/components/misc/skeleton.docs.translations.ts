import { DemoLanguage } from '../../../../types';

export const SKELETON_DOC_TEXT = {
  es: {
    'components.misc.skeleton.title': 'Skeleton',
    'components.misc.skeleton.subtitle':
      'Skeleton es un placeholder para mostrar estado de carga.',
    'components.misc.skeleton.import.title': 'Import',
    'components.misc.skeleton.import.desc':
      'Importa el componente para usarlo en tu aplicacion.',
    'components.misc.skeleton.basic.title': 'Basico',
    'components.misc.skeleton.basic.desc':
      'Uso basico con diferentes dimensiones.',
    'components.misc.skeleton.shapes.title': 'Formas',
    'components.misc.skeleton.shapes.desc':
      'Skeleton soporta formas rectangulares y circulares.',
    'components.misc.skeleton.card.title': 'Ejemplo de Card',
    'components.misc.skeleton.card.desc':
      'Ejemplo complejo que simula estado de carga de una card.',
    'components.misc.skeleton.api.title': 'API',
    'components.misc.skeleton.api.desc':
      'Propiedades y eventos disponibles del componente.',
    'components.misc.skeleton.api.header.name': 'Nombre',
    'components.misc.skeleton.api.header.type': 'Tipo',
    'components.misc.skeleton.api.header.default': 'Default',
    'components.misc.skeleton.api.header.description': 'Descripcion',
    'components.misc.skeleton.api.shape.desc':
      'Forma del elemento. Opciones: rectangle | circle.',
    'components.misc.skeleton.api.size.desc':
      'Tamano del elemento, atajo para width y height.',
    'components.misc.skeleton.api.width.desc': 'Ancho del elemento.',
    'components.misc.skeleton.api.height.desc': 'Alto del elemento.',
    'components.misc.skeleton.api.borderRadius.desc':
      'Radio de borde del elemento.',
    'components.misc.skeleton.api.animation.desc':
      'Tipo de animacion. Opciones: shimmer | none.',
  },
  en: {
    'components.misc.skeleton.title': 'Skeleton',
    'components.misc.skeleton.subtitle':
      'Skeleton is a placeholder to display loading state.',
    'components.misc.skeleton.import.title': 'Import',
    'components.misc.skeleton.import.desc':
      'Import the component to use it in your application.',
    'components.misc.skeleton.basic.title': 'Basic',
    'components.misc.skeleton.basic.desc':
      'Basic usage with different dimensions.',
    'components.misc.skeleton.shapes.title': 'Shapes',
    'components.misc.skeleton.shapes.desc':
      'Skeleton supports rectangle and circle shapes.',
    'components.misc.skeleton.card.title': 'Card Example',
    'components.misc.skeleton.card.desc':
      'Complex example that simulates a card loading state.',
    'components.misc.skeleton.api.title': 'API',
    'components.misc.skeleton.api.desc':
      'Properties and events available for the component.',
    'components.misc.skeleton.api.header.name': 'Name',
    'components.misc.skeleton.api.header.type': 'Type',
    'components.misc.skeleton.api.header.default': 'Default',
    'components.misc.skeleton.api.header.description': 'Description',
    'components.misc.skeleton.api.shape.desc':
      'Shape of the element. Options: rectangle | circle.',
    'components.misc.skeleton.api.size.desc':
      'Size of the element, shortcut for width and height.',
    'components.misc.skeleton.api.width.desc': 'Width of the element.',
    'components.misc.skeleton.api.height.desc': 'Height of the element.',
    'components.misc.skeleton.api.borderRadius.desc':
      'Border radius of the element.',
    'components.misc.skeleton.api.animation.desc':
      'Animation type. Options: shimmer | none.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
