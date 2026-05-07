import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagarySkeleton } from './skeleton';

describe('MagarySkeleton', () => {
  let fixture: ComponentFixture<MagarySkeleton>;
  let component: MagarySkeleton;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagarySkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(MagarySkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders as rectangle shape by default', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('skeleton-rectangle')).toBe(true);
    expect(el.classList.contains('skeleton-circle')).toBe(false);
  });

  it('applies circle shape class', () => {
    fixture.componentRef.setInput('shape', 'circle');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('skeleton-circle')).toBe(true);
  });

  it('applies shimmer animation by default', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('skeleton-animation-shimmer')).toBe(true);
  });

  it('applies animation none class when set', () => {
    fixture.componentRef.setInput('animation', 'none');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('skeleton-animation-none')).toBe(true);
  });

  it('applies width and height styles', () => {
    fixture.componentRef.setInput('width', '200px');
    fixture.componentRef.setInput('height', '2rem');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('2rem');
  });

  it('uses size shorthand to set equal width and height', () => {
    fixture.componentRef.setInput('size', '3rem');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.style.width).toBe('3rem');
    expect(el.style.height).toBe('3rem');
  });

  it('applies border-radius for rectangle shape', () => {
    fixture.componentRef.setInput('borderRadius', '8px');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.style.borderRadius).toBe('8px');
  });

  it('overrides border-radius to 50% for circle shape', () => {
    fixture.componentRef.setInput('shape', 'circle');
    fixture.componentRef.setInput('borderRadius', '8px');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.style.borderRadius).toBe('50%');
  });

  it('applies styleClass', () => {
    fixture.componentRef.setInput('styleClass', 'custom-skel');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('custom-skel')).toBe(true);
  });
});
