import { CommonModule } from '@angular/common';
import {
  Component,
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
import { Sidebar, MagaryToast, MagaryButton, MAGARY_VERSION } from 'ng-magary';
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component';
import { SIDEBAR_SECTIONS } from './config/sidebar.config';
import { filter } from 'rxjs/operators';
import { PwaService } from './service/pwa.service';

@Component({
  selector: 'magary-layout',
  imports: [
    CommonModule,
    Sidebar,
    RouterOutlet,
    MagaryToast,
    MagaryButton,
    ThemeSwitcherComponent,
    RouterLink,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements AfterViewInit {
  contentWrapper = viewChild<ElementRef<HTMLElement>>('contentWrapper');
  private router = inject(Router);
  public pwaService = inject(PwaService);

  version = MAGARY_VERSION;
  sidebarSections = SIDEBAR_SECTIONS;
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

  handleLogout() {
    console.log('Usuario cerrando sesión...');
  }
}
