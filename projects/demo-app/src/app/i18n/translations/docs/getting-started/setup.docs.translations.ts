import { DemoLanguage } from '../../../types';

export const SETUP_DOC_TEXT = {
  es: {
    'setup.title': 'Configuracion',
    'setup.subtitle': 'Guia paso a paso para configurar ng-magary en tu proyecto.',
    'setup.step1.title': 'Estilos y tema',
    'setup.step1.desc':
      'ng-magary usa variables CSS nativas para theming y glassmorphism.',
    'setup.step1.button': 'Ver guia de temas y variables',
    'setup.step1.codeLabel': 'Ejemplo resumido de variables requeridas:',
    'setup.step2.title': 'Iconos',
    'setup.step2.desc':
      'Esta libreria usa Lucide Icons. Para renderizar iconos correctamente, debes proveerlos en app.config.ts.',
    'setup.step2.optionLabel':
      'Opcion recomendada (cargar todos los iconos): habilita todos los iconos disponibles para cualquier componente.',
    'setup.step2.standalone': 'Standalone (AppConfig)',
    'setup.step2.modules': 'Modulos (AppModule)',
    'setup.step3.title': 'Animaciones',
    'setup.step3.desc':
      'Para que las animaciones (ripples y transiciones) funcionen, provee el modulo de animaciones en app.config.ts o app.module.ts.',
    'setup.step3.standalone': 'Standalone (AppConfig)',
    'setup.step3.modules': 'Modulos (AppModule)',
    'setup.step4.title': 'Ejemplos de integracion (demo app)',
    'setup.step4.desc':
      'Usa estas rutas como referencia para apps consumidoras. Cada ejemplo incluye wiring real con formularios, overlays y flujos de datos.',
    'setup.step4.formButton': 'Integracion de formularios',
    'setup.step4.overlayButton': 'Integracion de overlays',
    'setup.step4.dataButton': 'Integracion de datos',
    'setup.step4.standaloneLabel': 'Arranque standalone:',
    'setup.step4.formsLabel': 'Bridge con formularios reactivos:',
    'setup.step4.overlayLabel': 'Flujo de overlay + feedback:',
    'setup.attribution.title': 'Creditos y atribuciones',
    'setup.attribution.desc':
      'Este proyecto usa y agradece el trabajo de las siguientes librerias open source:',
    'setup.attribution.gridstack': 'Funcionalidad de grid y drag and drop.',
    'setup.attribution.lucide': 'Set de iconos flexible y moderno.',
  },
  en: {
    'setup.title': 'Setup',
    'setup.subtitle': 'Step-by-step guide to configure ng-magary in your project.',
    'setup.step1.title': 'Styles and theme',
    'setup.step1.desc':
      'ng-magary uses native CSS variables for theming and glassmorphism.',
    'setup.step1.button': 'View theme and variables guide',
    'setup.step1.codeLabel': 'Short example of required variables:',
    'setup.step2.title': 'Icons',
    'setup.step2.desc':
      'This library uses Lucide Icons. To render icons correctly, provide them in app.config.ts.',
    'setup.step2.optionLabel':
      'Recommended option (load all icons): enables all icons for any component.',
    'setup.step2.standalone': 'Standalone (AppConfig)',
    'setup.step2.modules': 'Modules (AppModule)',
    'setup.step3.title': 'Animations',
    'setup.step3.desc':
      'To enable animations (ripples and transitions), provide animation support in app.config.ts or app.module.ts.',
    'setup.step3.standalone': 'Standalone (AppConfig)',
    'setup.step3.modules': 'Modules (AppModule)',
    'setup.step4.title': 'Integration examples (demo app)',
    'setup.step4.desc':
      'Use these routes as integration references for consumer apps. Each one includes real wiring with forms, overlays, and data flows.',
    'setup.step4.formButton': 'Form integration',
    'setup.step4.overlayButton': 'Overlay integration',
    'setup.step4.dataButton': 'Data integration',
    'setup.step4.standaloneLabel': 'Standalone bootstrap:',
    'setup.step4.formsLabel': 'Reactive forms bridge:',
    'setup.step4.overlayLabel': 'Overlay + feedback flow:',
    'setup.attribution.title': 'Credits and attributions',
    'setup.attribution.desc':
      'This project uses and appreciates the work of these open-source libraries:',
    'setup.attribution.gridstack': 'Grid and drag-and-drop functionality.',
    'setup.attribution.lucide': 'Flexible and modern icon set.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
