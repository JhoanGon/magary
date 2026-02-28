import { DemoLanguage } from '../../../../types';

export const STEPS_DOC_TEXT = {
  es: {
    'components.menu.steps.title': 'Magary Steps',
    'components.menu.steps.subtitle':
      'Indicador de progreso que guia a los usuarios a traves de una secuencia de pasos.',
    'components.menu.steps.items.personal': 'Personal',
    'components.menu.steps.items.seat': 'Asiento',
    'components.menu.steps.items.payment': 'Pago',
    'components.menu.steps.items.confirmation': 'Confirmacion',
    'components.menu.steps.navigation.back': 'Back',
    'components.menu.steps.navigation.next': 'Next',
    'components.menu.steps.linear.title': 'Secuencial (Linear)',
    'components.menu.steps.linear.desc':
      'Los pasos son de solo lectura (readonly=true) y la navegacion se controla externamente.',
    'components.menu.steps.interactive.title': 'Interactivo',
    'components.menu.steps.interactive.desc':
      'Steps permite navegar entre pasos si readonly es false.',
    'components.menu.steps.vertical.title': 'Vertical',
    'components.menu.steps.vertical.desc':
      'Orientacion vertical usando orientation="vertical".',
    'components.menu.steps.content.title': 'Contenido Dinamico (Wizard)',
    'components.menu.steps.content.desc':
      'Ejemplo de wizard completo donde el contenido cambia segun el paso activo.',
    'components.menu.steps.content.step1.title': 'Informacion Personal',
    'components.menu.steps.content.step1.desc':
      'Ingrese sus datos personales para comenzar el proceso.',
    'components.menu.steps.content.step1.placeholder': 'Formulario Paso 1',
    'components.menu.steps.content.step2.title': 'Seleccion de Asiento',
    'components.menu.steps.content.step2.desc':
      'Elija su ubicacion preferida en el mapa.',
    'components.menu.steps.content.step2.placeholder': 'Mapa de Asientos',
    'components.menu.steps.content.step3.title': 'Pago',
    'components.menu.steps.content.step3.desc':
      'Seleccione su metodo de pago seguro.',
    'components.menu.steps.content.step3.placeholder': 'Pasarela de Pago',
    'components.menu.steps.content.step4.title': 'Confirmacion',
    'components.menu.steps.content.step4.desc':
      'Revise los detalles antes de finalizar.',
    'components.menu.steps.content.step4.placeholder': 'Resumen de Compra',
    'components.menu.steps.apiInputs.title': 'Propiedades (Inputs)',
    'components.menu.steps.apiInputs.desc':
      'Atributos para configurar el componente.',
    'components.menu.steps.apiInputs.header.name': 'Nombre',
    'components.menu.steps.apiInputs.header.type': 'Tipo',
    'components.menu.steps.apiInputs.header.default': 'Por Defecto',
    'components.menu.steps.apiInputs.header.description': 'Descripcion',
    'components.menu.steps.apiInputs.model.desc': 'Array de pasos.',
    'components.menu.steps.apiInputs.activeIndex.desc':
      'Indice del paso activo.',
    'components.menu.steps.apiInputs.readonly.desc':
      'Si es true, no permite clickear los pasos.',
    'components.menu.steps.apiInputs.orientation.desc':
      'Orientacion del componente.',
    'components.menu.steps.apiOutputs.title': 'Eventos (Outputs)',
    'components.menu.steps.apiOutputs.desc':
      'Eventos emitidos por el componente.',
    'components.menu.steps.apiOutputs.header.name': 'Nombre',
    'components.menu.steps.apiOutputs.header.type': 'Tipo',
    'components.menu.steps.apiOutputs.header.description': 'Descripcion',
    'components.menu.steps.apiOutputs.activeIndexChange.desc':
      'Emitido cuando cambia el paso activo.',
  },
  en: {
    'components.menu.steps.title': 'Magary Steps',
    'components.menu.steps.subtitle':
      'Progress indicator that guides users through a sequence of steps.',
    'components.menu.steps.items.personal': 'Personal',
    'components.menu.steps.items.seat': 'Seat',
    'components.menu.steps.items.payment': 'Payment',
    'components.menu.steps.items.confirmation': 'Confirmation',
    'components.menu.steps.navigation.back': 'Back',
    'components.menu.steps.navigation.next': 'Next',
    'components.menu.steps.linear.title': 'Sequential (Linear)',
    'components.menu.steps.linear.desc':
      'Steps are read-only (readonly=true) and navigation is controlled externally.',
    'components.menu.steps.interactive.title': 'Interactive',
    'components.menu.steps.interactive.desc':
      'Steps allows navigation between steps when readonly is false.',
    'components.menu.steps.vertical.title': 'Vertical',
    'components.menu.steps.vertical.desc':
      'Vertical orientation using orientation="vertical".',
    'components.menu.steps.content.title': 'Dynamic Content (Wizard)',
    'components.menu.steps.content.desc':
      'Complete wizard example where content changes according to the active step.',
    'components.menu.steps.content.step1.title': 'Personal Information',
    'components.menu.steps.content.step1.desc':
      'Enter your personal details to begin the process.',
    'components.menu.steps.content.step1.placeholder': 'Step 1 Form',
    'components.menu.steps.content.step2.title': 'Seat Selection',
    'components.menu.steps.content.step2.desc':
      'Choose your preferred position on the map.',
    'components.menu.steps.content.step2.placeholder': 'Seat Map',
    'components.menu.steps.content.step3.title': 'Payment',
    'components.menu.steps.content.step3.desc':
      'Select your secure payment method.',
    'components.menu.steps.content.step3.placeholder': 'Payment Gateway',
    'components.menu.steps.content.step4.title': 'Confirmation',
    'components.menu.steps.content.step4.desc':
      'Review the details before finishing.',
    'components.menu.steps.content.step4.placeholder': 'Purchase Summary',
    'components.menu.steps.apiInputs.title': 'Properties (Inputs)',
    'components.menu.steps.apiInputs.desc':
      'Attributes used to configure the component.',
    'components.menu.steps.apiInputs.header.name': 'Name',
    'components.menu.steps.apiInputs.header.type': 'Type',
    'components.menu.steps.apiInputs.header.default': 'Default',
    'components.menu.steps.apiInputs.header.description': 'Description',
    'components.menu.steps.apiInputs.model.desc': 'Array of steps.',
    'components.menu.steps.apiInputs.activeIndex.desc':
      'Index of the active step.',
    'components.menu.steps.apiInputs.readonly.desc':
      'If true, step items cannot be clicked.',
    'components.menu.steps.apiInputs.orientation.desc':
      'Component orientation.',
    'components.menu.steps.apiOutputs.title': 'Events (Outputs)',
    'components.menu.steps.apiOutputs.desc':
      'Events emitted by the component.',
    'components.menu.steps.apiOutputs.header.name': 'Name',
    'components.menu.steps.apiOutputs.header.type': 'Type',
    'components.menu.steps.apiOutputs.header.description': 'Description',
    'components.menu.steps.apiOutputs.activeIndexChange.desc':
      'Emitted when the active step changes.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
