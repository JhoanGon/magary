import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MagaryCheckbox } from './checkbox';

@Component({
  standalone: true,
  imports: [MagaryCheckbox, ReactiveFormsModule],
  template: `
    <magary-checkbox
      [formControl]="control"
      label="Accept terms"
      errorMessage="You must accept the terms"
      helpText="Required to continue"
    ></magary-checkbox>
  `,
})
class CheckboxReactiveHostComponent {
  readonly control = new FormControl(false, {
    nonNullable: true,
    validators: [Validators.requiredTrue],
  });
}

describe('MagaryCheckbox behavior', () => {
  let fixture: ComponentFixture<MagaryCheckbox>;
  let component: MagaryCheckbox;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryCheckbox],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('writes incoming values and propagates toggles through ControlValueAccessor', () => {
    const onChange = vi.fn<(value: boolean) => void>();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    component.registerOnChange(onChange);
    component.writeValue(true);
    fixture.detectChanges();

    expect(input.checked).toBe(true);

    input.checked = false;
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith(false);
    expect(component.checked()).toBe(false);
  });

  it('marks the control as touched on toggle and blur', () => {
    const onTouched = vi.fn();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    component.registerOnTouched(onTouched);

    input.checked = true;
    input.dispatchEvent(new Event('change'));
    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(onTouched).toHaveBeenCalledTimes(1);
  });

  it('combines disabled input and ControlValueAccessor disabled state', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    component.setDisabledState(true);
    fixture.detectChanges();
    expect(input.disabled).toBe(true);

    component.setDisabledState(false);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(input.disabled).toBe(true);

    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();
    expect(input.disabled).toBe(false);
  });

  it('reflects Angular Forms invalid state and restores help text when valid', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [CheckboxReactiveHostComponent],
    }).compileComponents();

    const hostFixture = TestBed.createComponent(CheckboxReactiveHostComponent);
    hostFixture.detectChanges();

    const hostComponent = hostFixture.componentInstance;
    const input = hostFixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.getAttribute('aria-invalid')).toBeNull();
    expect(input.getAttribute('aria-describedby')).toContain('-help');

    input.dispatchEvent(new FocusEvent('blur'));
    hostFixture.detectChanges();

    expect(hostComponent.control.touched).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(
      hostFixture.nativeElement.querySelector('.error-message')?.textContent,
    ).toContain('You must accept the terms');

    input.checked = true;
    input.dispatchEvent(new Event('change'));
    hostFixture.detectChanges();

    expect(hostComponent.control.valid).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBeNull();
    expect(hostFixture.nativeElement.querySelector('.error-message')).toBeNull();
    expect(
      hostFixture.nativeElement.querySelector('.help-message')?.textContent,
    ).toContain('Required to continue');
  });
});
