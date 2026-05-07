import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagaryDivider } from './divider';

describe('MagaryDivider', () => {
  let fixture: ComponentFixture<MagaryDivider>;
  let component: MagaryDivider;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryDivider],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryDivider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders as horizontal by default', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('magary-divider-horizontal')).toBe(true);
    expect(el.classList.contains('magary-divider-vertical')).toBe(false);
  });

  it('applies vertical layout class', () => {
    fixture.componentRef.setInput('layout', 'vertical');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('magary-divider-vertical')).toBe(true);
  });

  it('applies solid type class by default', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('magary-divider-solid')).toBe(true);
  });

  it('applies dashed and dotted type classes', () => {
    fixture.componentRef.setInput('type', 'dashed');
    fixture.detectChanges();

    let el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('magary-divider-dashed')).toBe(true);

    fixture.componentRef.setInput('type', 'dotted');
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('magary-divider-dotted')).toBe(true);
  });

  it('applies center align class by default', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('magary-divider-center')).toBe(true);
  });

  it('applies left and right align classes', () => {
    fixture.componentRef.setInput('align', 'left');
    fixture.detectChanges();

    let el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('magary-divider-left')).toBe(true);

    fixture.componentRef.setInput('align', 'right');
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('magary-divider-right')).toBe(true);
  });

  it('has separator role', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('role')).toBe('separator');
  });

  it('has aria-orientation matching layout', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('aria-orientation')).toBe('horizontal');

    fixture.componentRef.setInput('layout', 'vertical');
    fixture.detectChanges();
    expect(el.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('projects content via ng-content', () => {
    const contentDiv = fixture.nativeElement.querySelector('.magary-divider-content');
    expect(contentDiv).toBeTruthy();
  });
});
