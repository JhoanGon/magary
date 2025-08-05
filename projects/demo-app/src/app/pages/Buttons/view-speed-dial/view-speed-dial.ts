import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MagarySpeedDial, MagaryTab, MagaryTabs } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

interface SpeedDialItem {
  icon: string;
  tooltip?: string;
  command?: (event?: Event) => void;
}

@Component({
  selector: 'magary-view-speed-dial',
  imports: [CommonModule, MagarySpeedDial, MagaryTabs, MagaryTab, Highlight],
  templateUrl: './view-speed-dial.html',
  styleUrl: './view-speed-dial.scss',
})
export class ViewSpeedDial {
  importExample = "import { MagarySpeedDial } from 'ng-magary';";
  actionItems: SpeedDialItem[] = [
    {
      icon: 'fas fa-pencil',
      tooltip: 'Editar',
      command: () => console.log('Editar'),
    },
    {
      icon: 'fas fa-trash',
      tooltip: 'Eliminar',
      command: () => console.log('Eliminar'),
    },
    {
      icon: 'fas fa-share-alt',
      tooltip: 'Compartir',
      command: () => console.log('Compartir'),
    },
  ];

  exampleTs = `actionItems: SpeedDialItem[] = [
    {
      icon: 'fas fa-pencil',
      tooltip: 'Editar',
      command: () => console.log('Editar'),
    },
    {
      icon: 'fas fa-trash',
      tooltip: 'Eliminar',
      command: () => console.log('Eliminar'),
    },
    {
      icon: 'fas fa-share-alt',
      tooltip: 'Compartir',
      command: () => console.log('Compartir'),
    },
  ];`;

  actionItemsTooltip: SpeedDialItem[] = [
    {
      icon: 'fas fa-pencil',
      tooltip: 'Editar',
      command: () => console.log('Editar'),
    },
    {
      icon: 'fas fa-trash',
      command: () => console.log('Eliminar'),
    },
    {
      icon: 'fas fa-share-alt',
      tooltip: '',
      command: () => console.log('Compartir'),
    },
  ];

  exampleTooltipTs = `actionItems: SpeedDialItem[] = [
    {
      icon: 'fas fa-pencil',
      tooltip: 'Editar',
      command: () => console.log('Editar'),
    },
    {
      icon: 'fas fa-trash',
      command: () => console.log('Eliminar'),
    },
    {
      icon: 'fas fa-share-alt',
      tooltip: '',
      command: () => console.log('Compartir'),
    },
  ];`;

  exampleBasicHtml: string = `
  <magary-speed-dial [items]="actionItems" direction="up"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="down"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="left"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="right"></magary-speed-dial>`;

  exampleCircleHtml: string = `
  <magary-speed-dial
    [type]="'circle'"
    [items]="actionItems">
  </magary-speed-dial>`;

  exampleSemiCircleHtml: string = `
  <magary-speed-dial [items]="actionItems" direction="down" [type]="'semicircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="up" [type]="'semicircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="left" [type]="'semicircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="right" [type]="'semicircle'"></magary-speed-dial>`;

  exampleQuarterCircleHtml: string = `
  <magary-speed-dial [items]="actionItems" direction="down-right" [type]="'quartercircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="up-right" [type]="'quartercircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="down-left" [type]="'quartercircle'"></magary-speed-dial>
  <magary-speed-dial [items]="actionItems" direction="up-left" [type]="'quartercircle'"></magary-speed-dial>`;

  exampleTooltipHtml: string = `
  <magary-speed-dial
    [direction]="'right'"
    [items]="actionItemsTooltip"
    [background]="'#0eb4d7'">
  </magary-speed-dial>`;

  exampleCommand: string = `
  items = [
    {
      icon: 'fas fa-plus',
      tooltip: 'Crear',
      command: (e) => console.log('Crear', e)
    }
  ];`;

  exampleRandom: string = `
  <magary-speed-dial
    [items]="[
      { icon: 'fas fa-plus', tooltip: 'Nuevo', command: create },
      { icon: 'fas fa-edit', tooltip: 'Editar', command: edit },
      { icon: 'fas fa-trash', tooltip: 'Eliminar', command: remove }
    ]"
    [type]="'circle'"
    [background]="'#0d6efd'"
  ></magary-speed-dial>`;
}
