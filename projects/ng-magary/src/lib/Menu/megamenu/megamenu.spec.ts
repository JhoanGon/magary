import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryMegaMenu } from './megamenu';
import { MenuItem } from '../api/menu.interface';

const kebabCase = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .toLowerCase();

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, (typeof icons)[keyof typeof icons]>,
);

describe('MagaryMegaMenu rendering', () => {
  let fixture: ComponentFixture<MagaryMegaMenu>;
  let component: MagaryMegaMenu;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryMegaMenu],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryMegaMenu);
    component = fixture.componentInstance;
  });

  function setModel(items: MenuItem[]) {
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
  }

  it('renders root menu items from model', () => {
    setModel([
      { label: 'Products' },
      { label: 'Services' },
      { label: 'About' },
    ]);

    const rootItems = fixture.nativeElement.querySelectorAll('.magary-megamenu-root-list > .magary-menuitem');
    expect(rootItems.length).toBe(3);
    const texts = fixture.nativeElement.querySelectorAll('.magary-menuitem-text');
    expect(texts[0].textContent.trim()).toBe('Products');
  });

  it('renders submenu chevron for items with children', () => {
    setModel([
      { label: 'Products', items: [{ label: 'Sub A' }] },
    ]);

    const subIcon = fixture.nativeElement.querySelector('.magary-submenu-icon');
    expect(subIcon).toBeTruthy();
  });

  it('does not render submenu panel when not expanded', () => {
    setModel([
      { label: 'Products', items: [{ label: 'Sub A' }] },
    ]);

    const panel = fixture.nativeElement.querySelector('.magary-megamenu-panel');
    expect(panel).toBeFalsy();
  });

  it('toggles expansion on root item click', () => {
    const model: MenuItem[] = [
      { label: 'Products', items: [{ label: 'Sub A' }] },
    ];
    setModel(model);

    const rootLink = fixture.nativeElement.querySelector('.magary-menuitem-link') as HTMLElement;
    rootLink.click();
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('.magary-megamenu-panel');
    expect(panel).toBeTruthy();
    expect(model[0].expanded).toBe(true);
  });

  it('closes expansion on second click', () => {
    const model: MenuItem[] = [
      { label: 'Products', items: [{ label: 'Sub A' }] },
    ];
    setModel(model);

    const rootLink = fixture.nativeElement.querySelector('.magary-menuitem-link') as HTMLElement;
    rootLink.click();
    fixture.detectChanges();
    expect(model[0].expanded).toBe(true);

    rootLink.click();
    fixture.detectChanges();
    expect(model[0].expanded).toBe(false);
  });

  it('executes command callback on item click', () => {
    const commandSpy = vi.fn();
    setModel([
      { label: 'Action', command: commandSpy },
    ]);

    const link = fixture.nativeElement.querySelector('.magary-menuitem-link') as HTMLElement;
    link.click();
    fixture.detectChanges();

    expect(commandSpy).toHaveBeenCalledTimes(1);
  });

  it('does not execute command for disabled items', () => {
    const commandSpy = vi.fn();
    setModel([
      { label: 'Blocked', disabled: true, command: commandSpy },
    ]);

    const link = fixture.nativeElement.querySelector('.magary-menuitem-link') as HTMLElement;
    link.click();
    fixture.detectChanges();

    expect(commandSpy).not.toHaveBeenCalled();
  });

  it('applies orientation class', () => {
    setModel([{ label: 'Item' }]);

    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.magary-megamenu');
    expect(root.classList.contains('magary-megamenu-vertical')).toBe(true);
    expect(root.classList.contains('magary-megamenu-horizontal')).toBe(false);
  });

  it('default orientation is horizontal', () => {
    setModel([{ label: 'Item' }]);

    const root = fixture.nativeElement.querySelector('.magary-megamenu');
    expect(root.classList.contains('magary-megamenu-horizontal')).toBe(true);
  });

  it('applies custom styleClass', () => {
    fixture.componentRef.setInput('styleClass', 'my-mega');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.magary-megamenu');
    expect(root.classList.contains('my-mega')).toBe(true);
  });

  it('applies disabled class to disabled items', () => {
    setModel([
      { label: 'Disabled', disabled: true },
    ]);

    const link = fixture.nativeElement.querySelector('.magary-menuitem-link');
    expect(link.classList.contains('magary-disabled')).toBe(true);
  });

  it('renders icons for items that have them', () => {
    setModel([
      { label: 'With Icon', icon: 'star' },
    ]);

    const icon = fixture.nativeElement.querySelector('.magary-menuitem-icon');
    expect(icon).toBeTruthy();
  });
});
