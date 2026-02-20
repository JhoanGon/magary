import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MagaryMenubar } from './menubar';
import { MenuItem } from '../api/menu.interface';

describe('MagaryMenubar routing behavior', () => {
  let fixture: ComponentFixture<MagaryMenubar>;
  let component: MagaryMenubar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryMenubar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryMenubar);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('does not prevent default when route alias is provided', () => {
    const event = {
      preventDefault: vi.fn(),
    } as unknown as Event;

    const item: MenuItem = {
      label: 'Dashboard',
      route: '/dashboard',
    };

    component.onItemClick(event, item);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('binds internal route without fallback hash href', () => {
    fixture.componentRef.setInput('model', [
      {
        label: 'Dashboard',
        route: '/dashboard',
      },
    ]);
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelector(
      '.magary-menubar-root-list .magary-menuitem-link',
    ) as HTMLAnchorElement;

    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toContain('/dashboard');
    expect(anchor.getAttribute('href')).not.toBe('#');
  });
});
