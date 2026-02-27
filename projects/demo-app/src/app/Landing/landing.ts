import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { DemoI18nService, DemoLanguage } from '../i18n/demo-i18n.service';
import { MagarySegmented } from 'ng-magary';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    FormsModule,
    ThemeSwitcherComponent,
    NgOptimizedImage,
    MagarySegmented,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  private router = inject(Router);
  public i18n = inject(DemoI18nService);
  readonly languageOptions: { label: string; value: DemoLanguage }[] = [
    { label: 'ES', value: 'es' },
    { label: 'EN', value: 'en' },
  ];

  enterApp() {
    this.router.navigate(['/installation']);
  }

  setLanguage(language: DemoLanguage) {
    this.i18n.setLanguage(language);
  }

  onLanguageSelection(value: unknown) {
    if (value === 'es' || value === 'en') {
      this.setLanguage(value);
    }
  }
}
