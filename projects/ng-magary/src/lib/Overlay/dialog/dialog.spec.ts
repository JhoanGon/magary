import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryDialog } from './dialog';

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
  {} as Record<string, any>,
);

describe('MagaryDialog behavior', () => {
  let fixture: ComponentFixture<MagaryDialog>;
  let component: MagaryDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryDialog],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.classList.remove('magary-overflow-hidden');
    document.body.classList.remove('magary-dragging');
    document.body.classList.remove('magary-resizing');
    fixture.destroy();
  });

  it('blocks and unblocks body scroll based on visibility', () => {
    component.visible.set(true);
    fixture.detectChanges();
    expect(document.body.classList.contains('magary-overflow-hidden')).toBe(
      true,
    );

    component.visible.set(false);
    fixture.detectChanges();
    expect(document.body.classList.contains('magary-overflow-hidden')).toBe(
      false,
    );
  });

  it('closes on mask click when dismissableMask is enabled', () => {
    fixture.componentRef.setInput('dismissableMask', true);
    component.visible.set(true);
    fixture.detectChanges();

    const mask = fixture.nativeElement.querySelector(
      '.magary-dialog-mask',
    ) as HTMLDivElement | null;
    expect(mask).toBeTruthy();

    mask?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
  });

  it('does not close on mask click when dismissableMask is disabled', () => {
    fixture.componentRef.setInput('dismissableMask', false);
    component.visible.set(true);
    fixture.detectChanges();

    const mask = fixture.nativeElement.querySelector(
      '.magary-dialog-mask',
    ) as HTMLDivElement | null;
    expect(mask).toBeTruthy();

    mask?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(component.visible()).toBe(true);
  });

  it('toggles maximized state only when maximizable is enabled', () => {
    const eventWithoutMaximize = {
      preventDefault: vi.fn(),
    } as unknown as Event;

    component.maximize(eventWithoutMaximize);
    expect(component.maximized()).toBe(false);
    expect(eventWithoutMaximize.preventDefault).not.toHaveBeenCalled();

    fixture.componentRef.setInput('maximizable', true);
    fixture.detectChanges();

    const eventWithMaximize = {
      preventDefault: vi.fn(),
    } as unknown as Event;

    component.maximize(eventWithMaximize);
    expect(component.maximized()).toBe(true);
    expect(eventWithMaximize.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('close() updates visibility and prevents default event behavior', () => {
    component.visible.set(true);

    const closeEvent = {
      preventDefault: vi.fn(),
    } as unknown as Event;

    component.close(closeEvent);

    expect(component.visible()).toBe(false);
    expect(closeEvent.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('closes on Escape when closeOnEscape is enabled', () => {
    fixture.componentRef.setInput('closeOnEscape', true);
    component.visible.set(true);
    fixture.detectChanges();

    const event = {
      key: 'Escape',
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent;

    component.onEscapeKey(event);

    expect(component.visible()).toBe(false);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('does not close on Escape when closeOnEscape is disabled', () => {
    fixture.componentRef.setInput('closeOnEscape', false);
    component.visible.set(true);
    fixture.detectChanges();

    const event = {
      key: 'Escape',
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent;

    component.onEscapeKey(event);

    expect(component.visible()).toBe(true);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('supports drag interactions through pointer events', () => {
    fixture.componentRef.setInput('header', 'Drag me');
    component.visible.set(true);
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector(
      '.magary-dialog-header',
    ) as HTMLElement;

    const pointerDown = {
      pointerId: 1,
      pointerType: 'touch',
      isPrimary: true,
      button: 0,
      clientX: 120,
      clientY: 100,
      target: header,
      currentTarget: header,
      preventDefault: vi.fn(),
    } as unknown as PointerEvent;

    component.initDrag(pointerDown);

    expect(component.dragging()).toBe(true);
    expect(pointerDown.preventDefault).toHaveBeenCalledTimes(1);

    component.endDrag({ pointerId: 1 } as PointerEvent);
    expect(component.dragging()).toBe(false);
  });

  it('supports resize interactions through pointer events', () => {
    fixture.componentRef.setInput('resizable', true);
    component.visible.set(true);
    fixture.detectChanges();

    const resizer = fixture.nativeElement.querySelector(
      '.magary-dialog-resizer',
    ) as HTMLElement;

    const pointerDown = {
      pointerId: 2,
      pointerType: 'touch',
      isPrimary: true,
      button: 0,
      clientX: 200,
      clientY: 180,
      target: resizer,
      currentTarget: resizer,
      preventDefault: vi.fn(),
    } as unknown as PointerEvent;

    component.initResize(pointerDown);

    expect(component.resizing()).toBe(true);
    expect(pointerDown.preventDefault).toHaveBeenCalledTimes(1);

    component.endResize({ pointerId: 2 } as PointerEvent);
    expect(component.resizing()).toBe(false);
  });
});
