import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  viewChild,
  ElementRef,
  AfterViewInit,
  inject,
} from '@angular/core';
import {
  RouterOutlet,
  Router,
  NavigationEnd,
  RouterLink,
} from '@angular/router';
import {
  MagarySidebar,
  MagaryToast,
  MAGARY_VERSION,
  MagarySplitButton,
  MagarySpeedDial,
  MagaryButton,
  MagarySegmented,
  MenuItem,
  SpeedDialItem
} from 'ng-magary';
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component';
import { SIDEBAR_SECTIONS } from './config/sidebar.config';
import { filter } from 'rxjs/operators';
import { PwaService } from './service/pwa.service';
import { DemoI18nService, DemoLanguage } from '../i18n/demo-i18n.service';
import {
  NavigationItem,
  SidebarSection,
} from './interface/sidebar.interface';

@Component({
  selector: 'magary-layout',
  imports: [
    CommonModule,
    FormsModule,
    MagarySidebar,
    RouterOutlet,
    MagaryToast,
    MagaryButton,
    MagarySpeedDial,
    MagarySegmented,
    ThemeSwitcherComponent,
    RouterLink,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout implements AfterViewInit {
  contentWrapper = viewChild<ElementRef<HTMLElement>>('contentWrapper');
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  public readonly pwaService = inject(PwaService);
  public readonly i18n = inject(DemoI18nService);

  version = MAGARY_VERSION;
  private readonly baseSidebarSections = SIDEBAR_SECTIONS;
  sidebarSections = computed(() =>
    this.baseSidebarSections.map((section) =>
      this.translateSidebarSection(section),
    ),
  );
  readonly languageOptions: { label: string; value: DemoLanguage }[] = [
    { label: 'ES', value: 'es' },
    { label: 'EN', value: 'en' },
  ];

  sponsorMenuItems: MenuItem[] = [
    {
      label: 'GitHub Sponsors',
      icon: 'github',
      command: () => {
        this.openExternalUrl('https://github.com/sponsors/JhoanGon');
      },
    },
    {
      label: 'Buy Me a Coffee',
      icon: 'coffee',
      command: () => {
        this.openExternalUrl('https://buymeacoffee.com/praiddev');
      },
    },
  ];

  sponsorDialItems: SpeedDialItem[] = [
    {
      icon: 'github',
      tooltip: 'GitHub Sponsors',
      command: () => {
        this.openExternalUrl('https://github.com/sponsors/JhoanGon');
      },
    },
    {
      icon: 'coffee',
      tooltip: 'Buy Me a Coffee',
      command: () => {
        this.openExternalUrl('https://buymeacoffee.com/praiddev');
      },
    },
  ];

  isSidebarOpen = signal(false);

  ngAfterViewInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const wrapper = this.contentWrapper();
        if (wrapper?.nativeElement) {
          wrapper.nativeElement.scrollTop = 0;
        }
      });
  }

  toggleSidebar() {
    this.isSidebarOpen.update((open) => !open);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  setLanguage(language: DemoLanguage) {
    this.i18n.setLanguage(language);
  }

  onLanguageSelection(value: unknown) {
    if (value === 'es' || value === 'en') {
      this.setLanguage(value);
    }
  }

  handleLogout() {
    console.log('Usuario cerrando sesion...');
  }

  private openExternalUrl(url: string) {
    this.document.defaultView?.open(url, '_blank');
  }

  private translateSidebarSection(section: SidebarSection): SidebarSection {
    return {
      ...section,
      title: this.i18n.translateNavigation(section.title),
      items: section.items.map((item) => this.translateNavigationItem(item)),
    };
  }

  private translateNavigationItem(item: NavigationItem): NavigationItem {
    return {
      ...item,
      label: this.i18n.translateNavigation(item.label),
      badge: item.badge ? this.i18n.translateNavigation(item.badge) : undefined,
      children: item.children?.map((child) =>
        this.translateNavigationItem(child),
      ),
    };
  }
}
