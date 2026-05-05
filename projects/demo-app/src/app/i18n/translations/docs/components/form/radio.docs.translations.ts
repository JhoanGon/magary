import { DemoLanguage } from '../../../../types';

export const RADIO_DOC_TEXT = {
  es: {
    'components.form.radio.title': 'Magary Radio Button',
    'components.form.radio.subtitle':
      'Controles de seleccion unica con `magary-radio-group` como API recomendada.',
    'components.form.radio.import.title': 'Importacion',
    'components.form.radio.import.desc':
      'Importa el componente en tu componente standalone.',
    'components.form.radio.basic.title': 'API recomendada',
    'components.form.radio.basic.desc':
      'API recomendada para colecciones de opciones: integra touched, invalid y a11y a nivel de grupo.',
    'components.form.radio.basic.city.newYork': 'New York',
    'components.form.radio.basic.city.london': 'London',
    'components.form.radio.basic.city.parisDisabled': 'Paris (deshabilitado)',
    'components.form.radio.basic.selectedCity': 'Ciudad seleccionada',
    'components.form.radio.common.none': 'Ninguna',
    'components.form.radio.group.title': 'Primitivo composable',
    'components.form.radio.group.desc':
      'Usa `magary-radio` como primitivo composable cuando necesitas controlar cada opcion manualmente.',
    'components.form.radio.group.paymentMethod': 'Metodo de pago',
    'components.form.radio.group.selectedMethod': 'Metodo seleccionado',
    'components.form.radio.apiGroup.title': 'Referencia API (Group)',
    'components.form.radio.apiGroup.desc':
      'Inputs públicos de la API recomendada `magary-radio-group`.',
    'components.form.radio.api.title': 'Referencia API',
    'components.form.radio.api.desc':
      '`magary-radio` queda como primitivo composable, no como segunda API oficial de colecciones.',
    'components.form.radio.api.header.name': 'Nombre',
    'components.form.radio.api.header.type': 'Tipo',
    'components.form.radio.api.header.default': 'Default',
    'components.form.radio.api.header.description': 'Descripcion',
    'components.form.radio.apiGroup.inputId.desc':
      'Prefijo estable para ids internos del grupo y sus radios.',
    'components.form.radio.apiGroup.ariaLabel.desc':
      'Etiqueta accesible cuando no existe label visible del grupo.',
    'components.form.radio.apiGroup.ariaLabelledby.desc':
      'Referencia por id al label visible del grupo.',
    'components.form.radio.apiGroup.ariaDescribedby.desc':
      'Concatena descripciones accesibles externas con help/error del grupo.',
    'components.form.radio.apiGroup.options.desc': 'Lista de opciones.',
    'components.form.radio.apiGroup.layout.desc': 'Orientacion del grupo.',
    'components.form.radio.apiGroup.optionLabel.desc': 'Propiedad para etiqueta.',
    'components.form.radio.apiGroup.optionValue.desc': 'Propiedad para valor.',
    'components.form.radio.apiGroup.optionDisabled.desc':
      'Propiedad booleana usada para deshabilitar opciones individuales.',
    'components.form.radio.apiGroup.disabled.desc': 'Deshabilita todo el grupo.',
    'components.form.radio.apiGroup.invalid.desc':
      'Permite forzar estado inválido además del detectado desde Angular Forms.',
    'components.form.radio.apiGroup.errorMessage.desc':
      'Mensaje visible cuando el grupo ya está inválido.',
    'components.form.radio.apiGroup.helpText.desc':
      'Texto de ayuda mostrado mientras no haya error visible.',
    'components.form.radio.api.ariaLabel.desc':
      'Etiqueta accesible del radio cuando no depende del texto visible.',
    'components.form.radio.api.ariaLabelledby.desc':
      'Asocia el radio con un label externo por id.',
    'components.form.radio.api.ariaDescribedby.desc':
      'Asocia ayudas o descripciones accesibles externas al radio.',
    'components.form.radio.api.value.desc': 'Valor del radio button.',
    'components.form.radio.api.name.desc':
      'Nombre del grupo de radios (atributo HTML).',
    'components.form.radio.api.label.desc': 'Texto descriptivo opcional.',
    'components.form.radio.api.inputId.desc':
      'ID del input interno para labels.',
    'components.form.radio.api.disabled.desc':
      'Deshabilita el radio button (soporta atributo HTML).',
  },
  en: {
    'components.form.radio.title': 'Magary Radio Button',
    'components.form.radio.subtitle':
      'Single-selection controls with `magary-radio-group` as the recommended API.',
    'components.form.radio.import.title': 'Import',
    'components.form.radio.import.desc':
      'Import the component in your standalone component.',
    'components.form.radio.basic.title': 'Recommended API',
    'components.form.radio.basic.desc':
      'Recommended API for option collections: it centralizes touched, invalid, and accessibility at group level.',
    'components.form.radio.basic.city.newYork': 'New York',
    'components.form.radio.basic.city.london': 'London',
    'components.form.radio.basic.city.parisDisabled': 'Paris (disabled)',
    'components.form.radio.basic.selectedCity': 'Selected City',
    'components.form.radio.common.none': 'None',
    'components.form.radio.group.title': 'Composable primitive',
    'components.form.radio.group.desc':
      'Use `magary-radio` as a composable primitive when you need to control each option manually.',
    'components.form.radio.group.paymentMethod': 'Payment Method',
    'components.form.radio.group.selectedMethod': 'Selected Method',
    'components.form.radio.apiGroup.title': 'API Reference (Group)',
    'components.form.radio.apiGroup.desc':
      'Public inputs for the recommended `magary-radio-group` API.',
    'components.form.radio.api.title': 'API Reference',
    'components.form.radio.api.desc':
      '`magary-radio` remains a composable primitive, not a competing collection API.',
    'components.form.radio.api.header.name': 'Name',
    'components.form.radio.api.header.type': 'Type',
    'components.form.radio.api.header.default': 'Default',
    'components.form.radio.api.header.description': 'Description',
    'components.form.radio.apiGroup.inputId.desc':
      'Stable prefix for the group and generated radio ids.',
    'components.form.radio.apiGroup.ariaLabel.desc':
      'Accessible label when there is no visible group label.',
    'components.form.radio.apiGroup.ariaLabelledby.desc':
      'Id reference for the visible group label.',
    'components.form.radio.apiGroup.ariaDescribedby.desc':
      'Merges external accessible descriptions with group help/error messaging.',
    'components.form.radio.apiGroup.options.desc': 'Options list.',
    'components.form.radio.apiGroup.layout.desc': 'Group orientation.',
    'components.form.radio.apiGroup.optionLabel.desc':
      'Property used as option label.',
    'components.form.radio.apiGroup.optionValue.desc':
      'Property used as option value.',
    'components.form.radio.apiGroup.optionDisabled.desc':
      'Boolean property used to disable individual options.',
    'components.form.radio.apiGroup.disabled.desc': 'Disables the whole group.',
    'components.form.radio.apiGroup.invalid.desc':
      'Lets you force an invalid state in addition to Angular Forms state.',
    'components.form.radio.apiGroup.errorMessage.desc':
      'Visible message once the group is already invalid.',
    'components.form.radio.apiGroup.helpText.desc':
      'Helper text shown while there is no visible error.',
    'components.form.radio.api.ariaLabel.desc':
      'Accessible radio label when it should not rely on visible text alone.',
    'components.form.radio.api.ariaLabelledby.desc':
      'Associates the radio with an external label by id.',
    'components.form.radio.api.ariaDescribedby.desc':
      'Links external accessible descriptions to the radio.',
    'components.form.radio.api.value.desc': 'Radio button value.',
    'components.form.radio.api.name.desc': 'Radio group name (HTML attribute).',
    'components.form.radio.api.label.desc': 'Optional descriptive label text.',
    'components.form.radio.api.inputId.desc': 'Internal input id for labels.',
    'components.form.radio.api.disabled.desc':
      'Disables the radio button (supports HTML attribute).',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
