import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryDivider, MagaryCard, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

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
  // Config for tabs in code blocks
  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

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
