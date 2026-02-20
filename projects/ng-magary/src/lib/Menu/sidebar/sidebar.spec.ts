import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MenuItem } from '../api/menu.interface';
import { Sidebar } from './sidebar';

const kebabCase = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, any>,
);

describe('Sidebar behavior', () => {
  let fixture: ComponentFixture<Sidebar>;
  let component: Sidebar;

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
      imports: [Sidebar],
      providers: [
        provideRouter([]),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('showLogo', false);
    fixture.componentRef.setInput('showUserSection', true);
    fixture.componentRef.setInput('menu', menu);
    fixture.detectChanges();
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
    const hamburger = fixture.nativeElement.querySelector(
      '.hamburger-button',
    ) as HTMLButtonElement;
    const closeButton = fixture.nativeElement.querySelector(
      '.close-button',
    ) as HTMLButtonElement;
    const logoutButton = fixture.nativeElement.querySelector(
      '.logout-button',
    ) as HTMLButtonElement;

    expect(hamburger.getAttribute('aria-label')).toBe('Abrir menu lateral');
    expect(closeButton.getAttribute('aria-label')).toBe('Cerrar sidebar');
    expect(logoutButton.getAttribute('aria-label')).toBe('Cerrar sesion');

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
});
