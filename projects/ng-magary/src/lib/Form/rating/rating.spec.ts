import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryRating } from './rating';

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

describe('MagaryRating', () => {
  let fixture: ComponentFixture<MagaryRating>;
  let component: MagaryRating;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryRating],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryRating);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders 5 stars by default', () => {
    const stars = fixture.nativeElement.querySelectorAll('.magary-rating-item:not(.magary-rating-cancel)');
    expect(stars.length).toBe(5);
  });

  it('renders cancel button by default', () => {
    const cancelBtn = fixture.nativeElement.querySelector('.magary-rating-cancel');
    expect(cancelBtn).toBeTruthy();
  });

  it('hides cancel button when cancel input is false', () => {
    fixture.componentRef.setInput('cancel', false);
    fixture.detectChanges();

    const cancelBtn = fixture.nativeElement.querySelector('.magary-rating-cancel');
    expect(cancelBtn).toBeFalsy();
  });

  it('renders custom number of stars', () => {
    fixture.componentRef.setInput('stars', 3);
    fixture.detectChanges();

    const stars = fixture.nativeElement.querySelectorAll('.magary-rating-item:not(.magary-rating-cancel)');
    expect(stars.length).toBe(3);
  });

  it('sets value on star click and emits onRate', () => {
    const rateSpy = vi.fn();
    component.onRate.subscribe(rateSpy);

    const stars = fixture.nativeElement.querySelectorAll('.magary-rating-item:not(.magary-rating-cancel)');
    (stars[2] as HTMLElement).click();
    fixture.detectChanges();

    expect(component.value()).toBe(3);
    expect(rateSpy).toHaveBeenCalledTimes(1);
    expect(rateSpy).toHaveBeenCalledWith(
      expect.objectContaining({ value: 3 }),
    );
  });

  it('clears value on cancel click and emits onCancel', () => {
    const cancelSpy = vi.fn();
    component.onCancel.subscribe(cancelSpy);

    // Set a value first
    component.value.set(4);
    fixture.detectChanges();

    const cancelBtn = fixture.nativeElement.querySelector('.magary-rating-cancel') as HTMLElement;
    cancelBtn.click();
    fixture.detectChanges();

    expect(component.value()).toBeNull();
    expect(cancelSpy).toHaveBeenCalledTimes(1);
  });

  it('does not allow rating when readonly', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    component.value.set(2);
    fixture.detectChanges();

    const stars = fixture.nativeElement.querySelectorAll('.magary-rating-item:not(.magary-rating-cancel)');
    (stars[4] as HTMLElement).click();
    fixture.detectChanges();

    expect(component.value()).toBe(2);
  });

  it('does not allow rating when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    component.value.set(2);
    fixture.detectChanges();

    const stars = fixture.nativeElement.querySelectorAll('.magary-rating-item:not(.magary-rating-cancel)');
    (stars[4] as HTMLElement).click();
    fixture.detectChanges();

    expect(component.value()).toBe(2);
  });

  it('marks active stars based on value', () => {
    component.value.set(3);
    fixture.detectChanges();

    const stars = fixture.nativeElement.querySelectorAll('.magary-rating-item:not(.magary-rating-cancel)');
    expect(stars[0].classList.contains('magary-rating-item-active')).toBe(true);
    expect(stars[1].classList.contains('magary-rating-item-active')).toBe(true);
    expect(stars[2].classList.contains('magary-rating-item-active')).toBe(true);
    expect(stars[3].classList.contains('magary-rating-item-active')).toBe(false);
    expect(stars[4].classList.contains('magary-rating-item-active')).toBe(false);
  });

  it('has value writable via model signal', () => {
    component.value.set(4);
    expect(component.value()).toBe(4);

    component.value.set(null);
    expect(component.value()).toBeNull();
  });

  it('supports CVA writeValue', () => {
    component.writeValue(5);
    fixture.detectChanges();
    expect(component.value()).toBe(5);
  });
});
