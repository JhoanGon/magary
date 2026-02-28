import { DemoLanguage } from '../../../../types';

export const BUTTON_DOC_TEXT = {
  es: {
    'components.buttons.button.title': 'MagaryButton',
    'components.buttons.button.subtitle':
      'Componente de boton versatil y personalizable.',
    'components.buttons.button.import.title': 'Import',
    'components.buttons.button.import.desc':
      'Importa el componente en tu modulo o componente standalone.',
    'components.buttons.button.basic.title': 'Ejemplo Basico',
    'components.buttons.button.basic.cardTitle': 'Default',
    'components.buttons.button.basic.label.button': 'Button',
    'components.buttons.button.basic.label.home': 'Home',
    'components.buttons.button.basic.label.loading': 'Loading...',
    'components.buttons.button.severity.title': 'Severidad',
    'components.buttons.button.severity.desc':
      'Colores semanticos para diferentes acciones.',
    'components.buttons.button.severity.cardTitle': 'Colores',
    'components.buttons.button.severity.primary': 'Primary',
    'components.buttons.button.severity.secondary': 'Secondary',
    'components.buttons.button.severity.success': 'Success',
    'components.buttons.button.severity.info': 'Info',
    'components.buttons.button.severity.warning': 'Warning',
    'components.buttons.button.severity.danger': 'Danger',
    'components.buttons.button.severity.help': 'Help',
    'components.buttons.button.sizes.title': 'Tamanos',
    'components.buttons.button.sizes.desc': 'Diferentes tamanos disponibles.',
    'components.buttons.button.sizes.small.cardTitle': 'Small',
    'components.buttons.button.sizes.normal.cardTitle': 'Normal',
    'components.buttons.button.sizes.large.cardTitle': 'Large',
    'components.buttons.button.variants.title': 'Variantes',
    'components.buttons.button.variants.desc': 'Estilos visuales alternativos.',
    'components.buttons.button.variants.solid': 'Solid',
    'components.buttons.button.variants.outlined': 'Outlined',
    'components.buttons.button.variants.text': 'Text',
    'components.buttons.button.custom.title': 'Personalizacion',
    'components.buttons.button.custom.desc':
      'Opciones adicionales de estilo.',
    'components.buttons.button.custom.shadows': 'Sombras',
    'components.buttons.button.custom.rounded': 'Redondeado',
    'components.buttons.button.custom.iconSize': 'Tamano de icono',
    'components.buttons.button.custom.shadow1': 'Shadow 1',
    'components.buttons.button.custom.shadow3': 'Shadow 3',
    'components.buttons.button.custom.roundedButton': 'Rounded',
    'components.buttons.button.custom.icon32': '32px Icon',
    'components.buttons.button.states.title': 'Estados',
    'components.buttons.button.states.desc':
      'Estados interactivos del boton.',
    'components.buttons.button.states.normal': 'Normal',
    'components.buttons.button.states.disabled': 'Disabled',
    'components.buttons.button.states.loading': 'Loading',
    'components.buttons.button.apiInputs.title': 'Propiedades (Inputs)',
    'components.buttons.button.apiInputs.desc':
      'Todas las propiedades disponibles del componente.',
    'components.buttons.button.apiInputs.header.name': 'Nombre',
    'components.buttons.button.apiInputs.header.type': 'Tipo',
    'components.buttons.button.apiInputs.header.default': 'Valor por defecto',
    'components.buttons.button.apiInputs.header.description': 'Descripcion',
    'components.buttons.button.apiInputs.label.desc': 'Texto del boton.',
    'components.buttons.button.apiInputs.icon.desc':
      'Nombre del icono (ej: house).',
    'components.buttons.button.apiInputs.iconPos.desc': 'Posicion del icono.',
    'components.buttons.button.apiInputs.severity.desc':
      'Color semantico del boton.',
    'components.buttons.button.apiInputs.variant.desc':
      'Estilo visual del boton.',
    'components.buttons.button.apiInputs.size.desc': 'Tamano del boton.',
    'components.buttons.button.apiInputs.disabled.desc':
      'Deshabilita el boton.',
    'components.buttons.button.apiInputs.loading.desc':
      'Muestra un indicador de carga.',
    'components.buttons.button.apiInputs.rounded.desc':
      'Bordes completamente redondeados.',
    'components.buttons.button.apiInputs.shadow.desc': 'Nivel de sombra (1-5).',
    'components.buttons.button.apiInputs.iconSize.desc':
      'Tamano del icono en pixeles.',
    'components.buttons.button.apiOutputs.title': 'Eventos (Outputs)',
    'components.buttons.button.apiOutputs.desc':
      'Eventos emitidos por el componente.',
    'components.buttons.button.apiOutputs.header.name': 'Nombre',
    'components.buttons.button.apiOutputs.header.type': 'Tipo',
    'components.buttons.button.apiOutputs.header.description': 'Descripcion',
    'components.buttons.button.apiOutputs.buttonClick.desc':
      'Se emite cuando se hace click en el boton.',
    'components.buttons.button.a11y.title': 'Accesibilidad',
    'components.buttons.button.a11y.desc':
      'Consideraciones para lectores de pantalla y teclado.',
    'components.buttons.button.a11y.keyboard.title': 'Teclado',
    'components.buttons.button.a11y.keyboard.desc':
      'Navegable con Tab y activable con Enter o Espacio.',
    'components.buttons.button.a11y.aria.title': 'ARIA',
    'components.buttons.button.a11y.aria.desc':
      'Usa atributos ARIA adecuados, incluyendo aria-label si no hay texto visible.',
    'components.buttons.button.a11y.focus.title': 'Foco',
    'components.buttons.button.a11y.focus.desc':
      'El estado de foco es visible y claro para navegacion por teclado.',
    'components.buttons.button.a11y.contrast.title': 'Contraste',
    'components.buttons.button.a11y.contrast.desc':
      'Los colores por defecto cumplen con WCAG AA.',
  },
  en: {
    'components.buttons.button.title': 'MagaryButton',
    'components.buttons.button.subtitle':
      'Versatile and customizable button component.',
    'components.buttons.button.import.title': 'Import',
    'components.buttons.button.import.desc':
      'Import the component in your module or standalone component.',
    'components.buttons.button.basic.title': 'Basic Example',
    'components.buttons.button.basic.cardTitle': 'Default',
    'components.buttons.button.basic.label.button': 'Button',
    'components.buttons.button.basic.label.home': 'Home',
    'components.buttons.button.basic.label.loading': 'Loading...',
    'components.buttons.button.severity.title': 'Severity',
    'components.buttons.button.severity.desc':
      'Semantic colors for different actions.',
    'components.buttons.button.severity.cardTitle': 'Colors',
    'components.buttons.button.severity.primary': 'Primary',
    'components.buttons.button.severity.secondary': 'Secondary',
    'components.buttons.button.severity.success': 'Success',
    'components.buttons.button.severity.info': 'Info',
    'components.buttons.button.severity.warning': 'Warning',
    'components.buttons.button.severity.danger': 'Danger',
    'components.buttons.button.severity.help': 'Help',
    'components.buttons.button.sizes.title': 'Sizes',
    'components.buttons.button.sizes.desc': 'Different available sizes.',
    'components.buttons.button.sizes.small.cardTitle': 'Small',
    'components.buttons.button.sizes.normal.cardTitle': 'Normal',
    'components.buttons.button.sizes.large.cardTitle': 'Large',
    'components.buttons.button.variants.title': 'Variants',
    'components.buttons.button.variants.desc': 'Alternative visual styles.',
    'components.buttons.button.variants.solid': 'Solid',
    'components.buttons.button.variants.outlined': 'Outlined',
    'components.buttons.button.variants.text': 'Text',
    'components.buttons.button.custom.title': 'Customization',
    'components.buttons.button.custom.desc': 'Additional style options.',
    'components.buttons.button.custom.shadows': 'Shadows',
    'components.buttons.button.custom.rounded': 'Rounded',
    'components.buttons.button.custom.iconSize': 'Icon Size',
    'components.buttons.button.custom.shadow1': 'Shadow 1',
    'components.buttons.button.custom.shadow3': 'Shadow 3',
    'components.buttons.button.custom.roundedButton': 'Rounded',
    'components.buttons.button.custom.icon32': '32px Icon',
    'components.buttons.button.states.title': 'States',
    'components.buttons.button.states.desc': 'Interactive button states.',
    'components.buttons.button.states.normal': 'Normal',
    'components.buttons.button.states.disabled': 'Disabled',
    'components.buttons.button.states.loading': 'Loading',
    'components.buttons.button.apiInputs.title': 'Properties (Inputs)',
    'components.buttons.button.apiInputs.desc':
      'All available properties for this component.',
    'components.buttons.button.apiInputs.header.name': 'Name',
    'components.buttons.button.apiInputs.header.type': 'Type',
    'components.buttons.button.apiInputs.header.default': 'Default',
    'components.buttons.button.apiInputs.header.description': 'Description',
    'components.buttons.button.apiInputs.label.desc': 'Button text.',
    'components.buttons.button.apiInputs.icon.desc':
      'Icon name (e.g. house).',
    'components.buttons.button.apiInputs.iconPos.desc': 'Icon position.',
    'components.buttons.button.apiInputs.severity.desc':
      'Semantic button color.',
    'components.buttons.button.apiInputs.variant.desc':
      'Visual button style.',
    'components.buttons.button.apiInputs.size.desc': 'Button size.',
    'components.buttons.button.apiInputs.disabled.desc': 'Disables the button.',
    'components.buttons.button.apiInputs.loading.desc':
      'Shows a loading indicator.',
    'components.buttons.button.apiInputs.rounded.desc':
      'Fully rounded borders.',
    'components.buttons.button.apiInputs.shadow.desc': 'Shadow level (1-5).',
    'components.buttons.button.apiInputs.iconSize.desc':
      'Icon size in pixels.',
    'components.buttons.button.apiOutputs.title': 'Events (Outputs)',
    'components.buttons.button.apiOutputs.desc':
      'Events emitted by the component.',
    'components.buttons.button.apiOutputs.header.name': 'Name',
    'components.buttons.button.apiOutputs.header.type': 'Type',
    'components.buttons.button.apiOutputs.header.description': 'Description',
    'components.buttons.button.apiOutputs.buttonClick.desc':
      'Emitted when the button is clicked.',
    'components.buttons.button.a11y.title': 'Accessibility',
    'components.buttons.button.a11y.desc':
      'Considerations for screen readers and keyboard navigation.',
    'components.buttons.button.a11y.keyboard.title': 'Keyboard',
    'components.buttons.button.a11y.keyboard.desc':
      'Navigable with Tab and activable with Enter or Space.',
    'components.buttons.button.a11y.aria.title': 'ARIA',
    'components.buttons.button.a11y.aria.desc':
      'Uses proper ARIA attributes, including aria-label when no visible text is present.',
    'components.buttons.button.a11y.focus.title': 'Focus',
    'components.buttons.button.a11y.focus.desc':
      'Focus state is visible and clear for keyboard navigation.',
    'components.buttons.button.a11y.contrast.title': 'Contrast',
    'components.buttons.button.a11y.contrast.desc':
      'Default colors comply with WCAG AA.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
