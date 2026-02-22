import type { UrlTree } from '@angular/router';

export type MenuBadgeSeverity =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'contrast';

export interface MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: unknown) => void;
  url?: string;
  target?: string;
  routerLink?: string | readonly unknown[] | UrlTree | null;
  queryParams?: Record<string, unknown>;
  route?: string;

  /**
   * Canonical nested structure used across menu-family components.
   */
  items?: MenuItem[];

  /**
   * Backward-compatible alias used by PanelMenu/Sidebar examples.
   * Prefer `items` for new code.
   */
  children?: MenuItem[];

  expanded?: boolean;
  disabled?: boolean;
  visible?: boolean;
  separator?: boolean;
  id?: string;
  badge?: string;
  badgeSeverity?: MenuBadgeSeverity;
  iconSize?: number;
  styleClass?: string;
  iconClass?: string;
  metadata?: unknown;
}
