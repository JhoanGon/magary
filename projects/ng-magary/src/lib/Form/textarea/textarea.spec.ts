import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MagaryTextArea } from './textarea';

@Component({
  standalone: true,
  imports: [MagaryTextArea, ReactiveFormsModule],
  template: `
    <magary-textarea
      [formControl]="control"
      inputId="bio-field"
      ariaLabelledby="bio-label"
      ariaDescribedby="custom-hint"
      errorMessage="Bio is required"
      helpText="Tell us more about your role"
    ></magary-textarea>
  `,
})
class TextareaReactiveHostComponent {
  readonly control = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
}

describe('MagaryTextArea behavior', () => {
  let fixture: ComponentFixture<MagaryTextArea>;
  let component: MagaryTextArea;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryTextArea],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryTextArea);
    component = fixture.componentInstance;
  });

  it('keeps value written before first detectChanges', () => {
    component.writeValue('Initial text');
    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector(
      'textarea',
    ) as HTMLTextAreaElement;

    expect(component.value()).toBe('Initial text');
    expect(textarea.value).toBe('Initial text');
  });

  it('respects disabled state set via ControlValueAccessor', () => {
    fixture.detectChanges();
    component.setDisabledState?.(true);
    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector(
      'textarea',
    ) as HTMLTextAreaElement;

    expect(component.isDisabled()).toBe(true);
    expect(textarea.disabled).toBe(true);
  });

  it('marks the control as touched on blur and reflects Angular Forms validation state', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [TextareaReactiveHostComponent],
    }).compileComponents();

    const hostFixture = TestBed.createComponent(TextareaReactiveHostComponent);
    hostFixture.detectChanges();

    const hostComponent = hostFixture.componentInstance;
    const textarea = hostFixture.nativeElement.querySelector(
      'textarea',
    ) as HTMLTextAreaElement;

    expect(textarea.id).toBe('bio-field');
    expect(textarea.getAttribute('aria-labelledby')).toBe('bio-label');
    expect(textarea.getAttribute('aria-describedby')).toContain('custom-hint');
    expect(textarea.getAttribute('aria-describedby')).toContain('-help');
    expect(textarea.getAttribute('aria-invalid')).toBeNull();

    textarea.dispatchEvent(new FocusEvent('blur'));
    hostFixture.detectChanges();

    expect(hostComponent.control.touched).toBe(true);
    expect(textarea.getAttribute('aria-invalid')).toBe('true');
    expect(textarea.getAttribute('aria-describedby')).toContain('custom-hint');
    expect(textarea.getAttribute('aria-describedby')).toContain('-error');
    expect(
      hostFixture.nativeElement.querySelector('.error-message')?.textContent,
    ).toContain('Bio is required');

    textarea.value = 'Platform engineer';
    textarea.dispatchEvent(new Event('input'));
    hostFixture.detectChanges();

    expect(hostComponent.control.valid).toBe(true);
    expect(textarea.getAttribute('aria-invalid')).toBeNull();
    expect(hostFixture.nativeElement.querySelector('.error-message')).toBeNull();
    expect(textarea.getAttribute('aria-describedby')).toContain('-help');
    expect(
      hostFixture.nativeElement.querySelector('.help-message')?.textContent,
    ).toContain('Tell us more about your role');
  });
});
