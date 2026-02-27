import { DemoLanguage } from '../../../types';

export const GRID_NAV_TEXT = {
  es: {
    'Grid (Drag & Drop)': 'Cuadricula (arrastrar y soltar)',
    'View Grid': 'Ver cuadricula',
  },
  en: {
    'Grid (Drag & Drop)': 'Grid (Drag & Drop)',
    'View Grid': 'Grid Demo',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
