import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MagarySegmented,
  MagarySegmentedValue,
} from './segmented';

describe('MagarySegmented behavior', () => {
  let fixture: ComponentFixture<MagarySegmented>;
  let component: MagarySegmented;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagarySegmented],
    }).compileComponents();

    fixture = TestBed.createComponent(MagarySegmented);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', ['es', 'en']);
    fixture.detectChanges();
  });

  it('renders options and selects by click', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.segment-option',
    ) as NodeListOf<HTMLButtonElement>;

    const emitted: MagarySegmentedValue[] = [];
    component.registerOnChange((value) => emitted.push(value));

    buttons[1].click();
    fixture.detectChanges();

    expect(component.value()).toBe('en');
    expect(emitted).toEqual(['en']);
    expect(buttons[1].classList.contains('selected')).toBe(true);
  });

  it('supports object options with optionLabel and optionValue', () => {
    fixture.componentRef.setInput('options', [
      { label: 'ES', value: 'es' },
      { label: 'EN', value: 'en' },
    ]);
    fixture.componentRef.setInput('optionLabel', 'label');
    fixture.componentRef.setInput('optionValue', 'value');
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      '.segment-option',
    ) as NodeListOf<HTMLButtonElement>;
    buttons[0].click();
    fixture.detectChanges();

    expect(buttons[0].textContent?.trim()).toBe('ES');
    expect(component.value()).toBe('es');
  });

  it('moves selection with keyboard arrows and wraps around', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.segment-option',
    ) as NodeListOf<HTMLButtonElement>;

    buttons[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    expect(component.value()).toBe('en');

    buttons[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    expect(component.value()).toBe('es');
  });

  it('respects disabled state from input and CVA', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      '.segment-option',
    ) as NodeListOf<HTMLButtonElement>;
    buttons[1].click();
    fixture.detectChanges();

    expect(component.value()).toBeNull();

    fixture.componentRef.setInput('disabled', false);
    component.setDisabledState(true);
    fixture.detectChanges();

    buttons[0].click();
    fixture.detectChanges();
    expect(component.value()).toBeNull();
  });

  it('sets roving tabindex based on selected option', () => {
    fixture.componentRef.setInput('options', ['es', 'en', 'pt']);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      '.segment-option',
    ) as NodeListOf<HTMLButtonElement>;
    expect(buttons[0].getAttribute('tabindex')).toBe('0');
    expect(buttons[1].getAttribute('tabindex')).toBe('-1');

    buttons[2].click();
    fixture.detectChanges();
    expect(buttons[2].getAttribute('tabindex')).toBe('0');
    expect(buttons[0].getAttribute('tabindex')).toBe('-1');
  });
});
