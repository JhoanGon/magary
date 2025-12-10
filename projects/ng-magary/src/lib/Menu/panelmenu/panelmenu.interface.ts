export interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  children?: MenuItem[];
  badge?: string;
  badgeSeverity?: 'success' | 'info' | 'warning' | 'danger' | 'contrast';
  iconSize?: number;
  styleClass?: string;
}
export interface NavigationItem {
  label: string;
  route?: string;
  icon?: string;
  isCategory?: boolean;
  children?: NavigationItem[];
  iconSize?: number;
  styleClass?: string;
}
