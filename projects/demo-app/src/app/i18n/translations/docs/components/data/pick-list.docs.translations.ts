import { DemoLanguage } from '../../../../types';

export const PICK_LIST_DOC_TEXT = {
  es: {
    'components.data.pickList.title': 'PickList',
    'components.data.pickList.subtitle':
      'Componente para reordenar y transferir elementos entre dos listas.',
    'components.data.pickList.import.title': 'Importar',
    'components.data.pickList.import.desc':
      'Importa el componente en tu modulo o componente standalone.',
    'components.data.pickList.basic.title': 'Uso Basico',
    'components.data.pickList.sourceHeader': 'Disponibles',
    'components.data.pickList.targetHeader': 'Seleccionados',
    'components.data.pickList.apiInputs.title': 'Propiedades (Inputs)',
    'components.data.pickList.apiInputs.header.name': 'Nombre',
    'components.data.pickList.apiInputs.header.type': 'Tipo',
    'components.data.pickList.apiInputs.header.default': 'Default',
    'components.data.pickList.apiInputs.header.description': 'Descripcion',
    'components.data.pickList.apiInputs.source.desc':
      'Array de elementos para la lista origen.',
    'components.data.pickList.apiInputs.target.desc':
      'Array de elementos para la lista destino (seleccionados).',
    'components.data.pickList.apiInputs.sourceHeader.desc':
      'Texto del encabezado de la lista origen.',
    'components.data.pickList.apiInputs.targetHeader.desc':
      'Texto del encabezado de la lista destino.',
    'components.data.pickList.apiInputs.sourceStyle.desc':
      'Estilo inline para la lista origen.',
    'components.data.pickList.apiInputs.targetStyle.desc':
      'Estilo inline para la lista destino.',
    'components.data.pickList.apiOutputs.title': 'Eventos (Outputs)',
    'components.data.pickList.apiOutputs.header.name': 'Nombre',
    'components.data.pickList.apiOutputs.header.type': 'Tipo',
    'components.data.pickList.apiOutputs.header.description': 'Descripcion',
    'components.data.pickList.apiOutputs.onMoveToTarget.desc':
      'Callback cuando se mueven items al target.',
    'components.data.pickList.apiOutputs.onMoveToSource.desc':
      'Callback cuando se mueven items al source.',
    'components.data.pickList.apiOutputs.onMoveAllToTarget.desc':
      'Callback cuando se mueven todos al target.',
    'components.data.pickList.apiOutputs.onMoveAllToSource.desc':
      'Callback cuando se mueven todos al source.',
  },
  en: {
    'components.data.pickList.title': 'PickList',
    'components.data.pickList.subtitle':
      'Component to reorder and transfer items between two lists.',
    'components.data.pickList.import.title': 'Import',
    'components.data.pickList.import.desc':
      'Import the component in your module or standalone component.',
    'components.data.pickList.basic.title': 'Basic Usage',
    'components.data.pickList.sourceHeader': 'Available',
    'components.data.pickList.targetHeader': 'Selected',
    'components.data.pickList.apiInputs.title': 'Properties (Inputs)',
    'components.data.pickList.apiInputs.header.name': 'Name',
    'components.data.pickList.apiInputs.header.type': 'Type',
    'components.data.pickList.apiInputs.header.default': 'Default',
    'components.data.pickList.apiInputs.header.description': 'Description',
    'components.data.pickList.apiInputs.source.desc':
      'Array of items for the source list.',
    'components.data.pickList.apiInputs.target.desc':
      'Array of items for the target list (selected).',
    'components.data.pickList.apiInputs.sourceHeader.desc':
      'Header text for the source list.',
    'components.data.pickList.apiInputs.targetHeader.desc':
      'Header text for the target list.',
    'components.data.pickList.apiInputs.sourceStyle.desc':
      'Inline style for source list.',
    'components.data.pickList.apiInputs.targetStyle.desc':
      'Inline style for target list.',
    'components.data.pickList.apiOutputs.title': 'Events (Outputs)',
    'components.data.pickList.apiOutputs.header.name': 'Name',
    'components.data.pickList.apiOutputs.header.type': 'Type',
    'components.data.pickList.apiOutputs.header.description': 'Description',
    'components.data.pickList.apiOutputs.onMoveToTarget.desc':
      'Callback when items are moved to target.',
    'components.data.pickList.apiOutputs.onMoveToSource.desc':
      'Callback when items are moved back to source.',
    'components.data.pickList.apiOutputs.onMoveAllToTarget.desc':
      'Callback when all items are moved to target.',
    'components.data.pickList.apiOutputs.onMoveAllToSource.desc':
      'Callback when all items are moved back to source.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
