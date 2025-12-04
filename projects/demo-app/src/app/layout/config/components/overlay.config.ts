import { NavigationItem } from '../../interface/sidebar.interface';

export const OVERLAY_CONFIG: NavigationItem = {
  label: 'Overlay',
  icon: 'fas fa-layer-group',
  children: [
    {
      label: 'EmptyState',
      route: '/installation',
      icon: '',
    },
  ],
};
