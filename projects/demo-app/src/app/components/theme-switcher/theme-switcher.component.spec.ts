import { importProvidersFrom, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagaryThemeService, Theme } from 'ng-magary';
import { LucideAngularModule, icons } from 'lucide-angular';
import { ThemeSwitcherComponent } from './theme-switcher.component';

const kebabCase = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, (typeof icons)[keyof typeof icons]>,
);

describe('ThemeSwitcherComponent behavior', () => {
  let fixture: ComponentFixture<ThemeSwitcherComponent>;
  let component: ThemeSwitcherComponent;
  let setThemeSpy: ReturnType<typeof vi.fn<(theme: Theme) => void>>;
  let setTheme: (theme: Theme) => void;
  const currentTheme = signal<Theme>('light');

  beforeEach(async () => {
    currentTheme.set('light');
    setThemeSpy = vi.fn<(theme: Theme) => void>();
    setTheme = (theme: Theme) => {
      currentTheme.set(theme);
      setThemeSpy(theme);
    };

    await TestBed.configureTestingModule({
      imports: [ThemeSwitcherComponent],
      providers: [
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
        {
          provide: MagaryThemeService,
          useValue: {
            currentTheme,
            setTheme,
          } satisfies Pick<MagaryThemeService, 'currentTheme' | 'setTheme'>,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all available theme options', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.theme-btn',
    ) as NodeListOf<HTMLButtonElement>;
    const titles = Array.from(buttons).map((button) => button.title);

    expect(component.themes.map((theme) => theme.id)).toEqual([
      'light',
      'dark',
      'purple',
      'green',
    ]);
    expect(buttons.length).toBe(4);
    expect(titles).toEqual(['Light', 'Dark', 'Purple', 'Green']);
  });

  it('applies active class according to current selected theme', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.theme-btn',
    ) as NodeListOf<HTMLButtonElement>;

    expect(buttons[0].classList.contains('active')).toBe(true);
    expect(buttons[1].classList.contains('active')).toBe(false);

    currentTheme.set('purple');
    fixture.detectChanges();

    expect(buttons[0].classList.contains('active')).toBe(false);
    expect(buttons[2].classList.contains('active')).toBe(true);
  });

  it('delegates setTheme to theme service when user clicks a theme option', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.theme-btn',
    ) as NodeListOf<HTMLButtonElement>;

    buttons[1].click();
    fixture.detectChanges();

    expect(setThemeSpy).toHaveBeenCalledWith('dark');
    expect(currentTheme()).toBe('dark');
  });

  it('calls service directly through component method', () => {
    component.setTheme('green');

    expect(setThemeSpy).toHaveBeenCalledWith('green');
    expect(currentTheme()).toBe('green');
  });
});
