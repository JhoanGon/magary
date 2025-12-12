export interface MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  queryParams?: { [k: string]: any };
  items?: MenuItem[]; // Renamed from children to items to match PrimeNG/Standard convention mostly, but PanelMenu used children. I should check PanelMenu usage.
  // Wait, PanelMenu used 'children'. I should stick to 'items' if I want to be standard, or keep 'children'.
  // Let's check PanelMenu again. It used 'children'.
  // Standardizing on 'items' is better for menus (MenuItem[]). But if I change it, I break PanelMenu.
  // I will support both or stick to 'items' and refactor PanelMenu.
  // Let's check PanelMenu interface again.
  // It has 'children'.
  // I will check if I can just alias it or refactor PanelMenu. Refactoring PanelMenu to 'items' might be better for the long run.
  // But for now, let's keep 'children' or add 'items' as optional?
  // Actually, 'items' is more common in generic menu libraries. 'children' is tree-like.
  // I will stick to what was there: "children" for now to avoid breaking PanelMenu logic excessively,
  // OR I will simply duplicate the definition for now? No, the goal is shared.
  // Let's keep 'children' for consistency with existing code, or update PanelMenu.
  // Let's look at the file content I read earlier.
  // "children?: MenuItem[];"
  // "badge?: string;"
  // "badgeSeverity?..."
  // "iconSize?: number;"
  // "styleClass?: string;"
  // "iconClass?: string;"
  // "route?: string;" -> This implies routerLink.

  // I will copy the exact interface from PanelMenu to start with, to avoid breaking it.
  expanded?: boolean;
  disabled?: boolean;
  visible?: boolean;
  target?: string;
  separator?: boolean;
  id?: string;

  // From PanelMenu
  children?: MenuItem[];
  badge?: string;
  badgeSeverity?: 'success' | 'info' | 'warning' | 'danger' | 'contrast';
  iconSize?: number;
  styleClass?: string;
  iconClass?: string;
  route?: string;
  metadata?: any;
}
