import { CommonModule, DOCUMENT, NgOptimizedImage } from '@angular/common';
import {
  ElementRef,
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  HostListener,
  effect,
  booleanAttribute,
  input,
  output,
  signal,
  inject,
  viewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { LucideAngularModule } from 'lucide-angular';
import { MagaryPanelmenu } from '../panelmenu/panelmenu';
import { MenuItem } from '../api/menu.interface';
import {
  MagaryAvatar,
  BadgeSeverity,
  AvatarSize,
  AvatarShape,
} from '../../Misc/avatar/avatar';

export interface SidebarSection {
  title: string;
  icon?: string;
  items: MenuItem[];
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
  iconClass?: string;
}

export type SidebarAvatarType = 'image' | 'label' | 'icon';

export interface SidebarAvatarConfig {
  type: SidebarAvatarType;
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
  public showUserAvatar = input<boolean>(true);
  public showUserName = input<boolean>(true);
  public showUserEmail = input<boolean>(true);
  public showLogoutButton = input<boolean>(true);
  public userName = input<string>('John Doe');
  public userEmail = input<string>('user@example.com');
  public avatarConfig = input<SidebarAvatarConfig>({
    type: 'label',
    label: 'U',
    size: 'normal',
    shape: 'circle',
    badgeSeverity: 'danger',
  });
  public logoSrc = input<string>('assets/logo.svg');
  public appTitle = input<string>('PRIMENG');
  public appTitleClass = input<string>('');
  public appTitleStyle = input<Record<string, unknown> | null>(null);
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
  public navigationLabel = input<string>('Primary navigation');
  public mobileMenuButtonLabel = input<string>('Open sidebar navigation');
  public closeButtonLabel = input<string>('Close sidebar');
  public closeOnEscape = input(true, { transform: booleanAttribute });
  public trapFocus = input(true, { transform: booleanAttribute });

  public isMobileOpen = signal(false);
  public isCollapsed = signal(false);
  readonly sidebarId = `magary-sidebar-${Math.random().toString(36).substring(2, 11)}`;
  readonly sidebarElement = viewChild<ElementRef<HTMLElement>>('sidebarElement');
  readonly closeButtonElement = viewChild<ElementRef<HTMLButtonElement>>('closeButton');

  onLogout = output<void>();
  closeSidebar = output<void>();
  private previouslyFocusedElement: HTMLElement | null = null;
  private previousBodyOverflow = '';
  private hasBodyOverflowLock = false;
  private readonly focusableSelectors =
    'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), ' +
    'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  toggleMobileSidebar() {
    if (this.isMobileOpen()) {
      this.closeMobileSidebar();
      return;
    }

    this.isMobileOpen.set(true);
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
    if (!this.isMobileOpen()) {
      return;
    }
    this.isMobileOpen.set(false);
    this.closeSidebar.emit();
  }

  logout() {
    this.onLogout.emit();
  }

  shouldRenderUserSection(): boolean {
    return (
      this.showUserSection() &&
      (this.shouldShowUserInfo() || this.showLogoutButton())
    );
  }

  shouldShowUserInfo(): boolean {
    return this.showUserAvatar() || this.showUserName() || this.showUserEmail();
  }

  shouldShowUserDetails(): boolean {
    return !this.isCollapsed() && (this.showUserName() || this.showUserEmail());
  }

  getAvatarFallbackLabel(): string {
    const userName = this.userName().trim();
    return userName ? userName.charAt(0).toUpperCase() : 'U';
  }

  private router = inject(Router);
  private document = inject(DOCUMENT);
  private routerSubscription?: Subscription;

  constructor() {
    this.routerSubscription = this.router.events.subscribe(() => {
      this.closeMobileSidebar();
    });

    let wasMobileOpen = false;
    effect(() => {
      const mobileOpen = this.isMobileOpen();

      if (mobileOpen && !wasMobileOpen) {
        this.previouslyFocusedElement =
          this.document.activeElement instanceof HTMLElement
            ? this.document.activeElement
            : null;
        this.lockBodyScroll();
        queueMicrotask(() => this.focusSidebarEntryPoint());
      }

      if (!mobileOpen && wasMobileOpen) {
        this.unlockBodyScroll();
        this.restorePreviousFocus();
      }

      wasMobileOpen = mobileOpen;
    });
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
    this.unlockBodyScroll();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event) {
    if (!this.isMobileOpen() || !this.closeOnEscape()) {
      return;
    }

    event.preventDefault();
    this.closeMobileSidebar();
  }

  onSidebarKeydown(event: KeyboardEvent) {
    if (
      event.key !== 'Tab' ||
      !this.isMobileOpen() ||
      !this.trapFocus()
    ) {
      return;
    }

    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) {
      event.preventDefault();
      this.sidebarElement()?.nativeElement.focus();
      return;
    }

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    const activeElement = this.document.activeElement;
    const activeInsideSidebar =
      activeElement instanceof HTMLElement &&
      this.sidebarElement()?.nativeElement.contains(activeElement);

    if (event.shiftKey) {
      if (!activeInsideSidebar || activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
      return;
    }

    if (!activeInsideSidebar || activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }

  private focusSidebarEntryPoint() {
    if (!this.isMobileOpen()) {
      return;
    }

    const closeButton = this.closeButtonElement()?.nativeElement;
    if (closeButton && this.isElementVisible(closeButton)) {
      closeButton.focus();
      return;
    }

    const focusableElements = this.getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
      return;
    }

    this.sidebarElement()?.nativeElement.focus();
  }

  private restorePreviousFocus() {
    const element = this.previouslyFocusedElement;
    this.previouslyFocusedElement = null;

    if (!element) {
      return;
    }

    if (this.document.contains(element)) {
      queueMicrotask(() => element.focus());
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const sidebarElement = this.sidebarElement()?.nativeElement;
    if (!sidebarElement) {
      return [];
    }

    const elements = Array.from(
      sidebarElement.querySelectorAll<HTMLElement>(this.focusableSelectors),
    );

    return elements.filter((element) => this.isElementVisible(element));
  }

  private isElementVisible(element: HTMLElement): boolean {
    const styles = getComputedStyle(element);
    return styles.visibility !== 'hidden' && styles.display !== 'none';
  }

  private lockBodyScroll() {
    if (this.hasBodyOverflowLock) {
      return;
    }

    this.previousBodyOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
    this.hasBodyOverflowLock = true;
  }

  private unlockBodyScroll() {
    if (!this.hasBodyOverflowLock) {
      return;
    }

    this.document.body.style.overflow = this.previousBodyOverflow;
    this.previousBodyOverflow = '';
    this.hasBodyOverflowLock = false;
  }
}
