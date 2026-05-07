import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagarySlideMenu } from './slidemenu';
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

describe('MagarySlideMenu rendering', () => {
  let fixture: ComponentFixture<MagarySlideMenu>;
  let component: MagarySlideMenu;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagarySlideMenu],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagarySlideMenu);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('model', [
      { label: 'Electronics' },
      { label: 'Books', items: [{ label: 'Fiction' }, { label: 'Non-Fiction' }] },
      { label: 'Clothing' },
    ] as MenuItem[]);
    fixture.detectChanges();
  });

  it('renders root level menu items', () => {
    const items = fixture.nativeElement.querySelectorAll('.magary-slidemenu-list > .magary-menuitem');
    expect(items.length).toBe(3);
  });

  it('starts at index 0 with root items', () => {
    expect(component.currentIndex()).toBe(0);
    expect(component.viewStack().length).toBeGreaterThanOrEqual(1);
  });

  it('renders item labels', () => {
    const texts = fixture.nativeElement.querySelectorAll('.magary-menuitem-text');
    expect(texts[0].textContent.trim()).toBe('Electronics');
    expect(texts[1].textContent.trim()).toBe('Books');
    expect(texts[2].textContent.trim()).toBe('Clothing');
  });

  it('has submenu indicator for items with children', () => {
    expect(component.currentItems[1].items).toBeTruthy();
    expect(component.currentItems[1].items!.length).toBe(2);
  });

  it('navigates to submenu on item click', () => {
    const links = fixture.nativeElement.querySelectorAll('.magary-menuitem-link');
    (links[1] as HTMLElement).click();
    fixture.detectChanges();

    expect(component.currentIndex()).toBe(1);
    expect(component.currentItems.length).toBe(2);
    expect(component.currentItems[0].label).toBe('Fiction');
    expect(component.currentItems[1].label).toBe('Non-Fiction');
  });

  it('shows back button label in submenu state', () => {
    component.currentIndex.set(1);
    component.headerStack.set(['Main', 'Books']); // Simulate navigated state
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('.magary-slidemenu-header');
    expect(header).toBeTruthy();
  });

  it('navigates back with goBack()', () => {
    // Simulate navigation to submenu
    component.viewStack.set([
      [{ label: 'A' }, { label: 'B' }],
      [{ label: 'SubX' }],
    ] as MenuItem[][]);
    component.headerStack.set(['Main', 'Sub']);
    component.currentIndex.set(1);
    fixture.detectChanges();

    expect(component.currentIndex()).toBe(1);

    const header = fixture.nativeElement.querySelector('.magary-slidemenu-header') as HTMLElement;
    header.click();
    fixture.detectChanges();

    expect(component.currentIndex()).toBe(0);
    expect(component.currentItems.length).toBe(2);
  });

  it('does not toggle for disabled items', () => {
    fixture.componentRef.setInput('model', [
      { label: 'Blocked', disabled: true, items: [{ label: 'Sub' }] },
    ] as MenuItem[]);
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('.magary-menuitem-link') as HTMLElement;
    link.click();
    fixture.detectChanges();

    expect(component.currentIndex()).toBe(0);
  });

  it('executes command callback on item click', () => {
    const commandSpy = vi.fn();
    component.viewStack.set([
      [{ label: 'Action', command: commandSpy, url: '#' }],
    ] as MenuItem[][]);
    component.headerStack.set(['Main']);
    component.currentIndex.set(0);
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('.magary-menuitem-link') as HTMLElement;
    link.click();
    fixture.detectChanges();

    expect(commandSpy).toHaveBeenCalledTimes(1);
  });

  it('applies menuWidth and viewportHeight styles', () => {
    fixture.componentRef.setInput('menuWidth', 400);
    fixture.componentRef.setInput('viewportHeight', 500);
    fixture.detectChanges();

    const container: HTMLElement = fixture.nativeElement.querySelector('.magary-slidemenu');
    expect(container.style.width).toBe('400px');
    expect(container.style.height).toBe('500px');
  });

  it('applies styleClass', () => {
    fixture.componentRef.setInput('styleClass', 'custom-slide');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.magary-slidemenu');
    expect(root.classList.contains('custom-slide')).toBe(true);
  });

  it('renders item label as header when navigated to submenu', () => {
    // Simulate navigation to the Books submenu
    component.viewStack.set([
      [{ label: 'Electronics' }, { label: 'Books', items: [{ label: 'Fiction' }] }, { label: 'Clothing' }],
      [{ label: 'Fiction' }, { label: 'Non-Fiction' }],
    ] as MenuItem[][]);
    component.headerStack.set(['Main', 'Books']);
    component.currentIndex.set(1);
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('.magary-slidemenu-header');
    expect(header).toBeTruthy();
    expect(header.textContent).toContain('Books');
  });
});
