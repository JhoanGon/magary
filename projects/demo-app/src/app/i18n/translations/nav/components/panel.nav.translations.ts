import { DemoLanguage } from '../../../types';

export const PANEL_NAV_TEXT = {
  es: {
    Panel: 'Panel',
    Card: 'Tarjeta',
    Fieldset: 'Conjunto de campos',
    Toolbar: 'Barra de herramientas',
    TabView: 'Pestanas',
    Accordion: 'Acordeon',
  },
  en: {
    Panel: 'Panel',
    Card: 'Card',
    Fieldset: 'Fieldset',
    Toolbar: 'Toolbar',
    TabView: 'Tab View',
    Accordion: 'Accordion',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
