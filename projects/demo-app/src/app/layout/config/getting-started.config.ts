import { NavigationItem } from '../interface/sidebar.interface';

export const GETTING_STARTED_ITEMS_CONFIG: NavigationItem[] = [
  {
    label: 'Instalacion',
    route: '/installation',
    icon: 'download',
    iconClass: 'lucide-bounce',
  },
  {
    label: 'Configuracion',
    route: '/setup',
    icon: 'settings',
    iconClass: 'lucide-spin',
  },
  {
    label: 'MCP',
    route: '/mcp',
    icon: 'network',
    iconClass: 'lucide-pulse',
  },
];
