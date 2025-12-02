import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  output,
  signal,
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

@Component({
  selector: 'magary-sidebar',
  imports: [CommonModule, RouterModule, MagaryPanelmenu, MagaryAvatar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
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
  public menuBackgroundColor = input<string>('var(--surface-50)');
  public menuTextColor = input<string>('var(--text-primary)');
  public menuHoverColor = input<string>('var(--surface-100)');
  public collapsible = input<boolean>(true);
  public showToggle = input<boolean>(true);

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
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.closeMobileSidebar();
    });
  }
}
