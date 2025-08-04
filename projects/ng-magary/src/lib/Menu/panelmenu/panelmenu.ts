import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'magary-panelmenu',
  imports: [CommonModule, RouterModule],
  templateUrl: './panelmenu.html',
  styleUrl: './panelmenu.scss',
})
export class MagaryPanelmenu {
  public title = input<string>('Panel Menu');
  public items = input<MenuItem[]>([]);
  public backgroundColor = input<string>('#f9fafb');
  public textColor = input<string>('#1f2937');
  public borderRadius = input<string>('8px');
  public shadow = input<number>(0);
  public width = input<string>('100%');
  public hoverColor = input<string>('#007bff');
  public isOpen = signal(false);

  hovered: string | null = null;
  hoverHeader = false;
  expandedItems = signal<Set<string>>(new Set());

  toggle(): void {
    this.isOpen.update((open) => !open);
  }

  toggleSubItem(itemLabel: string): void {
    this.expandedItems.update((expanded) => {
      const newSet = new Set(expanded);
      if (newSet.has(itemLabel)) {
        newSet.delete(itemLabel);
      } else {
        newSet.add(itemLabel);
      }
      return newSet;
    });
  }

  isSubItemExpanded(itemLabel: string): boolean {
    return this.expandedItems().has(itemLabel);
  }

  hasChildren(item: MenuItem): boolean {
    return !!(item.children && item.children.length > 0);
  }

  onItemHover(itemId: string): void {
    this.hovered = itemId;
  }

  onItemLeave(): void {
    this.hovered = null;
  }

  getItemId(item: MenuItem, index: number): string {
    return `${item.label}-${index}`;
  }
}
