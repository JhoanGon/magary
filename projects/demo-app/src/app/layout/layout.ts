import { CommonModule } from '@angular/common';
import {
  Component,
  signal,
  ViewChild,
  ElementRef,
  AfterViewInit,
  inject,
} from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Sidebar, MagaryToast, MAGARY_VERSION } from 'ng-magary';
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component';
import { SIDEBAR_SECTIONS } from './config/sidebar.config';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'magary-layout',
  imports: [
    CommonModule,
    Sidebar,
    RouterOutlet,
    MagaryToast,
    ThemeSwitcherComponent,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements AfterViewInit {
  @ViewChild('contentWrapper') contentWrapper!: ElementRef<HTMLElement>;
  private router = inject(Router);

  version = MAGARY_VERSION;
  sidebarSections = SIDEBAR_SECTIONS;
  isSidebarOpen = signal(false);

  ngAfterViewInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.contentWrapper?.nativeElement) {
          this.contentWrapper.nativeElement.scrollTop = 0;
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
