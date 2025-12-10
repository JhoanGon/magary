import { NavigationItem } from '../../interface/sidebar.interface';

export const FORM_CONFIG: NavigationItem = {
  label: 'Form',
  icon: 'pencil',
  children: [
    {
      label: 'Cascade Select',
      route: 'components/Cascade-Select',
      icon: 'list',
    },
    {
      label: 'Checkbox',
      route: 'components/Checkbox',
      icon: 'square-check',
    },
    {
      label: 'Input',
      route: 'components/Input',
      icon: 'keyboard',
    },
    {
      label: 'Switch',
      route: 'components/Switch',
      icon: 'toggle-right',
    },
  ],
};
