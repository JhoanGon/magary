import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryBreadcrumb, BreadcrumbItem } from './breadcrumb';

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

describe('MagaryBreadcrumb', () => {
  let fixture: ComponentFixture<MagaryBreadcrumb>;
  let component: MagaryBreadcrumb;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryBreadcrumb],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryBreadcrumb);
    component = fixture.componentInstance;
  });

  function setModel(items: BreadcrumbItem[]) {
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
  }

  it('renders breadcrumb items from model', () => {
    setModel([
      { label: 'Home' },
      { label: 'Products' },
      { label: 'Details' },
    ]);

    const items = fixture.nativeElement.querySelectorAll('.magary-breadcrumb-item');
    expect(items.length).toBe(3);
    const texts = fixture.nativeElement.querySelectorAll('.magary-menuitem-text');
    expect(texts[0].textContent.trim()).toBe('Home');
    expect(texts[1].textContent.trim()).toBe('Products');
    expect(texts[2].textContent.trim()).toBe('Details');
  });

  it('renders chevrons between items', () => {
    setModel([
      { label: 'A' },
      { label: 'B' },
      { label: 'C' },
    ]);

    const chevrons = fixture.nativeElement.querySelectorAll('.magary-breadcrumb-chevron');
    expect(chevrons.length).toBeGreaterThanOrEqual(2);
  });

  it('renders home item when provided', () => {
    fixture.componentRef.setInput('home', { icon: 'star', label: 'Root' } as BreadcrumbItem);
    fixture.componentRef.setInput('model', [{ label: 'Page' }]);
    fixture.detectChanges();

    const homeItem = fixture.nativeElement.querySelector('.magary-breadcrumb-home');
    expect(homeItem).toBeTruthy();
  });

  it('does not render home item when not provided', () => {
    setModel([{ label: 'Page' }]);

    const homeItem = fixture.nativeElement.querySelector('.magary-breadcrumb-home');
    expect(homeItem).toBeFalsy();
  });

  it('emits onItemClick when an item is clicked', () => {
    const clickSpy = vi.fn();
    component.onItemClick.subscribe(clickSpy);

    setModel([
      { label: 'Home' },
      { label: 'Products' },
    ]);

    const links = fixture.nativeElement.querySelectorAll('.magary-breadcrumb-item .magary-menuitem-text');
    (links[0] as HTMLElement).click();
    fixture.detectChanges();

    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(clickSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        item: expect.objectContaining({ label: 'Home' }),
      }),
    );
  });

  it('does not emit onItemClick for disabled items', () => {
    const clickSpy = vi.fn();
    component.onItemClick.subscribe(clickSpy);

    setModel([
      { label: 'Home' },
      { label: 'Disabled', disabled: true },
    ]);

    const links = fixture.nativeElement.querySelectorAll('.magary-breadcrumb-item .magary-menuitem-text');
    (links[1] as HTMLElement).click();
    fixture.detectChanges();

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('executes command callback on item click', () => {
    const commandSpy = vi.fn();

    setModel([
      { label: 'Home' },
      { label: 'Action', command: commandSpy },
    ]);

    const links = fixture.nativeElement.querySelectorAll('.magary-breadcrumb-item .magary-menuitem-text');
    (links[1] as HTMLElement).click();
    fixture.detectChanges();

    expect(commandSpy).toHaveBeenCalledTimes(1);
  });

  it('applies disabled class to disabled items', () => {
    setModel([
      { label: 'Active' },
      { label: 'Disabled', disabled: true },
    ]);

    const items = fixture.nativeElement.querySelectorAll('.magary-breadcrumb-item');
    const spans = items[1].querySelectorAll('.magary-menuitem-text');
    expect(spans[0].classList.contains('magary-disabled')).toBe(true);
  });

  it('accepts styleClass and style inputs', () => {
    fixture.componentRef.setInput('styleClass', 'custom-bc');
    fixture.componentRef.setInput('style', { color: 'red' } as Record<string, string | number | null | undefined>);
    fixture.detectChanges();

    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.classList.contains('custom-bc')).toBe(true);
    expect(nav.style.color).toBe('red');
  });
});
