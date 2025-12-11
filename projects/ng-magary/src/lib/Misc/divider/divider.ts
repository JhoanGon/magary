import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type DividerLayout = 'horizontal' | 'vertical';
export type DividerAlign = 'left' | 'center' | 'right' | 'top' | 'bottom';
export type DividerType = 'solid' | 'dashed' | 'dotted';

@Component({
  selector: 'magary-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './divider.html',
  styleUrls: ['./divider.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    class: 'magary-divider',
    '[class.magary-divider-horizontal]': 'layout === "horizontal"',
    '[class.magary-divider-vertical]': 'layout === "vertical"',
    '[class.magary-divider-solid]': 'type === "solid"',
    '[class.magary-divider-dashed]': 'type === "dashed"',
    '[class.magary-divider-dotted]': 'type === "dotted"',
    '[class.magary-divider-left]': 'align === "left"',
    '[class.magary-divider-center]': 'align === "center"',
    '[class.magary-divider-right]': 'align === "right"',
    '[class.magary-divider-top]': 'align === "top"',
    '[class.magary-divider-bottom]': 'align === "bottom"',
    '[attr.role]': '"separator"',
    '[attr.aria-orientation]': 'layout',
  },
})
export class MagaryDivider {
  @Input() layout: DividerLayout = 'horizontal';
  @Input() align: DividerAlign = 'center';
  @Input() type: DividerType = 'solid';
}
