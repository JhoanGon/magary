import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MagaryRadioButton } from './radio';
import { MagaryRadioGroup } from './radio-group';

@Component({
  standalone: true,
  imports: [MagaryRadioGroup, ReactiveFormsModule],
  template: `
    <span id="shipping-label">Shipping speed</span>
    <magary-radio-group
      [formControl]="control"
      [options]="options"
      name="shipping"
      inputId="shipping-choice"
      ariaLabelledby="shipping-label"
      ariaDescribedby="shipping-hint"
      errorMessage="Choose a shipping speed"
      helpText="Standard arrives in 3 to 5 days"
      optionLabel="label"
      optionValue="value"
      optionDisabled="disabled"
    ></magary-radio-group>
  `,
})
class RadioGroupReactiveHostComponent {
  readonly options = [
    { label: 'Standard', value: 'standard' },
    { label: 'Express', value: 'express', disabled: true },
  ];

  readonly control = new FormControl<string | null>(null, {
    validators: [Validators.required],
  });
}

describe('MagaryRadio behavior', () => {
  let fixture: ComponentFixture<MagaryRadioButton>;
  let component: MagaryRadioButton;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryRadioButton],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryRadioButton);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'city');
    fixture.componentRef.setInput('value', 'NY');
    fixture.componentRef.setInput('label', 'New York');
    fixture.detectChanges();
  });

  it('generates a usable input id and propagates selection through ControlValueAccessor', () => {
    const onChange = vi.fn<(value: unknown) => void>();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;

    component.registerOnChange(onChange);
    fixture.nativeElement.querySelector('.magary-radio-container').click();
    fixture.detectChanges();

    expect(input.id).toContain('magary-radio-');
    expect(label.getAttribute('for')).toBe(input.id);
    expect(input.checked).toBe(true);
    expect(onChange).toHaveBeenCalledWith('NY');
  });

  it('marks the radio as touched on confirmed interaction and blur', () => {
    const onTouched = vi.fn();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    component.registerOnTouched(onTouched);

    fixture.nativeElement.querySelector('.magary-radio-container').click();
    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(onTouched).toHaveBeenCalledTimes(1);
  });

  it('reflects Angular Forms invalid state, describedBy wiring, and disabled options inside radio-group', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [RadioGroupReactiveHostComponent],
    }).compileComponents();

    const hostFixture = TestBed.createComponent(RadioGroupReactiveHostComponent);
    hostFixture.detectChanges();

    const hostComponent = hostFixture.componentInstance;
    const group = hostFixture.nativeElement.querySelector(
      '.magary-radio-group',
    ) as HTMLElement;
    const inputs = hostFixture.nativeElement.querySelectorAll(
      'input[type="radio"]',
    ) as NodeListOf<HTMLInputElement>;

    expect(group.getAttribute('aria-labelledby')).toBe('shipping-label');
    expect(group.getAttribute('aria-describedby')).toContain('shipping-hint');
    expect(group.getAttribute('aria-describedby')).toContain('-help');
    expect(group.getAttribute('aria-invalid')).toBeNull();
    expect(inputs[0].id).toBe('shipping-choice-0');
    expect(inputs[1].disabled).toBe(true);

    inputs[0].dispatchEvent(new FocusEvent('focus'));
    inputs[0].dispatchEvent(new FocusEvent('blur'));
    hostFixture.detectChanges();

    expect(hostComponent.control.touched).toBe(true);
    expect(group.getAttribute('aria-invalid')).toBe('true');
    expect(group.getAttribute('aria-describedby')).toContain('shipping-hint');
    expect(group.getAttribute('aria-describedby')).toContain('-error');
    expect(
      hostFixture.nativeElement.querySelector('.error-message')?.textContent,
    ).toContain('Choose a shipping speed');

    inputs[0].click();
    hostFixture.detectChanges();

    expect(hostComponent.control.value).toBe('standard');
    expect(hostComponent.control.valid).toBe(true);
    expect(group.getAttribute('aria-invalid')).toBeNull();
    expect(hostFixture.nativeElement.querySelector('.error-message')).toBeNull();
    expect(group.getAttribute('aria-describedby')).toContain('-help');
  });
});
