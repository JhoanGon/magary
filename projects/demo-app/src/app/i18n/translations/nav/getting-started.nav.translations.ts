import { DemoLanguage } from '../../types';

export const GETTING_STARTED_NAV_TEXT = {
  es: {
    Instalacion: 'Instalacion',
    Configuracion: 'Configuracion',
    MCP: 'MCP',
  },
  en: {
    Instalacion: 'Installation',
    Configuracion: 'Setup',
    MCP: 'MCP',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
