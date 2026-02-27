import { DemoLanguage } from '../../../../types';

export const INPUT_NUMBER_DOC_TEXT = {
  es: {
    'components.form.inputNumber.title': 'Magary InputNumber',
    'components.form.inputNumber.subtitle':
      'Componente de entrada para valores numericos con formato y validacion.',
    'components.form.inputNumber.import.title': 'Importacion',
    'components.form.inputNumber.examples.title': 'Ejemplos',
    'components.form.inputNumber.examples.desc':
      'Diferentes configuraciones de formato y layout.',
    'components.form.inputNumber.examples.basic.label': 'Basico',
    'components.form.inputNumber.examples.basic.placeholder': '0-100',
    'components.form.inputNumber.examples.currency.label': 'Moneda (USD)',
    'components.form.inputNumber.examples.currency.placeholder': 'USD',
    'components.form.inputNumber.examples.horizontal.label':
      'Botones horizontales',
    'components.form.inputNumber.inputs.title': 'Propiedades (Inputs)',
    'components.form.inputNumber.inputs.desc':
      'Todas las propiedades disponibles del componente.',
    'components.form.inputNumber.inputs.header.name': 'Nombre',
    'components.form.inputNumber.inputs.header.type': 'Tipo',
    'components.form.inputNumber.inputs.header.default': 'Por defecto',
    'components.form.inputNumber.inputs.header.description': 'Descripcion',
    'components.form.inputNumber.inputs.value.desc': 'Valor del componente.',
    'components.form.inputNumber.inputs.format.desc':
      'Si se debe formatear el valor.',
    'components.form.inputNumber.inputs.showButtons.desc':
      'Mostrar botones de incremento y decremento.',
    'components.form.inputNumber.inputs.buttonLayout.desc':
      'Layout de botones: stacked, horizontal o vertical.',
    'components.form.inputNumber.inputs.incrementButtonIcon.desc':
      'Icono del boton de incremento.',
    'components.form.inputNumber.inputs.decrementButtonIcon.desc':
      'Icono del boton de decremento.',
    'components.form.inputNumber.inputs.mode.desc':
      'Modo decimal, currency o percent.',
    'components.form.inputNumber.inputs.min.desc': 'Valor minimo.',
    'components.form.inputNumber.inputs.max.desc': 'Valor maximo.',
    'components.form.inputNumber.inputs.step.desc': 'Paso de incremento.',
    'components.form.inputNumber.inputs.suffix.desc': 'Texto sufijo.',
    'components.form.inputNumber.inputs.prefix.desc': 'Texto prefijo.',
    'components.form.inputNumber.inputs.currency.desc':
      'Codigo de moneda (ISO 4217).',
    'components.form.inputNumber.inputs.currencyDisplay.desc':
      'Como mostrar la moneda.',
    'components.form.inputNumber.inputs.useGrouping.desc':
      'Usar separador de miles.',
    'components.form.inputNumber.inputs.minFractionDigits.desc':
      'Minimo de decimales.',
    'components.form.inputNumber.inputs.maxFractionDigits.desc':
      'Maximo de decimales.',
    'components.form.inputNumber.outputs.title': 'Eventos (Outputs)',
    'components.form.inputNumber.outputs.desc':
      'Eventos emitidos por el componente.',
    'components.form.inputNumber.outputs.header.name': 'Nombre',
    'components.form.inputNumber.outputs.header.type': 'Tipo',
    'components.form.inputNumber.outputs.header.description': 'Descripcion',
    'components.form.inputNumber.outputs.onInput.desc':
      'Emitido cuando el valor cambia por input manual.',
    'components.form.inputNumber.outputs.onFocus.desc':
      'Emitido cuando el input recibe foco.',
    'components.form.inputNumber.outputs.onBlur.desc':
      'Emitido cuando el input pierde foco.',
    'components.form.inputNumber.outputs.onKeyDown.desc':
      'Emitido al presionar una tecla.',
  },
  en: {
    'components.form.inputNumber.title': 'Magary InputNumber',
    'components.form.inputNumber.subtitle':
      'Input component for numeric values with formatting and validation.',
    'components.form.inputNumber.import.title': 'Import',
    'components.form.inputNumber.examples.title': 'Examples',
    'components.form.inputNumber.examples.desc':
      'Different formatting and layout configurations.',
    'components.form.inputNumber.examples.basic.label': 'Basic',
    'components.form.inputNumber.examples.basic.placeholder': '0-100',
    'components.form.inputNumber.examples.currency.label': 'Currency (USD)',
    'components.form.inputNumber.examples.currency.placeholder': 'USD',
    'components.form.inputNumber.examples.horizontal.label':
      'Horizontal buttons',
    'components.form.inputNumber.inputs.title': 'Properties (Inputs)',
    'components.form.inputNumber.inputs.desc':
      'All available properties for this component.',
    'components.form.inputNumber.inputs.header.name': 'Name',
    'components.form.inputNumber.inputs.header.type': 'Type',
    'components.form.inputNumber.inputs.header.default': 'Default',
    'components.form.inputNumber.inputs.header.description': 'Description',
    'components.form.inputNumber.inputs.value.desc': 'Component value.',
    'components.form.inputNumber.inputs.format.desc':
      'Whether the value should be formatted.',
    'components.form.inputNumber.inputs.showButtons.desc':
      'Show increment and decrement buttons.',
    'components.form.inputNumber.inputs.buttonLayout.desc':
      'Button layout: stacked, horizontal, or vertical.',
    'components.form.inputNumber.inputs.incrementButtonIcon.desc':
      'Increment button icon.',
    'components.form.inputNumber.inputs.decrementButtonIcon.desc':
      'Decrement button icon.',
    'components.form.inputNumber.inputs.mode.desc':
      'decimal, currency, or percent mode.',
    'components.form.inputNumber.inputs.min.desc': 'Minimum value.',
    'components.form.inputNumber.inputs.max.desc': 'Maximum value.',
    'components.form.inputNumber.inputs.step.desc': 'Increment step.',
    'components.form.inputNumber.inputs.suffix.desc': 'Suffix text.',
    'components.form.inputNumber.inputs.prefix.desc': 'Prefix text.',
    'components.form.inputNumber.inputs.currency.desc':
      'Currency code (ISO 4217).',
    'components.form.inputNumber.inputs.currencyDisplay.desc':
      'How the currency is displayed.',
    'components.form.inputNumber.inputs.useGrouping.desc':
      'Use thousands grouping separator.',
    'components.form.inputNumber.inputs.minFractionDigits.desc':
      'Minimum fraction digits.',
    'components.form.inputNumber.inputs.maxFractionDigits.desc':
      'Maximum fraction digits.',
    'components.form.inputNumber.outputs.title': 'Events (Outputs)',
    'components.form.inputNumber.outputs.desc':
      'Events emitted by the component.',
    'components.form.inputNumber.outputs.header.name': 'Name',
    'components.form.inputNumber.outputs.header.type': 'Type',
    'components.form.inputNumber.outputs.header.description': 'Description',
    'components.form.inputNumber.outputs.onInput.desc':
      'Emitted when value changes by manual input.',
    'components.form.inputNumber.outputs.onFocus.desc':
      'Emitted when the input receives focus.',
    'components.form.inputNumber.outputs.onBlur.desc':
      'Emitted when the input loses focus.',
    'components.form.inputNumber.outputs.onKeyDown.desc':
      'Emitted when a key is pressed.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
