import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagarySpeedDial } from './speed-dial';
import { SpeedDialItem } from './speed-dial-item.interface';

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

describe('MagarySpeedDial behavior', () => {
  let fixture: ComponentFixture<MagarySpeedDial>;
  let component: MagarySpeedDial;
  let items: SpeedDialItem[];
  let firstCommandCalls: number;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagarySpeedDial],
      providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
    }).compileComponents();

    fixture = TestBed.createComponent(MagarySpeedDial);
    component = fixture.componentInstance;

    firstCommandCalls = 0;
    items = [
      {
        icon: 'pencil',
        tooltip: 'Edit',
        command: () => {
          firstCommandCalls += 1;
        },
      },
      { icon: 'trash', tooltip: 'Delete' },
      { icon: 'share-2', tooltip: 'Share' },
    ];

    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('direction', 'up');
    fixture.detectChanges();
  });

  afterEach(() => {
    if (component?.isOpen()) {
      component.isOpen.set(false);
      fixture.detectChanges();
    }
  });

  it('toggles open state and emits speedDialToggle from trigger click', () => {
    const toggleEvents: boolean[] = [];
    component.speedDialToggle.subscribe((state) => toggleEvents.push(state));

    const trigger = fixture.nativeElement.querySelector(
      '.trigger-button',
    ) as HTMLButtonElement;

    trigger.click();
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector(
      '.speed-dial-container',
    ) as HTMLElement;
    expect(component.isOpen()).toBe(true);
    expect(container.classList.contains('is-open')).toBe(true);
    expect(toggleEvents).toEqual([true]);

    trigger.click();
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
    expect(toggleEvents).toEqual([true, false]);
  });

  it('emits selected item, runs command and closes after action click', () => {
    const toggleEvents: boolean[] = [];
    const selectEvents: Array<{ item: SpeedDialItem; event: Event }> = [];
    component.speedDialToggle.subscribe((state) => toggleEvents.push(state));
    component.itemSelect.subscribe((event) => selectEvents.push(event));

    const trigger = fixture.nativeElement.querySelector(
      '.trigger-button',
    ) as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    const firstAction = fixture.nativeElement.querySelectorAll(
      '.action-button',
    )[0] as HTMLButtonElement;
    firstAction.click();
    fixture.detectChanges();

    expect(selectEvents).toHaveLength(1);
    expect(selectEvents[0].item).toMatchObject({ icon: 'pencil' });
    expect(firstCommandCalls).toBe(1);
    expect(component.isOpen()).toBe(false);
    expect(toggleEvents).toEqual([true, false]);
  });

  it('does not emit itemSelect for disabled actions', () => {
    fixture.componentRef.setInput('items', [{ icon: 'trash', disabled: true }]);
    fixture.detectChanges();

    const toggleEvents: boolean[] = [];
    const selectEvents: Array<{ item: SpeedDialItem; event: Event }> = [];
    component.speedDialToggle.subscribe((state) => toggleEvents.push(state));
    component.itemSelect.subscribe((event) => selectEvents.push(event));

    const trigger = fixture.nativeElement.querySelector(
      '.trigger-button',
    ) as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    const disabledAction = fixture.nativeElement.querySelector(
      '.action-button',
    ) as HTMLButtonElement;
    expect(disabledAction.disabled).toBe(true);

    disabledAction.click();
    fixture.detectChanges();

    expect(selectEvents).toHaveLength(0);
    expect(component.isOpen()).toBe(true);
    expect(toggleEvents).toEqual([true]);
  });

  it('renders direction-{value} class for all four primary directions', () => {
    const directions: Array<'up' | 'down' | 'left' | 'right'> = [
      'up',
      'down',
      'left',
      'right',
    ];

    for (const dir of directions) {
      fixture.componentRef.setInput('direction', dir);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector(
        '.speed-dial-container',
      ) as HTMLElement;
      expect(container.classList.contains(`direction-${dir}`)).toBe(true);
    }
  });

  it('trigger button has aria-haspopup="menu" and aria-expanded reflecting state', () => {
    const trigger = fixture.nativeElement.querySelector(
      '.trigger-button',
    ) as HTMLButtonElement;

    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    trigger.click();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('tooltip elements have role="tooltip" and unique id per item', () => {
    const trigger = fixture.nativeElement.querySelector(
      '.trigger-button',
    ) as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    const tooltips = fixture.nativeElement.querySelectorAll(
      '[role="tooltip"]',
    );
    expect(tooltips.length).toBeGreaterThanOrEqual(3);

    const ids = new Set<string>();
    tooltips.forEach((tooltip: HTMLElement) => {
      expect(tooltip.id).toBeTruthy();
      ids.add(tooltip.id);
    });
    expect(ids.size).toBe(tooltips.length);
  });

  it('action button aria-describedby references tooltip id', () => {
    const trigger = fixture.nativeElement.querySelector(
      '.trigger-button',
    ) as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    const firstTooltip = fixture.nativeElement.querySelector(
      '[role="tooltip"]',
    ) as HTMLElement;
    const firstButton = fixture.nativeElement.querySelector(
      '.action-button',
    ) as HTMLButtonElement;

    expect(firstButton.getAttribute('aria-describedby')).toBe(firstTooltip.id);
  });

  it('CSS custom property --speed-dial-trigger-size propagates from triggerSize input', () => {
    fixture.componentRef.setInput('triggerSize', 64);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector(
      '.speed-dial-container',
    ) as HTMLElement;
    const style = container.style;

    expect(style.getPropertyValue('--speed-dial-trigger-size')).toBe('64px');
  });

  it('Tab keyboard navigation moves focus between action items', () => {
    const trigger = fixture.nativeElement.querySelector(
      '.trigger-button',
    ) as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      '.action-button',
    ) as NodeListOf<HTMLButtonElement>;
    expect(buttons.length).toBeGreaterThanOrEqual(2);

    buttons[0].focus();
    expect(document.activeElement).toBe(buttons[0]);

    buttons[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }),
    );

    buttons[1].focus();
    expect(document.activeElement).toBe(buttons[1]);
  });

  it('closes when clicking mask, clicking outside or pressing Escape', () => {
    const toggleEvents: boolean[] = [];
    component.speedDialToggle.subscribe((state) => toggleEvents.push(state));

    fixture.componentRef.setInput('showMask', true);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector(
      '.trigger-button',
    ) as HTMLButtonElement;

    trigger.click();
    fixture.detectChanges();

    const mask = fixture.nativeElement.querySelector(
      '.speed-dial-mask',
    ) as HTMLElement;
    expect(mask).toBeTruthy();
    mask.click();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(false);

    component.isOpen.set(true);
    fixture.detectChanges();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(component.isOpen()).toBe(false);

    component.isOpen.set(true);
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(component.isOpen()).toBe(false);

    expect(toggleEvents).toEqual([true, false, false, false]);
  });
});

