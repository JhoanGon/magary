import { DemoLanguage } from '../../../types';

export const MISC_NAV_TEXT = {
  es: {
    Misc: 'Varios',
    Avatar: 'Avatar',
    Skeleton: 'Esqueleto',
    Divider: 'Divisor',
    Tag: 'Etiqueta',
  },
  en: {
    Misc: 'Misc',
    Avatar: 'Avatar',
    Skeleton: 'Skeleton',
    Divider: 'Divider',
    Tag: 'Tag',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
