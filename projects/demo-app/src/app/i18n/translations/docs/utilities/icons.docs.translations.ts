import { DemoLanguage } from '../../../types';

export const ICONS_DOC_TEXT = {
  es: {
    'utilities.icons.title': 'Iconos',
    'utilities.icons.subtitle':
      'ng-magary usa Lucide Icons para una apariencia consistente. Aqui tienes una guia rapida de uso.',
    'utilities.icons.usageTitle': 'Como usar iconos',
    'utilities.icons.usageDesc':
      "Pasa el nombre del icono de Lucide (por ejemplo 'house') a la propiedad icon en botones, inputs y mas componentes.",
    'utilities.icons.commonTitle': 'Iconos comunes',
    'utilities.icons.commonLink': 'Ver todos en Lucide.dev',
  },
  en: {
    'utilities.icons.title': 'Icons',
    'utilities.icons.subtitle':
      'ng-magary uses Lucide Icons for a consistent look. Here is a quick usage guide.',
    'utilities.icons.usageTitle': 'How to use icons',
    'utilities.icons.usageDesc':
      "Pass a Lucide icon name (for example 'house') to the icon input in buttons, inputs, and more components.",
    'utilities.icons.commonTitle': 'Common icons',
    'utilities.icons.commonLink': 'View all on Lucide.dev',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
