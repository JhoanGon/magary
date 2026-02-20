import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryCarouselComponent } from './carousel';

const kebabCase = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, any>,
);

describe('MagaryCarouselComponent', () => {
  let fixture: ComponentFixture<MagaryCarouselComponent<any>>;
  let component: MagaryCarouselComponent<any>;

  const items = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryCarouselComponent],
      providers: [
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryCarouselComponent<any>);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', items);
    fixture.componentRef.setInput('numVisible', 3);
    fixture.componentRef.setInput('numScroll', 1);
    fixture.detectChanges();
  });

  it('calculates total pages based on visible and scroll settings', () => {
    expect(component.totalPages()).toBe(4);
    expect(component.pages()).toEqual([0, 1, 2, 3]);
  });

  it('navigates to requested page and updates two-way page model', () => {
    component.goToPage(2, false, 0);

    expect((component as any)._currentPage()).toBe(2);
    expect(component.page()).toBe(2);
  });

  it('wraps page index when circular mode is enabled', () => {
    fixture.componentRef.setInput('circular', true);
    fixture.detectChanges();

    component.goToPage(component.totalPages() - 1, false, 0);
    component.goToPage(component.totalPages(), false, 0);

    expect((component as any)._currentPage()).toBe(0);
  });

  it('preserves auto mode for numVisible', () => {
    fixture.componentRef.setInput('numVisible', 'auto' as unknown as number);
    fixture.detectChanges();

    expect((component as any)._activeNumVisible()).toBe(-1);
    expect(component.effectiveNumVisible()).toBe(3);
  });

  it('applies gap compensation without overshooting transform offset', () => {
    fixture.componentRef.setInput('spaceBetween', 24);
    fixture.detectChanges();

    component.goToPage(2, false, 0);
    const style = component.transformStyle();

    expect(style.transform).toContain('-16px');
    expect(style.transform).not.toContain('-48px');
  });

  it('uses single-slide pagination for stacked effects', () => {
    fixture.componentRef.setInput('effect', 'fade');
    fixture.componentRef.setInput('numVisible', 3);
    fixture.componentRef.setInput('numScroll', 1);
    fixture.detectChanges();

    expect(component.totalPages()).toBe(items.length);
    expect(component.isItemActive(0)).toBe(true);
    expect(component.isItemActive(1)).toBe(false);

    component.goToPage(2, false, 0);

    expect(component.isItemActive(2)).toBe(true);
    expect(component.isItemActive(3)).toBe(false);
  });
});
