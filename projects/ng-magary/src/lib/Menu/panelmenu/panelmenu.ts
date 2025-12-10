import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  output,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';
export interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  children?: MenuItem[];
  disabled?: boolean;
  metadata?: any;
  badgeSeverity?: 'success' | 'info' | 'warning' | 'danger' | 'contrast';
  iconSize?: number;
  styleClass?: string;
}
export interface MenuItemClickEvent {
  item: MenuItem;
  level: number;
  path: string[];
}
export interface MenuToggleEvent {
  isOpen: boolean;
  menuTitle: string;
}
@Component({
  selector: 'magary-panelmenu',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './panelmenu.html',
  styleUrl: './panelmenu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagaryPanelmenu {
  public title = input<string>('Panel Menu');
  public icon = input<string>('');
  public items = input<MenuItem[]>([]);
  public backgroundColor = input<string>('#f9fafb');
  public textColor = input<string>('#1f2937');
  public borderRadius = input<string>('8px');
  public shadow = input<number>(0);
  public width = input<string>('100%');
  public hoverColor = input<string>('#007bff');
  public allowMultipleExpanded = input<boolean>(false);
  public defaultOpen = input<boolean>(false);
  public collapsed = input<boolean>(false);
  public menuToggle = output<MenuToggleEvent>();
  public itemClick = output<MenuItemClickEvent>();
  public itemExpand = output<{ item: MenuItem; expanded: boolean }>();
  public expandSidebar = output<void>();
  public isOpen = signal(this.defaultOpen());
  public hoveredItem = signal<string | null>(null);
  public hoveredHeader = signal<boolean>(false);
  public expandedItems = signal<Set<string>>(new Set());
  public panelStyles = computed(() => ({
    '--panel-bg': this.backgroundColor(),
    '--panel-text': this.textColor(),
    '--panel-hover': this.hoverColor(),
    '--panel-radius': this.borderRadius(),
    width: this.width(),
  }));
  constructor() {
    if (this.defaultOpen()) {
      this.isOpen.set(true);
    }
  }
  toggle(): void {
    if (this.collapsed()) {
      this.expandSidebar.emit();
      // Also open the menu so user sees contents immediately
      this.isOpen.set(true);
      return;
    }

    const newOpenState = !this.isOpen();
    this.isOpen.set(newOpenState);
    this.menuToggle.emit({
      isOpen: newOpenState,
      menuTitle: this.title(),
    });
  }
  toggleSubItem(itemKey: string, item?: MenuItem): void {
    // Hybrid behavior: If collapsed and item has children, request sidebar expansion
    if (this.collapsed() && item && this.hasChildren(item)) {
      this.expandSidebar.emit();
      // Optionally, we can also expand the item internally so it's open when sidebar expands
      // But let's just emit for now and let the user click again or handle it in parent
      // Actually, better UX: Expand it internally too so it appears open immediately
    }

    this.expandedItems.update((expanded) => {
      const newSet = new Set(expanded);
      if (!this.allowMultipleExpanded() && !newSet.has(itemKey)) {
        const currentLevel = itemKey.split('/').length;
        for (const key of newSet) {
          if (key.split('/').length === currentLevel) {
            newSet.delete(key);
          }
        }
      }
      const wasExpanded = newSet.has(itemKey);
      if (wasExpanded) {
        newSet.delete(itemKey);
        for (const key of newSet) {
          if (key.startsWith(itemKey + '/')) {
            newSet.delete(key);
          }
        }
      } else {
        newSet.add(itemKey);
      }
      if (item) {
        this.itemExpand.emit({
          item,
          expanded: !wasExpanded,
        });
      }
      return newSet;
    });
  }
  onItemClick(item: MenuItem, level: number = 0, path: string[] = []): void {
    if (item.disabled) return;
    this.itemClick.emit({
      item,
      level,
      path: [...path, item.label],
    });
  }
  isSubItemExpanded(itemKey: string): boolean {
    return this.expandedItems().has(itemKey);
  }
  hasChildren(item: MenuItem): boolean {
    return !!(item.children && item.children.length > 0);
  }
  onItemHover(itemId: string): void {
    this.hoveredItem.set(itemId);
  }
  onItemLeave(): void {
    this.hoveredItem.set(null);
  }
  onHeaderHover(isHovering: boolean): void {
    this.hoveredHeader.set(isHovering);
  }
  getItemId(item: MenuItem, index: number, parentPath: string = ''): string {
    const path = parentPath
      ? `${parentPath}-${item.label}-${index}`
      : `${item.label}-${index}`;
    return path;
  }
  getUniqueItemKey(item: MenuItem, parentPath: string = ''): string {
    return parentPath ? `${parentPath}/${item.label}` : item.label;
  }
  isItemHovered(itemId: string): boolean {
    return this.hoveredItem() === itemId;
  }
  isItemDisabled(item: MenuItem): boolean {
    return item.disabled === true;
  }
}
