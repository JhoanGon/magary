import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryCard } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { LucideAngularModule } from 'lucide-angular';
import { DemoI18nService } from '../../../i18n/demo-i18n.service';

@Component({
  selector: 'app-view-icons',
  standalone: true,
  imports: [CommonModule, MagaryCard, Highlight, LucideAngularModule],
  templateUrl: './view-icons.html',
  styleUrl: './view-icons.scss',
})
export class ViewIcons {
  public readonly i18n = inject(DemoI18nService);

  readonly iconUsage = `<magary-button icon="house" label="Home"></magary-button>
<magary-button icon="save" label="Save"></magary-button>
<magary-button icon="trash" severity="danger"></magary-button>`;

  // Grupos de iconos comunes para mostrar
  commonIcons = [
    { name: 'house' },
    { name: 'user' },
    { name: 'settings' },
    { name: 'check' },
    { name: 'x' },
    { name: 'search' },
    { name: 'heart' },
    { name: 'bell' },
    { name: 'calendar' },
    { name: 'mail' },
    { name: 'square-pen' },
    { name: 'trash' },
    { name: 'save' },
    { name: 'download' },
    { name: 'upload' },
    { name: 'share-2' },
  ];
}
