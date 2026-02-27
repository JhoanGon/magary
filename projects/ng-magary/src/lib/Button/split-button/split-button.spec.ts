import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MenuItem } from '../../Menu/api/menu.interface';
import { MagarySplitButton } from './split-button';

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

describe('MagarySplitButton behavior', () => {
  let fixture: ComponentFixture<MagarySplitButton>;
  let component: MagarySplitButton;
  let commandCalls: number;
  let items: MenuItem[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagarySplitButton],
      providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
    }).compileComponents();

    fixture = TestBed.createComponent(MagarySplitButton);
    component = fixture.componentInstance;

    commandCalls = 0;
    items = [
      {
        label: 'Save draft',
        icon: 'save',
        command: () => {
          commandCalls += 1;
        },
      },
      {
        label: 'Publish',
        icon: 'send',
      },
      {
        label: 'Archived',
        icon: 'archive',
        disabled: true,
      },
    ];

    fixture.componentRef.setInput('label', 'Actions');
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
  });

  it('opens and closes menu from trigger and emits dropdown click', () => {
    const dropdownEvents: MouseEvent[] = [];
    component.onDropdownClick.subscribe((event) => dropdownEvents.push(event));

    const trigger = fixture.nativeElement.querySelector(
      '.dropdown-trigger',
    ) as HTMLButtonElement;

    trigger.click();
    fixture.detectChanges();

    expect(component.isOpen()).toBe(true);
    expect(fixture.nativeElement.querySelector('.split-button-menu')).toBeTruthy();

    trigger.click();
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
    expect(dropdownEvents).toHaveLength(2);
  });

  it('executes command and closes menu after selecting an enabled item', () => {
    const trigger = fixture.nativeElement.querySelector(
      '.dropdown-trigger',
    ) as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    const firstMenuItem = fixture.nativeElement.querySelectorAll(
      '.menu-item-button',
    )[0] as HTMLButtonElement;
    firstMenuItem.click();
    fixture.detectChanges();

    expect(commandCalls).toBe(1);
    expect(component.isOpen()).toBe(false);
  });

  it('supports keyboard navigation and closes with Escape', async () => {
    const trigger = fixture.nativeElement.querySelector(
      '.dropdown-trigger',
    ) as HTMLButtonElement;

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 0);
    });
    fixture.detectChanges();

    const menuButtons = fixture.nativeElement.querySelectorAll(
      '.menu-item-button',
    ) as NodeListOf<HTMLButtonElement>;

    expect(component.isOpen()).toBe(true);
    expect(document.activeElement).toBe(menuButtons[0]);

    menuButtons[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown' }),
    );
    fixture.detectChanges();
    expect(document.activeElement).toBe(menuButtons[1]);

    menuButtons[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });

  it('applies custom background and text colors through CSS variables', () => {
    fixture.componentRef.setInput('backgroundColor', '#0f766e');
    fixture.componentRef.setInput('textColor', '#ecfeff');
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector(
      '.magary-split-button',
    ) as HTMLElement;

    expect(host.style.getPropertyValue('--split-button-bg')).toBe('#0f766e');
    expect(host.style.getPropertyValue('--split-button-text')).toBe('#ecfeff');
  });
});

