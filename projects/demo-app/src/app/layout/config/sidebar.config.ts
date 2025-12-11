import { SidebarSection } from '../interface/sidebar.interface';
import { COMPONENTS_ITEMS_CONFIG } from './components.config';
import { GETTING_STARTED_ITEMS_CONFIG } from './getting-started.config';
import { UTILITIES_ITEMS_CONFIG } from './utilities.config';

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: 'Primeros Pasos',
    icon: 'rocket',
    iconClass: 'lucide-pulse',
    items: GETTING_STARTED_ITEMS_CONFIG,
    hoverColor: '#e34e4e',
  },
  {
    title: 'Componentes',
    icon: 'blocks', // or 'box', 'cubes' is not standard Lucide. 'blocks' represents components well.
    iconClass: 'lucide-bounce',
    items: COMPONENTS_ITEMS_CONFIG,
    hoverColor: '#e34e4e',
  },
  {
    title: 'Utilidades',
    icon: 'wrench', // 'tools' is not standard Lucide. 'wrench' is widely used for utilities.
    iconClass: 'lucide-spin',
    items: UTILITIES_ITEMS_CONFIG,
    hoverColor: '#e34e4e',
  },
];
