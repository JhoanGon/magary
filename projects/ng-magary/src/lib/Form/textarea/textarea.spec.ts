import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagaryTextArea } from './textarea';

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
});
