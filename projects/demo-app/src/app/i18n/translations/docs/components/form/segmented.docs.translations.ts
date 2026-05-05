import { DemoLanguage } from '../../../../types';

export const SEGMENTED_DOC_TEXT = {
  es: {
    'components.form.segmented.title': 'MagarySegmented',
    'components.form.segmented.subtitle':
      'Control segmentado CVA-first para Angular Forms con una sola fuente de verdad.',
    'components.form.segmented.import.title': 'Import',
    'components.form.segmented.import.desc':
      'Importa el componente en tu componente standalone.',
    'components.form.segmented.basic.title': 'Basico',
    'components.form.segmented.basic.desc':
      'Ejemplo para casos como selector de idioma.',
    'components.form.segmented.basic.valueLabel': 'Valor',
    'components.form.segmented.basic.ariaLanguage': 'Seleccion de idioma',
    'components.form.segmented.object.title': 'Opciones Objeto',
    'components.form.segmented.object.desc':
      'Usando optionLabel y optionValue.',
    'components.form.segmented.object.planLabel': 'Plan',
    'components.form.segmented.object.ariaPlan': 'Seleccion de plan',
    'components.form.segmented.sizes.title': 'Tamanos y Full Width',
    'components.form.segmented.sizes.desc':
      'Soporta small, normal, large y ancho completo.',
    'components.form.segmented.sizes.ariaSmall': 'Idioma small',
    'components.form.segmented.sizes.ariaNormal': 'Idioma normal',
    'components.form.segmented.sizes.ariaLarge': 'Idioma large',
    'components.form.segmented.sizes.ariaPlansFullWidth': 'Planes full width',
    'components.form.segmented.forms.title': 'Integracion con Forms',
    'components.form.segmented.forms.desc':
      'Usa ngModel, formControl o formControlName; no expone un contrato paralelo de valor.',
    'components.form.segmented.forms.modelLabel': 'ngModel',
    'components.form.segmented.forms.ariaBinding': 'Locale form binding',
    'components.form.segmented.api.title': 'API',
    'components.form.segmented.api.desc': 'Props y eventos principales.',
    'components.form.segmented.api.header.name': 'Nombre',
    'components.form.segmented.api.header.type': 'Tipo',
    'components.form.segmented.api.header.default': 'Default',
    'components.form.segmented.api.header.description': 'Descripcion',
    'components.form.segmented.api.options.desc':
      'Lista de opciones del control.',
    'components.form.segmented.api.compareWith.desc':
      'Personaliza la comparacion cuando trabajas con valores objeto.',
    'components.form.segmented.api.optionLabel.desc':
      'Propiedad para mostrar texto cuando hay opciones objeto.',
    'components.form.segmented.api.optionValue.desc':
      'Propiedad usada como valor cuando hay opciones objeto.',
    'components.form.segmented.api.size.desc': 'Tamano visual del control.',
    'components.form.segmented.api.fullWidth.desc':
      'Hace que el control ocupe todo el ancho disponible.',
    'components.form.segmented.api.disabled.desc': 'Deshabilita interaccion.',
    'components.form.segmented.api.change.desc':
      'Evento emitido al cambiar seleccion.',
  },
  en: {
    'components.form.segmented.title': 'MagarySegmented',
    'components.form.segmented.subtitle':
      'CVA-first segmented control for Angular Forms with a single source of truth.',
    'components.form.segmented.import.title': 'Import',
    'components.form.segmented.import.desc':
      'Import the component into your standalone component.',
    'components.form.segmented.basic.title': 'Basic',
    'components.form.segmented.basic.desc':
      'Example for scenarios such as language selection.',
    'components.form.segmented.basic.valueLabel': 'Value',
    'components.form.segmented.basic.ariaLanguage': 'Language selection',
    'components.form.segmented.object.title': 'Object Options',
    'components.form.segmented.object.desc':
      'Using optionLabel and optionValue.',
    'components.form.segmented.object.planLabel': 'Plan',
    'components.form.segmented.object.ariaPlan': 'Plan selection',
    'components.form.segmented.sizes.title': 'Sizes and Full Width',
    'components.form.segmented.sizes.desc':
      'Supports small, normal, large, and full width layout.',
    'components.form.segmented.sizes.ariaSmall': 'Language small',
    'components.form.segmented.sizes.ariaNormal': 'Language normal',
    'components.form.segmented.sizes.ariaLarge': 'Language large',
    'components.form.segmented.sizes.ariaPlansFullWidth': 'Plans full width',
    'components.form.segmented.forms.title': 'Forms Integration',
    'components.form.segmented.forms.desc':
      'Use ngModel, formControl, or formControlName without a parallel value contract.',
    'components.form.segmented.forms.modelLabel': 'ngModel',
    'components.form.segmented.forms.ariaBinding': 'Locale form binding',
    'components.form.segmented.api.title': 'API',
    'components.form.segmented.api.desc': 'Main props and events.',
    'components.form.segmented.api.header.name': 'Name',
    'components.form.segmented.api.header.type': 'Type',
    'components.form.segmented.api.header.default': 'Default',
    'components.form.segmented.api.header.description': 'Description',
    'components.form.segmented.api.options.desc': 'Control options list.',
    'components.form.segmented.api.compareWith.desc':
      'Customizes equality when you work with object values.',
    'components.form.segmented.api.optionLabel.desc':
      'Property used to show label text for object options.',
    'components.form.segmented.api.optionValue.desc':
      'Property used as value for object options.',
    'components.form.segmented.api.size.desc': 'Visual size of the control.',
    'components.form.segmented.api.fullWidth.desc':
      'Makes the control take the full available width.',
    'components.form.segmented.api.disabled.desc':
      'Disables interaction.',
    'components.form.segmented.api.change.desc':
      'Event emitted when selection changes.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
