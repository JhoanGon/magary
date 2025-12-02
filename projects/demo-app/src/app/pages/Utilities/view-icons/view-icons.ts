import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-icons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Icons</h1>
      <p>List of available icons and usage instructions will go here.</p>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 2rem;
      }
    `,
  ],
})
export class ViewIcons {}
