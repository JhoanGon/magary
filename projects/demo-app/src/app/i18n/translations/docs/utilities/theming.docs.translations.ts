import { DemoLanguage } from '../../../types';

export const THEMING_DOC_TEXT = {
  es: {
    'utilities.theming.title': 'Sistema de temas',
    'utilities.theming.subtitle':
      'Sistema flexible basado en CSS variables y Angular signals para personalizar tu app.',
    'utilities.theming.introTitle': 'Introduccion',
    'utilities.theming.introP1':
      'Magary usa CSS Custom Properties para definir colores, espacios y tipografia. Puedes cambiar el tema en tiempo real sin recargar la pagina.',
    'utilities.theming.introP2':
      'MagaryThemeService persiste la preferencia del usuario y aplica el tema activo de forma consistente.',
    'utilities.theming.implTitle': 'Implementacion',
    'utilities.theming.implDesc':
      'Inyecta el servicio en tu componente principal o layout para alternar y fijar temas.',
    'utilities.theming.newThemeTitle': 'Crear un tema nuevo',
    'utilities.theming.newThemeDesc':
      'Define un bloque CSS con data-theme y sobreescribe variables principales para colores, superficies y texto.',
    'utilities.theming.variablesTitle': 'Variables principales',
    'utilities.theming.variablesDesc':
      'Estas variables aseguran que todos los componentes se adapten correctamente al tema.',
    'utilities.theming.variablePrimary': 'Primario',
    'utilities.theming.variableSurface': 'Superficie',
    'utilities.theming.variableTextMain': 'Texto principal',
    'utilities.theming.variableTextMuted': 'Texto secundario',
  },
  en: {
    'utilities.theming.title': 'Theming System',
    'utilities.theming.subtitle':
      'Flexible system based on CSS variables and Angular signals to customize your app.',
    'utilities.theming.introTitle': 'Introduction',
    'utilities.theming.introP1':
      'Magary uses CSS Custom Properties to define colors, spacing, and typography. You can switch themes in real time without reloading the page.',
    'utilities.theming.introP2':
      'MagaryThemeService persists user preference and applies the active theme consistently.',
    'utilities.theming.implTitle': 'Implementation',
    'utilities.theming.implDesc':
      'Inject the service in your app root component or layout to toggle and set themes.',
    'utilities.theming.newThemeTitle': 'Create a new theme',
    'utilities.theming.newThemeDesc':
      'Define a CSS block with data-theme and override core variables for colors, surfaces, and text.',
    'utilities.theming.variablesTitle': 'Core variables',
    'utilities.theming.variablesDesc':
      'These variables ensure all components adapt correctly to the selected theme.',
    'utilities.theming.variablePrimary': 'Primary',
    'utilities.theming.variableSurface': 'Surface',
    'utilities.theming.variableTextMain': 'Main text',
    'utilities.theming.variableTextMuted': 'Muted text',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
