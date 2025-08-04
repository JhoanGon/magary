import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'magary-avatar',
  imports: [CommonModule],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar {
  public label = input<string | undefined>();
  public image = input<string | undefined>();
  public icon = input<string | undefined>();
  public shape = input<'circle' | 'square'>('square');
  public size = input<'normal' | 'large' | 'xlarge'>('normal');
  public badgeValue = input<string | undefined>();
  public badgeSeverity = input<
    'info' | 'success' | 'warning' | 'danger' | undefined
  >('danger');
  public customStyle = input<any>();
}
