import { Component } from '@angular/core';
import { AvatarClickEvent, MagaryAvatar } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
@Component({
  selector: 'magary-view-avatar',
  imports: [MagaryAvatar, Highlight],
  templateUrl: './view-avatar.html',
  styleUrl: './view-avatar.scss',
})
export class ViewAvatar {
  importExample = "import { MagaryAvatar } from 'ng-magary';";
  lastAvatarClick: string = 'Ninguno';
  exampleLabel = `
  <magary-avatar
    [label]="'MG'"
    [shape]="'circle'"
    [size]="'large'"
    [badgeValue]="'3'"
    [badgeSeverity]="'success'"
    [customStyle]="{ background: '#ece9fc', color: '#000' }"
  />`;
  exampleIcon = `
  <magary-avatar
    [icon]="'bell'"
    [shape]="'circle'"
    [size]="'large'"
    [badgeValue]="'3'"
    [badgeSeverity]="'warning'"
  />`;
  exampleImage = `
  <magary-avatar
    [image]="'assets/pika.jpg'"
    [shape]="'circle'"
    [size]="'large'"
    [badgeValue]="'5'"
    [badgeSeverity]="'info'"
  />`;
  exampleInteractive = `
  <magary-avatar
    [label]="'Usuario Activo'"
    [shape]="'circle'"
    [size]="'large'"
    [badgeValue]="'9+'"
    [badgeSeverity]="'danger'"
    (avatarClick)="onAvatarClick($event)"
  />`;
  onAvatarClick(event: AvatarClickEvent): void {
    if (event.type === 'avatar') {
      this.lastAvatarClick = `Avatar clickeado: ${event.data?.label || event.data?.icon || 'usuario'}`;
    } else if (event.type === 'badge') {
      this.lastAvatarClick = `Badge clickeado: ${event.data?.value} (${event.data?.severity})`;
      if (event.data?.severity === 'danger') {
        alert(`¡Tienes ${event.data.value} alertas críticas!`);
      } else if (event.data?.severity === 'info') {
        alert(`Tienes ${event.data.value} mensajes nuevos`);
      }
    }
  }
}
