import { DemoLanguage } from '../../../types';

export const INSTALLATION_DOC_TEXT = {
  es: {
    'installation.title': 'Instalacion',
    'installation.subtitle':
      'Guia rapida para integrar Magary en tu proyecto Angular',
    'installation.step1.title': 'Instalar paquete y dependencias',
    'installation.step1.desc':
      'Instala ng-magary junto con sus dependencias requeridas.',
    'installation.step2.title': 'Configurar app (iconos + animaciones)',
    'installation.step2.desc':
      'Magary usa iconos Lucide y componentes con animaciones de Angular. Configura ambos providers en app.config.ts.',
    'installation.step3.title': 'Estilos globales (solo tooltip)',
    'installation.step3.desc':
      'Si usas magaryTooltip, agrega estas clases globales en styles.scss.',
    'installation.step4.title': 'Usar componentes',
    'installation.step4.desc':
      'Importa los componentes de ng-magary directamente en tus componentes standalone.',
    'installation.tooltipComment': 'styles.scss (solo si usas magaryTooltip)',
  },
  en: {
    'installation.title': 'Installation',
    'installation.subtitle':
      'Quick guide to integrate Magary into your Angular project',
    'installation.step1.title': 'Install package and dependencies',
    'installation.step1.desc':
      'Install ng-magary together with its required dependencies.',
    'installation.step2.title': 'Configure app (icons + animations)',
    'installation.step2.desc':
      'Magary uses Lucide icons and Angular animations. Configure both providers in app.config.ts.',
    'installation.step3.title': 'Global styles (tooltip only)',
    'installation.step3.desc':
      'If you use magaryTooltip, add these global classes in styles.scss.',
    'installation.step4.title': 'Use components',
    'installation.step4.desc':
      'Import ng-magary components directly into your standalone components.',
    'installation.tooltipComment': 'styles.scss (only if you use magaryTooltip)',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
