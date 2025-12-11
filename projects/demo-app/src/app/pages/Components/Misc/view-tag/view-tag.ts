import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryTag, MagaryCard, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

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
  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

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
