import { DemoLanguage } from '../../../../types';

export const DIVIDER_DOC_TEXT = {
  es: {
    'components.misc.divider.title': 'MagaryDivider',
    'components.misc.divider.subtitle':
      'Separa contenido visualmente en los ejes vertical u horizontal.',
    'components.misc.divider.horizontal.title': 'Horizontal',
    'components.misc.divider.horizontal.desc':
      'Divisor predeterminado para separacion vertical de bloques.',
    'components.misc.divider.horizontal.paragraph1':
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'components.misc.divider.horizontal.paragraph2':
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'components.misc.divider.horizontal.paragraph3':
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'components.misc.divider.horizontal.paragraph4':
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    'components.misc.divider.content.title': 'Con Contenido',
    'components.misc.divider.content.desc':
      'Puedes anadir texto o contenido alineado con la propiedad align.',
    'components.misc.divider.content.top': 'Contenido Superior',
    'components.misc.divider.content.middle': 'Contenido Medio',
    'components.misc.divider.content.bottom': 'Contenido Inferior',
    'components.misc.divider.content.end': 'Fin',
    'components.misc.divider.content.left': 'Izquierda',
    'components.misc.divider.content.center': 'Centro',
    'components.misc.divider.content.right': 'Derecha',
    'components.misc.divider.vertical.title': 'Vertical',
    'components.misc.divider.vertical.desc':
      'Para usar divisor vertical, el contenedor padre debe tener display: flex.',
    'components.misc.divider.vertical.option1': 'Opcion 1',
    'components.misc.divider.vertical.option2': 'Opcion 2',
    'components.misc.divider.vertical.option3': 'Opcion 3',
    'components.misc.divider.api.title': 'Propiedades (Inputs)',
    'components.misc.divider.api.desc': 'Configuracion del componente Divider.',
    'components.misc.divider.api.header.name': 'Nombre',
    'components.misc.divider.api.header.type': 'Tipo',
    'components.misc.divider.api.header.default': 'Defecto',
    'components.misc.divider.api.header.description': 'Descripcion',
    'components.misc.divider.api.layout.desc': 'Orientacion del divisor.',
    'components.misc.divider.api.type.desc': 'Estilo de la linea.',
    'components.misc.divider.api.align.desc': 'Alineacion del contenido.',
    'components.misc.divider.tabs.html': 'HTML',
  },
  en: {
    'components.misc.divider.title': 'MagaryDivider',
    'components.misc.divider.subtitle':
      'Separates content visually in vertical or horizontal axis.',
    'components.misc.divider.horizontal.title': 'Horizontal',
    'components.misc.divider.horizontal.desc':
      'Default divider for vertical separation between blocks.',
    'components.misc.divider.horizontal.paragraph1':
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'components.misc.divider.horizontal.paragraph2':
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'components.misc.divider.horizontal.paragraph3':
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'components.misc.divider.horizontal.paragraph4':
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    'components.misc.divider.content.title': 'With Content',
    'components.misc.divider.content.desc':
      'You can add text or content aligned with the align property.',
    'components.misc.divider.content.top': 'Top Content',
    'components.misc.divider.content.middle': 'Middle Content',
    'components.misc.divider.content.bottom': 'Bottom Content',
    'components.misc.divider.content.end': 'End',
    'components.misc.divider.content.left': 'Left',
    'components.misc.divider.content.center': 'Center',
    'components.misc.divider.content.right': 'Right',
    'components.misc.divider.vertical.title': 'Vertical',
    'components.misc.divider.vertical.desc':
      'To use vertical divider, parent container must have display: flex.',
    'components.misc.divider.vertical.option1': 'Option 1',
    'components.misc.divider.vertical.option2': 'Option 2',
    'components.misc.divider.vertical.option3': 'Option 3',
    'components.misc.divider.api.title': 'Properties (Inputs)',
    'components.misc.divider.api.desc':
      'Configuration options for Divider component.',
    'components.misc.divider.api.header.name': 'Name',
    'components.misc.divider.api.header.type': 'Type',
    'components.misc.divider.api.header.default': 'Default',
    'components.misc.divider.api.header.description': 'Description',
    'components.misc.divider.api.layout.desc': 'Divider orientation.',
    'components.misc.divider.api.type.desc': 'Line style.',
    'components.misc.divider.api.align.desc': 'Content alignment.',
    'components.misc.divider.tabs.html': 'HTML',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
