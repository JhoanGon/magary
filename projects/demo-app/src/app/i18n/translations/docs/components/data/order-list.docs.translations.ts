import { DemoLanguage } from '../../../../types';

export const ORDER_LIST_DOC_TEXT = {
  es: {
    'components.data.orderList.title': 'OrderList',
    'components.data.orderList.subtitle':
      'Componente para reordenar una lista de items.',
    'components.data.orderList.import.title': 'Importar',
    'components.data.orderList.import.desc':
      'Importa el componente en tu modulo o componente standalone.',
    'components.data.orderList.basic.title': 'Uso Basico',
    'components.data.orderList.listHeader': 'Productos',
    'components.data.orderList.apiInputs.title': 'Propiedades (Inputs)',
    'components.data.orderList.apiInputs.header.name': 'Nombre',
    'components.data.orderList.apiInputs.header.type': 'Tipo',
    'components.data.orderList.apiInputs.header.default': 'Default',
    'components.data.orderList.apiInputs.header.description': 'Descripcion',
    'components.data.orderList.apiInputs.value.desc':
      'Array de elementos a ordenar.',
    'components.data.orderList.apiInputs.selection.desc':
      'Elementos seleccionados.',
    'components.data.orderList.apiInputs.header.desc':
      'Texto del encabezado.',
    'components.data.orderList.apiInputs.listStyle.desc':
      'Estilo inline para la lista.',
    'components.data.orderList.apiOutputs.title': 'Eventos (Outputs)',
    'components.data.orderList.apiOutputs.header.name': 'Nombre',
    'components.data.orderList.apiOutputs.header.type': 'Tipo',
    'components.data.orderList.apiOutputs.header.description': 'Descripcion',
    'components.data.orderList.apiOutputs.onReorder.desc':
      'Callback al reordenar la lista.',
    'components.data.orderList.apiOutputs.onSelectionChange.desc':
      'Callback al cambiar la seleccion.',
  },
  en: {
    'components.data.orderList.title': 'OrderList',
    'components.data.orderList.subtitle':
      'Component to reorder a list of items.',
    'components.data.orderList.import.title': 'Import',
    'components.data.orderList.import.desc':
      'Import the component in your module or standalone component.',
    'components.data.orderList.basic.title': 'Basic Usage',
    'components.data.orderList.listHeader': 'Products',
    'components.data.orderList.apiInputs.title': 'Properties (Inputs)',
    'components.data.orderList.apiInputs.header.name': 'Name',
    'components.data.orderList.apiInputs.header.type': 'Type',
    'components.data.orderList.apiInputs.header.default': 'Default',
    'components.data.orderList.apiInputs.header.description': 'Description',
    'components.data.orderList.apiInputs.value.desc':
      'Array of items to reorder.',
    'components.data.orderList.apiInputs.selection.desc':
      'Selected items.',
    'components.data.orderList.apiInputs.header.desc': 'Header text.',
    'components.data.orderList.apiInputs.listStyle.desc':
      'Inline style for the list.',
    'components.data.orderList.apiOutputs.title': 'Events (Outputs)',
    'components.data.orderList.apiOutputs.header.name': 'Name',
    'components.data.orderList.apiOutputs.header.type': 'Type',
    'components.data.orderList.apiOutputs.header.description': 'Description',
    'components.data.orderList.apiOutputs.onReorder.desc':
      'Callback when list order changes.',
    'components.data.orderList.apiOutputs.onSelectionChange.desc':
      'Callback when selection changes.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
