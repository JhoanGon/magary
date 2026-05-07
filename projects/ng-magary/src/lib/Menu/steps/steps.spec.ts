import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagarySteps, StepsItem } from './steps';

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

describe('MagarySteps rendering', () => {
  let fixture: ComponentFixture<MagarySteps>;
  let component: MagarySteps;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagarySteps],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagarySteps);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('model', [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
    ]);
    fixture.componentRef.setInput('activeIndex', 0);
    fixture.detectChanges();
  });

  it('renders all step items', () => {
    const items = fixture.nativeElement.querySelectorAll('.magary-steps-item');
    expect(items).toHaveLength(3);
  });

  it('renders step numbers and labels', () => {
    const numbers = fixture.nativeElement.querySelectorAll('.magary-steps-number');
    const titles = fixture.nativeElement.querySelectorAll('.magary-steps-title');

    expect(numbers[0].textContent.trim()).toBe('1');
    expect(titles[0].textContent.trim()).toBe('Step 1');
    expect(numbers[1].textContent.trim()).toBe('2');
    expect(titles[1].textContent.trim()).toBe('Step 2');
    expect(numbers[2].textContent.trim()).toBe('3');
    expect(titles[2].textContent.trim()).toBe('Step 3');
  });

  it('highlights the active step', () => {
    const items = fixture.nativeElement.querySelectorAll('.magary-steps-item');
    expect(items[0].classList.contains('magary-steps-item-active')).toBe(true);
    expect(items[1].classList.contains('magary-steps-item-active')).toBe(false);
  });

  it('marks previous steps as visited', () => {
    fixture.componentRef.setInput('activeIndex', 2);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.magary-steps-item');
    expect(items[0].classList.contains('magary-steps-item-visited')).toBe(true);
    expect(items[1].classList.contains('magary-steps-item-visited')).toBe(true);
    expect(items[2].classList.contains('magary-steps-item-active')).toBe(true);
  });

  it('renders separators between steps but not after the last', () => {
    const separators = fixture.nativeElement.querySelectorAll(
      '.magary-steps-separator',
    );
    expect(separators).toHaveLength(2);
  });

  it('marks separators as active for completed steps', () => {
    fixture.componentRef.setInput('activeIndex', 2);
    fixture.detectChanges();

    const separators = fixture.nativeElement.querySelectorAll(
      '.magary-steps-separator',
    );
    expect(separators[0].classList.contains('magary-steps-separator-active')).toBe(true);
    expect(separators[1].classList.contains('magary-steps-separator-active')).toBe(true);
  });
});

describe('MagarySteps interaction', () => {
  let fixture: ComponentFixture<MagarySteps>;
  let component: MagarySteps;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagarySteps],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagarySteps);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('model', [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
    ]);
    fixture.componentRef.setInput('activeIndex', 0);
    fixture.componentRef.setInput('readonly', false);
    fixture.detectChanges();
  });

  it('emits activeIndexChange on step click', () => {
    const changeSpy = vi.fn();
    component.activeIndexChange.subscribe(changeSpy);

    const items = fixture.nativeElement.querySelectorAll('.magary-steps-item');
    (items[1] as HTMLElement).click();
    fixture.detectChanges();

    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledWith(1);
  });

  it('emits activeIndexChange even on currently active step', () => {
    const changeSpy = vi.fn();
    component.activeIndexChange.subscribe(changeSpy);

    const items = fixture.nativeElement.querySelectorAll('.magary-steps-item');
    (items[0] as HTMLElement).click();
    fixture.detectChanges();

    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledWith(0);
  });

  it('executes command callback on step click', () => {
    const commandSpy = vi.fn();

    fixture.componentRef.setInput('model', [
      { label: 'Step 1' },
      { label: 'Step 2', command: commandSpy },
    ]);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.magary-steps-item');
    (items[1] as HTMLElement).click();
    fixture.detectChanges();

    expect(commandSpy).toHaveBeenCalledTimes(1);
    expect(commandSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        item: expect.objectContaining({ label: 'Step 2' }),
        index: 1,
      }),
    );
  });

  it('does not allow clicking a disabled step', () => {
    const changeSpy = vi.fn();
    component.activeIndexChange.subscribe(changeSpy);

    fixture.componentRef.setInput('model', [
      { label: 'Step 1' },
      { label: 'Step 2', disabled: true },
    ]);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.magary-steps-item');
    expect(items[1].classList.contains('magary-steps-item-disabled')).toBe(true);

    (items[1] as HTMLElement).click();
    fixture.detectChanges();

    expect(changeSpy).not.toHaveBeenCalled();
  });
});

describe('MagarySteps readonly mode', () => {
  let fixture: ComponentFixture<MagarySteps>;
  let component: MagarySteps;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagarySteps],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagarySteps);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('model', [
      { label: 'Step 1' },
      { label: 'Step 2' },
    ]);
    fixture.componentRef.setInput('activeIndex', 0);
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
  });

  it('disables non-active steps in readonly mode', () => {
    const items = fixture.nativeElement.querySelectorAll('.magary-steps-item');
    expect(items[1].classList.contains('magary-steps-item-disabled')).toBe(true);
  });

  it('does not emit activeIndexChange on click in readonly mode', () => {
    const changeSpy = vi.fn();
    component.activeIndexChange.subscribe(changeSpy);

    const items = fixture.nativeElement.querySelectorAll('.magary-steps-item');
    (items[1] as HTMLElement).click();
    fixture.detectChanges();

    expect(changeSpy).not.toHaveBeenCalled();
  });
});

describe('MagarySteps styling', () => {
  let fixture: ComponentFixture<MagarySteps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagarySteps],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagarySteps);
    fixture.componentRef.setInput('model', [
      { label: 'A' },
      { label: 'B' },
      { label: 'C' },
    ]);
    fixture.componentRef.setInput('activeIndex', 0);
    fixture.componentRef.setInput('style', { border: '1px solid red' } as Record<string, string | number | null | undefined>);
    fixture.componentRef.setInput('styleClass', 'custom-steps');
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();
  });

  it('applies orientation class for vertical', () => {
    const root = fixture.nativeElement.querySelector('.magary-steps');
    expect(root.classList.contains('magary-steps-vertical')).toBe(true);
    expect(root.classList.contains('magary-steps-horizontal')).toBe(false);
  });

  it('applies custom styleClass', () => {
    const root = fixture.nativeElement.querySelector('.magary-steps');
    expect(root.classList.contains('custom-steps')).toBe(true);
  });

  it('applies inline style', () => {
    const root: HTMLElement = fixture.nativeElement.querySelector('.magary-steps');
    expect(root.style.border).toBe('1px solid red');
  });
});
