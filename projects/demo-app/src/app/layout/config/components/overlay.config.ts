import { NavigationItem } from '../../interface/sidebar.interface';

export const OVERLAY_CONFIG: NavigationItem = {
  label: 'Overlay',
  icon: 'layers',
  children: [
    {
      label: 'Dialog',
      route: '/components/Dialog',
      icon: 'maximize-2',
    },
    {
      label: 'Tooltip',
      route: '/components/Tooltip',
      icon: 'message-square',
    },
    {
      label: 'ConfirmDialog',
      route: '/components/ConfirmDialog',
      icon: 'triangle-alert',
    },
  ],
};
