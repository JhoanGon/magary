import { DemoLanguage } from '../../../../types';

export const CHECKBOX_DOC_TEXT = {
  es: {
    'components.form.checkbox.title': 'MagaryCheckbox',
    'components.form.checkbox.subtitle':
      'Componente de seleccion binaria con soporte para estados, colores y animaciones personalizadas.',
    'components.form.checkbox.import.title': 'Import',
    'components.form.checkbox.import.desc':
      'Importa el componente en tu modulo o componente standalone.',
    'components.form.checkbox.basic.title': 'Ejemplo Basico',
    'components.form.checkbox.basic.demoTitle': 'Default',
    'components.form.checkbox.basic.acceptTerms': 'Aceptar terminos',
    'components.form.checkbox.basic.valueLabel': 'Valor',
    'components.form.checkbox.states.title': 'Estados',
    'components.form.checkbox.states.desc':
      'Diferentes estados interactivos del componente.',
    'components.form.checkbox.states.checked': 'Estado marcado',
    'components.form.checkbox.states.unchecked': 'Estado desmarcado',
    'components.form.checkbox.states.disabledChecked': 'Deshabilitado marcado',
    'components.form.checkbox.states.disabledUnchecked':
      'Deshabilitado desmarcado',
    'components.form.checkbox.colors.title': 'Colores',
    'components.form.checkbox.colors.desc': 'Variantes semanticas de color.',
    'components.form.checkbox.colors.primary': 'Primario',
    'components.form.checkbox.colors.success': 'Exito',
    'components.form.checkbox.colors.danger': 'Peligro',
    'components.form.checkbox.colors.warning': 'Advertencia',
    'components.form.checkbox.colors.info': 'Info',
    'components.form.checkbox.api.title': 'API',
    'components.form.checkbox.api.desc': 'Propiedades y eventos disponibles.',
    'components.form.checkbox.api.header.name': 'Nombre',
    'components.form.checkbox.api.header.type': 'Tipo',
    'components.form.checkbox.api.header.default': 'Default',
    'components.form.checkbox.api.header.description': 'Descripcion',
    'components.form.checkbox.api.checked.desc':
      'Valor del checkbox (two-way binding).',
    'components.form.checkbox.api.label.desc':
      'Texto a mostrar junto al checkbox.',
    'components.form.checkbox.api.disabled.desc': 'Deshabilita la interaccion.',
    'components.form.checkbox.api.color.desc':
      'Color semantico del componente.',
    'components.form.checkbox.api.required.desc':
      'Marca el campo como requerido.',
    'components.form.checkbox.api.change.desc':
      'Evento emitido al cambiar el valor.',
    'components.form.checkbox.a11y.title': 'Accesibilidad',
    'components.form.checkbox.a11y.keyboard.title': 'Keyboard Support',
    'components.form.checkbox.a11y.keyboard.desc':
      'Soporta navegacion con Tab y activacion con Space.',
    'components.form.checkbox.a11y.screenReaders.title': 'Screen Readers',
    'components.form.checkbox.a11y.screenReaders.desc':
      'Usa un input nativo oculto para compatibilidad con lectores de pantalla.',
    'components.form.checkbox.a11y.labels.title': 'Labels',
    'components.form.checkbox.a11y.labels.desc':
      'El label se asocia programaticamente con el input usando el atributo for.',
  },
  en: {
    'components.form.checkbox.title': 'MagaryCheckbox',
    'components.form.checkbox.subtitle':
      'Binary selection component with support for states, colors, and custom animations.',
    'components.form.checkbox.import.title': 'Import',
    'components.form.checkbox.import.desc':
      'Import the component in your module or standalone component.',
    'components.form.checkbox.basic.title': 'Basic Example',
    'components.form.checkbox.basic.demoTitle': 'Default',
    'components.form.checkbox.basic.acceptTerms': 'Accept terms',
    'components.form.checkbox.basic.valueLabel': 'Value',
    'components.form.checkbox.states.title': 'States',
    'components.form.checkbox.states.desc':
      'Different interactive states for the component.',
    'components.form.checkbox.states.checked': 'Checked state',
    'components.form.checkbox.states.unchecked': 'Unchecked state',
    'components.form.checkbox.states.disabledChecked': 'Disabled checked',
    'components.form.checkbox.states.disabledUnchecked': 'Disabled unchecked',
    'components.form.checkbox.colors.title': 'Colors',
    'components.form.checkbox.colors.desc': 'Semantic color variants.',
    'components.form.checkbox.colors.primary': 'Primary',
    'components.form.checkbox.colors.success': 'Success',
    'components.form.checkbox.colors.danger': 'Danger',
    'components.form.checkbox.colors.warning': 'Warning',
    'components.form.checkbox.colors.info': 'Info',
    'components.form.checkbox.api.title': 'API',
    'components.form.checkbox.api.desc': 'Available properties and events.',
    'components.form.checkbox.api.header.name': 'Name',
    'components.form.checkbox.api.header.type': 'Type',
    'components.form.checkbox.api.header.default': 'Default',
    'components.form.checkbox.api.header.description': 'Description',
    'components.form.checkbox.api.checked.desc':
      'Checkbox value (two-way binding).',
    'components.form.checkbox.api.label.desc':
      'Text shown next to the checkbox.',
    'components.form.checkbox.api.disabled.desc': 'Disables interaction.',
    'components.form.checkbox.api.color.desc':
      'Semantic color of the component.',
    'components.form.checkbox.api.required.desc':
      'Marks the field as required.',
    'components.form.checkbox.api.change.desc':
      'Event emitted when the value changes.',
    'components.form.checkbox.a11y.title': 'Accessibility',
    'components.form.checkbox.a11y.keyboard.title': 'Keyboard Support',
    'components.form.checkbox.a11y.keyboard.desc':
      'Supports Tab navigation and Space activation.',
    'components.form.checkbox.a11y.screenReaders.title': 'Screen Readers',
    'components.form.checkbox.a11y.screenReaders.desc':
      'Uses a hidden native input for screen reader compatibility.',
    'components.form.checkbox.a11y.labels.title': 'Labels',
    'components.form.checkbox.a11y.labels.desc':
      'The label is programmatically associated with the input via the for attribute.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
