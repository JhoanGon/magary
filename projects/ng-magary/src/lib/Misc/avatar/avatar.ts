import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  input,
  output,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
export type AvatarShape = 'circle' | 'square';
export type AvatarSize = 'xsmall' | 'small' | 'normal' | 'large' | 'xlarge';
export type BadgeSeverity = 'info' | 'success' | 'warning' | 'danger';
export interface AvatarClickEvent {
  type: 'avatar' | 'badge';
  data?: any;
}
@Component({
  selector: 'magary-avatar',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagaryAvatar {
  public label = input<string>();
  public image = input<string>();
  public icon = input<string>();
  public shape = input<AvatarShape>('square');
  public size = input<AvatarSize>('normal');

  public sizePixels = computed(() => {
    switch (this.size()) {
      case 'xsmall':
        return 24;
      case 'small':
        return 28;
      case 'large':
        return 48;
      case 'xlarge':
        return 64;
      default:
        return 32; // normal
    }
  });
  public badgeValue = input<string | number>();
  public badgeSeverity = input<BadgeSeverity>('danger');
  public customStyle = input<Record<string, any>>();
  public alt = input<string>('Avatar');
  public clickable = input<boolean>(false);
  public loading = input<boolean>(false);
  public disabled = input<boolean>(false);
  public avatarClick = output<AvatarClickEvent>();
  public imageError = signal<boolean>(false);
  public displayLabel = computed(() => {
    const label = this.label();
    if (!label) return '';
    if (label.includes(' ')) {
      return label
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return label.toUpperCase().slice(0, 2);
  });
  public avatarClasses = computed(() => ({
    [this.size()]: true,
    [this.shape()]: true,
    clickable: this.clickable(),
    loading: this.loading(),
    disabled: this.disabled(),
    'has-image': !!this.image() && !this.imageError(),
    'has-icon': !this.image() && !!this.icon(),
    'has-label': !this.image() && !this.icon() && !!this.label(),
  }));
  public shouldShowImage = computed(() => {
    return this.image() && !this.imageError();
  });
  public shouldShowIcon = computed(() => {
    return !this.shouldShowImage() && !!this.icon();
  });
  public shouldShowLabel = computed(() => {
    return (
      !this.shouldShowImage() && !this.shouldShowIcon() && !!this.displayLabel()
    );
  });
  onImageError(): void {
    this.imageError.set(true);
  }
  onImageLoad(): void {
    this.imageError.set(false);
  }
  onAvatarClick(): void {
    if (this.disabled() || this.loading()) return;
    this.avatarClick.emit({
      type: 'avatar',
      data: {
        label: this.label(),
        image: this.image(),
        icon: this.icon(),
      },
    });
  }
  onBadgeClick(event: Event): void {
    if (this.disabled() || this.loading()) return;
    event.stopPropagation();
    this.avatarClick.emit({
      type: 'badge',
      data: {
        value: this.badgeValue(),
        severity: this.badgeSeverity(),
      },
    });
  }
}
