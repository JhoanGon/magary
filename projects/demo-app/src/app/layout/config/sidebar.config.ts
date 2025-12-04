import { SidebarSection } from '../interface/sidebar.interface';
import { COMPONENTS_ITEMS_CONFIG } from './components.config';
import { GETTING_STARTED_ITEMS_CONFIG } from './getting-started.config';
import { UTILITIES_ITEMS_CONFIG } from './utilities.config';

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: 'Primeros Pasos',
    icon: 'fas fa-rocket',
    items: GETTING_STARTED_ITEMS_CONFIG,
    hoverColor: '#e34e4e',
  },
  {
    title: 'Componentes',
    icon: 'fas fa-cubes',
    items: COMPONENTS_ITEMS_CONFIG,
    hoverColor: '#e34e4e',
  },
  {
    title: 'Utilidades',
    icon: 'fas fa-tools',
    items: UTILITIES_ITEMS_CONFIG,
    hoverColor: '#e34e4e',
  },
];
