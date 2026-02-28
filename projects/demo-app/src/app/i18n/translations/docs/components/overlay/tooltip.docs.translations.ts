import { DemoLanguage } from '../../../../types';

export const TOOLTIP_DOC_TEXT = {
  es: {
    'components.overlay.tooltip.title': 'MagaryTooltip',
    'components.overlay.tooltip.subtitle':
      'Directiva para mostrar informacion contextual flotante.',
    'components.overlay.tooltip.import.title': 'Importar',
    'components.overlay.tooltip.import.desc':
      'Modulos necesarios para utilizar este componente.',
    'components.overlay.tooltip.import.noteTitle': 'Nota',
    'components.overlay.tooltip.import.noteBody':
      'Para que el Tooltip se visualice correctamente, agrega este import global en styles.scss.',
    'components.overlay.tooltip.import.noteFooter':
      'Esta directiva renderiza el overlay en document.body, por eso requiere estilos globales.',
    'components.overlay.tooltip.position.title': 'Posicionamiento',
    'components.overlay.tooltip.position.desc':
      'Soporta las 4 direcciones principales: top, bottom, left, right.',
    'components.overlay.tooltip.position.inputPlaceholder': 'Hover Input!',
    'components.overlay.tooltip.position.inputTooltip': 'Username required',
    'components.overlay.tooltip.position.top': 'Top',
    'components.overlay.tooltip.position.bottom': 'Bottom',
    'components.overlay.tooltip.position.left': 'Left',
    'components.overlay.tooltip.position.right': 'Right',
    'components.overlay.tooltip.position.topTip': 'Tooltip on Top',
    'components.overlay.tooltip.position.bottomTip': 'Tooltip on Bottom',
    'components.overlay.tooltip.position.leftTip': 'Tooltip on Left',
    'components.overlay.tooltip.position.rightTip': 'Tooltip on Right',
    'components.overlay.tooltip.api.title': 'Propiedades (Inputs)',
    'components.overlay.tooltip.api.desc':
      'Configuracion de la directiva.',
    'components.overlay.tooltip.api.header.name': 'Nombre',
    'components.overlay.tooltip.api.header.type': 'Tipo',
    'components.overlay.tooltip.api.header.default': 'Defecto',
    'components.overlay.tooltip.api.header.description': 'Descripcion',
    'components.overlay.tooltip.api.magaryTooltip.desc':
      'Texto a mostrar en el tooltip.',
    'components.overlay.tooltip.api.tooltipPosition.desc':
      'Posicion relativa al elemento.',
    'components.overlay.tooltip.api.tooltipDisabled.desc':
      'Deshabilita la aparicion del tooltip.',
    'components.overlay.tooltip.tabs.html': 'HTML',
  },
  en: {
    'components.overlay.tooltip.title': 'MagaryTooltip',
    'components.overlay.tooltip.subtitle':
      'Directive to show floating contextual information.',
    'components.overlay.tooltip.import.title': 'Import',
    'components.overlay.tooltip.import.desc':
      'Required modules to use this component.',
    'components.overlay.tooltip.import.noteTitle': 'Note',
    'components.overlay.tooltip.import.noteBody':
      'To render Tooltip correctly, add this global import in styles.scss.',
    'components.overlay.tooltip.import.noteFooter':
      'This directive renders overlay in document.body, so it requires global styles.',
    'components.overlay.tooltip.position.title': 'Positioning',
    'components.overlay.tooltip.position.desc':
      'Supports the 4 main directions: top, bottom, left, right.',
    'components.overlay.tooltip.position.inputPlaceholder': 'Hover Input!',
    'components.overlay.tooltip.position.inputTooltip': 'Username required',
    'components.overlay.tooltip.position.top': 'Top',
    'components.overlay.tooltip.position.bottom': 'Bottom',
    'components.overlay.tooltip.position.left': 'Left',
    'components.overlay.tooltip.position.right': 'Right',
    'components.overlay.tooltip.position.topTip': 'Tooltip on Top',
    'components.overlay.tooltip.position.bottomTip': 'Tooltip on Bottom',
    'components.overlay.tooltip.position.leftTip': 'Tooltip on Left',
    'components.overlay.tooltip.position.rightTip': 'Tooltip on Right',
    'components.overlay.tooltip.api.title': 'Properties (Inputs)',
    'components.overlay.tooltip.api.desc': 'Directive configuration.',
    'components.overlay.tooltip.api.header.name': 'Name',
    'components.overlay.tooltip.api.header.type': 'Type',
    'components.overlay.tooltip.api.header.default': 'Default',
    'components.overlay.tooltip.api.header.description': 'Description',
    'components.overlay.tooltip.api.magaryTooltip.desc':
      'Text shown inside tooltip.',
    'components.overlay.tooltip.api.tooltipPosition.desc':
      'Position relative to target element.',
    'components.overlay.tooltip.api.tooltipDisabled.desc':
      'Disables tooltip appearance.',
    'components.overlay.tooltip.tabs.html': 'HTML',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
