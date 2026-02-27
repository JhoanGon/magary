import { DemoLanguage } from '../../../types';

export const BUTTONS_NAV_TEXT = {
  es: {
    Buttons: 'Botones',
    Button: 'Boton',
    SpeedDial: 'Acciones rapidas',
    SplitButton: 'Boton dividido',
  },
  en: {
    Buttons: 'Buttons',
    Button: 'Button',
    SpeedDial: 'Speed Dial',
    SplitButton: 'Split Button',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
