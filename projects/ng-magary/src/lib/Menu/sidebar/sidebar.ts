import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  input,
  output,
  signal,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { LucideAngularModule } from 'lucide-angular';
import { MagaryPanelmenu } from '../panelmenu/panelmenu';
import { MenuItem } from '../api/menu.interface';
import {
  MagaryAvatar,
  BadgeSeverity,
  AvatarSize,
  AvatarShape,
} from '../../Misc/avatar/avatar';

export interface SidebarSection {
  title: string;
  icon?: string;
  items: MenuItem[];
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
  iconClass?: string;
}

export type SidebarAvatarType = 'image' | 'label' | 'icon';

export interface SidebarAvatarConfig {
  type: SidebarAvatarType;
  size?: AvatarSize;
  shape?: AvatarShape;
  image?: string;
  label?: string;
  icon?: string;
  badgeValue?: string;
  badgeSeverity?: BadgeSeverity | undefined;
}

@Component({
  selector: 'magary-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    MagaryPanelmenu,
    MagaryAvatar,
    NgOptimizedImage,
    LucideAngularModule,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar implements OnDestroy {
  public sections = input<SidebarSection[]>([]);
  public menu = input<MenuItem[]>([]);
  public menuTitle = input<string>('Menu');
  public showUserSection = input<boolean>(false);
  public showUserAvatar = input<boolean>(true);
  public showUserName = input<boolean>(true);
  public showUserEmail = input<boolean>(true);
  public showLogoutButton = input<boolean>(true);
  public userName = input<string>('John Doe');
  public userEmail = input<string>('user@example.com');
  public avatarConfig = input<SidebarAvatarConfig>({
    type: 'label',
    label: 'U',
    size: 'normal',
    shape: 'circle',
    badgeSeverity: 'danger',
  });
  public logoSrc = input<string>('assets/logo.svg');
  public appTitle = input<string>('PRIMENG');
  public appTitleClass = input<string>('');
  public appTitleStyle = input<{ [klass: string]: any } | null>(null);
  public menuBackgroundColor = input<string>('var(--surface-50)');
  public menuTextColor = input<string>('var(--text-primary)');
  public menuHoverColor = input<string>('var(--surface-100)');
  public collapsible = input<boolean>(true);
  public showToggle = input<boolean>(true);
  public showLogo = input<boolean>(true);
  public showBrandLogo = input<boolean>(false);
  public brandLogoSrc = input<string>('');
  public brandLogoPosition = input<'top' | 'bottom' | 'center'>('bottom');
  public logoWidth = input<number>(32);
  public logoHeight = input<number>(32);
  public brandLogoWidth = input<number>(200);
  public brandLogoHeight = input<number>(100);

  public isMobileOpen = signal(false);
  public isCollapsed = signal(false);

  onLogout = output<void>();
  closeSidebar = output<void>();

  toggleMobileSidebar() {
    this.isMobileOpen.update((open) => {
      const next = !open;
      if (!next) {
        this.closeSidebar.emit();
      }
      return next;
    });
  }

  toggleCollapse() {
    if (this.collapsible()) {
      this.isCollapsed.update((collapsed) => !collapsed);
    }
  }

  openSidebar() {
    this.isCollapsed.set(false);
  }

  closeMobileSidebar() {
    if (!this.isMobileOpen()) {
      return;
    }
    this.isMobileOpen.set(false);
    this.closeSidebar.emit();
  }

  logout() {
    this.onLogout.emit();
  }

  shouldRenderUserSection(): boolean {
    return (
      this.showUserSection() &&
      (this.shouldShowUserInfo() || this.showLogoutButton())
    );
  }

  shouldShowUserInfo(): boolean {
    return this.showUserAvatar() || this.showUserName() || this.showUserEmail();
  }

  shouldShowUserDetails(): boolean {
    return !this.isCollapsed() && (this.showUserName() || this.showUserEmail());
  }

  getAvatarFallbackLabel(): string {
    const userName = this.userName().trim();
    return userName ? userName.charAt(0).toUpperCase() : 'U';
  }

  private router = inject(Router);
  private routerSubscription?: Subscription;

  constructor() {
    this.routerSubscription = this.router.events.subscribe(() => {
      this.closeMobileSidebar();
    });
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }
}
