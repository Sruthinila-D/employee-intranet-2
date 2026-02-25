import { Injectable, signal, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

export type Language = 'en' | 'ar';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translateService = inject(TranslateService);
  private messageService = inject(MessageService);

  private storageKey = 'app-language';

  language = signal<Language>(this.getLanguageFromStorage());

  constructor() {
    this.translateService.setFallbackLang('en');
    this.translateService.use(this.language());
  }

  switchLanguage(lang: Language) {
    if (lang === this.language()) return;

    localStorage.setItem(this.storageKey, lang);

    // ✅ Toast feedback (UX polish)
    this.messageService.add({
      severity: 'info',
      summary: 'Applying language…',
      detail: 'Please wait',
      life: 2000,
    });

    // ✅ Graceful reload
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  private getLanguageFromStorage(): Language {
    const lang = localStorage.getItem(this.storageKey);
    return lang === 'ar' ? 'ar' : 'en';
  }
}
