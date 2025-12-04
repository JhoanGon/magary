export interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  children?: MenuItem[];
}

export interface NavigationItem {
  label: string;
  route?: string;
  icon?: string;
  isCategory?: boolean;
  children?: NavigationItem[];
}

export interface SidebarSection {
  title: string;
  icon: string;
  items: NavigationItem[];
  hoverColor: string;
}
