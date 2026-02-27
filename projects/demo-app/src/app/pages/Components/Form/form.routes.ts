import { Routes } from '@angular/router';

export const FORM_ROUTES: Routes = [
  {
    path: 'Input',
    loadComponent: () =>
      import('./view-input/view-input').then((m) => m.ViewInput),
  },
  {
    path: 'Checkbox',
    loadComponent: () =>
      import('./view-checkbox/view-checkbox').then((m) => m.ViewCheckbox),
  },
  {
    path: 'Switch',
    loadComponent: () =>
      import('./view-switch/view-switch').then((m) => m.ViewSwitch),
  },
  {
    path: 'Segmented',
    loadComponent: () =>
      import('./view-segmented/view-segmented').then(
        (m) => m.ViewSegmented,
      ),
  },
  {
    path: 'Cascade-Select',
    loadComponent: () =>
      import('./view-cascade-select/view-cascade-select').then(
        (m) => m.ViewCascadeSelect,
      ),
  },
  {
    path: 'Select',
    loadComponent: () =>
      import('./view-select/view-select').then((m) => m.ViewSelect),
  },
  {
    path: 'Radio',
    loadComponent: () =>
      import('./view-radio/view-radio').then((m) => m.ViewRadio),
  },
  {
    path: 'TextArea',
    loadComponent: () =>
      import('./view-textarea/view-textarea').then((m) => m.ViewTextArea),
  },
  {
    path: 'DatePicker',
    loadComponent: () =>
      import('./view-datepicker/view-datepicker').then((m) => m.ViewDatePicker),
  },
  {
    path: 'InputNumber',
    loadComponent: () =>
      import('./view-input-number/view-input-number').then(
        (m) => m.ViewInputNumber,
      ),
  },
  {
    path: 'Slider',
    loadComponent: () =>
      import('./view-slider/view-slider').then((m) => m.ViewSlider),
  },
  {
    path: 'Rating',
    loadComponent: () =>
      import('./view-rating/view-rating').then((m) => m.ViewRating),
  },
];
