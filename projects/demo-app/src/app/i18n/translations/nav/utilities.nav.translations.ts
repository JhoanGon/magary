import { DemoLanguage } from '../../types';

export const UTILITIES_NAV_TEXT = {
  es: {
    Theming: 'Temas',
    Iconos: 'Iconos',
  },
  en: {
    Theming: 'Theming',
    Iconos: 'Icons',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
