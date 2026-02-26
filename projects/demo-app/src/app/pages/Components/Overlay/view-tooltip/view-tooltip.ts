import { Component, ChangeDetectionStrategy } from '@angular/core';
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
  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  readonly importRef = `import { MagaryTooltip } from 'ng-magary';`;
  readonly tooltipGlobalStylesRef = `@use 'ng-magary/styles/tooltip.scss';`;

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
