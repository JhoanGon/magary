import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryTieredMenu } from './tiered-menu';
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

describe('MagaryTieredMenu', () => {
  let fixture: ComponentFixture<MagaryTieredMenu>;
  let component: MagaryTieredMenu;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryTieredMenu],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryTieredMenu);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('model', [
      { label: 'File' },
      { label: 'Edit' },
      { label: 'View' },
    ] as MenuItem[]);
    fixture.detectChanges();
  });

  it('renders root menu items from model', () => {
    const items = fixture.nativeElement.querySelectorAll('.magary-tieredmenu-root-list > .magary-menuitem');
    expect(items.length).toBe(3);
  });

  it('renders item labels', () => {
    const texts = fixture.nativeElement.querySelectorAll('.magary-menuitem-text');
    expect(texts[0].textContent.trim()).toBe('File');
    expect(texts[1].textContent.trim()).toBe('Edit');
    expect(texts[2].textContent.trim()).toBe('View');
  });

  it('starts hidden by default', () => {
    expect(component.visible()).toBe(false);
  });

  it('toggles visibility with toggle()', () => {
    const event = new Event('click');
    component.toggle(event);
    fixture.detectChanges();
    expect(component.visible()).toBe(true);

    component.toggle(event);
    fixture.detectChanges();
    expect(component.visible()).toBe(false);
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

  it('renders chevron for items with children', () => {
    fixture.componentRef.setInput('model', [
      { label: 'Nested', items: [{ label: 'Sub' }] },
    ] as MenuItem[]);
    fixture.detectChanges();

    const subIcon = fixture.nativeElement.querySelector('.magary-submenu-icon');
    expect(subIcon).toBeTruthy();
  });

  it('applies styleClass', () => {
    fixture.componentRef.setInput('styleClass', 'custom-tiered');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.magary-tieredmenu');
    expect(root.classList.contains('custom-tiered')).toBe(true);
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

  it('popup input controls popup CSS class', () => {
    fixture.componentRef.setInput('popup', true);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.magary-tieredmenu');
    expect(root.classList.contains('magary-tieredmenu-popup')).toBe(true);
  });
});
