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

describe('MagaryRadioButton CVA', () => {
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

  it('writeValue sets modelValue via CVA', () => {
    component.writeValue('NY');
    expect(component.modelValue()).toBe('NY');
  });

  it('select propagates value through registered onChange', () => {
    const onChange = vi.fn<(value: unknown) => void>();
    component.registerOnChange(onChange);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.magary-radio-container').click();
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith('NY');
  });

  it('label for attribute matches input id', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;

    expect(input.id).toContain('magary-radio-');
    expect(label.getAttribute('for')).toBe(input.id);
  });

  it('disabled state prevents input interaction', () => {
    const onChange = vi.fn<(value: unknown) => void>();
    component.registerOnChange(onChange);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    fixture.nativeElement.querySelector('.magary-radio-container').click();
    fixture.detectChanges();

    expect(input.disabled).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('setDisabledState from CVA disables the radio', () => {
    component.setDisabledState?.(true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.disabled).toBe(true);
    expect(component.isDisabled()).toBe(true);
  });

  it('marks the radio as touched on blur', () => {
    const onTouched = vi.fn();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    component.registerOnTouched(onTouched);
    fixture.detectChanges();

    input.dispatchEvent(new FocusEvent('focus'));
    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(onTouched).toHaveBeenCalledTimes(1);
  });
});

describe('MagaryRadioGroup with FormControl', () => {
  let hostFixture: ComponentFixture<RadioGroupReactiveHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupReactiveHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(RadioGroupReactiveHostComponent);
    hostFixture.detectChanges();
  });

  it('has aria-labelledby and aria-describedby with help text when valid', () => {
    const group = hostFixture.nativeElement.querySelector(
      '.magary-radio-group',
    ) as HTMLElement;

    expect(group.getAttribute('aria-labelledby')).toBe('shipping-label');
    expect(group.getAttribute('aria-describedby')).toContain('shipping-hint');
    expect(group.getAttribute('aria-describedby')).toContain('-help');
    expect(group.getAttribute('aria-invalid')).toBeNull();
  });

  it('displays error message when control is invalid and touched', () => {
    const group = hostFixture.nativeElement.querySelector(
      '.magary-radio-group',
    ) as HTMLElement;
    const inputs = hostFixture.nativeElement.querySelectorAll(
      'input[type="radio"]',
    ) as NodeListOf<HTMLInputElement>;

    inputs[0].dispatchEvent(new FocusEvent('focus'));
    inputs[0].dispatchEvent(new FocusEvent('blur'));
    hostFixture.detectChanges();

    expect(group.getAttribute('aria-invalid')).toBe('true');
    expect(group.getAttribute('aria-describedby')).toContain('-error');
    expect(
      hostFixture.nativeElement.querySelector('.error-message')?.textContent,
    ).toContain('Choose a shipping speed');
  });

  it('removes error message and aria-invalid when value becomes valid', () => {
    const group = hostFixture.nativeElement.querySelector(
      '.magary-radio-group',
    ) as HTMLElement;
    const inputs = hostFixture.nativeElement.querySelectorAll(
      'input[type="radio"]',
    ) as NodeListOf<HTMLInputElement>;

    // First make it invalid
    inputs[0].dispatchEvent(new FocusEvent('focus'));
    inputs[0].dispatchEvent(new FocusEvent('blur'));
    hostFixture.detectChanges();

    expect(group.getAttribute('aria-invalid')).toBe('true');

    // Then select a value
    inputs[0].click();
    hostFixture.detectChanges();

    expect(group.getAttribute('aria-invalid')).toBeNull();
    expect(hostFixture.nativeElement.querySelector('.error-message')).toBeNull();
  });

  it('restores help text and aria-describedby after validation passes', () => {
    const group = hostFixture.nativeElement.querySelector(
      '.magary-radio-group',
    ) as HTMLElement;
    const inputs = hostFixture.nativeElement.querySelectorAll(
      'input[type="radio"]',
    ) as NodeListOf<HTMLInputElement>;
    const hostComponent = hostFixture.componentInstance;

    // First make it invalid
    inputs[0].dispatchEvent(new FocusEvent('focus'));
    inputs[0].dispatchEvent(new FocusEvent('blur'));
    hostFixture.detectChanges();

    // Then select a value
    inputs[0].click();
    hostFixture.detectChanges();

    expect(hostComponent.control.value).toBe('standard');
    expect(hostComponent.control.valid).toBe(true);
    expect(group.getAttribute('aria-describedby')).toContain('-help');
  });

  it('disabled option cannot change control value', () => {
    const inputs = hostFixture.nativeElement.querySelectorAll(
      'input[type="radio"]',
    ) as NodeListOf<HTMLInputElement>;
    const hostComponent = hostFixture.componentInstance;

    expect(inputs[1].disabled).toBe(true);

    inputs[1].click();
    hostFixture.detectChanges();

    expect(hostComponent.control.value).toBeNull();
  });
});
