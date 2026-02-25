import { effect, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private storageKey = 'app-theme';
  
  theme = signal<Theme>(this.getThemeFromStorage());

  constructor() {
    // Effect to apply the theme class and manage PrimeNG theme files
    effect(() => {
      const currentTheme = this.theme();
      
      // Toggle Tailwind dark class
      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      localStorage.setItem(this.storageKey, currentTheme);
    });
  }

  private getThemeFromStorage(): Theme {
    const storedTheme = localStorage.getItem(this.storageKey);
    return storedTheme === 'dark' ? 'dark' : 'light';
  }

  toggleTheme() {
    this.theme.update(current => current === 'light' ? 'dark' : 'light');
  }
}