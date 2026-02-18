import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MagaryDialog } from './dialog';

describe('MagaryDialog behavior', () => {
  let fixture: ComponentFixture<MagaryDialog>;
  let component: MagaryDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryDialog],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.classList.remove('magary-overflow-hidden');
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
});
