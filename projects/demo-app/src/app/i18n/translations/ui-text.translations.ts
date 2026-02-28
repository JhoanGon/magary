import { DemoLanguage } from '../types';

export const UI_TEXT = {
  es: {
    brandName: 'Magary',
    logoAlt: 'Logo de Magary',
    demoUserName: 'Juan Perez',
    demoUserEmail: 'juan@empresa.com',
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
    brandName: 'Magary',
    logoAlt: 'Magary Logo',
    demoUserName: 'Juan Perez',
    demoUserEmail: 'juan@empresa.com',
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
