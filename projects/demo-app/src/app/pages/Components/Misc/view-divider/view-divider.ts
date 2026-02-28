import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryDivider, MagaryCard, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type DividerInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'view-divider',
  standalone: true,
  imports: [
    CommonModule,
    MagaryDivider,
    MagaryCard,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-divider.html',
  styleUrls: ['./view-divider.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewDivider {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  readonly inputsConfig: DividerInputRow[] = [
    {
      name: 'layout',
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      descriptionKey: 'components.misc.divider.api.layout.desc',
    },
    {
      name: 'type',
      type: '"solid" | "dashed" | "dotted"',
      default: '"solid"',
      descriptionKey: 'components.misc.divider.api.type.desc',
    },
    {
      name: 'align',
      type: '"left" | "center" | "right" | "top" | "bottom"',
      default: '"center"',
      descriptionKey: 'components.misc.divider.api.align.desc',
    },
  ];

  readonly exampleHTML = `
<!-- Horizontal (Default) -->
<p>Content A</p>
<magary-divider></magary-divider>
<p>Content B</p>

<!-- With Text -->
<p>Content C</p>
<magary-divider align="left">Left</magary-divider>
<magary-divider align="center">Center</magary-divider>
<magary-divider align="right">Right</magary-divider>
<p>Content D</p>

<!-- Dashed/Dotted -->
<magary-divider type="dashed"></magary-divider>
<magary-divider type="dotted"></magary-divider>
`;

  readonly exampleVerticalHTML = `
<!-- Vertical Divider (must be used in a flex container) -->
<div style="display: flex; height: 100px; align-items: center;">
    <span>Item 1</span>
    <magary-divider layout="vertical"></magary-divider>
    <span>Item 2</span>
    <magary-divider layout="vertical" type="dashed">OR</magary-divider>
    <span>Item 3</span>
</div>
`;
}
