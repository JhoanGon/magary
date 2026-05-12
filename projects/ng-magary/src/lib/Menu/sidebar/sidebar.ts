import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import {
  ElementRef,
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  effect,
  computed,
  booleanAttribute,
  input,
  model,
  output,
  signal,
  inject,
  viewChild,
} from '@angular/core';
import { Router, RouterModule, type UrlTree } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LucideAngularModule } from 'lucide-angular';
import { MagarySegmented } from '../../Form/segmented/segmented';
import {
  MagaryPanelmenu,
  type MenuItemClickEvent,
  type MenuToggleEvent,
  type PanelMenuMode,
} from '../panelmenu/panelmenu';
import { MenuItem } from '../api/menu.interface';
import {
  MagaryAvatar,
  BadgeSeverity,
  AvatarSize,
  AvatarShape,
} from '../../Misc/avatar/avatar';

export interface SidebarSection {
  title: string;
  icon?: string;
  items: MenuItem[];
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
  iconClass?: string;
}

export type SidebarLayoutMode = 'classic' | 'rail' | 'rail-labeled' | 'grid';

export interface SidebarMenuFilter {
  [key: string]: string;
  label: string;
  value: string;
}

export type SidebarAvatarType = 'image' | 'label' | 'icon';

export interface SidebarAvatarConfig {
  type: SidebarAvatarType;
  size?: AvatarSize;
  shape?: AvatarShape;
  image?: string;
  label?: string;
  icon?: string;
  badgeValue?: string;
  badgeSeverity?: BadgeSeverity | undefined;
}

export type SidebarMenuEventSource = 'menu' | 'section';

export interface SidebarMenuToggleEvent extends MenuToggleEvent {
  source: SidebarMenuEventSource;
  sectionTitle?: string;
}

export interface SidebarMenuItemClickEvent extends MenuItemClickEvent {
  source: SidebarMenuEventSource;
  sectionTitle?: string;
}

export interface SidebarMenuItemExpandEvent {
  item: MenuItem;
  expanded: boolean;
  source: SidebarMenuEventSource;
  sectionTitle?: string;
}

