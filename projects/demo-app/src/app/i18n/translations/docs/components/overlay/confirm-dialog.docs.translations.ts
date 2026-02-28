import { DemoLanguage } from '../../../../types';

export const CONFIRM_DIALOG_DOC_TEXT = {
  es: {
    'components.overlay.confirmDialog.title': 'ConfirmDialog',
    'components.overlay.confirmDialog.subtitle':
      'Dialogo de confirmacion avanzado con integracion de servicios.',
    'components.overlay.confirmDialog.import.title': 'Importar',
    'components.overlay.confirmDialog.import.desc': 'Modulos necesarios.',
    'components.overlay.confirmDialog.basic.title': 'Basico',
    'components.overlay.confirmDialog.basic.desc':
      'Uso basico con el servicio de confirmacion.',
    'components.overlay.confirmDialog.basic.confirmAction': 'Confirmar Accion',
    'components.overlay.confirmDialog.basic.delete': 'Eliminar',
    'components.overlay.confirmDialog.service.title':
      'Confirmation Object (Service)',
    'components.overlay.confirmDialog.service.desc':
      'Propiedades del objeto pasado a confirmationService.confirm().',
    'components.overlay.confirmDialog.service.header.property': 'Propiedad',
    'components.overlay.confirmDialog.service.header.type': 'Tipo',
    'components.overlay.confirmDialog.service.header.description': 'Descripcion',
    'components.overlay.confirmDialog.service.header.desc':
      'Titulo del dialogo.',
    'components.overlay.confirmDialog.service.message.desc':
      'Mensaje principal.',
    'components.overlay.confirmDialog.service.icon.desc':
      'Icono a mostrar (Lucide).',
    'components.overlay.confirmDialog.service.accept.desc':
      'Callback al aceptar.',
    'components.overlay.confirmDialog.service.reject.desc':
      'Callback al rechazar.',
    'components.overlay.confirmDialog.service.acceptLabel.desc':
      'Texto del boton aceptar.',
    'components.overlay.confirmDialog.service.rejectLabel.desc':
      'Texto del boton cancelar.',
    'components.overlay.confirmDialog.confirm1.header': 'Confirmacion',
    'components.overlay.confirmDialog.confirm1.message':
      'Estas seguro de que quieres realizar esta accion?',
    'components.overlay.confirmDialog.confirm2.header': 'Eliminar Registro',
    'components.overlay.confirmDialog.confirm2.message':
      'Deseas eliminar este registro permanentemente?',
    'components.overlay.confirmDialog.confirm2.accept': 'Eliminar',
    'components.overlay.confirmDialog.confirm2.reject': 'Cancelar',
    'components.overlay.confirmDialog.tabs.html': 'HTML',
    'components.overlay.confirmDialog.tabs.ts': 'TS',
  },
  en: {
    'components.overlay.confirmDialog.title': 'ConfirmDialog',
    'components.overlay.confirmDialog.subtitle':
      'Advanced confirmation dialog with service integration.',
    'components.overlay.confirmDialog.import.title': 'Import',
    'components.overlay.confirmDialog.import.desc': 'Required modules.',
    'components.overlay.confirmDialog.basic.title': 'Basic',
    'components.overlay.confirmDialog.basic.desc':
      'Basic usage with confirmation service.',
    'components.overlay.confirmDialog.basic.confirmAction': 'Confirm Action',
    'components.overlay.confirmDialog.basic.delete': 'Delete',
    'components.overlay.confirmDialog.service.title':
      'Confirmation Object (Service)',
    'components.overlay.confirmDialog.service.desc':
      'Properties of object passed to confirmationService.confirm().',
    'components.overlay.confirmDialog.service.header.property': 'Property',
    'components.overlay.confirmDialog.service.header.type': 'Type',
    'components.overlay.confirmDialog.service.header.description': 'Description',
    'components.overlay.confirmDialog.service.header.desc': 'Dialog title.',
    'components.overlay.confirmDialog.service.message.desc': 'Main message.',
    'components.overlay.confirmDialog.service.icon.desc':
      'Icon to display (Lucide).',
    'components.overlay.confirmDialog.service.accept.desc':
      'Callback on accept.',
    'components.overlay.confirmDialog.service.reject.desc':
      'Callback on reject.',
    'components.overlay.confirmDialog.service.acceptLabel.desc':
      'Accept button label.',
    'components.overlay.confirmDialog.service.rejectLabel.desc':
      'Cancel button label.',
    'components.overlay.confirmDialog.confirm1.header': 'Confirmation',
    'components.overlay.confirmDialog.confirm1.message':
      'Are you sure you want to perform this action?',
    'components.overlay.confirmDialog.confirm2.header': 'Delete Record',
    'components.overlay.confirmDialog.confirm2.message':
      'Do you want to permanently delete this record?',
    'components.overlay.confirmDialog.confirm2.accept': 'Delete',
    'components.overlay.confirmDialog.confirm2.reject': 'Cancel',
    'components.overlay.confirmDialog.tabs.html': 'HTML',
    'components.overlay.confirmDialog.tabs.ts': 'TS',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
