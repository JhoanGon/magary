import { NavigationItem } from '../../interface/sidebar.interface';

export const FILE_CONFIG: NavigationItem = {
  label: 'File',
  icon: 'fas fa-file',
  children: [
    {
      label: 'Upload',
      route: 'components/Upload',
      icon: 'fas fa-upload',
      badge: 'Premium',
      badgeSeverity: 'contrast',
    },
  ],
};
