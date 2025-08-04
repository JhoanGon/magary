import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  MagaryAvatar,
  MagaryButton,
  MagaryCard,
  MagaryPanelmenu,
  Sidebar,
  MagaryTab,
  MagaryTabs,
} from 'ng-magary';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MagaryCard,
    MagaryTabs,
    MagaryTab,
    MagaryButton,
    Sidebar,
    MagaryPanelmenu,
    MagaryAvatar,
    RouterOutlet,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('demo-app');
  @ViewChild('sidebar') sidebarLeft!: Sidebar;

  sidebarMenu = [
    {
      title: 'Getting Started',
      items: [{ label: 'Introduction', route: '/start' }],
    },
    {
      title: 'Components',
      items: [
        { label: 'Button', route: '/button' },
        { label: 'Card', route: '/card' },
      ],
    },
  ];

  menuData = [
    {
      title: 'Getting Started',
      items: [
        { label: 'Introduction', route: '/start' },
        { label: 'Installation', route: '/install' },
      ],
      backgroundColor: '#fff',
      hoverColor: '#38bdf8',
      textColor: '#1f2937',
      borderRadius: '8px',
      shadow: 2,
      width: '250px',
    },
    {
      title: 'Components',
      items: [
        { label: 'Button', route: '/button' },
        { label: 'Card', route: '/card' },
        { label: 'Tabs', route: '/tabs' },
      ],
      backgroundColor: '#fff',
      hoverColor: '#f59e42',
      textColor: '#1f2937',
      borderRadius: '18px',
      shadow: 5,
      width: '400px',
    },
  ];
}
