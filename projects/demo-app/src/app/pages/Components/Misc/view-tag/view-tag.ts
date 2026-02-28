import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryTag, MagaryCard, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type TagInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'view-tag',
  standalone: true,
  imports: [
    CommonModule,
    MagaryTag,
    MagaryCard,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-tag.html',
  styleUrls: ['./view-tag.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTag {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  readonly apiRows: TagInputRow[] = [
    {
      name: 'value',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.misc.tag.api.value.desc',
    },
    {
      name: 'severity',
      type: '"success" | "info" | "warning" | "danger" | "secondary" | "contrast"',
      default: '"info"',
      descriptionKey: 'components.misc.tag.api.severity.desc',
    },
    {
      name: 'rounded',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.misc.tag.api.rounded.desc',
    },
    {
      name: 'icon',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.misc.tag.api.icon.desc',
    },
  ];

  readonly exampleHTML = `
<!-- Basic -->
<magary-tag value="New"></magary-tag>
<magary-tag severity="secondary" value="Secondary"></magary-tag>
<magary-tag severity="success" value="Success"></magary-tag>
<magary-tag severity="info" value="Info"></magary-tag>
<magary-tag severity="warning" value="Warning"></magary-tag>
<magary-tag severity="danger" value="Danger"></magary-tag>
<magary-tag severity="contrast" value="Contrast"></magary-tag>

<!-- Rounded -->
<magary-tag value="Rounded" [rounded]="true"></magary-tag>
<magary-tag severity="success" value="Success" [rounded]="true"></magary-tag>

<!-- With Icon -->
<magary-tag severity="success" value="Verified" icon="circle-check"></magary-tag>
`;
}
