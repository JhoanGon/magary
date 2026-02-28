import {
  Component,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryTooltip,
  MagaryButton,
  MagaryCard,
  MagaryInput,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type TooltipInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'view-tooltip',
  standalone: true,
  imports: [
    CommonModule,
    MagaryTooltip,
    MagaryButton,
    MagaryCard,
    MagaryInput,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-tooltip.html',
  styleUrls: ['./view-tooltip.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTooltip {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  readonly importRef = `import { MagaryTooltip } from 'ng-magary';`;
  readonly tooltipGlobalStylesRef = `@use 'ng-magary/styles/tooltip.scss';`;

  readonly inputRows: TooltipInputRow[] = [
    {
      name: 'magaryTooltip',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.overlay.tooltip.api.magaryTooltip.desc',
    },
    {
      name: 'tooltipPosition',
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      descriptionKey: 'components.overlay.tooltip.api.tooltipPosition.desc',
    },
    {
      name: 'tooltipDisabled',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.overlay.tooltip.api.tooltipDisabled.desc',
    },
  ];

  readonly exampleHTML = `
<!-- Basic -->
<input type="text" magary-input placeholder="Hover me!" magaryTooltip="Enter your username" />

<!-- Positions -->
<div style="display: flex; gap: 1rem; margin-top: 1rem;">
    <button magary-button label="Top" magaryTooltip="Tooltip on Top" tooltipPosition="top"></button>
    <button magary-button label="Bottom" magaryTooltip="Tooltip on Bottom" tooltipPosition="bottom"></button>
    <button magary-button label="Left" magaryTooltip="Tooltip on Left" tooltipPosition="left"></button>
    <button magary-button label="Right" magaryTooltip="Tooltip on Right" tooltipPosition="right"></button>
</div>

<!-- Disabled -->
<button magary-button label="Disabled Tooltip" magaryTooltip="Not visible" [tooltipDisabled]="true"></button>
`;
}
