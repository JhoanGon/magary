import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MenuItem } from '../api/menu.interface';
import { MagaryPanelmenu } from './panelmenu';

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

describe('MagaryPanelmenu behavior', () => {
  let fixture: ComponentFixture<MagaryPanelmenu>;
  let component: MagaryPanelmenu;

  const menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'house' },
    {
      label: 'Management',
      icon: 'users',
      children: [{ label: 'Users' }, { label: 'Teams', disabled: true }],
    },
    {
      label: 'Settings',
      icon: 'settings',
      children: [{ label: 'General' }],
    },
    { label: 'Disabled Item', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryPanelmenu],
      providers: [
        provideRouter([]),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryPanelmenu);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Main Menu');
    fixture.componentRef.setInput('items', menuItems);
    fixture.detectChanges();
  });

  const getHeader = () =>
    fixture.nativeElement.querySelector('.panel-header') as HTMLElement;

  it('toggles menu open state and emits menuToggle from header click', () => {
    const toggleEvents: Array<{ isOpen: boolean; menuTitle: string }> = [];
    component.menuToggle.subscribe((event) => toggleEvents.push(event));

    expect(component.isOpen()).toBe(false);

    getHeader().click();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(true);

    getHeader().click();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(false);

    expect(toggleEvents).toEqual([
      { isOpen: true, menuTitle: 'Main Menu' },
      { isOpen: false, menuTitle: 'Main Menu' },
    ]);
  });

  it('emits expandSidebar and skips menuToggle when collapsed', () => {
    fixture.componentRef.setInput('collapsed', true);
    fixture.detectChanges();

    let expandSidebarCalls = 0;
    const toggleEvents: Array<{ isOpen: boolean; menuTitle: string }> = [];
    component.expandSidebar.subscribe(() => {
      expandSidebarCalls += 1;
    });
    component.menuToggle.subscribe((event) => toggleEvents.push(event));

    getHeader().click();
    fixture.detectChanges();

    expect(expandSidebarCalls).toBe(1);
    expect(toggleEvents).toHaveLength(0);
    expect(component.isOpen()).toBe(true);
  });

  it('expands one category at a time when allowMultipleExpanded is false', () => {
    getHeader().click();
    fixture.detectChanges();

    const itemExpandEvents: Array<{ item: MenuItem; expanded: boolean }> = [];
    component.itemExpand.subscribe((event) => itemExpandEvents.push(event));

    const categoryItems = Array.from(
      fixture.nativeElement.querySelectorAll('.category-item'),
    ) as HTMLElement[];
    const management = categoryItems.find((item) =>
      item.textContent?.includes('Management'),
    ) as HTMLElement;
    const settings = categoryItems.find((item) =>
      item.textContent?.includes('Settings'),
    ) as HTMLElement;

    management.click();
    fixture.detectChanges();
    expect(component.isSubItemExpanded('Management')).toBe(true);
    expect(component.isSubItemExpanded('Settings')).toBe(false);

    settings.click();
    fixture.detectChanges();
    expect(component.isSubItemExpanded('Management')).toBe(false);
    expect(component.isSubItemExpanded('Settings')).toBe(true);
    expect(itemExpandEvents.map((event) => event.item.label)).toEqual([
      'Management',
      'Settings',
    ]);
  });

  it('emits itemClick with hierarchy path for active items', () => {
    getHeader().click();
    fixture.detectChanges();

    const clickEvents: Array<{ item: MenuItem; level: number; path: string[] }> =
      [];
    component.itemClick.subscribe((event) => clickEvents.push(event));

    const categoryItems = Array.from(
      fixture.nativeElement.querySelectorAll('.category-item'),
    ) as HTMLElement[];
    const management = categoryItems.find((item) =>
      item.textContent?.includes('Management'),
    ) as HTMLElement;
    management.click();
    fixture.detectChanges();

    const subItems = Array.from(
      fixture.nativeElement.querySelectorAll('.sub-items.expanded .menu-item-base'),
    ) as HTMLElement[];
    const users = subItems.find((item) =>
      item.textContent?.includes('Users'),
    ) as HTMLElement;
    users.click();
    fixture.detectChanges();

    expect(clickEvents).toHaveLength(1);
    expect(clickEvents[0]).toMatchObject({
      level: 1,
      path: ['Management', 'Users'],
    });
    expect(clickEvents[0].item.label).toBe('Users');
  });

  it('supports nested submenu data via items alias', () => {
    const aliasItems: MenuItem[] = [
      {
        label: 'Catalog',
        items: [{ label: 'Products' }],
      },
    ];

    fixture.componentRef.setInput('items', aliasItems);
    fixture.detectChanges();

    getHeader().click();
    fixture.detectChanges();

    const category = fixture.nativeElement.querySelector(
      '.category-item',
    ) as HTMLElement;
    expect(category.textContent).toContain('Catalog');

    category.click();
    fixture.detectChanges();

    const subItems = fixture.nativeElement.querySelectorAll(
      '.sub-items.expanded .menu-item-base',
    ) as NodeListOf<HTMLElement>;
    expect(subItems).toHaveLength(1);
    expect(subItems[0].textContent).toContain('Products');
  });

  it('renders anchor links when routerLink is provided', () => {
    const linkItems: MenuItem[] = [
      {
        label: 'Routed Item',
        routerLink: '/routed',
        queryParams: { mode: 'quick' },
      },
    ];

    fixture.componentRef.setInput('items', linkItems);
    fixture.detectChanges();

    getHeader().click();
    fixture.detectChanges();

    const rootAnchors = fixture.nativeElement.querySelectorAll(
      '.panel-items > .menu-item > a',
    ) as NodeListOf<HTMLAnchorElement>;
    expect(rootAnchors).toHaveLength(1);
    expect(rootAnchors[0].textContent).toContain('Routed Item');
  });

  it('blocks click events for disabled items', () => {
    getHeader().click();
    fixture.detectChanges();

    const clickEvents: Array<{ item: MenuItem; level: number; path: string[] }> =
      [];
    component.itemClick.subscribe((event) => clickEvents.push(event));

    const leafItems = Array.from(
      fixture.nativeElement.querySelectorAll('.menu-item-base'),
    ) as HTMLElement[];
    const disabledLeaf = leafItems.find((item) =>
      item.textContent?.includes('Disabled Item'),
    ) as HTMLElement;

    disabledLeaf.click();
    fixture.detectChanges();

    expect(clickEvents).toHaveLength(0);
  });
});

