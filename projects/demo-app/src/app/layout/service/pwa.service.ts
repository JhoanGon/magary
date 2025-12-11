import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private platformId = inject(PLATFORM_ID);

  // Signal to track if installation is available
  installable = signal(false);

  private deferredPrompt: any = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        this.deferredPrompt = e;
        // Update UI notify the user they can install the PWA
        this.installable.set(true);
      });

      window.addEventListener('appinstalled', () => {
        this.installable.set(false);
        this.deferredPrompt = null;
        console.log('PWA was installed');
      });
    }
  }

  install() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then(
        (choiceResult: { outcome: string }) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          this.deferredPrompt = null;
          this.installable.set(false);
        },
      );
    }
  }
}
