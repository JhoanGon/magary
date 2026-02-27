import { DemoLanguage } from '../../../types';

export const MEDIA_NAV_TEXT = {
  es: {
    Media: 'Media',
    Image: 'Imagen',
    Galleria: 'Galeria',
    Carousel: 'Carrusel',
  },
  en: {
    Media: 'Media',
    Image: 'Image',
    Galleria: 'Galleria',
    Carousel: 'Carousel',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
