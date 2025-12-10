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
    {
      label: 'Select',
      route: 'components/Select',
      icon: 'mouse-pointer-2',
    },
    {
      label: 'Radio',
      route: 'components/Radio',
      icon: 'circle-dot',
    },
    {
      label: 'TextArea',
      route: 'components/TextArea',
      icon: 'text-align-justify',
    },
    {
      label: 'DatePicker',
      route: 'components/DatePicker',
      icon: 'calendar',
    },
  ],
};
