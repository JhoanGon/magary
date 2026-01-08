import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

export type TagSeverity =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'secondary'
  | 'contrast';

@Component({
  selector: 'magary-tag',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './tag.html',
  styleUrls: ['./tag.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    class: 'magary-tag',
    '[class.magary-tag-success]': 'severity() === "success"',
    '[class.magary-tag-info]': 'severity() === "info"',
    '[class.magary-tag-warning]': 'severity() === "warning"',
    '[class.magary-tag-danger]': 'severity() === "danger"',
    '[class.magary-tag-secondary]': 'severity() === "secondary"',
    '[class.magary-tag-contrast]': 'severity() === "contrast"',
    '[class.magary-tag-rounded]': 'rounded()',
  },
})
export class MagaryTag {
  severity = input<TagSeverity>('info');
  value = input<string | undefined>();
  icon = input<string | undefined>();
  rounded = input<boolean>(false);
}
