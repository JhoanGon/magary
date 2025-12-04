import { NavigationItem } from '../../interface/sidebar.interface';

export const MESSAGES_CONFIG: NavigationItem = {
  label: 'Messages',
  icon: 'fas fa-comment-alt',
  children: [
    {
      label: 'EmptyState',
      route: '/installation',
      icon: '',
    },
  ],
};
