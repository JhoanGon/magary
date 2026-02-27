import { DemoLanguage } from '../types';

export const UI_TEXT = {
  es: {
    demoBadge: 'Demo Alfa',
    installApp: 'Instalar app',
    landingSubtitle: 'Componentes modernos para Angular',
    enterApp: 'Ingresar',
    languageSelector: 'Seleccionar idioma',
    navigationLabel: 'Navegacion principal',
    openSidebarLabel: 'Abrir menu lateral',
    closeSidebarLabel: 'Cerrar menu lateral',
  },
  en: {
    demoBadge: 'Demo Alpha',
    installApp: 'Install app',
    landingSubtitle: 'Modern Angular Components',
    enterApp: 'Enter',
    languageSelector: 'Select language',
    navigationLabel: 'Primary navigation',
    openSidebarLabel: 'Open sidebar navigation',
    closeSidebarLabel: 'Close sidebar',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type UiTextKey = keyof (typeof UI_TEXT)['en'];
