import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryContextMenu } from './context-menu';
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

describe('MagaryContextMenu rendering', () => {
  let fixture: ComponentFixture<MagaryContextMenu>;
  let component: MagaryContextMenu;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryContextMenu],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryContextMenu);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('model', [
      { label: 'View' },
      { label: 'Edit' },
      { label: 'Delete' },
    ] as MenuItem[]);
    fixture.detectChanges();
  });

  it('starts hidden by default', () => {
    expect(component.visible()).toBe(false);
    const container = fixture.nativeElement.querySelector('.magary-contextmenu');
    expect(container.classList.contains('magary-contextmenu-visible')).toBe(false);
  });

  it('shows on show() call with position', () => {
    component.show(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 }));
    fixture.detectChanges();

    expect(component.visible()).toBe(true);
    expect(component.x()).toBeGreaterThanOrEqual(0);
    expect(component.y()).toBeGreaterThanOrEqual(0);
    const container = fixture.nativeElement.querySelector('.magary-contextmenu');
    expect(container.classList.contains('magary-contextmenu-visible')).toBe(true);
  });

  it('hides on hide() call', () => {
    component.show(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 }));
    fixture.detectChanges();
    expect(component.visible()).toBe(true);

    component.hide();
    fixture.detectChanges();
    expect(component.visible()).toBe(false);
  });

  it('renders menu items when visible', () => {
    component.show(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 }));
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.magary-contextmenu-root-list > .magary-menuitem');
    expect(items.length).toBe(3);
  });

  it('applies position via left and top styles', () => {
    component.show(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 }));
    fixture.detectChanges();

    const container: HTMLElement = fixture.nativeElement.querySelector('.magary-contextmenu');
    expect(container.style.left).toBeTruthy();
    expect(container.style.top).toBeTruthy();
  });

  it('executes command on item click and hides', () => {
    const commandSpy = vi.fn();
    fixture.componentRef.setInput('model', [
      { label: 'Action', command: commandSpy },
    ] as MenuItem[]);
    component.show(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 }));
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
    component.show(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 }));
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('.magary-menuitem-link') as HTMLElement;
    link.click();
    fixture.detectChanges();

    expect(commandSpy).not.toHaveBeenCalled();
  });

  it('renders icons for items that have them', () => {
    fixture.componentRef.setInput('model', [
      { label: 'Star', icon: 'star' },
    ] as MenuItem[]);
    component.show(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 }));
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('.magary-menuitem-icon');
    expect(icon).toBeTruthy();
  });

  it('renders submenu chevron for items with children', () => {
    fixture.componentRef.setInput('model', [
      { label: 'Nested', items: [{ label: 'Sub' }] },
    ] as MenuItem[]);
    component.show(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 }));
    fixture.detectChanges();

    const subIcon = fixture.nativeElement.querySelector('.magary-submenu-icon');
    expect(subIcon).toBeTruthy();
  });

  it('toggles submenu expansion on item click', () => {
    const model: MenuItem[] = [
      { label: 'Nested', items: [{ label: 'Sub' }] },
    ];
    fixture.componentRef.setInput('model', model);
    component.show(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 }));
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('.magary-menuitem-link') as HTMLElement;
    link.click();
    fixture.detectChanges();

    expect(model[0].expanded).toBe(true);

    link.click();
    fixture.detectChanges();
    expect(model[0].expanded).toBe(false);
  });

  it('applies styleClass', () => {
    fixture.componentRef.setInput('styleClass', 'custom-ctx');
    component.show(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 }));
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.magary-contextmenu');
    expect(container.classList.contains('custom-ctx')).toBe(true);
  });

  it('applies disabled class to disabled items', () => {
    fixture.componentRef.setInput('model', [
      { label: 'OK' },
      { label: 'Disabled', disabled: true },
    ] as MenuItem[]);
    component.show(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 }));
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.magary-menuitem');
    expect(items[1].classList.contains('magary-disabled')).toBe(true);
  });
});
