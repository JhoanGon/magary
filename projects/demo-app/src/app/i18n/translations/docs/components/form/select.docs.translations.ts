import { DemoLanguage } from '../../../../types';

export const SELECT_DOC_TEXT = {
  es: {
    'components.form.select.title': 'Magary Select',
    'components.form.select.subtitle':
      'Componente de seleccion nativo estilizado compatible con Reactive Forms y soporte para objetos complejos.',
    'components.form.select.import.title': 'Importacion',
    'components.form.select.import.desc':
      'Importa el modulo en tu componente standalone.',
    'components.form.select.basic.title': 'Uso Basico',
    'components.form.select.basic.desc':
      'Select simple con opciones primitivas o de objetos.',
    'components.form.select.basic.label.basic': 'Basico (String)',
    'components.form.select.basic.label.disabled': 'Deshabilitado',
    'components.form.select.basic.label.loading': 'Cargando',
    'components.form.select.basic.label.smallHelp': 'Small + Ayuda',
    'components.form.select.basic.label.invalidError': 'Invalido + Error',
    'components.form.select.basic.placeholder.selectCity':
      'Selecciona una ciudad',
    'components.form.select.basic.placeholder.disabled': 'Deshabilitado',
    'components.form.select.basic.placeholder.loading': 'Cargando...',
    'components.form.select.basic.placeholder.chooseCity':
      'Elige una ciudad',
    'components.form.select.basic.helpText':
      'Puedes cambiar la seleccion luego',
    'components.form.select.basic.placeholder.required': 'Requerido',
    'components.form.select.basic.errorMessage':
      'Selecciona una ciudad valida',
    'components.form.select.reactive.title': 'Reactive Forms y Objetos',
    'components.form.select.reactive.desc':
      'Integracion completa con FormControl y manejo de objetos complejos.',
    'components.form.select.reactive.selectedUser': 'Usuario seleccionado',
    'components.form.select.common.none': 'Ninguno',
    'components.form.select.reactive.placeholder': 'Selecciona un usuario',
    'components.form.select.filter.title': 'Filtrado y Limpiar',
    'components.form.select.filter.desc':
      'Habilita busqueda por texto en listas largas y boton de limpieza. El filtrado se realiza localmente sobre la propiedad optionLabel.',
    'components.form.select.filter.label.countries': 'Paises (con filtro)',
    'components.form.select.filter.placeholder': 'Selecciona un pais',
    'components.form.select.filter.selectedLabel': 'Seleccionado',
    'components.form.select.api.title': 'Referencia API',
    'components.form.select.api.desc':
      'Inputs y Outputs disponibles para magary-select.',
    'components.form.select.api.header.name': 'Nombre',
    'components.form.select.api.header.type': 'Tipo',
    'components.form.select.api.header.default': 'Default',
    'components.form.select.api.header.description': 'Descripcion',
    'components.form.select.api.options.desc':
      'Array de objetos o primitivos a mostrar.',
    'components.form.select.api.optionLabel.desc':
      'Nombre de la propiedad a usar como etiqueta.',
    'components.form.select.api.optionValue.desc':
      'Nombre de la propiedad a usar como valor.',
    'components.form.select.api.placeholder.desc':
      'Texto a mostrar cuando no hay seleccion.',
    'components.form.select.api.disabled.desc':
      'Deshabilita el componente (soporta atributo HTML).',
    'components.form.select.api.loading.desc':
      'Muestra un spinner de carga (soporta atributo HTML).',
    'components.form.select.api.size.desc': 'Tamano visual del control.',
    'components.form.select.api.invalid.desc':
      'Marca el control como invalido y activa estado de error.',
    'components.form.select.api.error.desc':
      'Mensaje de error mostrado debajo del select.',
    'components.form.select.api.helpText.desc':
      'Texto de ayuda cuando no hay error.',
    'components.form.select.api.filter.desc':
      'Habilita el input de busqueda.',
    'components.form.select.api.showClear.desc':
      'Muestra boton para limpiar seleccion.',
  },
  en: {
    'components.form.select.title': 'Magary Select',
    'components.form.select.subtitle':
      'Styled native select component compatible with Reactive Forms and complex object options.',
    'components.form.select.import.title': 'Import',
    'components.form.select.import.desc':
      'Import the module in your standalone component.',
    'components.form.select.basic.title': 'Basic Usage',
    'components.form.select.basic.desc':
      'Simple select with primitive or object options.',
    'components.form.select.basic.label.basic': 'Basic (String)',
    'components.form.select.basic.label.disabled': 'Disabled',
    'components.form.select.basic.label.loading': 'Loading',
    'components.form.select.basic.label.smallHelp': 'Small + Help Text',
    'components.form.select.basic.label.invalidError': 'Invalid + Error',
    'components.form.select.basic.placeholder.selectCity': 'Select a city',
    'components.form.select.basic.placeholder.disabled': 'Disabled',
    'components.form.select.basic.placeholder.loading': 'Loading...',
    'components.form.select.basic.placeholder.chooseCity': 'Choose city',
    'components.form.select.basic.helpText':
      'You can change the selection later',
    'components.form.select.basic.placeholder.required': 'Required',
    'components.form.select.basic.errorMessage': 'Select a valid city',
    'components.form.select.reactive.title': 'Reactive Forms & Objects',
    'components.form.select.reactive.desc':
      'Full integration with FormControl and complex object handling.',
    'components.form.select.reactive.selectedUser': 'Selected User',
    'components.form.select.common.none': 'None',
    'components.form.select.reactive.placeholder': 'Select a user',
    'components.form.select.filter.title': 'Filtering & Clear',
    'components.form.select.filter.desc':
      'Enables text search for long lists and a clear button. Filtering runs locally using optionLabel.',
    'components.form.select.filter.label.countries': 'Countries (Filterable)',
    'components.form.select.filter.placeholder': 'Select a country',
    'components.form.select.filter.selectedLabel': 'Selected',
    'components.form.select.api.title': 'API Reference',
    'components.form.select.api.desc':
      'Available inputs and outputs for magary-select.',
    'components.form.select.api.header.name': 'Name',
    'components.form.select.api.header.type': 'Type',
    'components.form.select.api.header.default': 'Default',
    'components.form.select.api.header.description': 'Description',
    'components.form.select.api.options.desc':
      'Array of objects or primitives to render.',
    'components.form.select.api.optionLabel.desc':
      'Object property name used as label.',
    'components.form.select.api.optionValue.desc':
      'Object property name used as value.',
    'components.form.select.api.placeholder.desc':
      'Text shown when no option is selected.',
    'components.form.select.api.disabled.desc':
      'Disables the component (supports HTML attribute).',
    'components.form.select.api.loading.desc':
      'Shows loading spinner (supports HTML attribute).',
    'components.form.select.api.size.desc': 'Visual size of the control.',
    'components.form.select.api.invalid.desc':
      'Marks control invalid and enables error state.',
    'components.form.select.api.error.desc':
      'Error message shown below the select.',
    'components.form.select.api.helpText.desc':
      'Help text shown when there is no error.',
    'components.form.select.api.filter.desc': 'Enables search input.',
    'components.form.select.api.showClear.desc':
      'Shows a button to clear selection.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
