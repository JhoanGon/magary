import { NavigationItem } from '../../interface/sidebar.interface';

export const FILE_CONFIG: NavigationItem = {
  label: 'File',
  icon: 'file',
  children: [
    {
      label: 'Upload',
      route: 'components/Upload',
      icon: 'upload',
      badge: 'Premium',
      badgeSeverity: 'contrast',
    },
  ],
};
