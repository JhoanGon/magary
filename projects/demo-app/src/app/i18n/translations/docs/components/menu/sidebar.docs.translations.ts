import { DemoLanguage } from '../../../../types';

export const SIDEBAR_DOC_TEXT = {
  es: {
    'components.menu.sidebar.title': 'Magary Sidebar',
    'components.menu.sidebar.subtitle':
      'Sidebar para navegacion con secciones, colapso y bloque de usuario.',
    'components.menu.sidebar.import.title': 'Import',
    'components.menu.sidebar.import.desc':
      'Importa el componente en tu componente standalone.',
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
    'components.menu.sidebar.menu.shell.selected': 'Seleccion activa',
    'components.menu.sidebar.menu.shell.home.title': 'Home Overview',
    'components.menu.sidebar.menu.shell.home.desc':
      'Vista inicial para aterrizar rapido en el estado general del producto.',
    'components.menu.sidebar.menu.shell.home.item1':
      'Resumen de actividad y accesos frecuentes.',
    'components.menu.sidebar.menu.shell.home.item2':
      'Ideal para dashboards compactos y paneles administrativos.',
    'components.menu.sidebar.menu.shell.home.item3':
      'Sirve como punto de entrada estable para el usuario.',
    'components.menu.sidebar.menu.shell.catalog.title': 'Catalog View',
    'components.menu.sidebar.menu.shell.catalog.desc':
      'Vista enfocada en explorar estructura, productos y grupos de navegacion.',
    'components.menu.sidebar.menu.shell.catalog.item1':
      'Buen fit para sidebars lineales con branding fuerte.',
    'components.menu.sidebar.menu.shell.catalog.item2':
      'Puede combinar menu simple con subitems o panel lateral secundario.',
    'components.menu.sidebar.menu.shell.catalog.item3':
      'Es la variante mas facil de vender como bloque reutilizable.',
    'components.menu.sidebar.menu.shell.clients.title': 'Clients Workspace',
    'components.menu.sidebar.menu.shell.clients.desc':
      'Ejemplo de cambio de contexto al entrar en una seccion operativa con badge.',
    'components.menu.sidebar.menu.shell.clients.item1':
      'El contador ayuda a vender estados reales del negocio.',
    'components.menu.sidebar.menu.shell.clients.item2':
      'Permite demostrar feedback visual al cambiar de opcion.',
    'components.menu.sidebar.menu.shell.clients.item3':
      'Funciona bien para CRM, soporte y gestion comercial.',
    'components.menu.sidebar.menu.shell.support.title': 'Support Center',
    'components.menu.sidebar.menu.shell.support.desc':
      'Vista para acciones de ayuda, tickets o canales de acompanamiento.',
    'components.menu.sidebar.menu.shell.support.item1':
      'Muestra que el sidebar puede alternar modulos sin recargar layout.',
    'components.menu.sidebar.menu.shell.support.item2':
      'El badge comunica pendientes o mensajes por atender.',
    'components.menu.sidebar.menu.shell.support.item3':
      'Es util para demos de producto orientadas a SaaS.',
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
    'components.menu.sidebar.keyProps.rows.layout':
      'Define la variante visual principal (classic, rail, rail-labeled o grid).',
    'components.menu.sidebar.keyProps.rows.zones':
      'Permite personalizar root/header/content/userSection sin hacks ni estilos globales ad hoc.',
    'components.menu.sidebar.keyProps.rows.appearance':
      'Controla ancho, borde, sombra, fondo y tipografia del titulo por input.',
    'components.menu.sidebar.keyProps.rows.filters':
      'Agrega selector segmentado para alternar subconjuntos de menu por grupo.',
    'components.menu.sidebar.keyProps.rows.emptyState':
      'Muestra un estado vacio elegante cuando no hay items o el filtro deja el menu sin resultados.',
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
    'components.menu.sidebar.api.layoutMode.desc':
      'Selecciona el layout principal del sidebar.',
    'components.menu.sidebar.api.menuTitle.desc':
      'Titulo para el modo menu.',
    'components.menu.sidebar.api.menuFilters.desc':
      'Opciones del selector segmentado para filtrar items por grupo.',
    'components.menu.sidebar.api.activeMenuFilter.desc':
      'Grupo de menu activo en el filtro segmentado.',
    'components.menu.sidebar.api.showMenuFilters.desc':
      'Muestra/oculta el selector segmentado de filtros.',
    'components.menu.sidebar.api.menuFilterLabel.desc':
      'Etiqueta aria para el control de filtros.',
    'components.menu.sidebar.api.gridColumns.desc':
      'Cantidad de columnas para layoutMode="grid".',
    'components.menu.sidebar.api.showEmptyState.desc':
      'Muestra un estado vacio dentro del contenedor de menu cuando no hay items renderizables.',
    'components.menu.sidebar.api.emptyStateTitle.desc':
      'Titulo del estado vacio mostrado en el area de navegacion.',
    'components.menu.sidebar.api.emptyStateDescription.desc':
      'Texto auxiliar del estado vacio para guiar al usuario.',
    'components.menu.sidebar.api.emptyStateIcon.desc':
      'Icono Lucide usado en el estado vacio.',
    'components.menu.sidebar.api.menuPanelStyleClass.desc':
      'Clase CSS extra para cada panel de menu interno.',
    'components.menu.sidebar.api.menuPanelStyle.desc':
      'Estilos inline extra para cada panel de menu interno.',
    'components.menu.sidebar.api.menuPanelBorderRadius.desc':
      'Border radius aplicado a cada panel interno.',
    'components.menu.sidebar.api.menuPanelShadow.desc':
      'Nivel de sombra aplicado a cada panel interno.',
    'components.menu.sidebar.api.menuActiveIndicator.desc':
      'Activa el indicador visual del item activo en los paneles internos.',
    'components.menu.sidebar.api.rootStyleClass.desc':
      'Clase CSS adicional para el contenedor raiz del sidebar.',
    'components.menu.sidebar.api.rootStyle.desc':
      'Estilos inline para el contenedor raiz.',
    'components.menu.sidebar.api.headerStyleClass.desc':
      'Clase CSS adicional para el header del sidebar.',
    'components.menu.sidebar.api.headerStyle.desc':
      'Estilos inline para el header del sidebar.',
    'components.menu.sidebar.api.contentStyleClass.desc':
      'Clase CSS adicional para el bloque de contenido.',
    'components.menu.sidebar.api.contentStyle.desc':
      'Estilos inline para el bloque de contenido.',
    'components.menu.sidebar.api.userSectionStyleClass.desc':
      'Clase CSS adicional para la seccion de usuario.',
    'components.menu.sidebar.api.userSectionStyle.desc':
      'Estilos inline para la seccion de usuario.',
    'components.menu.sidebar.api.sidebarWidth.desc':
      'Ancho base del sidebar.',
    'components.menu.sidebar.api.sidebarCollapsedWidth.desc':
      'Ancho cuando el sidebar esta colapsado.',
    'components.menu.sidebar.api.sidebarBackground.desc':
      'Fondo principal del contenedor sidebar.',
    'components.menu.sidebar.api.sidebarBorder.desc':
      'Borde aplicado al sidebar y divisores internos.',
    'components.menu.sidebar.api.sidebarShadow.desc':
      'Sombra principal del sidebar.',
    'components.menu.sidebar.api.titleColor.desc':
      'Color del titulo de aplicacion en header.',
    'components.menu.sidebar.api.titleFontFamily.desc':
      'Familia tipografica del titulo.',
    'components.menu.sidebar.api.titleFontWeight.desc':
      'Peso tipografico del titulo.',
    'components.menu.sidebar.api.titleFontStyle.desc':
      'Estilo tipografico del titulo.',
    'components.menu.sidebar.api.titleSize.desc':
      'Tamano de fuente del titulo.',
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
    'components.menu.sidebar.api.logoAlt.desc':
      'Texto alternativo del logo principal.',
    'components.menu.sidebar.api.appTitle.desc':
      'Titulo de la aplicacion en header.',
    'components.menu.sidebar.api.brandRoute.desc':
      'Ruta usada por el logo/titulo principal para volver al inicio.',
    'components.menu.sidebar.api.showBrandLogo.desc':
      'Muestra logo de marca en top/bottom/center.',
    'components.menu.sidebar.api.brandLogoPosition.desc':
      'Posicion del logo de marca.',
    'components.menu.sidebar.api.brandLogoAlt.desc':
      'Texto alternativo del logo de marca secundario.',
    'components.menu.sidebar.api.menuBackgroundColor.desc':
      'Fondo de los paneles de menu.',
    'components.menu.sidebar.api.menuTextColor.desc':
      'Color de texto de items y titulos.',
    'components.menu.sidebar.api.menuHoverColor.desc':
      'Color hover para items interactivos.',
    'components.menu.sidebar.api.collapsible.desc':
      'Permite colapsar/expandir sidebar en desktop.',
    'components.menu.sidebar.api.isCollapsed.desc':
      'Estado colapsado con two-way binding. Usa [(isCollapsed)] para controlar y observar el colapso del sidebar.',
    'components.menu.sidebar.api.showToggle.desc':
      'Muestra boton de toggle en header.',
    'components.menu.sidebar.api.expandButtonLabel.desc':
      'Etiqueta aria del boton para expandir el sidebar.',
    'components.menu.sidebar.api.collapseButtonLabel.desc':
      'Etiqueta aria del boton para colapsar el sidebar.',
    'components.menu.sidebar.api.logoutLabel.desc':
      'Texto visible y aria del boton de cierre de sesion.',
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
    'components.menu.sidebar.outputs.isCollapsedChange.desc':
      'Se emite cuando cambia el estado colapsado del sidebar en desktop.',
    'components.menu.sidebar.outputs.menuToggle.desc':
      'Reexpone el evento de apertura/cierre del panel interno, con source y sectionTitle.',
    'components.menu.sidebar.outputs.menuItemClick.desc':
      'Reexpone el click de item del panel interno, con source y sectionTitle.',
    'components.menu.sidebar.outputs.menuItemExpand.desc':
      'Reexpone la expansion de item del panel interno, con source y sectionTitle.',
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
      'Import the component in your standalone component.',
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
    'components.menu.sidebar.menu.shell.selected': 'Active selection',
    'components.menu.sidebar.menu.shell.home.title': 'Home Overview',
    'components.menu.sidebar.menu.shell.home.desc':
      'Landing view used to surface the product status at a glance.',
    'components.menu.sidebar.menu.shell.home.item1':
      'Useful for quick metrics, shortcuts, and overview panels.',
    'components.menu.sidebar.menu.shell.home.item2':
      'Fits compact admin apps with minimal navigation depth.',
    'components.menu.sidebar.menu.shell.home.item3':
      'Acts as a stable entry point for the user journey.',
    'components.menu.sidebar.menu.shell.catalog.title': 'Catalog View',
    'components.menu.sidebar.menu.shell.catalog.desc':
      'Focused view for browsing structure, products, and grouped navigation.',
    'components.menu.sidebar.menu.shell.catalog.item1':
      'Good fit for branded sidebars with linear navigation.',
    'components.menu.sidebar.menu.shell.catalog.item2':
      'Can evolve into a richer flow with nested or secondary panels.',
    'components.menu.sidebar.menu.shell.catalog.item3':
      'This is one of the easiest presets to sell as a reusable block.',
    'components.menu.sidebar.menu.shell.clients.title': 'Clients Workspace',
    'components.menu.sidebar.menu.shell.clients.desc':
      'Example of switching context into an operational area with a live badge.',
    'components.menu.sidebar.menu.shell.clients.item1':
      'The counter helps sell real business states in demos.',
    'components.menu.sidebar.menu.shell.clients.item2':
      'Makes visual feedback obvious when users switch options.',
    'components.menu.sidebar.menu.shell.clients.item3':
      'Works well for CRM, support, and commercial tools.',
    'components.menu.sidebar.menu.shell.support.title': 'Support Center',
    'components.menu.sidebar.menu.shell.support.desc':
      'View geared toward help flows, tickets, or customer assistance channels.',
    'components.menu.sidebar.menu.shell.support.item1':
      'Shows that the sidebar can switch modules without reloading layout.',
    'components.menu.sidebar.menu.shell.support.item2':
      'The badge communicates pending work or unread items.',
    'components.menu.sidebar.menu.shell.support.item3':
      'Useful for SaaS-oriented product demos.',
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
    'components.menu.sidebar.keyProps.rows.layout':
      'Defines the main visual variant (classic, rail, rail-labeled, or grid).',
    'components.menu.sidebar.keyProps.rows.zones':
      'Customizes root/header/content/userSection without hacks or ad hoc global styles.',
    'components.menu.sidebar.keyProps.rows.appearance':
      'Controls width, border, shadow, background, and title typography via inputs.',
    'components.menu.sidebar.keyProps.rows.filters':
      'Adds a segmented selector to switch menu subsets by group.',
    'components.menu.sidebar.keyProps.rows.emptyState':
      'Shows a polished empty state when there are no items or filters leave the menu without results.',
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
    'components.menu.sidebar.api.layoutMode.desc':
      'Selects the primary sidebar layout.',
    'components.menu.sidebar.api.menuTitle.desc':
      'Title for menu mode.',
    'components.menu.sidebar.api.menuFilters.desc':
      'Segmented filter options used to split menu items by group.',
    'components.menu.sidebar.api.activeMenuFilter.desc':
      'Currently active group in the segmented filter.',
    'components.menu.sidebar.api.showMenuFilters.desc':
      'Shows/hides the segmented filter control.',
    'components.menu.sidebar.api.menuFilterLabel.desc':
      'ARIA label for the menu filter control.',
    'components.menu.sidebar.api.gridColumns.desc':
      'Column count used by layoutMode="grid".',
    'components.menu.sidebar.api.showEmptyState.desc':
      'Displays an empty state inside the menu container when there are no renderable items.',
    'components.menu.sidebar.api.emptyStateTitle.desc':
      'Empty state heading shown in the navigation area.',
    'components.menu.sidebar.api.emptyStateDescription.desc':
      'Supporting empty state copy used to guide the user.',
    'components.menu.sidebar.api.emptyStateIcon.desc':
      'Lucide icon used in the empty state.',
    'components.menu.sidebar.api.menuPanelStyleClass.desc':
      'Extra CSS class applied to each inner menu panel.',
    'components.menu.sidebar.api.menuPanelStyle.desc':
      'Extra inline styles applied to each inner menu panel.',
    'components.menu.sidebar.api.menuPanelBorderRadius.desc':
      'Border radius applied to each inner menu panel.',
    'components.menu.sidebar.api.menuPanelShadow.desc':
      'Shadow level applied to each inner menu panel.',
    'components.menu.sidebar.api.menuActiveIndicator.desc':
      'Enables the active item visual indicator in inner menu panels.',
    'components.menu.sidebar.api.rootStyleClass.desc':
      'Extra CSS class for the sidebar root container.',
    'components.menu.sidebar.api.rootStyle.desc':
      'Inline styles for the sidebar root container.',
    'components.menu.sidebar.api.headerStyleClass.desc':
      'Extra CSS class for the sidebar header.',
    'components.menu.sidebar.api.headerStyle.desc':
      'Inline styles for the sidebar header.',
    'components.menu.sidebar.api.contentStyleClass.desc':
      'Extra CSS class for the sidebar content section.',
    'components.menu.sidebar.api.contentStyle.desc':
      'Inline styles for the sidebar content section.',
    'components.menu.sidebar.api.userSectionStyleClass.desc':
      'Extra CSS class for the user section.',
    'components.menu.sidebar.api.userSectionStyle.desc':
      'Inline styles for the user section.',
    'components.menu.sidebar.api.sidebarWidth.desc':
      'Base width for the sidebar.',
    'components.menu.sidebar.api.sidebarCollapsedWidth.desc':
      'Width used when the sidebar is collapsed.',
    'components.menu.sidebar.api.sidebarBackground.desc':
      'Primary sidebar background.',
    'components.menu.sidebar.api.sidebarBorder.desc':
      'Border style applied to the sidebar and internal separators.',
    'components.menu.sidebar.api.sidebarShadow.desc':
      'Primary sidebar shadow.',
    'components.menu.sidebar.api.titleColor.desc':
      'Application title color in the header.',
    'components.menu.sidebar.api.titleFontFamily.desc':
      'Application title font family.',
    'components.menu.sidebar.api.titleFontWeight.desc':
      'Application title font weight.',
    'components.menu.sidebar.api.titleFontStyle.desc':
      'Application title font style.',
    'components.menu.sidebar.api.titleSize.desc':
      'Application title font size.',
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
    'components.menu.sidebar.api.logoAlt.desc':
      'Alt text used for the main logo.',
    'components.menu.sidebar.api.appTitle.desc':
      'Application title in header.',
    'components.menu.sidebar.api.brandRoute.desc':
      'Route used by the main logo/title to navigate home.',
    'components.menu.sidebar.api.showBrandLogo.desc':
      'Shows brand logo on top/bottom/center.',
    'components.menu.sidebar.api.brandLogoPosition.desc':
      'Brand logo position.',
    'components.menu.sidebar.api.brandLogoAlt.desc':
      'Alt text used for the secondary brand logo.',
    'components.menu.sidebar.api.menuBackgroundColor.desc':
      'Menu panel background color.',
    'components.menu.sidebar.api.menuTextColor.desc':
      'Text color for items and titles.',
    'components.menu.sidebar.api.menuHoverColor.desc':
      'Hover color for interactive items.',
    'components.menu.sidebar.api.collapsible.desc':
      'Allows collapsing/expanding sidebar on desktop.',
    'components.menu.sidebar.api.isCollapsed.desc':
      'Two-way bindable collapsed state. Use [(isCollapsed)] to control and observe the sidebar collapse state.',
    'components.menu.sidebar.api.showToggle.desc':
      'Shows toggle button in header.',
    'components.menu.sidebar.api.expandButtonLabel.desc':
      'ARIA label for the expand sidebar button.',
    'components.menu.sidebar.api.collapseButtonLabel.desc':
      'ARIA label for the collapse sidebar button.',
    'components.menu.sidebar.api.logoutLabel.desc':
      'Visible text and ARIA label for the sign-out button.',
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
    'components.menu.sidebar.outputs.isCollapsedChange.desc':
      'Emitted when the sidebar desktop collapse state changes.',
    'components.menu.sidebar.outputs.menuToggle.desc':
      'Re-emits inner panel open/close events with source and sectionTitle.',
    'components.menu.sidebar.outputs.menuItemClick.desc':
      'Re-emits inner panel item clicks with source and sectionTitle.',
    'components.menu.sidebar.outputs.menuItemExpand.desc':
      'Re-emits inner panel expand events with source and sectionTitle.',
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
