import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar, MagaryToast, MAGARY_VERSION } from 'ng-magary';
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component';
import { SIDEBAR_SECTIONS } from './config/sidebar.config';

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
export class Layout {
  version = MAGARY_VERSION;
  sidebarSections = SIDEBAR_SECTIONS;
  isSidebarOpen = signal(false);

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
