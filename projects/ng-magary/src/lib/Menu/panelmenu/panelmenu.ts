import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  UrlTree,
} from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { MenuBadgeSeverity, MenuItem } from '../api/menu.interface';

export type PanelMenuMode =
  | 'accordion'
  | 'list'
  | 'rail-icons'
  | 'rail-labeled'
  | 'grid';

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
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './panelmenu.html',
  styleUrl: './panelmenu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagaryPanelmenu implements OnDestroy {
  public title = input<string>('Panel Menu');
  public icon = input<string>();
  public iconClass = input<string>('');
  public style = input<Record<string, unknown> | null>(null);
  public styleClass = input<string>('');
  public items = input<MenuItem[]>([]);
  public backgroundColor = input<string>('var(--surface-0)');
  public textColor = input<string>('var(--text-primary)');
  public borderRadius = input<string>('8px');
  public shadow = input<number>(0);
  public width = input<string>('100%');
  public hoverColor = input<string>('var(--surface-100)');
  public allowMultipleExpanded = input<boolean>(false);
  public defaultOpen = input<boolean>(false);
  public collapsed = input<boolean>(false);
  public mode = input<PanelMenuMode>('accordion');
  public showHeader = input(true, { transform: booleanAttribute });
  public showItemLabels = input(true, { transform: booleanAttribute });
  public gridColumns = input<number>(2);
  public activeIndicator = input(true, { transform: booleanAttribute });
  public navigationLabel = input<string>('');
  public menuToggle = output<MenuToggleEvent>();
  public itemClick = output<MenuItemClickEvent>();
  public itemExpand = output<{ item: MenuItem; expanded: boolean }>();
  public expandSidebar = output<void>();
  public isOpen = signal(this.defaultOpen());
  public hoveredItem = signal<string | null>(null);
  public hoveredHeader = signal<boolean>(false);
  public expandedItems = signal<Set<string>>(new Set());
  readonly panelItemsId = `magary-panel-items-${Math.random().toString(36).slice(2, 11)}`;
  readonly panelStyles = computed(() => ({
    '--panel-bg': this.backgroundColor(),
    '--panel-text': this.textColor(),
    '--panel-hover': this.hoverColor(),
    '--panel-radius': this.borderRadius(),
    '--panel-columns': `${Math.max(1, Math.floor(this.gridColumns() || 1))}`,
    width: this.width(),
    ...(this.style() ?? {}),
  }));

  private readonly router = inject(Router);
  private readonly currentRouteUrl = signal(this.router.url);
  private routerSubscription?: Subscription;

  constructor() {
    if (this.defaultOpen()) {
      this.isOpen.set(true);
    }

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRouteUrl.set(event.urlAfterRedirects);
        return;
      }

      this.currentRouteUrl.set(this.router.url);
    });

    effect(() => {
      if (this.mode() !== 'accordion') {
        this.isOpen.set(true);
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  toggle(): void {
    if (this.mode() !== 'accordion') {
      return;
    }

    if (this.collapsed()) {
      this.expandSidebar.emit();
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
    if (!this.supportsNestedItems()) {
      return;
    }

    if (this.collapsed() && item && this.hasChildren(item)) {
      this.expandSidebar.emit();
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

  onLeafClick(
    item: MenuItem,
    level: number,
    path: string[] = [],
    event?: Event,
  ): void {
    if (item.disabled) {
      event?.preventDefault();
      return;
    }

    item.command?.({
      originalEvent: event,
      item,
      level,
      path,
    });

    this.itemClick.emit({
      item,
      level,
      path,
    });
  }

  isSubItemExpanded(itemKey: string): boolean {
    return this.expandedItems().has(itemKey);
  }

  isPanelOpen(): boolean {
    return this.mode() !== 'accordion' || this.isOpen();
  }

  supportsNestedItems(): boolean {
    return this.mode() === 'accordion' || this.mode() === 'list';
  }

  shouldRenderAsCategory(item: MenuItem): boolean {
    return this.hasChildren(item) && this.supportsNestedItems();
  }

  getChildren(item: MenuItem): MenuItem[] {
    return item.items ?? item.children ?? [];
  }

  hasChildren(item: MenuItem): boolean {
    return this.getChildren(item).length > 0;
  }

  getRouterLink(item: MenuItem): string | readonly unknown[] | UrlTree | null {
    return item.route ?? item.routerLink ?? null;
  }

  getUrl(item: MenuItem): string | null {
    return typeof item.url === 'string' && item.url.trim().length > 0
      ? item.url
      : null;
  }

  hasRoute(item: MenuItem): boolean {
    return this.getRouterLink(item) !== null;
  }

  hasExternalUrl(item: MenuItem): boolean {
    return this.getUrl(item) !== null;
  }

  getLinkTarget(item: MenuItem): string | null {
    return item.target?.trim() || null;
  }

  getLinkRel(item: MenuItem): string | null {
    return this.getLinkTarget(item) === '_blank' ? 'noreferrer noopener' : null;
  }

  getBadgeText(item: MenuItem): string | null {
    const badge = item.badge ?? item.badgeValue;
    if (badge !== null && badge !== undefined && `${badge}`.trim().length > 0) {
      return String(badge);
    }

    if (item.badgeSeverity) {
      return item.badgeSeverity;
    }

    return null;
  }

  getBadgeSeverity(item: MenuItem): MenuBadgeSeverity {
    return item.badgeSeverity ?? 'info';
  }

  isItemActive(item: MenuItem): boolean {
    return item.active === true || this.isRouteActive(item);
  }

  containerClasses(): Record<string, boolean> {
    const classes: Record<string, boolean> = {
      [`shadow-${this.shadow()}`]: true,
      [`mode-${this.mode()}`]: true,
      'header-hidden': !this.showHeader(),
      'labels-hidden': !this.showItemLabels(),
      'active-indicator': this.activeIndicator(),
    };

    const styleClass = this.styleClass().trim();
    if (styleClass.length > 0) {
      classes[styleClass] = true;
    }

    return classes;
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

  getItemKeySegment(item: MenuItem, index: number): string {
    const rawValue = item.id ?? item.label ?? `item-${index}`;
    return rawValue.trim().replace(/\s+/g, '-');
  }

  getItemId(item: MenuItem, index: number, parentPath = ''): string {
    const segment = this.getItemKeySegment(item, index);
    return parentPath ? `${parentPath}-${segment}-${index}` : `${segment}-${index}`;
  }

  getUniqueItemKey(item: MenuItem, index: number, parentPath = ''): string {
    const segment = this.getItemKeySegment(item, index);
    return parentPath ? `${parentPath}/${segment}` : segment;
  }

  buildItemPath(parentPath: string[], item: MenuItem): string[] {
    return item.label ? [...parentPath, item.label] : parentPath;
  }

  getListClass(level: number, root: boolean): string {
    if (root) {
      return 'panel-items';
    }

    return level === 1 ? 'sub-items' : 'sub-sub-items';
  }

  getCategoryClass(level: number): string {
    return level === 0 ? 'category-item' : 'sub-category-item';
  }

  getSubmenuId(itemKey: string): string {
    return `${this.panelItemsId}-${itemKey.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
  }

  getPanelAriaLabel(): string {
    const configuredLabel = this.navigationLabel().trim();
    if (configuredLabel.length > 0) {
      return configuredLabel;
    }

    const title = this.title().trim();
    return title.length > 0 ? title : 'Panel menu';
  }

  getItemAriaCurrent(item: MenuItem): 'page' | null {
    return this.isItemActive(item) ? 'page' : null;
  }

  isItemHovered(itemId: string): boolean {
    return this.hoveredItem() === itemId;
  }

  isItemDisabled(item: MenuItem): boolean {
    return item.disabled === true;
  }

  private isRouteActive(item: MenuItem): boolean {
    const linkTree = this.getItemUrlTree(item);
    if (!linkTree) {
      return false;
    }

    this.currentRouteUrl();

    return this.router.isActive(linkTree, {
      paths: 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  private getItemUrlTree(item: MenuItem): UrlTree | null {
    const routerLink = this.getRouterLink(item);
    if (!routerLink) {
      return null;
    }

    if (routerLink instanceof UrlTree) {
      return routerLink;
    }

    if (Array.isArray(routerLink)) {
      return this.router.createUrlTree(routerLink, {
        queryParams: item.queryParams ?? undefined,
      });
    }

    return this.router.createUrlTree([routerLink], {
      queryParams: item.queryParams ?? undefined,
    });
  }
}
