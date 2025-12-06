import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryCard } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-view-icons',
  standalone: true,
  imports: [CommonModule, MagaryCard, Highlight],
  templateUrl: './view-icons.html',
  styleUrl: './view-icons.scss',
})
export class ViewIcons {
  iconUsage = `<magary-button icon="fas fa-home" label="Home"></magary-button>
<magary-button icon="fas fa-save" label="Save"></magary-button>
<magary-button icon="fas fa-trash" severity="danger"></magary-button>`;

  // Grupos de iconos comunes para mostrar
  commonIcons = [
    { class: 'fas fa-home', name: 'Home' },
    { class: 'fas fa-user', name: 'User' },
    { class: 'fas fa-cog', name: 'Settings' },
    { class: 'fas fa-check', name: 'Check' },
    { class: 'fas fa-times', name: 'Times' },
    { class: 'fas fa-search', name: 'Search' },
    { class: 'fas fa-heart', name: 'Heart' },
    { class: 'fas fa-bell', name: 'Bell' },
    { class: 'fas fa-calendar', name: 'Calendar' },
    { class: 'fas fa-envelope', name: 'Envelope' },
    { class: 'fas fa-edit', name: 'Edit' },
    { class: 'fas fa-trash', name: 'Trash' },
    { class: 'fas fa-save', name: 'Save' },
    { class: 'fas fa-download', name: 'Download' },
    { class: 'fas fa-upload', name: 'Upload' },
    { class: 'fas fa-share-alt', name: 'Share' },
  ];
}
