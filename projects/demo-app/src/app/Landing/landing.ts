import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent, NgOptimizedImage],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  private router = inject(Router);

  enterApp() {
    this.router.navigate(['/installation']);
  }
}
