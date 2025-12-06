import { NavigationItem } from '../../interface/sidebar.interface';

export const MESSAGES_CONFIG: NavigationItem = {
  label: 'Messages',
  icon: 'fas fa-comment-alt',
  children: [
    {
      label: 'Message',
      route: '/components/message',
      icon: 'fas fa-comment-alt',
    },
  ],
};
