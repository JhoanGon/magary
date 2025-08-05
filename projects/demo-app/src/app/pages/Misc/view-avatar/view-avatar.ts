import { Component } from '@angular/core';
import { MagaryAvatar } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'magary-view-avatar',
  imports: [MagaryAvatar, Highlight],
  templateUrl: './view-avatar.html',
  styleUrl: './view-avatar.scss',
})
export class ViewAvatar {
  importExample = "import { MagaryAvatar } from 'ng-magary';";

  exampleLabel = `
  <magary-avatar
    [label]="'MG'"
    [shape]="'circle'" // or square
    [size]="'large'" // normal, large. xlarge
    [badgeValue]="'3'"
    [badgeSeverity]="'success'"
    [customStyle]="{ background: '#ece9fc', color: '#000' }"
  />`;

  exampleIcon = `
  <magary-avatar
    [icon]="'bell'"
    [shape]="'circle'" // or square
    [size]="'large'" // normal, large. xlarge
    [badgeValue]="'3'"
    [badgeSeverity]="'success'"
    [customStyle]="{ background: '#ece9fc', color: '#000' }"
  />`;

  exampleImage = `
  <magary-avatar
    [image]="'https://example.com/avatar.jpg'"
    [shape]="'circle'" // or square
    [size]="'large'" // normal, large. xlarge
    [badgeValue]="'3'"
    [badgeSeverity]="'success'"
    [customStyle]="{ background: '#ece9fc', color: '#000' }"
  />`;
}
