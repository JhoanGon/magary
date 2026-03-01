import { DemoLanguage } from '../../types';

export const PREMIUM_DOC_TEXT = {
  es: {
    'premium.themes.title': 'Temas Premium',
    'premium.themes.subtitle':
      'Previsualiza y desbloquea sistemas de estilo completos para tu aplicación.',
    'premium.themes.preview': 'Vista Previa',
    'premium.themes.buy': 'Comprar Tema',
    'premium.themes.grid.label': 'Galería de temas premium',
  },
  en: {
    'premium.themes.title': 'Premium Themes',
    'premium.themes.subtitle':
      'Preview and unlock complete style systems for your application.',
    'premium.themes.preview': 'Live Preview',
    'premium.themes.buy': 'Buy Theme',
    'premium.themes.grid.label': 'Premium themes gallery',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type PremiumDocsTextKey = keyof (typeof PREMIUM_DOC_TEXT)['en'];
