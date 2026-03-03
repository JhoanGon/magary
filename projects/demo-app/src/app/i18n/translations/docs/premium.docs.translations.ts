import { DemoLanguage } from '../../types';

export const PREMIUM_DOC_TEXT = {
  es: {
    'premium.themes.title': 'Temas Premium',
    'premium.themes.subtitle':
      'Previsualiza y desbloquea sistemas de estilo completos para tu aplicación.',
    'premium.themes.preview': 'Vista Previa',
    'premium.themes.buy': 'Comprar Tema',
    'premium.themes.grid.label': 'Galería de temas premium',
    'premium.blocks.title': 'Bloques Premium',
    'premium.blocks.subtitle': 'Composiciones UI a gran escala construidas con componentes base Magary. Copia y pega secciones completamente funcionales y responsivas en tu aplicación.',
    'premium.blocks.hero.title': 'Hero Moderno SaaS',
    'premium.blocks.hero.category': 'Sección Hero',
    'premium.blocks.pricing.title': 'Precios Estándar 3 Niveles',
    'premium.blocks.pricing.category': 'Tabla de Precios',
  },
  en: {
    'premium.themes.title': 'Premium Themes',
    'premium.themes.subtitle':
      'Preview and unlock complete style systems for your application.',
    'premium.themes.preview': 'Live Preview',
    'premium.themes.buy': 'Buy Theme',
    'premium.themes.grid.label': 'Premium themes gallery',
    'premium.blocks.title': 'Premium Blocks',
    'premium.blocks.subtitle': 'Large-scale UI compositions built with Magary core components. Copy and paste entirely functional, responsive sections into your application.',
    'premium.blocks.hero.title': 'Modern SaaS Hero',
    'premium.blocks.hero.category': 'Hero Section',
    'premium.blocks.pricing.title': '3-Tier Standard Pricing',
    'premium.blocks.pricing.category': 'Pricing Table',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type PremiumDocsTextKey = keyof (typeof PREMIUM_DOC_TEXT)['en'];
