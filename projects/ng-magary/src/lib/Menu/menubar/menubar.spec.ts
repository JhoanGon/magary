import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryMenubar } from './menubar';
import { MenuItem } from '../api/menu.interface';

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

describe('MagaryMenubar', () => {
  let fixture: ComponentFixture<MagaryMenubar>;
  let component: MagaryMenubar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryMenubar],
      providers: [
        provideRouter([]),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryMenubar);
    component = fixture.componentInstance;
  });

  it('renders menu items from model', () => {
    fixture.componentRef.setInput('model', [
      { label: 'File' },
      { label: 'Edit' },
      { label: 'View' },
    ] as MenuItem[]);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.magary-menubar-root-list > .magary-menuitem');
    expect(items.length).toBe(3);
  });

  it('renders item labels', () => {
    fixture.componentRef.setInput('model', [
      { label: 'File' },
      { label: 'Edit' },
    ] as MenuItem[]);
    fixture.detectChanges();

    const texts = fixture.nativeElement.querySelectorAll('.magary-menuitem-text');
    expect(texts[0].textContent.trim()).toBe('File');
    expect(texts[1].textContent.trim()).toBe('Edit');
  });

  it('executes command on item click', () => {
    const commandSpy = vi.fn();
    fixture.componentRef.setInput('model', [
      { label: 'Action', command: commandSpy },
    ] as MenuItem[]);
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('.magary-menuitem-link') as HTMLElement;
    link.click();
    fixture.detectChanges();

    expect(commandSpy).toHaveBeenCalledTimes(1);
  });

  it('does not execute command for disabled items', () => {
    const commandSpy = vi.fn();
    fixture.componentRef.setInput('model', [
      { label: 'Blocked', disabled: true, command: commandSpy },
    ] as MenuItem[]);
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('.magary-menuitem-link') as HTMLElement;
    link.click();
    fixture.detectChanges();

    expect(commandSpy).not.toHaveBeenCalled();
  });

  it('toggles expansion for items with children', () => {
    const model: MenuItem[] = [
      { label: 'File', items: [{ label: 'New' }] },
    ];
    fixture.componentRef.setInput('model', model);
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('.magary-menuitem-link') as HTMLElement;
    link.click();
    fixture.detectChanges();

    expect(model[0].expanded).toBe(true);
  });

  it('applies styleClass', () => {
    fixture.componentRef.setInput('styleClass', 'custom-menubar');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.magary-menubar');
    expect(root.classList.contains('custom-menubar')).toBe(true);
  });

  it('applies disabled class to disabled items', () => {
    fixture.componentRef.setInput('model', [
      { label: 'OK' },
      { label: 'Disabled', disabled: true },
    ] as MenuItem[]);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('.magary-menuitem-link');
    expect(links[1].classList.contains('magary-disabled')).toBe(true);
  });

  it('renders chevron for items with children', () => {
    fixture.componentRef.setInput('model', [
      { label: 'Nested', items: [{ label: 'Sub' }] },
    ] as MenuItem[]);
    fixture.detectChanges();

    const subIcon = fixture.nativeElement.querySelector('.magary-submenu-icon');
    expect(subIcon).toBeTruthy();
  });
});

describe('MagaryMenubar routing behavior', () => {
  let component: MagaryMenubar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryMenubar],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(MagaryMenubar);
    component = fixture.componentInstance;
  });

  it('does not prevent default when route alias is provided', () => {
    const event = {
      preventDefault: vi.fn(),
    } as unknown as Event;

    const item: MenuItem = {
      label: 'Dashboard',
      route: '/dashboard',
    };

    component.onItemClick(event, item);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('binds internal route without fallback hash href', () => {
    const fixture = TestBed.createComponent(MagaryMenubar);
    fixture.componentRef.setInput('model', [
      { label: 'Dashboard', route: '/dashboard' },
    ] as MenuItem[]);
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelector(
      '.magary-menubar-root-list .magary-menuitem-link',
    ) as HTMLAnchorElement;

    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toContain('/dashboard');
    expect(anchor.getAttribute('href')).not.toBe('#');
  });
});
