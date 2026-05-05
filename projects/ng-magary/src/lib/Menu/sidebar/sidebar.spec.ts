import { Component, importProvidersFrom } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MenuItem } from '../api/menu.interface';
import { MagaryPanelmenu } from '../panelmenu/panelmenu';
import { MagarySidebar } from './sidebar';

const kebabCase = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, (typeof icons)[keyof typeof icons]>,
);

@Component({
  imports: [MagarySidebar],
  template: `
    <magary-sidebar [showLogo]="false" [menu]="[]" [showEmptyState]="true">
      <div sidebar-header-start class="slot-header-start">Header Start</div>
      <button sidebar-empty-action type="button" class="empty-action">
        Create nav
      </button>
      <div sidebar-content-bottom class="slot-content-bottom">Bottom Slot</div>
    </magary-sidebar>
  `,
})
class SidebarProjectionHost {}

describe('MagarySidebar behavior', () => {
  let fixture: ComponentFixture<MagarySidebar>;
  let component: MagarySidebar;

  const menu: MenuItem[] = [
    { label: 'Dashboard', icon: 'house' },
    {
      label: 'Management',
      icon: 'users',
      children: [{ label: 'Users' }, { label: 'Teams' }],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [MagarySidebar],
      providers: [
        provideRouter([]),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagarySidebar);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('showLogo', false);
    fixture.componentRef.setInput('showUserSection', true);
    fixture.componentRef.setInput('menu', menu);
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('opens and closes mobile sidebar from hamburger and backdrop', () => {
    const hamburger = fixture.nativeElement.querySelector(
      '.hamburger-button',
    ) as HTMLButtonElement;
    hamburger.click();
    fixture.detectChanges();

    expect(component.isMobileOpen()).toBe(true);
    expect(fixture.nativeElement.querySelector('.sidebar-backdrop')).toBeTruthy();

    const backdrop = fixture.nativeElement.querySelector(
      '.sidebar-backdrop',
    ) as HTMLElement;
    backdrop.click();
    fixture.detectChanges();

    expect(component.isMobileOpen()).toBe(false);
    expect(fixture.nativeElement.querySelector('.sidebar-backdrop')).toBeNull();
  });

  it('toggles collapsed state only when collapsible is enabled', () => {
    fixture.componentRef.setInput('collapsible', true);
    fixture.detectChanges();

    component.toggleCollapse();
    expect(component.isCollapsed()).toBe(true);

    fixture.componentRef.setInput('collapsible', false);
    fixture.detectChanges();
    component.toggleCollapse();
    expect(component.isCollapsed()).toBe(true);

    component.openSidebar();
    expect(component.isCollapsed()).toBe(false);
  });

  it('emits logout event from user section button', () => {
    let logoutCalls = 0;
    component.onLogout.subscribe(() => {
      logoutCalls += 1;
    });

    const logoutButton = fixture.nativeElement.querySelector(
      '.logout-button',
    ) as HTMLButtonElement;
    logoutButton.click();
    fixture.detectChanges();

    expect(logoutCalls).toBe(1);
  });

  it('supports granular visibility in user footer', () => {
    fixture.componentRef.setInput('showUserAvatar', false);
    fixture.componentRef.setInput('showUserName', true);
    fixture.componentRef.setInput('showUserEmail', false);
    fixture.componentRef.setInput('showLogoutButton', false);
    fixture.componentRef.setInput('userName', 'Custom User');
    fixture.detectChanges();

    const avatar = fixture.nativeElement.querySelector(
      '.user-info .user-avatar',
    ) as HTMLElement | null;
    const username = fixture.nativeElement.querySelector(
      '.user-info .username',
    ) as HTMLElement | null;
    const email = fixture.nativeElement.querySelector(
      '.user-info .email',
    ) as HTMLElement | null;
    const logoutButton = fixture.nativeElement.querySelector(
      '.logout-button',
    ) as HTMLButtonElement | null;

    expect(avatar).toBeNull();
    expect(username?.textContent?.trim()).toBe('Custom User');
    expect(email).toBeNull();
    expect(logoutButton).toBeNull();
  });

  it('does not render an empty user footer when all parts are hidden', () => {
    fixture.componentRef.setInput('showUserAvatar', false);
    fixture.componentRef.setInput('showUserName', false);
    fixture.componentRef.setInput('showUserEmail', false);
    fixture.componentRef.setInput('showLogoutButton', false);
    fixture.detectChanges();

    const userSection = fixture.nativeElement.querySelector(
      '.user-section',
    ) as HTMLElement | null;
    expect(userSection).toBeNull();
  });

  it('renders section menus with priority over fallback menu input', () => {
    fixture.componentRef.setInput('sections', [
      {
        title: 'Section A',
        icon: 'folder',
        items: [{ label: 'Item A' }],
      },
      {
        title: 'Section B',
        icon: 'layers',
        items: [{ label: 'Item B' }],
      },
    ]);
    fixture.detectChanges();

    let panelMenus = fixture.nativeElement.querySelectorAll(
      'magary-panelmenu',
    ) as NodeListOf<HTMLElement>;
    expect(panelMenus).toHaveLength(2);

    fixture.componentRef.setInput('sections', []);
    fixture.detectChanges();
    panelMenus = fixture.nativeElement.querySelectorAll(
      'magary-panelmenu',
    ) as NodeListOf<HTMLElement>;
    expect(panelMenus).toHaveLength(1);
  });

  it('closes mobile sidebar with close button action', () => {
    component.isMobileOpen.set(true);
    fixture.detectChanges();

    const closeButton = fixture.nativeElement.querySelector(
      '.close-button',
    ) as HTMLButtonElement;
    closeButton.click();
    fixture.detectChanges();

    expect(component.isMobileOpen()).toBe(false);
  });

  it('emits closeSidebar when mobile sidebar closes', () => {
    let closeEvents = 0;
    component.closeSidebar.subscribe(() => {
      closeEvents += 1;
    });

    component.isMobileOpen.set(true);
    fixture.detectChanges();

    component.closeMobileSidebar();
    fixture.detectChanges();

    expect(component.isMobileOpen()).toBe(false);
    expect(closeEvents).toBe(1);
  });

  it('provides accessible labels for icon-only controls', () => {
    fixture.componentRef.setInput('logoutLabel', 'Cerrar sesion');
    fixture.componentRef.setInput('expandButtonLabel', 'Expandir sidebar');
    fixture.componentRef.setInput('collapseButtonLabel', 'Colapsar sidebar');
    fixture.detectChanges();

    const hamburger = fixture.nativeElement.querySelector(
      '.hamburger-button',
    ) as HTMLButtonElement;
    const closeButton = fixture.nativeElement.querySelector(
      '.close-button',
    ) as HTMLButtonElement;
    const logoutButton = fixture.nativeElement.querySelector(
      '.logout-button',
    ) as HTMLButtonElement;

    expect(hamburger.getAttribute('aria-label')).toBe('Open sidebar navigation');
    expect(closeButton.getAttribute('aria-label')).toBe('Close sidebar');
    expect(logoutButton.getAttribute('aria-label')).toBe('Cerrar sesion');
    expect(hamburger.getAttribute('aria-controls')).toBe(component.sidebarId);
    expect(hamburger.getAttribute('aria-expanded')).toBe('false');

    fixture.componentRef.setInput('collapsible', true);
    component.isCollapsed.set(true);
    fixture.detectChanges();

    const expandToggle = fixture.nativeElement.querySelector(
      '.header-toggle.collapsed',
    ) as HTMLButtonElement;
    expect(expandToggle.getAttribute('aria-label')).toBe('Expandir sidebar');

    component.isCollapsed.set(false);
    fixture.detectChanges();

    const collapseToggle = fixture.nativeElement.querySelector(
      '.header-toggle.expanded',
    ) as HTMLButtonElement;
    expect(collapseToggle.getAttribute('aria-label')).toBe('Colapsar sidebar');
  });

  it('renders a brand link and configurable logo alt text', () => {
    fixture.componentRef.setInput('showLogo', true);
    fixture.componentRef.setInput('logoAlt', 'Magary Home');
    fixture.componentRef.setInput('brandRoute', '/home');
    fixture.detectChanges();

    const brandLink = fixture.nativeElement.querySelector(
      '.header-brand-link',
    ) as HTMLAnchorElement | null;
    const logo = fixture.nativeElement.querySelector(
      '.header-brand-link .logo',
    ) as HTMLImageElement | null;

    expect(brandLink).not.toBeNull();
    expect(logo?.getAttribute('alt')).toBe('Magary Home');
  });

  it('locks and restores body scroll when mobile sidebar opens/closes', () => {
    expect(document.body.style.overflow).toBe('');

    component.toggleMobileSidebar();
    fixture.detectChanges();
    expect(component.isMobileOpen()).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');

    component.closeMobileSidebar();
    fixture.detectChanges();
    expect(component.isMobileOpen()).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('closes with Escape only when closeOnEscape is enabled', () => {
    component.isMobileOpen.set(true);
    fixture.detectChanges();

    component.onEscapeKey({
      key: 'Escape',
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent);
    fixture.detectChanges();
    expect(component.isMobileOpen()).toBe(false);

    fixture.componentRef.setInput('closeOnEscape', false);
    component.isMobileOpen.set(true);
    fixture.detectChanges();

    const event = {
      key: 'Escape',
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent;
    component.onEscapeKey(event);
    fixture.detectChanges();

    expect(component.isMobileOpen()).toBe(true);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('renders complementary and navigation landmarks with labels', () => {
    const sidebar = fixture.nativeElement.querySelector('.sidebar') as HTMLElement;
    const nav = fixture.nativeElement.querySelector('.menu-container') as HTMLElement;

    expect(sidebar.tagName).toBe('ASIDE');
    expect(sidebar.getAttribute('role')).toBe('complementary');
    expect(sidebar.getAttribute('aria-label')).toBe('Primary navigation');
    expect(nav.tagName).toBe('NAV');
    expect(nav.getAttribute('aria-label')).toBe('Primary navigation');
  });

  it('cycles focus inside sidebar on Tab when mobile is open', () => {
    component.isMobileOpen.set(true);
    fixture.detectChanges();

    const sidebar = fixture.nativeElement.querySelector('.sidebar') as HTMLElement;
    const focusable = Array.from(
      sidebar.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), ' +
          'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => {
      const styles = getComputedStyle(element);
      return styles.visibility !== 'hidden' && styles.display !== 'none';
    });

    expect(focusable.length).toBeGreaterThan(1);
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];
    lastFocusable.focus();

    const tabEvent = {
      key: 'Tab',
      shiftKey: false,
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent;
    component.onSidebarKeydown(tabEvent);

    expect(document.activeElement).toBe(firstFocusable);
    expect(tabEvent.preventDefault).toHaveBeenCalled();
  });

  it('applies style classes and style objects by sidebar zone', () => {
    fixture.componentRef.setInput('rootStyleClass', 'custom-root');
    fixture.componentRef.setInput('rootStyle', { borderRadius: '18px' });
    fixture.componentRef.setInput('headerStyleClass', 'custom-header');
    fixture.componentRef.setInput('headerStyle', { minHeight: '72px' });
    fixture.componentRef.setInput('contentStyleClass', 'custom-content');
    fixture.componentRef.setInput('contentStyle', { paddingTop: '2rem' });
    fixture.componentRef.setInput('userSectionStyleClass', 'custom-user');
    fixture.componentRef.setInput('userSectionStyle', { marginTop: '2rem' });
    fixture.detectChanges();

    const sidebar = fixture.nativeElement.querySelector('.sidebar') as HTMLElement;
    const header = fixture.nativeElement.querySelector(
      '.sidebar-header',
    ) as HTMLElement;
    const content = fixture.nativeElement.querySelector(
      '.sidebar-content',
    ) as HTMLElement;
    const userSection = fixture.nativeElement.querySelector(
      '.user-section',
    ) as HTMLElement;

    expect(sidebar.classList.contains('custom-root')).toBe(true);
    expect(sidebar.style.borderRadius).toBe('18px');
    expect(header.classList.contains('custom-header')).toBe(true);
    expect(header.style.minHeight).toBe('72px');
    expect(content.classList.contains('custom-content')).toBe(true);
    expect(content.style.paddingTop).toBe('2rem');
    expect(userSection.classList.contains('custom-user')).toBe(true);
    expect(userSection.style.marginTop).toBe('2rem');
  });

  it('passes menu panel configuration through to the inner panel menu', () => {
    fixture.componentRef.setInput('menuPanelStyleClass', 'custom-panel');
    fixture.componentRef.setInput('menuPanelStyle', {
      '--panel-hover-text': '#112233',
    });
    fixture.componentRef.setInput('menuPanelBorderRadius', '12px');
    fixture.componentRef.setInput('menuPanelShadow', 4);
    fixture.componentRef.setInput('menuActiveIndicator', false);
    fixture.detectChanges();

    const panelMenu = fixture.debugElement.query(
      By.directive(MagaryPanelmenu),
    ).componentInstance as MagaryPanelmenu;

    expect(panelMenu.styleClass()).toContain('sidebar-panel-menu');
    expect(panelMenu.styleClass()).toContain('custom-panel');
    expect(panelMenu.style()).toEqual({ '--panel-hover-text': '#112233' });
    expect(panelMenu.borderRadius()).toBe('12px');
    expect(panelMenu.shadow()).toBe(4);
    expect(panelMenu.activeIndicator()).toBe(false);
  });

  it('forwards inner menu events in single-menu mode', () => {
    const panelMenu = fixture.debugElement.query(
      By.directive(MagaryPanelmenu),
    ).componentInstance as MagaryPanelmenu;
    let toggleEvent: unknown;
    let clickEvent: unknown;
    let expandEvent: unknown;

    component.menuToggle.subscribe((event) => {
      toggleEvent = event;
    });
    component.menuItemClick.subscribe((event) => {
      clickEvent = event;
    });
    component.menuItemExpand.subscribe((event) => {
      expandEvent = event;
    });

    panelMenu.menuToggle.emit({ isOpen: true, menuTitle: 'Menu' });
    panelMenu.itemClick.emit({
      item: menu[0],
      level: 0,
      path: ['Dashboard'],
    });
    panelMenu.itemExpand.emit({ item: menu[1], expanded: true });

    expect(toggleEvent).toMatchObject({ source: 'menu', isOpen: true });
    expect(clickEvent).toMatchObject({
      source: 'menu',
      level: 0,
      path: ['Dashboard'],
    });
    expect(expandEvent).toMatchObject({
      source: 'menu',
      expanded: true,
    });
  });

  it('forwards section context when a section panel emits events', () => {
    fixture.componentRef.setInput('sections', [
      {
        title: 'Section A',
        icon: 'folder',
        items: [{ label: 'Item A' }],
      },
    ]);
    fixture.componentRef.setInput('menu', []);
    fixture.detectChanges();

    const panelMenu = fixture.debugElement.query(
      By.directive(MagaryPanelmenu),
    ).componentInstance as MagaryPanelmenu;
    let toggleEvent: unknown;

    component.menuToggle.subscribe((event) => {
      toggleEvent = event;
    });

    panelMenu.menuToggle.emit({ isOpen: true, menuTitle: 'Section A' });

    expect(toggleEvent).toMatchObject({
      source: 'section',
      sectionTitle: 'Section A',
      isOpen: true,
    });
  });

  it('maps layout and title inputs to css variables and mode classes', () => {
    fixture.componentRef.setInput('layoutMode', 'rail');
    fixture.componentRef.setInput('titleColor', '#112233');
    fixture.componentRef.setInput('titleFontFamily', 'Poppins');
    fixture.componentRef.setInput('titleFontWeight', 700);
    fixture.componentRef.setInput('titleFontStyle', 'normal');
    fixture.componentRef.setInput('titleSize', '1.1rem');
    fixture.componentRef.setInput('sidebarWidth', '96px');
    fixture.componentRef.setInput('sidebarBorder', '1px solid #112233');
    fixture.componentRef.setInput('sidebarShadow', 'none');
    fixture.componentRef.setInput('sidebarBackground', '#ffffff');
    fixture.detectChanges();

    const sidebar = fixture.nativeElement.querySelector('.sidebar') as HTMLElement;
    const panelMenu = fixture.nativeElement.querySelector('.panel-menu') as HTMLElement;

    expect(sidebar.classList.contains('layout-rail')).toBe(true);
    expect(panelMenu.classList.contains('mode-rail-icons')).toBe(true);
    expect(sidebar.style.getPropertyValue('--sidebar-width').trim()).toBe('96px');
    expect(sidebar.style.getPropertyValue('--sidebar-border').trim()).toBe(
      '1px solid #112233',
    );
    expect(sidebar.style.getPropertyValue('--sidebar-bg').trim()).toBe('#ffffff');
    expect(sidebar.style.getPropertyValue('--sidebar-shadow').trim()).toBe('none');
    expect(sidebar.style.getPropertyValue('--sidebar-title-color').trim()).toBe(
      '#112233',
    );
    expect(
      sidebar.style.getPropertyValue('--sidebar-title-font-family').trim(),
    ).toBe('Poppins');
    expect(
      sidebar.style.getPropertyValue('--sidebar-title-font-weight').trim(),
    ).toBe('700');
    expect(
      sidebar.style.getPropertyValue('--sidebar-title-font-style').trim(),
    ).toBe('normal');
    expect(sidebar.style.getPropertyValue('--sidebar-title-size').trim()).toBe(
      '1.1rem',
    );
  });

  it('filters menu items using menuFilters and activeMenuFilter', () => {
    fixture.componentRef.setInput('sections', []);
    fixture.componentRef.setInput('menu', [
      { label: 'Home', icon: 'house', group: 'favorites' },
      { label: 'Apps', icon: 'package', group: 'apps' },
      { label: 'Shared', icon: 'users' },
    ]);
    fixture.componentRef.setInput('menuFilters', [
      { label: 'Favorites', value: 'favorites' },
      { label: 'Apps', value: 'apps' },
    ]);
    fixture.detectChanges();

    const panelMenu = fixture.debugElement.query(
      By.directive(MagaryPanelmenu),
    ).componentInstance as MagaryPanelmenu;
    panelMenu.isOpen.set(true);
    fixture.detectChanges();

    let menuText = (
      fixture.nativeElement.querySelector('.panel-items') as HTMLElement
    ).textContent;
    expect(menuText).toContain('Home');
    expect(menuText).toContain('Shared');
    expect(menuText).not.toContain('Apps');

    component.onMenuFilterChange('apps');
    fixture.detectChanges();

    const panelMenuAfterFilter = fixture.debugElement.query(
      By.directive(MagaryPanelmenu),
    ).componentInstance as MagaryPanelmenu;
    panelMenuAfterFilter.isOpen.set(true);
    fixture.detectChanges();

    menuText = (
      fixture.nativeElement.querySelector('.panel-items') as HTMLElement
    ).textContent;
    expect(menuText).toContain('Apps');
    expect(menuText).toContain('Shared');
    expect(menuText).not.toContain('Home');
  });

  it('renders premium projection slots and empty state actions', () => {
    const hostFixture = TestBed.createComponent(SidebarProjectionHost);
    hostFixture.detectChanges();

    const headerSlot = hostFixture.nativeElement.querySelector(
      '.slot-header-start',
    ) as HTMLElement | null;
    const emptyState = hostFixture.nativeElement.querySelector(
      '.menu-empty-state',
    ) as HTMLElement | null;
    const emptyAction = hostFixture.nativeElement.querySelector(
      '.empty-action',
    ) as HTMLButtonElement | null;
    const bottomSlot = hostFixture.nativeElement.querySelector(
      '.slot-content-bottom',
    ) as HTMLElement | null;

    expect(headerSlot?.textContent).toContain('Header Start');
    expect(emptyState).not.toBeNull();
    expect(emptyAction?.textContent).toContain('Create nav');
    expect(bottomSlot?.textContent).toContain('Bottom Slot');
  });
});
