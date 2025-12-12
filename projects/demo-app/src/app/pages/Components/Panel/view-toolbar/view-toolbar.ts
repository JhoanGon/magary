import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryToolbar,
  MagaryButton,
  MagaryInput,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-view-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MagaryToolbar,
    MagaryButton,
    MagaryInput,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-toolbar.html',
  styleUrl: './view-toolbar.scss',
})
export class ViewToolbar {
  codeBasic = `<magary-toolbar>
    <div start>
        <magary-button label="New" icon="plus" class="mr-2"></magary-button>
        <magary-button label="Upload" icon="upload" severity="secondary"></magary-button>
    </div>
    <div center>
        <i class="pi pi-search"></i>
         <!-- Assuming separate icon, or input -->
         <span style="color: var(--text-secondary)">Titular Central</span>
    </div>
    <div end>
        <magary-input placeholder="Search..." icon="search"></magary-input>
    </div>
</magary-toolbar>`;
}
