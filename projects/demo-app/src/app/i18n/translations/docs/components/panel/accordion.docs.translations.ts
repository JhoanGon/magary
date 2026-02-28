import { DemoLanguage } from '../../../../types';

export const ACCORDION_DOC_TEXT = {
  es: {
    'components.panel.accordion.title': 'MagaryAccordion',
    'components.panel.accordion.subtitle':
      'Agrupa una coleccion de contenidos en paneles colapsables.',
    'components.panel.accordion.basic.title': 'Basico',
    'components.panel.accordion.basic.desc':
      'Accordion permite expandir un solo panel a la vez por defecto.',
    'components.panel.accordion.multiple.title': 'Multiple Seleccion',
    'components.panel.accordion.multiple.desc':
      'Con [multiple]=true se pueden expandir varios paneles simultaneamente.',
    'components.panel.accordion.disabled.title': 'Deshabilitado',
    'components.panel.accordion.disabled.desc':
      'Un panel puede estar desactivado usando [disabled]=true.',
    'components.panel.accordion.preselected.title': 'Preseleccion',
    'components.panel.accordion.preselected.desc':
      'Usa [selected]=true para abrir un panel por defecto.',
    'components.panel.accordion.inputs.title': 'Propiedades (Inputs)',
    'components.panel.accordion.inputs.desc':
      'Configuracion del componente Accordion y AccordionTab.',
    'components.panel.accordion.outputs.title': 'Eventos (Outputs)',
    'components.panel.accordion.outputs.desc':
      'Eventos emitidos por MagaryAccordion.',
    'components.panel.accordion.accordionTable.title': 'MagaryAccordion',
    'components.panel.accordion.tabTable.title': 'MagaryAccordionTab',
    'components.panel.accordion.header.name': 'Nombre',
    'components.panel.accordion.header.type': 'Tipo',
    'components.panel.accordion.header.default': 'Defecto',
    'components.panel.accordion.header.description': 'Descripcion',
    'components.panel.accordion.header1': 'Header I',
    'components.panel.accordion.header2': 'Header II',
    'components.panel.accordion.header3': 'Header III',
    'components.panel.accordion.content.long1':
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'components.panel.accordion.content.long2':
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'components.panel.accordion.content.long3':
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    'components.panel.accordion.content.short1':
      'Contenido del primer panel...',
    'components.panel.accordion.content.short2':
      'Contenido del segundo panel...',
    'components.panel.accordion.content.short3':
      'Contenido del tercer panel...',
    'components.panel.accordion.content.disabled':
      'Contenido deshabilitado...',
    'components.panel.accordion.content.enabled':
      'Contenido habilitado...',
    'components.panel.accordion.content.open':
      'Este panel inicia abierto.',
    'components.panel.accordion.content.closed':
      'Este panel inicia cerrado.',
    'components.panel.accordion.inputs.multiple.desc':
      'Permite abrir multiples paneles.',
    'components.panel.accordion.inputs.header.desc': 'Titulo del panel.',
    'components.panel.accordion.inputs.disabled.desc':
      'Deshabilita el panel.',
    'components.panel.accordion.inputs.selected.desc':
      'Estado de apertura del panel.',
    'components.panel.accordion.outputs.onOpen.desc':
      'Se emite al abrir un tab.',
    'components.panel.accordion.outputs.onClose.desc':
      'Se emite al cerrar un tab.',
    'components.panel.accordion.tabs.html': 'HTML',
  },
  en: {
    'components.panel.accordion.title': 'MagaryAccordion',
    'components.panel.accordion.subtitle':
      'Groups a collection of content into collapsible panels.',
    'components.panel.accordion.basic.title': 'Basic',
    'components.panel.accordion.basic.desc':
      'Accordion expands only one panel at a time by default.',
    'components.panel.accordion.multiple.title': 'Multiple Selection',
    'components.panel.accordion.multiple.desc':
      'With [multiple]=true, several panels can be expanded at once.',
    'components.panel.accordion.disabled.title': 'Disabled',
    'components.panel.accordion.disabled.desc':
      'A panel can be disabled using [disabled]=true.',
    'components.panel.accordion.preselected.title': 'Preselection',
    'components.panel.accordion.preselected.desc':
      'Use [selected]=true to open a panel by default.',
    'components.panel.accordion.inputs.title': 'Properties (Inputs)',
    'components.panel.accordion.inputs.desc':
      'Configuration for Accordion and AccordionTab components.',
    'components.panel.accordion.outputs.title': 'Events (Outputs)',
    'components.panel.accordion.outputs.desc':
      'Events emitted by MagaryAccordion.',
    'components.panel.accordion.accordionTable.title': 'MagaryAccordion',
    'components.panel.accordion.tabTable.title': 'MagaryAccordionTab',
    'components.panel.accordion.header.name': 'Name',
    'components.panel.accordion.header.type': 'Type',
    'components.panel.accordion.header.default': 'Default',
    'components.panel.accordion.header.description': 'Description',
    'components.panel.accordion.header1': 'Header I',
    'components.panel.accordion.header2': 'Header II',
    'components.panel.accordion.header3': 'Header III',
    'components.panel.accordion.content.long1':
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'components.panel.accordion.content.long2':
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'components.panel.accordion.content.long3':
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    'components.panel.accordion.content.short1':
      'First panel content...',
    'components.panel.accordion.content.short2':
      'Second panel content...',
    'components.panel.accordion.content.short3':
      'Third panel content...',
    'components.panel.accordion.content.disabled':
      'Disabled content...',
    'components.panel.accordion.content.enabled':
      'Enabled content...',
    'components.panel.accordion.content.open':
      'This panel starts open.',
    'components.panel.accordion.content.closed':
      'This panel starts closed.',
    'components.panel.accordion.inputs.multiple.desc':
      'Allows opening multiple panels.',
    'components.panel.accordion.inputs.header.desc': 'Panel title.',
    'components.panel.accordion.inputs.disabled.desc': 'Disables the panel.',
    'components.panel.accordion.inputs.selected.desc':
      'Panel open state.',
    'components.panel.accordion.outputs.onOpen.desc':
      'Emitted when a tab opens.',
    'components.panel.accordion.outputs.onClose.desc':
      'Emitted when a tab closes.',
    'components.panel.accordion.tabs.html': 'HTML',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
