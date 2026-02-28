import { DemoLanguage } from '../../../../types';

export const TREE_DOC_TEXT = {
  es: {
    'components.data.tree.title': 'MagaryTree',
    'components.data.tree.subtitle':
      'MagaryTree muestra datos jerarquicos con soporte para seleccion.',
    'components.data.tree.basic.title': 'Ejemplo Basico',
    'components.data.tree.basic.desc':
      'Arbol estandar con seleccion unica.',
    'components.data.tree.basic.treeAriaLabel':
      'Arbol de archivos basico',
    'components.data.tree.filter.title': 'Filtrado',
    'components.data.tree.filter.desc':
      'Busqueda integrada para filtrar nodos.',
    'components.data.tree.filter.placeholder': 'Buscar documentos...',
    'components.data.tree.filter.ariaLabel':
      'Buscar en el arbol de documentos',
    'components.data.tree.dragDrop.title': 'Drag and Drop',
    'components.data.tree.dragDrop.desc':
      'Reordenamiento de nodos mediante arrastrar y soltar.',
    'components.data.tree.events.none': 'Sin eventos',
    'components.data.tree.events.selected': 'Seleccionado: ',
    'components.data.tree.events.unselected': 'Deseleccionado: ',
    'components.data.tree.events.droppedPrefix': 'Movido "',
    'components.data.tree.events.droppedMiddle': '" dentro de "',
    'components.data.tree.events.droppedSuffix': '"',
    'components.data.tree.events.unknownNode': 'nodo desconocido',
    'components.data.tree.events.root': 'raiz',
    'components.data.tree.selectedLabel': 'Seleccionado:',
    'components.data.tree.eventLabel': 'Evento:',
    'components.data.tree.apiInputs.title': 'Propiedades (Inputs)',
    'components.data.tree.apiInputs.desc':
      'Atributos para controlar el comportamiento del componente.',
    'components.data.tree.apiInputs.header.name': 'Nombre',
    'components.data.tree.apiInputs.header.type': 'Tipo',
    'components.data.tree.apiInputs.header.default': 'Por Defecto',
    'components.data.tree.apiInputs.header.description': 'Descripcion',
    'components.data.tree.apiInputs.value.desc':
      'Array de nodos del arbol a mostrar.',
    'components.data.tree.apiInputs.selectionMode.desc':
      'Define el modo de seleccion.',
    'components.data.tree.apiInputs.selection.desc':
      'Enlace para el/los nodo(s) seleccionado(s).',
    'components.data.tree.apiInputs.filterPlaceholder.desc':
      'Texto del input de filtrado.',
    'components.data.tree.apiInputs.filterMode.desc':
      'Define si el filtro es parcial o exacto.',
    'components.data.tree.apiInputs.filter.desc':
      'Habilita la barra de busqueda.',
    'components.data.tree.apiInputs.draggable.desc':
      'Permite arrastrar nodos.',
    'components.data.tree.apiInputs.droppable.desc':
      'Permite soltar nodos.',
    'components.data.tree.apiInputs.validateDrop.desc':
      'Valida drop para evitar soltar sobre si mismo o descendientes.',
    'components.data.tree.apiOutputs.title': 'Eventos (Outputs)',
    'components.data.tree.apiOutputs.desc':
      'Eventos emitidos por el componente.',
    'components.data.tree.apiOutputs.header.name': 'Nombre',
    'components.data.tree.apiOutputs.header.type': 'Tipo',
    'components.data.tree.apiOutputs.header.description': 'Descripcion',
    'components.data.tree.apiOutputs.onNodeSelect.desc':
      'Callback al seleccionar un nodo.',
    'components.data.tree.apiOutputs.onNodeUnselect.desc':
      'Callback al deseleccionar un nodo.',
    'components.data.tree.apiOutputs.onNodeExpand.desc':
      'Callback al expandir un nodo.',
    'components.data.tree.apiOutputs.onNodeCollapse.desc':
      'Callback al colapsar un nodo.',
    'components.data.tree.apiOutputs.onNodeDrop.desc':
      'Callback de drag and drop con parent y dragNode.',
    'components.data.tree.aria.inputsTable':
      'Tabla de propiedades del componente Tree',
    'components.data.tree.aria.outputsTable':
      'Tabla de eventos del componente Tree',
  },
  en: {
    'components.data.tree.title': 'MagaryTree',
    'components.data.tree.subtitle':
      'MagaryTree displays hierarchical data with selection support.',
    'components.data.tree.basic.title': 'Basic Example',
    'components.data.tree.basic.desc': 'Standard tree with single selection.',
    'components.data.tree.basic.treeAriaLabel': 'Basic file tree',
    'components.data.tree.filter.title': 'Filtering',
    'components.data.tree.filter.desc':
      'Built-in search to filter nodes.',
    'components.data.tree.filter.placeholder': 'Search documents...',
    'components.data.tree.filter.ariaLabel': 'Search in document tree',
    'components.data.tree.dragDrop.title': 'Drag and Drop',
    'components.data.tree.dragDrop.desc':
      'Reorder nodes using drag and drop.',
    'components.data.tree.events.none': 'No events yet',
    'components.data.tree.events.selected': 'Selected: ',
    'components.data.tree.events.unselected': 'Unselected: ',
    'components.data.tree.events.droppedPrefix': 'Dropped "',
    'components.data.tree.events.droppedMiddle': '" into "',
    'components.data.tree.events.droppedSuffix': '"',
    'components.data.tree.events.unknownNode': 'unknown node',
    'components.data.tree.events.root': 'root',
    'components.data.tree.selectedLabel': 'Selected:',
    'components.data.tree.eventLabel': 'Event:',
    'components.data.tree.apiInputs.title': 'Properties (Inputs)',
    'components.data.tree.apiInputs.desc':
      'Attributes used to control component behavior.',
    'components.data.tree.apiInputs.header.name': 'Name',
    'components.data.tree.apiInputs.header.type': 'Type',
    'components.data.tree.apiInputs.header.default': 'Default',
    'components.data.tree.apiInputs.header.description': 'Description',
    'components.data.tree.apiInputs.value.desc':
      'Tree node array to render.',
    'components.data.tree.apiInputs.selectionMode.desc':
      'Defines selection mode.',
    'components.data.tree.apiInputs.selection.desc':
      'Binding for selected node(s).',
    'components.data.tree.apiInputs.filterPlaceholder.desc':
      'Filter input placeholder text.',
    'components.data.tree.apiInputs.filterMode.desc':
      'Defines whether filtering is partial or exact.',
    'components.data.tree.apiInputs.filter.desc': 'Enables search bar.',
    'components.data.tree.apiInputs.draggable.desc':
      'Enables dragging nodes.',
    'components.data.tree.apiInputs.droppable.desc':
      'Enables dropping nodes.',
    'components.data.tree.apiInputs.validateDrop.desc':
      'Validates drop to prevent dropping into itself/descendants.',
    'components.data.tree.apiOutputs.title': 'Events (Outputs)',
    'components.data.tree.apiOutputs.desc':
      'Events emitted by the component.',
    'components.data.tree.apiOutputs.header.name': 'Name',
    'components.data.tree.apiOutputs.header.type': 'Type',
    'components.data.tree.apiOutputs.header.description': 'Description',
    'components.data.tree.apiOutputs.onNodeSelect.desc':
      'Callback when a node is selected.',
    'components.data.tree.apiOutputs.onNodeUnselect.desc':
      'Callback when a node is unselected.',
    'components.data.tree.apiOutputs.onNodeExpand.desc':
      'Callback when a node is expanded.',
    'components.data.tree.apiOutputs.onNodeCollapse.desc':
      'Callback when a node is collapsed.',
    'components.data.tree.apiOutputs.onNodeDrop.desc':
      'Drag-and-drop callback with parent and dragNode.',
    'components.data.tree.aria.inputsTable':
      'Tree component properties table',
    'components.data.tree.aria.outputsTable':
      'Tree component events table',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
