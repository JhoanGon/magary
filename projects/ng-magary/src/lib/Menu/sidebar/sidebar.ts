import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  input,
  output,
  signal,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MagaryPanelmenu } from '../panelmenu/panelmenu';
import { MenuItem } from '../panelmenu/panelmenu.interface';
import {
  MagaryAvatar,
  BadgeSeverity,
  AvatarSize,
  AvatarShape,
} from '../../Misc/avatar/avatar';

interface SidebarSection {
  title: string;
  icon?: string;
  items: MenuItem[];
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
  iconClass?: string;
}

type AvatarType = 'image' | 'label' | 'icon';

interface AvatarConfig {
  type: AvatarType;
  size?: AvatarSize;
  shape?: AvatarShape;
  image?: string;
  label?: string;
  icon?: string;
  badgeValue?: string;
  badgeSeverity?: BadgeSeverity | undefined;
}

import { LucideAngularModule } from 'lucide-angular';
import { OnDestroy } from '@angular/core';

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
  public userName = input<string>('John Doe');
  public userEmail = input<string>('user@example.com');
  public avatarConfig = input<AvatarConfig>({
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

  Logout = output<void>();
  closeSidebar = output<void>();

  toggleMobileSidebar() {
    this.isMobileOpen.update((open) => !open);
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
    this.isMobileOpen.set(false);
  }

  logout() {
    this.Logout.emit();
  }
  private router = inject(Router);
  private routerSubscription: any;

  constructor() {
    this.routerSubscription = this.router.events.subscribe(() => {
      this.closeMobileSidebar();
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
