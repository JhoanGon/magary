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
    'components.data.orderList.noControls.title': 'Lista sin controles',
    'components.data.orderList.noControls.desc': 'Puedes ocultar las flechas laterales usando la propiedad [showControls]="false". Ideal para vistas compartidas.',
    'components.data.orderList.listHeader': 'Productos',
    'components.data.orderList.comparison.title': 'Tablero Magary Kanban',
    'components.data.orderList.comparison.subtitle':
      'Ejemplo tipo Kanban conectando listas para mover y reordenar tarjetas entre ellas.',
    'components.data.orderList.comparison.moves': 'Movimientos:',
    'components.data.orderList.comparison.legacy.title':
      'Lista Simple',
    'components.data.orderList.comparison.legacy.desc':
      'Implementacion basica para reordenar dentro de la misma columna.',
    'components.data.orderList.comparison.legacy.hint':
      'Usa las flechas o arrastra un elemento para cambiar su posicion.',
    'components.data.orderList.comparison.pragmatic.title':
      'Magary Kanban',
    'components.data.orderList.comparison.pragmatic.desc':
      'Componente listo para reordenar y mover tarjetas libremente entre multiples columnas.',
    'components.data.orderList.comparison.pragmatic.hint':
      'Arrastra tarjetas entre columnas para ver la transferencia en accion.',
    'components.data.orderList.comparison.code.title': 'Codigo de implementacion',
    'components.data.orderList.comparison.code.desc':
      'Codigo de ejemplo para inicializar las columnas con Magary Kanban.',
    'components.data.orderList.comparison.columns.confluence': 'Confluence',
    'components.data.orderList.comparison.columns.jira': 'Jira',
    'components.data.orderList.comparison.columns.trello': 'Trello',
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
    'components.data.orderList.apiInputs.dragDrop.desc':
      'Enables drag-and-drop reordering.',
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
    'components.data.orderList.noControls.title': 'List without controls',
    'components.data.orderList.noControls.desc': 'You can hide the side arrows by setting the [showControls]="false" property. Ideal for shared views.',
    'components.data.orderList.listHeader': 'Products',
    'components.data.orderList.comparison.title': 'Magary Kanban Board',
    'components.data.orderList.comparison.subtitle':
      'Kanban-style example connecting lists to reorder and move cards across columns.',
    'components.data.orderList.comparison.moves': 'Moves:',
    'components.data.orderList.comparison.legacy.title':
      'Simple List',
    'components.data.orderList.comparison.legacy.desc':
      'Basic implementation to reorder items only inside the same column.',
    'components.data.orderList.comparison.legacy.hint':
      'Use the arrows or drag an item to change its position.',
    'components.data.orderList.comparison.pragmatic.title':
      'Magary Kanban',
    'components.data.orderList.comparison.pragmatic.desc':
      'Ready-to-use component to freely reorder and move cards across multiple columns.',
    'components.data.orderList.comparison.pragmatic.hint':
      'Drag cards across columns to see the transfer in action.',
    'components.data.orderList.comparison.code.title': 'Implementation code',
    'components.data.orderList.comparison.code.desc':
      'Example code to initialize columns with Magary Kanban.',
    'components.data.orderList.comparison.columns.confluence': 'Confluence',
    'components.data.orderList.comparison.columns.jira': 'Jira',
    'components.data.orderList.comparison.columns.trello': 'Trello',
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
    'components.data.orderList.apiInputs.dragDrop.desc':
      'Enables drag-and-drop reordering (Pragmatic DnD).',
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
