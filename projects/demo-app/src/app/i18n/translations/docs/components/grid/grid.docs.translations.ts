import { DemoLanguage } from '../../../../types';

export const GRID_DOC_TEXT = {
  es: {
    'components.grid.grid.title': 'Magary Grid',
    'components.grid.grid.subtitle':
      'Sistema de layout dinamico Drag & Drop impulsado por Gridstack.js. Crea dashboards, galerias y paneles interactivos.',
    'components.grid.grid.import.title': 'Importacion',
    'components.grid.grid.import.desc':
      'Importa el modulo en tu componente standalone.',
    'components.grid.grid.basic.title': 'Uso Basico',
    'components.grid.grid.basic.desc':
      'Grid simple con widgets estaticos o bloqueados.',
    'components.grid.grid.basic.widgetA': 'Widget A (No Resize)',
    'components.grid.grid.basic.widgetB': 'Widget B (No Move)',
    'components.grid.grid.basic.widgetC': 'Widget C (Locked & Static)',
    'components.grid.grid.tabs.html': 'HTML',
    'components.grid.grid.tabs.ts': 'TypeScript',
    'components.grid.grid.dashboard.title': 'Dashboard Interactivo',
    'components.grid.grid.dashboard.desc':
      'Ejemplo avanzado integrando magary-card, magary-button, magary-avatar y mas. Ideal para paneles de administracion.',
    'components.grid.grid.dashboard.add.card': 'Card',
    'components.grid.grid.dashboard.add.table': 'Table',
    'components.grid.grid.dashboard.add.image': 'Image',
    'components.grid.grid.dashboard.widget.totalUsers': 'Total Users',
    'components.grid.grid.dashboard.widget.revenue': 'Revenue',
    'components.grid.grid.dashboard.widget.quickActions': 'Quick Actions',
    'components.grid.grid.dashboard.widget.mediaGallery': 'Media Gallery',
    'components.grid.grid.dashboard.widget.profile': 'Profile',
    'components.grid.grid.dashboard.widget.profileName': 'Admin User',
    'components.grid.grid.dashboard.widget.profileRole': 'Administrator',
    'components.grid.grid.dashboard.widget.genericCard': 'Generic Card',
    'components.grid.grid.dashboard.widget.genericCardContent':
      'This is a standard Magary Card.',
    'components.grid.grid.dashboard.widget.dataTable': 'Data Table',
    'components.grid.grid.dashboard.widget.singleImage': 'Single Image',
    'components.grid.grid.dashboard.widget.action': 'Action',
    'components.grid.grid.dashboard.widget.option1': 'Option 1',
    'components.grid.grid.dashboard.widget.option2': 'Option 2',
    'components.grid.grid.table.header.id': 'ID',
    'components.grid.grid.table.header.name': 'Name',
    'components.grid.grid.table.header.status': 'Status',
    'components.grid.grid.table.row.projectA': 'Project A',
    'components.grid.grid.table.row.projectB': 'Project B',
    'components.grid.grid.table.row.projectC': 'Project C',
    'components.grid.grid.table.row.projectD': 'Project D',
    'components.grid.grid.table.row.projectE': 'Project E',
    'components.grid.grid.table.status.active': 'Active',
    'components.grid.grid.table.status.pending': 'Pending',
    'components.grid.grid.table.status.completed': 'Completed',
    'components.grid.grid.table.status.delayed': 'Delayed',
    'components.grid.grid.gallery.title': 'Galeria Reordenable',
    'components.grid.grid.gallery.desc':
      'Grid de imagenes usando magary-image. Arrastralas para cambiar el orden.',
    'components.grid.grid.gallery.alt.river': 'River',
    'components.grid.grid.gallery.alt.canyon': 'Canyon',
    'components.grid.grid.gallery.alt.mountains': 'Mountains',
    'components.grid.grid.gallery.alt.forest': 'Forest',
    'components.grid.grid.gallery.alt.bear': 'Bear',
    'components.grid.grid.api.title': 'API Reference',
    'components.grid.grid.api.desc':
      'Inputs y Outputs disponibles para magary-grid y magary-grid-item.',
    'components.grid.grid.api.header.component': 'Componente',
    'components.grid.grid.api.header.property': 'Propiedad',
    'components.grid.grid.api.header.type': 'Tipo',
    'components.grid.grid.api.header.description': 'Descripcion',
    'components.grid.grid.api.row.options.desc':
      'Opciones de configuracion de Gridstack.js.',
    'components.grid.grid.api.row.change.desc':
      'Evento emitido cuando cambia el layout.',
    'components.grid.grid.api.row.coords.desc':
      'Coordenadas y dimensiones del item.',
    'components.grid.grid.api.row.noResize.desc':
      'Deshabilita el redimensionamiento del item.',
    'components.grid.grid.api.row.noMove.desc':
      'Deshabilita el movimiento del item.',
    'components.grid.grid.api.row.locked.desc':
      'Bloquea completamente el item.',
  },
  en: {
    'components.grid.grid.title': 'Magary Grid',
    'components.grid.grid.subtitle':
      'Dynamic Drag & Drop layout system powered by Gridstack.js. Build dashboards, galleries, and interactive panels.',
    'components.grid.grid.import.title': 'Import',
    'components.grid.grid.import.desc':
      'Import the module in your standalone component.',
    'components.grid.grid.basic.title': 'Basic Usage',
    'components.grid.grid.basic.desc':
      'Simple grid with static or locked widgets.',
    'components.grid.grid.basic.widgetA': 'Widget A (No Resize)',
    'components.grid.grid.basic.widgetB': 'Widget B (No Move)',
    'components.grid.grid.basic.widgetC': 'Widget C (Locked & Static)',
    'components.grid.grid.tabs.html': 'HTML',
    'components.grid.grid.tabs.ts': 'TypeScript',
    'components.grid.grid.dashboard.title': 'Interactive Dashboard',
    'components.grid.grid.dashboard.desc':
      'Advanced example integrating magary-card, magary-button, magary-avatar, and more. Ideal for admin panels.',
    'components.grid.grid.dashboard.add.card': 'Card',
    'components.grid.grid.dashboard.add.table': 'Table',
    'components.grid.grid.dashboard.add.image': 'Image',
    'components.grid.grid.dashboard.widget.totalUsers': 'Total Users',
    'components.grid.grid.dashboard.widget.revenue': 'Revenue',
    'components.grid.grid.dashboard.widget.quickActions': 'Quick Actions',
    'components.grid.grid.dashboard.widget.mediaGallery': 'Media Gallery',
    'components.grid.grid.dashboard.widget.profile': 'Profile',
    'components.grid.grid.dashboard.widget.profileName': 'Admin User',
    'components.grid.grid.dashboard.widget.profileRole': 'Administrator',
    'components.grid.grid.dashboard.widget.genericCard': 'Generic Card',
    'components.grid.grid.dashboard.widget.genericCardContent':
      'This is a standard Magary Card.',
    'components.grid.grid.dashboard.widget.dataTable': 'Data Table',
    'components.grid.grid.dashboard.widget.singleImage': 'Single Image',
    'components.grid.grid.dashboard.widget.action': 'Action',
    'components.grid.grid.dashboard.widget.option1': 'Option 1',
    'components.grid.grid.dashboard.widget.option2': 'Option 2',
    'components.grid.grid.table.header.id': 'ID',
    'components.grid.grid.table.header.name': 'Name',
    'components.grid.grid.table.header.status': 'Status',
    'components.grid.grid.table.row.projectA': 'Project A',
    'components.grid.grid.table.row.projectB': 'Project B',
    'components.grid.grid.table.row.projectC': 'Project C',
    'components.grid.grid.table.row.projectD': 'Project D',
    'components.grid.grid.table.row.projectE': 'Project E',
    'components.grid.grid.table.status.active': 'Active',
    'components.grid.grid.table.status.pending': 'Pending',
    'components.grid.grid.table.status.completed': 'Completed',
    'components.grid.grid.table.status.delayed': 'Delayed',
    'components.grid.grid.gallery.title': 'Reorderable Gallery',
    'components.grid.grid.gallery.desc':
      'Image grid using magary-image. Drag them to change the order.',
    'components.grid.grid.gallery.alt.river': 'River',
    'components.grid.grid.gallery.alt.canyon': 'Canyon',
    'components.grid.grid.gallery.alt.mountains': 'Mountains',
    'components.grid.grid.gallery.alt.forest': 'Forest',
    'components.grid.grid.gallery.alt.bear': 'Bear',
    'components.grid.grid.api.title': 'API Reference',
    'components.grid.grid.api.desc':
      'Available inputs and outputs for magary-grid and magary-grid-item.',
    'components.grid.grid.api.header.component': 'Component',
    'components.grid.grid.api.header.property': 'Property',
    'components.grid.grid.api.header.type': 'Type',
    'components.grid.grid.api.header.description': 'Description',
    'components.grid.grid.api.row.options.desc':
      'Gridstack.js configuration options.',
    'components.grid.grid.api.row.change.desc':
      'Event emitted when layout changes.',
    'components.grid.grid.api.row.coords.desc':
      'Item coordinates and dimensions.',
    'components.grid.grid.api.row.noResize.desc':
      'Disables item resizing.',
    'components.grid.grid.api.row.noMove.desc':
      'Disables item movement.',
    'components.grid.grid.api.row.locked.desc':
      'Completely locks the item.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
