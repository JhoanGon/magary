import { DemoLanguage } from '../../../types';

export const MENU_NAV_TEXT = {
  es: {
    Menu: 'Menu',
    'Context Menu': 'Menu contextual',
    Breadcrumb: 'Migas de pan',
    Steps: 'Pasos',
    'Panel Menu': 'Menu de panel',
    Sidebar: 'Barra lateral',
    'Tiered Menu': 'Menu jerarquico',
    Menubar: 'Barra de menu',
    MegaMenu: 'Mega menu',
    SlideMenu: 'Menu deslizante',
  },
  en: {
    Menu: 'Menu',
    'Context Menu': 'Context Menu',
    Breadcrumb: 'Breadcrumb',
    Steps: 'Steps',
    'Panel Menu': 'Panel Menu',
    Sidebar: 'Sidebar',
    'Tiered Menu': 'Tiered Menu',
    Menubar: 'Menubar',
    MegaMenu: 'Mega Menu',
    SlideMenu: 'Slide Menu',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
