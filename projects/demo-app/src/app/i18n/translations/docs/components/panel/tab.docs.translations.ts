import { DemoLanguage } from '../../../../types';

export const TAB_DOC_TEXT = {
  es: {
    'components.panel.tab.title': 'MagaryTabs',
    'components.panel.tab.import.title': 'Import',
    'components.panel.tab.import.desc':
      'Importa el componente en tu modulo o componente standalone.',
    'components.panel.tab.basic.title': 'Ejemplo basico',
    'components.panel.tab.basic.tab1': 'Inicio',
    'components.panel.tab.basic.tab1Heading': 'Bienvenido',
    'components.panel.tab.basic.tab1Body': 'Contenido de la pestana de inicio.',
    'components.panel.tab.basic.tab2': 'Perfil',
    'components.panel.tab.basic.tab2Heading': 'Tu perfil',
    'components.panel.tab.basic.tab2Body': 'Detalles personales, ajustes, etc.',
    'components.panel.tab.basic.tab3': 'Ayuda',
    'components.panel.tab.basic.tab3Body':
      'Aqui puedes encontrar asistencia.',
    'components.panel.tab.basic.tab4': 'Contacto',
    'components.panel.tab.basic.tab4Body':
      'Aqui puedes encontrar los numeros de contacto.',
    'components.panel.tab.basic.aria': 'Secciones principales',
    'components.panel.tab.inputs.title': 'Propiedades (Inputs)',
    'components.panel.tab.inputs.desc':
      'Todas las propiedades disponibles del componente.',
    'components.panel.tab.outputs.title': 'Eventos (Outputs)',
    'components.panel.tab.outputs.desc': 'Eventos emitidos por el componente.',
    'components.panel.tab.outputs.body':
      'Este componente no emite eventos directamente, pero puedes reaccionar a los cambios en las pestanas internas.',
    'components.panel.tab.expected.title': 'Contenido Esperado',
    'components.panel.tab.expected.desc':
      'Este componente espera recibir uno o mas componentes <magary-tab> como hijos.',
    'components.panel.tab.expected.item1':
      'Cada <magary-tab> debe tener una propiedad label.',
    'components.panel.tab.expected.item2':
      'El contenido dentro de cada tab se mostrara solo cuando este activa.',
    'components.panel.tab.a11y.title': 'Accesibilidad',
    'components.panel.tab.a11y.desc':
      'Caracteristicas de accesibilidad implementadas.',
    'components.panel.tab.a11y.keyboard':
      'Teclado: Soporta Tab, ArrowLeft, ArrowRight, Home y End.',
    'components.panel.tab.a11y.activation':
      'Activacion: Las pestanas se activan con Enter o Click.',
    'components.panel.tab.a11y.focus':
      'Foco: Las pestanas muestran foco visual.',
    'components.panel.tab.a11y.semantic':
      'Semantica: Botones con estructura clara y etiquetas visibles.',
    'components.panel.tab.examples.title': 'Ejemplos Completos',
    'components.panel.tab.examples.desc': 'Casos de uso comunes.',
    'components.panel.tab.examples.basic': 'Pestanas basicas',
    'components.panel.tab.examples.codeAria': 'Ejemplos de codigo de tabs',
    'components.panel.tab.table.header.name': 'Nombre',
    'components.panel.tab.table.header.type': 'Tipo',
    'components.panel.tab.table.header.default': 'Valor por Defecto',
    'components.panel.tab.table.header.description': 'Descripcion',
    'components.panel.tab.inputs.lineColor.desc':
      'Color de la linea que indica la pestana activa.',
    'components.panel.tab.inputs.activeBg.desc':
      'Color de fondo para la pestana activa.',
    'components.panel.tab.inputs.activeText.desc':
      'Color de texto para la pestana activa.',
    'components.panel.tab.inputs.hoverBg.desc':
      'Color de fondo al pasar el cursor sobre cada pestana.',
    'components.panel.tab.inputs.positionContent.desc':
      'Posicion del contenido, usa los mismos valores que justify-content.',
    'components.panel.tab.inputs.panelWidth.desc':
      "Controla el ancho del panel activo. El valor por defecto 'full' evita huecos visuales.",
    'components.panel.tab.inputs.tabListAriaLabel.desc':
      'Etiqueta accesible para el contenedor tablist.',
    'components.panel.tab.inputs.legacy.desc':
      'Inputs legacy soportados por compatibilidad (preferir lineColor, activeBg y activeText).',
    'components.panel.tab.tabs.html': 'HTML',
    'components.panel.tab.tabs.ts': 'TypeScript',
  },
  en: {
    'components.panel.tab.title': 'MagaryTabs',
    'components.panel.tab.import.title': 'Import',
    'components.panel.tab.import.desc':
      'Import the component in your module or standalone component.',
    'components.panel.tab.basic.title': 'Basic Example',
    'components.panel.tab.basic.tab1': 'Home',
    'components.panel.tab.basic.tab1Heading': 'Welcome',
    'components.panel.tab.basic.tab1Body': 'Home tab content.',
    'components.panel.tab.basic.tab2': 'Profile',
    'components.panel.tab.basic.tab2Heading': 'Your profile',
    'components.panel.tab.basic.tab2Body': 'Personal details, settings, etc.',
    'components.panel.tab.basic.tab3': 'Help',
    'components.panel.tab.basic.tab3Body':
      'Here you can find assistance.',
    'components.panel.tab.basic.tab4': 'Contact',
    'components.panel.tab.basic.tab4Body':
      'Here you can find contact numbers.',
    'components.panel.tab.basic.aria': 'Main sections',
    'components.panel.tab.inputs.title': 'Properties (Inputs)',
    'components.panel.tab.inputs.desc':
      'All available component properties.',
    'components.panel.tab.outputs.title': 'Events (Outputs)',
    'components.panel.tab.outputs.desc': 'Events emitted by the component.',
    'components.panel.tab.outputs.body':
      'This component does not emit events directly, but you can react to internal tab changes.',
    'components.panel.tab.expected.title': 'Expected Content',
    'components.panel.tab.expected.desc':
      'This component expects one or more <magary-tab> child components.',
    'components.panel.tab.expected.item1':
      'Each <magary-tab> must have a label property.',
    'components.panel.tab.expected.item2':
      'Content inside each tab is shown only when active.',
    'components.panel.tab.a11y.title': 'Accessibility',
    'components.panel.tab.a11y.desc': 'Implemented accessibility features.',
    'components.panel.tab.a11y.keyboard':
      'Keyboard: Supports Tab, ArrowLeft, ArrowRight, Home, and End.',
    'components.panel.tab.a11y.activation':
      'Activation: Tabs activate with Enter or Click.',
    'components.panel.tab.a11y.focus':
      'Focus: Tabs show visible focus styles.',
    'components.panel.tab.a11y.semantic':
      'Semantics: Buttons with clear structure and visible labels.',
    'components.panel.tab.examples.title': 'Complete Examples',
    'components.panel.tab.examples.desc': 'Common usage cases.',
    'components.panel.tab.examples.basic': 'Basic Tabs',
    'components.panel.tab.examples.codeAria': 'Tabs code samples',
    'components.panel.tab.table.header.name': 'Name',
    'components.panel.tab.table.header.type': 'Type',
    'components.panel.tab.table.header.default': 'Default',
    'components.panel.tab.table.header.description': 'Description',
    'components.panel.tab.inputs.lineColor.desc':
      'Line color that marks the active tab.',
    'components.panel.tab.inputs.activeBg.desc':
      'Background color for active tab.',
    'components.panel.tab.inputs.activeText.desc':
      'Text color for active tab.',
    'components.panel.tab.inputs.hoverBg.desc':
      'Background color when hovering tabs.',
    'components.panel.tab.inputs.positionContent.desc':
      'Content alignment, uses justify-content values.',
    'components.panel.tab.inputs.panelWidth.desc':
      "Controls active panel width. Default 'full' avoids visual gaps.",
    'components.panel.tab.inputs.tabListAriaLabel.desc':
      'Accessible label for tablist container.',
    'components.panel.tab.inputs.legacy.desc':
      'Legacy inputs kept for compatibility (prefer lineColor, activeBg, and activeText).',
    'components.panel.tab.tabs.html': 'HTML',
    'components.panel.tab.tabs.ts': 'TypeScript',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