@Component({
  selector: 'magary-sidebar',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    MagaryPanelmenu,
    MagarySegmented,
    MagaryAvatar,
    NgOptimizedImage,
    LucideAngularModule,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscapeKey($event)',
  },
})
export class MagarySidebar implements OnDestroy {
  public sections = input<SidebarSection[]>([]);
  public menu = input<MenuItem[]>([]);
  public menuTitle = input<string>('Menu');
  public showUserSection = input<boolean>(false);
  public showUserAvatar = input<boolean>(true);
  public showUserName = input<boolean>(true);
  public showUserEmail = input<boolean>(true);
  public showLogoutButton = input<boolean>(true);
  public userName = input<string>('John Doe');
  public userEmail = input<string>('user@example.com');
  public avatarConfig = input<SidebarAvatarConfig>({
    type: 'label',
    label: 'U',
    size: 'normal',
    shape: 'circle',
    badgeSeverity: 'danger',
  });
  public logoSrc = input<string>('assets/logo.svg');
  public appTitle = input<string>('PRIMENG');
  public appTitleClass = input<string>('');
  public appTitleStyle = input<Record<string, unknown> | null>(null);
  public layoutMode = input<SidebarLayoutMode>('classic');
  public titleColor = input<string | undefined>(undefined);
  public titleFontFamily = input<string | undefined>(undefined);
  public titleFontWeight = input<string | number | undefined>(undefined);
  public titleFontStyle = input<'normal' | 'italic' | 'oblique'>('normal');
  public titleSize = input<string | undefined>(undefined);
  public sidebarBorder = input<string>('1px solid var(--surface-200)');
  public sidebarShadow = input<string>(
    'var(--shadow-lg, 0 20px 35px -12px rgba(2, 6, 23, 0.28))',
  );
  public sidebarBackground = input<string>('var(--surface-0)');
  public sidebarWidth = input<string>('280px');
  public sidebarCollapsedWidth = input<string>('80px');
  public rootStyleClass = input<string>('');
  public rootStyle = input<Record<string, unknown> | null>(null);
  public headerStyleClass = input<string>('');
  public headerStyle = input<Record<string, unknown> | null>(null);
  public contentStyleClass = input<string>('');
  public contentStyle = input<Record<string, unknown> | null>(null);
  public userSectionStyleClass = input<string>('');
  public userSectionStyle = input<Record<string, unknown> | null>(null);
  public menuFilters = input<SidebarMenuFilter[]>([]);
  public showMenuFilters = input(true, { transform: booleanAttribute });
  public menuFilterLabel = input<string>('Sidebar menu category');
  public activeMenuFilter = model<string | null>(null);
  public showEmptyState = input(true, { transform: booleanAttribute });
  public emptyStateTitle = input<string>('No navigation items');
  public emptyStateDescription = input<string>(
    'Add menu items or adjust the active filter.',
  );
  public emptyStateIcon = input<string>('panel-left-dashed');
  public gridColumns = input<number>(2);
  public menuBackgroundColor = input<string>('var(--surface-50)');
  public menuTextColor = input<string>('var(--text-primary)');
  public menuHoverColor = input<string>('var(--surface-100)');
  public collapsible = input<boolean>(true);
  public showToggle = input<boolean>(true);
  public showLogo = input<boolean>(true);
  public brandRoute = input<string | readonly unknown[] | UrlTree | null>('/');
  public logoAlt = input<string>('Logo');
  public brandLogoAlt = input<string>('Brand Logo');
  public showBrandLogo = input<boolean>(false);
  public brandLogoSrc = input<string>('');
  public brandLogoPosition = input<'top' | 'bottom' | 'center'>('bottom');
  public logoWidth = input<number>(32);
  public logoHeight = input<number>(32);
  public brandLogoWidth = input<number>(200);
  public brandLogoHeight = input<number>(100);
  public navigationLabel = input<string>('Primary navigation');
  public mobileMenuButtonLabel = input<string>('Open sidebar navigation');
  public closeButtonLabel = input<string>('Close sidebar');
  public expandButtonLabel = input<string>('Expand sidebar');
  public collapseButtonLabel = input<string>('Collapse sidebar');
  public logoutLabel = input<string>('Sign out');
  public menuPanelStyleClass = input<string>('');
  public menuPanelStyle = input<Record<string, unknown> | null>(null);
  public menuPanelBorderRadius = input<string>('0.5rem');
  public menuPanelShadow = input<number>(2);
  public menuActiveIndicator = input(true, { transform: booleanAttribute });
  public closeOnEscape = input(true, { transform: booleanAttribute });
  public trapFocus = input(true, { transform: booleanAttribute });

