import { NavigationItem } from '../../interface/sidebar.interface';

export const FORM_CONFIG: NavigationItem = {
  label: 'Form',
  icon: 'fas fa-edit',
  children: [
    {
      label: 'Cascade Select',
      route: 'components/Cascade-Select',
      icon: 'fas fa-list-ul',
    },
    {
      label: 'Checkbox',
      route: 'components/Checkbox',
      icon: 'fas fa-check-square',
    },
    {
      label: 'Input',
      route: 'components/Input',
      icon: 'fas fa-keyboard',
    },
    {
      label: 'Switch',
      route: 'components/Switch',
      icon: 'fas fa-toggle-on',
    },
  ],
};
