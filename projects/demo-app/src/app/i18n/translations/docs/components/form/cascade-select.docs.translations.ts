import { DemoLanguage } from '../../../../types';

export const CASCADE_SELECT_DOC_TEXT = {
  es: {
    'components.form.cascadeSelect.title': 'Cascade Select',
    'components.form.cascadeSelect.subtitle':
      'Muestra una estructura anidada de opciones jerarquicas.',
    'components.form.cascadeSelect.import.title': 'Importar',
    'components.form.cascadeSelect.import.desc':
      'Importa el componente en tu componente standalone.',
    'components.form.cascadeSelect.basic.title': 'Uso Basico',
    'components.form.cascadeSelect.basic.desc':
      'Comportamiento estandar donde solo los nodos hoja son seleccionables.',
    'components.form.cascadeSelect.basic.cardTitle':
      'Solo seleccion de hojas',
    'components.form.cascadeSelect.basic.placeholder': 'Selecciona una ciudad',
    'components.form.cascadeSelect.basic.selectedPath': 'Ruta seleccionada',
    'components.form.cascadeSelect.group.title': 'Seleccion de grupo',
    'components.form.cascadeSelect.group.desc':
      'Permite seleccionar grupos padres (paises o estados) como valores validos.',
    'components.form.cascadeSelect.group.cardTitle':
      'Seleccion de padre habilitada',
    'components.form.cascadeSelect.group.placeholder':
      'Selecciona una ciudad o region',
    'components.form.cascadeSelect.group.selectedPath': 'Ruta seleccionada',
    'components.form.cascadeSelect.common.none': 'Ninguno',
    'components.form.cascadeSelect.api.title': 'Propiedades (Inputs)',
    'components.form.cascadeSelect.api.desc':
      'Propiedades disponibles para el componente.',
    'components.form.cascadeSelect.api.header.name': 'Nombre',
    'components.form.cascadeSelect.api.header.type': 'Tipo',
    'components.form.cascadeSelect.api.header.default': 'Por defecto',
    'components.form.cascadeSelect.api.header.description': 'Descripcion',
    'components.form.cascadeSelect.api.options.desc':
      'Array de objetos para mostrar como opciones.',
    'components.form.cascadeSelect.api.optionLabel.desc':
      'Nombre del campo de etiqueta de una opcion.',
    'components.form.cascadeSelect.api.optionValue.desc':
      'Nombre del campo de valor de una opcion.',
    'components.form.cascadeSelect.api.optionGroupLabel.desc':
      'Nombre del campo de etiqueta de un grupo.',
    'components.form.cascadeSelect.api.optionGroupChildren.desc':
      'Propiedades usadas como opciones hijas de un grupo.',
    'components.form.cascadeSelect.api.optionGroupSelectable.desc':
      'Permite seleccionar grupos de opciones (padres).',
    'components.form.cascadeSelect.api.placeholder.desc':
      'Texto mostrado cuando no hay seleccion.',
    'components.form.cascadeSelect.api.disabled.desc': 'Deshabilita el componente.',
    'components.form.cascadeSelect.api.loading.desc':
      'Muestra spinner y bloquea interaccion.',
    'components.form.cascadeSelect.api.size.desc': 'Tamano visual del control.',
    'components.form.cascadeSelect.api.invalid.desc':
      'Activa estado visual de error.',
    'components.form.cascadeSelect.api.error.desc':
      'Mensaje de error mostrado debajo del control.',
    'components.form.cascadeSelect.api.helpText.desc':
      'Texto de ayuda cuando no hay error.',
    'components.form.cascadeSelect.api.width.desc': 'Ancho del componente.',
  },
  en: {
    'components.form.cascadeSelect.title': 'Cascade Select',
    'components.form.cascadeSelect.subtitle':
      'Displays a nested hierarchy of options.',
    'components.form.cascadeSelect.import.title': 'Import',
    'components.form.cascadeSelect.import.desc':
      'Import the component in your standalone component.',
    'components.form.cascadeSelect.basic.title': 'Basic Usage',
    'components.form.cascadeSelect.basic.desc':
      'Default behavior where only leaf nodes are selectable.',
    'components.form.cascadeSelect.basic.cardTitle': 'Leaf selection only',
    'components.form.cascadeSelect.basic.placeholder': 'Select a city',
    'components.form.cascadeSelect.basic.selectedPath': 'Selected path',
    'components.form.cascadeSelect.group.title': 'Group Selection',
    'components.form.cascadeSelect.group.desc':
      'Allows parent groups (countries or states) to be selected as valid values.',
    'components.form.cascadeSelect.group.cardTitle': 'Parent selection enabled',
    'components.form.cascadeSelect.group.placeholder': 'Select a city or region',
    'components.form.cascadeSelect.group.selectedPath': 'Selected path',
    'components.form.cascadeSelect.common.none': 'None',
    'components.form.cascadeSelect.api.title': 'Properties (Inputs)',
    'components.form.cascadeSelect.api.desc':
      'Available properties for this component.',
    'components.form.cascadeSelect.api.header.name': 'Name',
    'components.form.cascadeSelect.api.header.type': 'Type',
    'components.form.cascadeSelect.api.header.default': 'Default',
    'components.form.cascadeSelect.api.header.description': 'Description',
    'components.form.cascadeSelect.api.options.desc':
      'Array of objects to render as options.',
    'components.form.cascadeSelect.api.optionLabel.desc':
      'Option label field name.',
    'components.form.cascadeSelect.api.optionValue.desc':
      'Option value field name.',
    'components.form.cascadeSelect.api.optionGroupLabel.desc':
      'Option group label field name.',
    'components.form.cascadeSelect.api.optionGroupChildren.desc':
      'Property names used as child options in a group.',
    'components.form.cascadeSelect.api.optionGroupSelectable.desc':
      'Allows selecting option groups (parents).',
    'components.form.cascadeSelect.api.placeholder.desc':
      'Text shown when no option is selected.',
    'components.form.cascadeSelect.api.disabled.desc': 'Disables the component.',
    'components.form.cascadeSelect.api.loading.desc':
      'Shows spinner and blocks interaction.',
    'components.form.cascadeSelect.api.size.desc': 'Visual control size.',
    'components.form.cascadeSelect.api.invalid.desc':
      'Enables visual error state.',
    'components.form.cascadeSelect.api.error.desc':
      'Error message shown below the control.',
    'components.form.cascadeSelect.api.helpText.desc':
      'Help text shown when there is no error.',
    'components.form.cascadeSelect.api.width.desc': 'Component width.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