  public isMobileOpen = signal(false);
  public isCollapsed = model<boolean>(false);
  readonly sidebarId = `magary-sidebar-${Math.random().toString(36).substring(2, 11)}`;
  readonly sidebarElement = viewChild<ElementRef<HTMLElement>>('sidebarElement');
  readonly closeButtonElement = viewChild<ElementRef<HTMLButtonElement>>('closeButton');
  readonly panelMenuMode = computed<PanelMenuMode>(() => {
    switch (this.layoutMode()) {
      case 'rail':
        return 'rail-icons';
      case 'rail-labeled':
        return 'rail-labeled';
      case 'grid':
        return 'grid';
      default:
        return 'accordion';
    }
  });
  readonly showPanelHeader = computed(() => this.layoutMode() === 'classic');
  readonly showPanelLabels = computed(() => this.layoutMode() !== 'rail');
  readonly rootStyles = computed(() =>
    this.composeStyles(this.getSidebarCssVariables(), this.rootStyle()),
  );
  readonly filteredMenu = computed(() => this.applyFilterToItems(this.menu()));
  readonly filteredSections = computed(() =>
    this.sections()
      .map((section) => ({
        ...section,
        items: this.applyFilterToItems(section.items),
      }))
      .filter((section) => section.items.length > 0),
  );
  readonly shouldShowEmptyState = computed(
    () =>
      this.showEmptyState() &&
      this.filteredSections().length === 0 &&
      this.filteredMenu().length === 0,
  );
  readonly shouldShowMenuFilterControl = computed(
    () => this.showMenuFilters() && this.menuFilters().length > 0,
  );
  readonly panelMenuClasses = computed(() => {
    const classes = ['sidebar-panel-menu'];
    switch (this.layoutMode()) {
      case 'rail':
        classes.push('sidebar-panel-menu-rail');
        break;
      case 'rail-labeled':
        classes.push('sidebar-panel-menu-rail-labeled');
        break;
      case 'grid':
        classes.push('sidebar-panel-menu-grid');
        break;
      default:
        classes.push('sidebar-panel-menu-classic');
    }

    const customClass = this.menuPanelStyleClass().trim();
    if (customClass.length > 0) {
      classes.push(customClass);
    }

    return classes.join(' ');
  });

  onLogout = output<void>();
  closeSidebar = output<void>();
  menuToggle = output<SidebarMenuToggleEvent>();
  menuItemClick = output<SidebarMenuItemClickEvent>();
  menuItemExpand = output<SidebarMenuItemExpandEvent>();
  private previouslyFocusedElement: HTMLElement | null = null;
  private previousBodyOverflow = '';
  private hasBodyOverflowLock = false;
  private readonly focusableSelectors =
    'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), ' +
    'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  toggleMobileSidebar() {
    if (this.isMobileOpen()) {
      this.closeMobileSidebar();
      return;
    }

