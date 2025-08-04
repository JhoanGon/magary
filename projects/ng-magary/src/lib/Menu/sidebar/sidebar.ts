import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Panelmenu } from '../panelmenu/panelmenu';
import { MenuItem } from '../panelmenu/panelmenu.interface';
import { Avatar } from '../../Misc/avatar/avatar';

interface SidebarSection {
  title: string;
  items: MenuItem[];
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
}

type AvatarType = 'image' | 'label' | 'icon';
type AvatarSize = 'normal' | 'large' | 'xlarge';
type AvatarShape = 'square' | 'circle';
type AvatarBadgeSeverity = 'info' | 'success' | 'warning' | 'danger';

interface AvatarConfig {
  type: AvatarType;
  size?: AvatarSize;
  shape?: AvatarShape;
  image?: string;
  label?: string;
  icon?: string;
  badgeValue?: string;
  badgeSeverity?: AvatarBadgeSeverity | undefined;
}

@Component({
  selector: 'magary-sidebar',
  imports: [CommonModule, RouterModule, Panelmenu, Avatar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
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
  public isMobileOpen = signal(false);

  Logout = output<void>();
  closeSidebar = output<void>();

  toggleMobileSidebar() {
    this.isMobileOpen.update((open) => !open);
  }

  closeMobileSidebar() {
    this.isMobileOpen.set(false);
  }

  logout() {
    this.Logout.emit();
  }
}
