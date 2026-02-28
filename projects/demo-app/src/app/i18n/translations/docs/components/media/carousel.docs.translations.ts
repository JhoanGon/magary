import { DemoLanguage } from '../../../../types';

export const CAROUSEL_DOC_TEXT = {
  es: {
    'components.media.carousel.title': 'MagaryCarousel',
    'components.media.carousel.subtitle':
      'Componente de carrusel avanzado orientado a escenarios enterprise.',
    'components.media.carousel.hero.title': 'Hero Carousel',
    'components.media.carousel.hero.desc':
      'Carrusel full-width con autoplay, barra de progreso e indicadores internos, ideal para landing pages.',
    'components.media.carousel.hero.ariaLabel':
      'Carrusel hero de productos destacados',
    'components.media.carousel.hero.shopNow': 'Comprar ahora',
    'components.media.carousel.basic.title': 'Basico y Responsive',
    'components.media.carousel.basic.desc':
      'Carrusel con configuracion responsive y presentacion de tarjetas.',
    'components.media.carousel.basic.ariaLabel':
      'Carrusel responsive de productos',
    'components.media.carousel.circular.title': 'Circular y AutoPlay',
    'components.media.carousel.circular.desc':
      'Desplazamiento infinito con autoplay e indicadores de progreso.',
    'components.media.carousel.circular.ariaLabel':
      'Carrusel autoplay de productos',
    'components.media.carousel.vertical.title': 'Orientacion Vertical',
    'components.media.carousel.vertical.desc':
      'Disposicion vertical con altura personalizada.',
    'components.media.carousel.vertical.ariaLabel':
      'Carrusel vertical de productos',
    'components.media.carousel.indicators.title':
      'Indicadores y Navegacion',
    'components.media.carousel.indicators.desc':
      'Personaliza botones de navegacion e indicadores de paginacion.',
    'components.media.carousel.indicators.ariaLabel':
      'Carrusel con navegacion e indicadores',
    'components.media.carousel.indicators.controls.styleTitle':
      'Estilo de Indicador',
    'components.media.carousel.indicators.controls.navTitle':
      'Posicion de Navegadores',
    'components.media.carousel.indicatorStyle.dots': 'dots',
    'components.media.carousel.indicatorStyle.lines': 'lines',
    'components.media.carousel.indicatorStyle.fraction': 'fraction',
    'components.media.carousel.indicatorStyle.progress': 'progress',
    'components.media.carousel.indicatorStyle.thumbnails': 'thumbnails',
    'components.media.carousel.navPosition.default': 'default',
    'components.media.carousel.navPosition.outside': 'outside',
    'components.media.carousel.apiInputs.title': 'Propiedades (Inputs)',
    'components.media.carousel.apiInputs.desc':
      'Principales propiedades disponibles en magary-carousel.',
    'components.media.carousel.apiInputs.header.name': 'Nombre',
    'components.media.carousel.apiInputs.header.type': 'Tipo',
    'components.media.carousel.apiInputs.header.default': 'Por Defecto',
    'components.media.carousel.apiInputs.header.description': 'Descripcion',
    'components.media.carousel.apiInputs.value.desc':
      'Items que renderiza el carrusel.',
    'components.media.carousel.apiInputs.numVisible.desc':
      'Cantidad de items visibles.',
    'components.media.carousel.apiInputs.numScroll.desc':
      'Cantidad de items por desplazamiento.',
    'components.media.carousel.apiInputs.circular.desc':
      'Activa navegacion circular.',
    'components.media.carousel.apiInputs.responsiveOptions.desc':
      'Configuracion responsive por breakpoints.',
    'components.media.carousel.apiInputs.indicatorStyle.desc':
      'Estilo de indicadores (dots, lines, fraction, etc.).',
    'components.media.carousel.apiInputs.navPosition.desc':
      'Posicion de los navegadores.',
    'components.media.carousel.apiInputs.autoplayInterval.desc':
      'Intervalo en ms para autoplay (0 desactiva).',
    'components.media.carousel.apiInputs.showNavigators.desc':
      'Muestra botones de anterior y siguiente.',
    'components.media.carousel.apiInputs.showIndicators.desc':
      'Muestra indicadores de pagina.',
    'components.media.carousel.apiInputs.effect.desc':
      'Efecto de transicion.',
    'components.media.carousel.apiInputs.transitionDuration.desc':
      'Duracion de la animacion en ms.',
    'components.media.carousel.apiOutputs.title': 'Eventos (Outputs)',
    'components.media.carousel.apiOutputs.desc':
      'Eventos emitidos por el componente.',
    'components.media.carousel.apiOutputs.header.name': 'Nombre',
    'components.media.carousel.apiOutputs.header.type': 'Tipo',
    'components.media.carousel.apiOutputs.header.description': 'Descripcion',
    'components.media.carousel.apiOutputs.pageChange.desc':
      'Se emite cuando cambia la pagina activa.',
    'components.media.carousel.apiOutputs.slideChange.desc':
      'Se emite antes del cambio de slide.',
    'components.media.carousel.apiOutputs.slideChanged.desc':
      'Se emite despues del cambio de slide.',
    'components.media.carousel.apiOutputs.itemClick.desc':
      'Se emite al hacer click sobre un item.',
    'components.media.carousel.apiOutputs.autoplayStart.desc':
      'Se emite cuando inicia autoplay.',
    'components.media.carousel.apiOutputs.autoplayStop.desc':
      'Se emite cuando se detiene autoplay.',
  },
  en: {
    'components.media.carousel.title': 'MagaryCarousel',
    'components.media.carousel.subtitle':
      'Powerful carousel component for enterprise scenarios.',
    'components.media.carousel.hero.title': 'Hero Carousel',
    'components.media.carousel.hero.desc':
      'Full-width carousel with autoplay, progress bar, and inside indicators, ideal for landing pages.',
    'components.media.carousel.hero.ariaLabel':
      'Hero featured products carousel',
    'components.media.carousel.hero.shopNow': 'Shop Now',
    'components.media.carousel.basic.title': 'Basic and Responsive',
    'components.media.carousel.basic.desc':
      'Carousel with responsive configuration and card presentation.',
    'components.media.carousel.basic.ariaLabel':
      'Basic responsive products carousel',
    'components.media.carousel.circular.title': 'Circular and AutoPlay',
    'components.media.carousel.circular.desc':
      'Infinite scrolling with autoplay and progress indicators.',
    'components.media.carousel.circular.ariaLabel':
      'Autoplay products carousel',
    'components.media.carousel.vertical.title': 'Vertical Orientation',
    'components.media.carousel.vertical.desc':
      'Vertical layout with custom height.',
    'components.media.carousel.vertical.ariaLabel':
      'Vertical products carousel',
    'components.media.carousel.indicators.title':
      'Indicators and Navigation',
    'components.media.carousel.indicators.desc':
      'Customize navigation buttons and pagination indicators.',
    'components.media.carousel.indicators.ariaLabel':
      'Navigation and indicators carousel',
    'components.media.carousel.indicators.controls.styleTitle':
      'Indicator Style',
    'components.media.carousel.indicators.controls.navTitle':
      'Nav Position',
    'components.media.carousel.indicatorStyle.dots': 'dots',
    'components.media.carousel.indicatorStyle.lines': 'lines',
    'components.media.carousel.indicatorStyle.fraction': 'fraction',
    'components.media.carousel.indicatorStyle.progress': 'progress',
    'components.media.carousel.indicatorStyle.thumbnails': 'thumbnails',
    'components.media.carousel.navPosition.default': 'default',
    'components.media.carousel.navPosition.outside': 'outside',
    'components.media.carousel.apiInputs.title': 'Properties (Inputs)',
    'components.media.carousel.apiInputs.desc':
      'Main available properties in magary-carousel.',
    'components.media.carousel.apiInputs.header.name': 'Name',
    'components.media.carousel.apiInputs.header.type': 'Type',
    'components.media.carousel.apiInputs.header.default': 'Default',
    'components.media.carousel.apiInputs.header.description': 'Description',
    'components.media.carousel.apiInputs.value.desc':
      'Items rendered by the carousel.',
    'components.media.carousel.apiInputs.numVisible.desc':
      'Number of visible items.',
    'components.media.carousel.apiInputs.numScroll.desc':
      'Number of items per scroll.',
    'components.media.carousel.apiInputs.circular.desc':
      'Enables circular navigation.',
    'components.media.carousel.apiInputs.responsiveOptions.desc':
      'Responsive breakpoint configuration.',
    'components.media.carousel.apiInputs.indicatorStyle.desc':
      'Indicator style (dots, lines, fraction, etc.).',
    'components.media.carousel.apiInputs.navPosition.desc':
      'Navigator button position.',
    'components.media.carousel.apiInputs.autoplayInterval.desc':
      'Autoplay interval in ms (0 disables).',
    'components.media.carousel.apiInputs.showNavigators.desc':
      'Shows previous/next buttons.',
    'components.media.carousel.apiInputs.showIndicators.desc':
      'Shows page indicators.',
    'components.media.carousel.apiInputs.effect.desc':
      'Transition effect.',
    'components.media.carousel.apiInputs.transitionDuration.desc':
      'Animation duration in ms.',
    'components.media.carousel.apiOutputs.title': 'Events (Outputs)',
    'components.media.carousel.apiOutputs.desc':
      'Events emitted by the component.',
    'components.media.carousel.apiOutputs.header.name': 'Name',
    'components.media.carousel.apiOutputs.header.type': 'Type',
    'components.media.carousel.apiOutputs.header.description': 'Description',
    'components.media.carousel.apiOutputs.pageChange.desc':
      'Emitted when active page changes.',
    'components.media.carousel.apiOutputs.slideChange.desc':
      'Emitted before slide changes.',
    'components.media.carousel.apiOutputs.slideChanged.desc':
      'Emitted after slide changes.',
    'components.media.carousel.apiOutputs.itemClick.desc':
      'Emitted when clicking an item.',
    'components.media.carousel.apiOutputs.autoplayStart.desc':
      'Emitted when autoplay starts.',
    'components.media.carousel.apiOutputs.autoplayStop.desc':
      'Emitted when autoplay stops.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
