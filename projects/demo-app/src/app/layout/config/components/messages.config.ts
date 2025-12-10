import { NavigationItem } from '../../interface/sidebar.interface';

export const MESSAGES_CONFIG: NavigationItem = {
  label: 'Messages',
  icon: 'message-square',
  children: [
    {
      label: 'Message',
      route: '/components/message',
      icon: 'message-square',
    },
    {
      label: 'Toast',
      route: 'components/Toast',
      icon: 'bell',
    },
  ],
};
