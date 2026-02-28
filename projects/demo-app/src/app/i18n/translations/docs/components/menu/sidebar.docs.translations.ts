import { DemoLanguage } from '../../../../types';

export const SIDEBAR_DOC_TEXT = {
  es: {
    'components.menu.sidebar.title': 'Magary Sidebar',
    'components.menu.sidebar.subtitle':
      'Sidebar para navegacion con secciones, colapso y bloque de usuario.',
    'components.menu.sidebar.import.title': 'Import',
    'components.menu.sidebar.import.desc':
      'Importa el componente en tu modulo o componente standalone.',
    'components.menu.sidebar.sections.title':
      'Ejemplo Basico por Secciones',
    'components.menu.sidebar.sections.desc':
      'Configuracion orientada a dashboard: menu por secciones, colapso y bloque de usuario completo.',
    'components.menu.sidebar.sections.shell.title': 'Dashboard',
    'components.menu.sidebar.sections.shell.desc':
      'Area de contenido para validar la convivencia del sidebar con la app principal.',
    'components.menu.sidebar.sections.cards.sales': 'Ventas',
    'components.menu.sidebar.sections.cards.salesValue':
      '+12.4% vs semana anterior',
    'components.menu.sidebar.sections.cards.activeUsers': 'Usuarios activos',
    'components.menu.sidebar.sections.cards.activeUsersValue':
      '1,248 en las ultimas 24h',
    'components.menu.sidebar.sections.cards.systemStatus': 'Estado sistema',
    'components.menu.sidebar.sections.cards.systemStatusValue':
      'Operativo sin incidencias.',
    'components.menu.sidebar.menu.title': 'Ejemplo Menu Unico + Brand',
    'components.menu.sidebar.menu.desc':
      'Variante compacta enfocada en navegacion simple y branding, sin footer de usuario.',
    'components.menu.sidebar.menu.shell.title': 'Vista Catalogo',
    'components.menu.sidebar.menu.shell.desc':
      'Esta variante usa menu + menuTitle en lugar de sections, ideal para flujos lineales.',
    'components.menu.sidebar.menu.shell.item1':
      'Modo compacto para apps administrativas.',
    'components.menu.sidebar.menu.shell.item2':
      'Logo de marca configurable por posicion.',
    'components.menu.sidebar.menu.shell.item3':
      'Configuracion minima para empezar rapido.',
    'components.menu.sidebar.footer.title': 'Footer de Usuario Opcional',
    'components.menu.sidebar.footer.desc':
      'Controla cada parte del footer (avatar, nombre, email y logout) para adaptar el sidebar a cada producto.',
    'components.menu.sidebar.footer.status.count': 'onLogout count',
    'components.menu.sidebar.footer.status.mode': 'Ultimo modo',
    'components.menu.sidebar.footer.shell.title': 'Configuracion de Footer',
    'components.menu.sidebar.footer.shell.desc':
      'En este ejemplo solo se muestra el boton de logout, ocultando avatar, nombre y email.',
    'components.menu.sidebar.footer.shell.itemAvatar':
      'showUserAvatar=false',
    'components.menu.sidebar.footer.shell.itemName': 'showUserName=false',
    'components.menu.sidebar.footer.shell.itemEmail': 'showUserEmail=false',
    'components.menu.sidebar.footer.shell.itemLogout':
      'showLogoutButton=true',
    'components.menu.sidebar.keyProps.title': 'Propiedades Clave',
    'components.menu.sidebar.keyProps.desc':
      'Inputs mas usados para configurar rapido el comportamiento del sidebar.',
    'components.menu.sidebar.keyProps.header.property': 'Propiedad',
    'components.menu.sidebar.keyProps.header.usage': 'Uso recomendado',
    'components.menu.sidebar.keyProps.rows.strategy':
      'Elige una sola estrategia de navegacion por pantalla.',
    'components.menu.sidebar.keyProps.rows.collapse':
      'Controla si se puede plegar el sidebar en desktop.',
    'components.menu.sidebar.keyProps.rows.userSection':
      'Activa o desactiva todo el bloque inferior de usuario.',
    'components.menu.sidebar.keyProps.rows.userFields':
      'Permiten mostrar solo los datos que tu producto necesita.',
    'components.menu.sidebar.keyProps.rows.logout':
      'Deja solo accion de cierre de sesion si quieres un footer minimo.',
    'components.menu.sidebar.keyProps.rows.brand':
      'Agrega branding secundario en top/bottom/center.',
    'components.menu.sidebar.api.title': 'Propiedades (API completa)',
    'components.menu.sidebar.api.desc':
      'Inputs principales para configurar comportamiento y look & feel.',
    'components.menu.sidebar.api.header.name': 'Nombre',
    'components.menu.sidebar.api.header.type': 'Tipo',
    'components.menu.sidebar.api.header.default': 'Default',
    'components.menu.sidebar.api.header.description': 'Descripcion',
    'components.menu.sidebar.api.sections.desc':
      'Modo por secciones (usa paneles independientes).',
    'components.menu.sidebar.api.menu.desc':
      'Modo menu unico cuando sections esta vacio.',
    'components.menu.sidebar.api.menuTitle.desc':
      'Titulo para el modo menu.',
    'components.menu.sidebar.api.showUserSection.desc':
      'Habilita el bloque inferior del usuario.',
    'components.menu.sidebar.api.showUserAvatar.desc':
      'Muestra/oculta el avatar del bloque de usuario.',
    'components.menu.sidebar.api.showUserName.desc':
      'Muestra/oculta el nombre del usuario.',
    'components.menu.sidebar.api.showUserEmail.desc':
      'Muestra/oculta el email del usuario.',
    'components.menu.sidebar.api.showLogoutButton.desc':
      'Muestra/oculta el boton Cerrar sesion.',
    'components.menu.sidebar.api.userName.desc':
      'Nombre mostrado en el bloque de usuario.',
    'components.menu.sidebar.api.userEmail.desc':
      'Email mostrado en el bloque de usuario.',
    'components.menu.sidebar.api.avatarConfig.desc':
      'Configura avatar (tipo, shape, size, badge, etc).',
    'components.menu.sidebar.api.showLogo.desc':
      'Muestra logo principal en header.',
    'components.menu.sidebar.api.logoSrc.desc':
      'Ruta del logo principal.',
    'components.menu.sidebar.api.appTitle.desc':
      'Titulo de la aplicacion en header.',
    'components.menu.sidebar.api.showBrandLogo.desc':
      'Muestra logo de marca en top/bottom/center.',
    'components.menu.sidebar.api.brandLogoPosition.desc':
      'Posicion del logo de marca.',
    'components.menu.sidebar.api.menuBackgroundColor.desc':
      'Fondo de los paneles de menu.',
    'components.menu.sidebar.api.menuTextColor.desc':
      'Color de texto de items y titulos.',
    'components.menu.sidebar.api.menuHoverColor.desc':
      'Color hover para items interactivos.',
    'components.menu.sidebar.api.collapsible.desc':
      'Permite colapsar/expandir sidebar en desktop.',
    'components.menu.sidebar.api.showToggle.desc':
      'Muestra boton de toggle en header.',
    'components.menu.sidebar.outputs.title': 'Eventos (Outputs)',
    'components.menu.sidebar.outputs.desc':
      'Eventos emitidos por el componente.',
    'components.menu.sidebar.outputs.header.name': 'Nombre',
    'components.menu.sidebar.outputs.header.type': 'Tipo',
    'components.menu.sidebar.outputs.header.description': 'Descripcion',
    'components.menu.sidebar.outputs.onLogout.desc':
      'Se emite cuando el usuario pulsa Cerrar sesion.',
    'components.menu.sidebar.outputs.closeSidebar.desc':
      'Se emite cuando el sidebar mobile se cierra.',
    'components.menu.sidebar.structure.title': 'Estructura Esperada',
    'components.menu.sidebar.structure.desc':
      'Tipos utiles para poblar el sidebar correctamente.',
    'components.menu.sidebar.structure.item1':
      'SidebarSection: title, icon, items y overrides opcionales de color.',
    'components.menu.sidebar.structure.item2':
      'MenuItem: label, icon, route, children, disabled.',
    'components.menu.sidebar.structure.item3':
      'AvatarConfig: type (image, label, icon) mas size/shape/badge.',
    'components.menu.sidebar.a11y.title': 'Accesibilidad y Responsive',
    'components.menu.sidebar.a11y.desc':
      'Recomendaciones practicas para una UX solida.',
    'components.menu.sidebar.a11y.mobile':
      'Mobile: usa el boton hamburguesa y backdrop para cierre rapido.',
    'components.menu.sidebar.a11y.navigation':
      'Navegacion: define labels cortos y jerarquia clara en cada seccion.',
    'components.menu.sidebar.a11y.contrast':
      'Contraste: valida colores de menuTextColor/menuHoverColor.',
    'components.menu.sidebar.a11y.density':
      'Densidad: en sidebars largos combina secciones y submenu para reducir scroll.',
    'components.menu.sidebar.sectionsData.general': 'General',
    'components.menu.sidebar.sectionsData.management': 'Management',
    'components.menu.sidebar.sectionsData.settings': 'Settings',
    'components.menu.sidebar.sectionsData.dashboard': 'Dashboard',
    'components.menu.sidebar.sectionsData.analytics': 'Analytics',
    'components.menu.sidebar.sectionsData.reports': 'Reportes',
    'components.menu.sidebar.sectionsData.users': 'Users',
    'components.menu.sidebar.sectionsData.list': 'List',
    'components.menu.sidebar.sectionsData.create': 'Create',
    'components.menu.sidebar.sectionsData.teams': 'Teams',
    'components.menu.sidebar.sectionsData.billing': 'Billing',
    'components.menu.sidebar.sectionsData.preferences': 'Preferences',
    'components.menu.sidebar.sectionsData.security': 'Security',
    'components.menu.sidebar.menuData.home': 'Inicio',
    'components.menu.sidebar.menuData.catalog': 'Catalogo',
    'components.menu.sidebar.menuData.products': 'Productos',
    'components.menu.sidebar.menuData.categories': 'Categorias',
    'components.menu.sidebar.menuData.clients': 'Clientes',
    'components.menu.sidebar.menuData.support': 'Soporte',
    'components.menu.sidebar.menuTitle.docs': 'Magary Docs',
    'components.menu.sidebar.menuTitle.single': 'Menu Unico',
    'components.menu.sidebar.menuTitle.navigation': 'Navegacion',
    'components.menu.sidebar.menuTitle.account': 'Cuenta',
    'components.menu.sidebar.menuTitle.profile': 'Perfil',
    'components.menu.sidebar.user.name': 'Juan Perez',
    'components.menu.sidebar.user.email': 'juan@empresa.com',
    'components.menu.sidebar.logoutMode.none': 'Sin eventos',
    'components.menu.sidebar.logoutMode.sections': 'Secciones',
    'components.menu.sidebar.logoutMode.footer': 'Footer opcional',
  },
  en: {
    'components.menu.sidebar.title': 'Magary Sidebar',
    'components.menu.sidebar.subtitle':
      'Sidebar for navigation with sections, collapse, and user block.',
    'components.menu.sidebar.import.title': 'Import',
    'components.menu.sidebar.import.desc':
      'Import the component in your module or standalone component.',
    'components.menu.sidebar.sections.title': 'Basic Sections Example',
    'components.menu.sidebar.sections.desc':
      'Dashboard-oriented setup: sectioned menu, collapse behavior, and full user block.',
    'components.menu.sidebar.sections.shell.title': 'Dashboard',
    'components.menu.sidebar.sections.shell.desc':
      'Content area to validate sidebar coexistence with the main app.',
    'components.menu.sidebar.sections.cards.sales': 'Sales',
    'components.menu.sidebar.sections.cards.salesValue':
      '+12.4% vs previous week',
    'components.menu.sidebar.sections.cards.activeUsers': 'Active users',
    'components.menu.sidebar.sections.cards.activeUsersValue':
      '1,248 in the last 24h',
    'components.menu.sidebar.sections.cards.systemStatus': 'System status',
    'components.menu.sidebar.sections.cards.systemStatusValue':
      'Operational with no incidents.',
    'components.menu.sidebar.menu.title': 'Single Menu + Brand Example',
    'components.menu.sidebar.menu.desc':
      'Compact variant focused on simple navigation and branding, without user footer.',
    'components.menu.sidebar.menu.shell.title': 'Catalog View',
    'components.menu.sidebar.menu.shell.desc':
      'This variant uses menu + menuTitle instead of sections, ideal for linear flows.',
    'components.menu.sidebar.menu.shell.item1':
      'Compact mode for administrative apps.',
    'components.menu.sidebar.menu.shell.item2':
      'Brand logo configurable by position.',
    'components.menu.sidebar.menu.shell.item3':
      'Minimal setup to start quickly.',
    'components.menu.sidebar.footer.title': 'Optional User Footer',
    'components.menu.sidebar.footer.desc':
      'Control each footer part (avatar, name, email, logout) to adapt the sidebar to each product.',
    'components.menu.sidebar.footer.status.count': 'onLogout count',
    'components.menu.sidebar.footer.status.mode': 'Last mode',
    'components.menu.sidebar.footer.shell.title': 'Footer Configuration',
    'components.menu.sidebar.footer.shell.desc':
      'In this example only the logout button is shown, hiding avatar, name, and email.',
    'components.menu.sidebar.footer.shell.itemAvatar':
      'showUserAvatar=false',
    'components.menu.sidebar.footer.shell.itemName': 'showUserName=false',
    'components.menu.sidebar.footer.shell.itemEmail': 'showUserEmail=false',
    'components.menu.sidebar.footer.shell.itemLogout':
      'showLogoutButton=true',
    'components.menu.sidebar.keyProps.title': 'Key Properties',
    'components.menu.sidebar.keyProps.desc':
      'Most-used inputs to quickly configure sidebar behavior.',
    'components.menu.sidebar.keyProps.header.property': 'Property',
    'components.menu.sidebar.keyProps.header.usage': 'Recommended usage',
    'components.menu.sidebar.keyProps.rows.strategy':
      'Choose only one navigation strategy per screen.',
    'components.menu.sidebar.keyProps.rows.collapse':
      'Controls whether sidebar can collapse on desktop.',
    'components.menu.sidebar.keyProps.rows.userSection':
      'Enables or disables the entire lower user block.',
    'components.menu.sidebar.keyProps.rows.userFields':
      'Lets you show only the user data your product needs.',
    'components.menu.sidebar.keyProps.rows.logout':
      'Keeps only sign-out action if you want a minimal footer.',
    'components.menu.sidebar.keyProps.rows.brand':
      'Adds secondary branding on top/bottom/center.',
    'components.menu.sidebar.api.title': 'Properties (Full API)',
    'components.menu.sidebar.api.desc':
      'Main inputs to configure behavior and look & feel.',
    'components.menu.sidebar.api.header.name': 'Name',
    'components.menu.sidebar.api.header.type': 'Type',
    'components.menu.sidebar.api.header.default': 'Default',
    'components.menu.sidebar.api.header.description': 'Description',
    'components.menu.sidebar.api.sections.desc':
      'Section mode (uses independent panels).',
    'components.menu.sidebar.api.menu.desc':
      'Single menu mode when sections is empty.',
    'components.menu.sidebar.api.menuTitle.desc':
      'Title for menu mode.',
    'components.menu.sidebar.api.showUserSection.desc':
      'Enables the lower user block.',
    'components.menu.sidebar.api.showUserAvatar.desc':
      'Shows/hides the user avatar block.',
    'components.menu.sidebar.api.showUserName.desc':
      'Shows/hides the user name.',
    'components.menu.sidebar.api.showUserEmail.desc':
      'Shows/hides the user email.',
    'components.menu.sidebar.api.showLogoutButton.desc':
      'Shows/hides the logout button.',
    'components.menu.sidebar.api.userName.desc':
      'Name displayed in the user block.',
    'components.menu.sidebar.api.userEmail.desc':
      'Email displayed in the user block.',
    'components.menu.sidebar.api.avatarConfig.desc':
      'Configures avatar (type, shape, size, badge, etc).',
    'components.menu.sidebar.api.showLogo.desc':
      'Shows main logo in header.',
    'components.menu.sidebar.api.logoSrc.desc': 'Main logo source path.',
    'components.menu.sidebar.api.appTitle.desc':
      'Application title in header.',
    'components.menu.sidebar.api.showBrandLogo.desc':
      'Shows brand logo on top/bottom/center.',
    'components.menu.sidebar.api.brandLogoPosition.desc':
      'Brand logo position.',
    'components.menu.sidebar.api.menuBackgroundColor.desc':
      'Menu panel background color.',
    'components.menu.sidebar.api.menuTextColor.desc':
      'Text color for items and titles.',
    'components.menu.sidebar.api.menuHoverColor.desc':
      'Hover color for interactive items.',
    'components.menu.sidebar.api.collapsible.desc':
      'Allows collapsing/expanding sidebar on desktop.',
    'components.menu.sidebar.api.showToggle.desc':
      'Shows toggle button in header.',
    'components.menu.sidebar.outputs.title': 'Events (Outputs)',
    'components.menu.sidebar.outputs.desc':
      'Events emitted by the component.',
    'components.menu.sidebar.outputs.header.name': 'Name',
    'components.menu.sidebar.outputs.header.type': 'Type',
    'components.menu.sidebar.outputs.header.description': 'Description',
    'components.menu.sidebar.outputs.onLogout.desc':
      'Emitted when user clicks logout.',
    'components.menu.sidebar.outputs.closeSidebar.desc':
      'Emitted when mobile sidebar closes.',
    'components.menu.sidebar.structure.title': 'Expected Structure',
    'components.menu.sidebar.structure.desc':
      'Useful types to correctly populate the sidebar.',
    'components.menu.sidebar.structure.item1':
      'SidebarSection: title, icon, items, and optional color overrides.',
    'components.menu.sidebar.structure.item2':
      'MenuItem: label, icon, route, children, disabled.',
    'components.menu.sidebar.structure.item3':
      'AvatarConfig: type (image, label, icon) plus size/shape/badge.',
    'components.menu.sidebar.a11y.title': 'Accessibility & Responsive',
    'components.menu.sidebar.a11y.desc':
      'Practical recommendations for solid UX.',
    'components.menu.sidebar.a11y.mobile':
      'Mobile: use hamburger button and backdrop for quick close.',
    'components.menu.sidebar.a11y.navigation':
      'Navigation: define short labels and clear hierarchy in each section.',
    'components.menu.sidebar.a11y.contrast':
      'Contrast: validate menuTextColor/menuHoverColor combinations.',
    'components.menu.sidebar.a11y.density':
      'Density: combine sections and submenu in long sidebars to reduce scroll.',
    'components.menu.sidebar.sectionsData.general': 'General',
    'components.menu.sidebar.sectionsData.management': 'Management',
    'components.menu.sidebar.sectionsData.settings': 'Settings',
    'components.menu.sidebar.sectionsData.dashboard': 'Dashboard',
    'components.menu.sidebar.sectionsData.analytics': 'Analytics',
    'components.menu.sidebar.sectionsData.reports': 'Reports',
    'components.menu.sidebar.sectionsData.users': 'Users',
    'components.menu.sidebar.sectionsData.list': 'List',
    'components.menu.sidebar.sectionsData.create': 'Create',
    'components.menu.sidebar.sectionsData.teams': 'Teams',
    'components.menu.sidebar.sectionsData.billing': 'Billing',
    'components.menu.sidebar.sectionsData.preferences': 'Preferences',
    'components.menu.sidebar.sectionsData.security': 'Security',
    'components.menu.sidebar.menuData.home': 'Home',
    'components.menu.sidebar.menuData.catalog': 'Catalog',
    'components.menu.sidebar.menuData.products': 'Products',
    'components.menu.sidebar.menuData.categories': 'Categories',
    'components.menu.sidebar.menuData.clients': 'Clients',
    'components.menu.sidebar.menuData.support': 'Support',
    'components.menu.sidebar.menuTitle.docs': 'Magary Docs',
    'components.menu.sidebar.menuTitle.single': 'Single Menu',
    'components.menu.sidebar.menuTitle.navigation': 'Navigation',
    'components.menu.sidebar.menuTitle.account': 'Account',
    'components.menu.sidebar.menuTitle.profile': 'Profile',
    'components.menu.sidebar.user.name': 'Juan Perez',
    'components.menu.sidebar.user.email': 'juan@empresa.com',
    'components.menu.sidebar.logoutMode.none': 'No events',
    'components.menu.sidebar.logoutMode.sections': 'Sections',
    'components.menu.sidebar.logoutMode.footer': 'Optional footer',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
