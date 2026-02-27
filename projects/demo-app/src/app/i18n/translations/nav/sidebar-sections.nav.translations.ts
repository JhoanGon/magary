import { DemoLanguage } from '../../types';

export const SIDEBAR_SECTIONS_NAV_TEXT = {
  es: {
    'Primeros Pasos': 'Primeros pasos',
    Componentes: 'Componentes',
    Utilidades: 'Utilidades',
  },
  en: {
    'Primeros Pasos': 'Getting Started',
    Componentes: 'Components',
    Utilidades: 'Utilities',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
