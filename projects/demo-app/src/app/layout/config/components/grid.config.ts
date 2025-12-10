import { NavigationItem } from '../../interface/sidebar.interface';

export const GRID_CONFIG: NavigationItem = {
  label: 'Grid (Drag & Drop)',
  icon: 'layout-grid',
  styleClass: 'desktop-only',
  children: [
    {
      label: 'View Grid',
      route: '/components/view-grid',
    },
  ],
};