    this.isMobileOpen.set(true);
  }

  toggleCollapse() {
    if (this.collapsible()) {
      this.isCollapsed.update((collapsed) => !collapsed);
    }
  }

  openSidebar() {
    this.isCollapsed.set(false);
  }

  closeMobileSidebar() {
    if (!this.isMobileOpen()) {
      return;
    }
    this.isMobileOpen.set(false);
    this.closeSidebar.emit();
  }

  logout() {
    this.onLogout.emit();
  }

  shouldRenderUserSection(): boolean {
    return (
      this.showUserSection() &&
      (this.shouldShowUserInfo() || this.showLogoutButton())
    );
  }

  shouldShowUserInfo(): boolean {
    return this.showUserAvatar() || this.showUserName() || this.showUserEmail();
  }

  shouldShowUserDetails(): boolean {
    return !this.isCollapsed() && (this.showUserName() || this.showUserEmail());
  }

  getAvatarFallbackLabel(): string {
    const userName = this.userName().trim();
    return userName ? userName.charAt(0).toUpperCase() : 'U';
  }

  onMenuFilterChange(value: unknown): void {
    this.activeMenuFilter.set(typeof value === 'string' ? value : null);
  }

  onMenuToggle(event: MenuToggleEvent, sectionTitle?: string): void {
    this.menuToggle.emit(this.createMenuEventPayload(event, sectionTitle));
  }

  onMenuItemClick(event: MenuItemClickEvent, sectionTitle?: string): void {
    this.menuItemClick.emit(this.createMenuEventPayload(event, sectionTitle));
  }

  onMenuItemExpand(
    event: { item: MenuItem; expanded: boolean },
    sectionTitle?: string,
  ): void {
    this.menuItemExpand.emit(this.createMenuEventPayload(event, sectionTitle));
  }

  hasBrandRoute(): boolean {
    return this.brandRoute() !== null;
  }

  getSidebarClasses(): Record<string, boolean> {
    const classes: Record<string, boolean> = {
      sidebar: true,
      open: this.isMobileOpen(),
      collapsed: this.isCollapsed(),
      [`layout-${this.layoutMode()}`]: true,
    };

    const rootStyleClass = this.rootStyleClass().trim();
    if (rootStyleClass.length > 0) {
      classes[rootStyleClass] = true;
    }

    return classes;
  }

  private getSidebarCssVariables(): Record<string, unknown> {
    return {
      '--sidebar-width': this.resolveSidebarWidth(),
      '--sidebar-bg': this.sidebarBackground(),
      '--sidebar-border': this.sidebarBorder(),
      '--sidebar-shadow': this.sidebarShadow(),
      '--sidebar-collapsed-width': this.resolveSidebarCollapsedWidth(),
      '--sidebar-title-font-style': this.titleFontStyle(),
      ...(this.titleColor() ? { '--sidebar-title-color': this.titleColor() } : {}),
      ...(this.titleFontFamily()
        ? { '--sidebar-title-font-family': this.titleFontFamily() }
        : {}),
      ...(this.titleFontWeight() !== undefined
        ? { '--sidebar-title-font-weight': this.titleFontWeight() }
        : {}),
      ...(this.titleSize() ? { '--sidebar-title-size': this.titleSize() } : {}),
    };
  }

  private resolveSidebarWidth(): string {
    const configuredWidth = this.sidebarWidth().trim();
    if (configuredWidth !== '280px') {
      return configuredWidth;
    }

    switch (this.layoutMode()) {
      case 'rail':
        return '80px';
      case 'rail-labeled':
        return '132px';
      case 'grid':
        return '248px';
      default:
        return configuredWidth;
    }
  }

  private resolveSidebarCollapsedWidth(): string {
    const configuredCollapsedWidth = this.sidebarCollapsedWidth().trim();
    if (configuredCollapsedWidth !== '80px') {
      return configuredCollapsedWidth;
    }

    if (this.layoutMode() === 'rail') {
      return '72px';
    }

    if (this.layoutMode() === 'rail-labeled') {
      return '96px';
    }

    return configuredCollapsedWidth;
  }

  private composeStyles(
    ...styleMaps: Array<Record<string, unknown> | null | undefined>
  ): Record<string, unknown> {
    return styleMaps.reduce<Record<string, unknown>>((acc, styleMap) => {
      if (!styleMap) {
        return acc;
      }

      for (const [key, value] of Object.entries(styleMap)) {
        if (value !== undefined && value !== null) {
          acc[key] = value;
        }
      }

      return acc;
    }, {});
  }

  private applyFilterToItems(items: MenuItem[]): MenuItem[] {
    const activeFilter = this.activeMenuFilter();
    if (!activeFilter) {
      return items;
    }

    const filtered = items.reduce<MenuItem[]>((acc, item) => {
      if (item.separator) {
        acc.push(item);
        return acc;
      }

      const children = item.items ?? item.children ?? [];
      const filteredChildren = children.length
        ? this.applyFilterToItems(children)
        : [];

      const matchesGroup = !item.group || item.group === activeFilter;
      const includeItem = matchesGroup || filteredChildren.length > 0;

      if (!includeItem) {
        return acc;
      }

      if (children.length === 0 || filteredChildren.length === children.length) {
        acc.push(item);
        return acc;
      }

      acc.push({
        ...item,
        items: item.items ? filteredChildren : undefined,
        children: item.children ? filteredChildren : undefined,
      });

      return acc;
    }, []);

    return this.normalizeSeparators(filtered);
  }

  private normalizeSeparators(items: MenuItem[]): MenuItem[] {
    const normalized: MenuItem[] = [];

    for (const item of items) {
      if (item.separator) {
        if (normalized.length === 0 || normalized[normalized.length - 1].separator) {
          continue;
        }
      }
      normalized.push(item);
    }

    while (normalized.length > 0 && normalized[normalized.length - 1].separator) {
      normalized.pop();
    }

    return normalized;
  }

  private createMenuEventPayload<T extends object>(
    event: T,
    sectionTitle?: string,
  ): T & {
    source: SidebarMenuEventSource;
    sectionTitle?: string;
  } {
    return {
      ...event,
      source: sectionTitle ? 'section' : 'menu',
      ...(sectionTitle ? { sectionTitle } : {}),
    };
  }

  private router = inject(Router);
  private document = inject(DOCUMENT);
  private routerSubscription?: Subscription;

  constructor() {
    this.routerSubscription = this.router.events.subscribe(() => {
      this.closeMobileSidebar();
    });

    effect(() => {
      const filters = this.menuFilters();
      const currentFilter = this.activeMenuFilter();

      if (filters.length === 0) {
        if (currentFilter !== null) {
          this.activeMenuFilter.set(null);
        }
        return;
      }

      const filterExists =
        currentFilter !== null &&
        filters.some((filter) => filter.value === currentFilter);

      if (!filterExists) {
        this.activeMenuFilter.set(filters[0].value);
      }
    });

    let wasMobileOpen = false;
    effect(() => {
      const mobileOpen = this.isMobileOpen();

      if (mobileOpen && !wasMobileOpen) {
        this.previouslyFocusedElement =
          this.document.activeElement instanceof HTMLElement
            ? this.document.activeElement
            : null;
        this.lockBodyScroll();
        queueMicrotask(() => this.focusSidebarEntryPoint());
      }

      if (!mobileOpen && wasMobileOpen) {
        this.unlockBodyScroll();
        this.restorePreviousFocus();
      }

      wasMobileOpen = mobileOpen;
    });
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
    this.unlockBodyScroll();
  }

  onEscapeKey(event: Event) {
    if (!this.isMobileOpen() || !this.closeOnEscape()) {
      return;
    }

    event.preventDefault();
    this.closeMobileSidebar();
  }

  onSidebarKeydown(event: KeyboardEvent) {
    if (
      event.key !== 'Tab' ||
      !this.isMobileOpen() ||
      !this.trapFocus()
    ) {
      return;
    }

    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) {
      event.preventDefault();
      this.sidebarElement()?.nativeElement.focus();
      return;
    }

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    const activeElement = this.document.activeElement;
    const activeInsideSidebar =
      activeElement instanceof HTMLElement &&
      this.sidebarElement()?.nativeElement.contains(activeElement);

    if (event.shiftKey) {
      if (!activeInsideSidebar || activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
      return;
    }

    if (!activeInsideSidebar || activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }

  private focusSidebarEntryPoint() {
    if (!this.isMobileOpen()) {
      return;
    }

    const closeButton = this.closeButtonElement()?.nativeElement;
    if (closeButton && this.isElementVisible(closeButton)) {
      closeButton.focus();
      return;
    }

    const focusableElements = this.getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
      return;
    }

    this.sidebarElement()?.nativeElement.focus();
  }

  private restorePreviousFocus() {
    const element = this.previouslyFocusedElement;
    this.previouslyFocusedElement = null;

    if (!element) {
      return;
    }

    if (this.document.contains(element)) {
      queueMicrotask(() => element.focus());
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const sidebarElement = this.sidebarElement()?.nativeElement;
    if (!sidebarElement) {
      return [];
    }

    const elements = Array.from(
      sidebarElement.querySelectorAll<HTMLElement>(this.focusableSelectors),
    );

    return elements.filter((element) => this.isElementVisible(element));
  }

  private isElementVisible(element: HTMLElement): boolean {
    const styles = getComputedStyle(element);
    return styles.visibility !== 'hidden' && styles.display !== 'none';
  }

  private lockBodyScroll() {
    if (this.hasBodyOverflowLock) {
      return;
    }

    this.previousBodyOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
    this.hasBodyOverflowLock = true;
  }

  private unlockBodyScroll() {
    if (!this.hasBodyOverflowLock) {
      return;
    }

    this.document.body.style.overflow = this.previousBodyOverflow;
    this.previousBodyOverflow = '';
    this.hasBodyOverflowLock = false;
  }
}
