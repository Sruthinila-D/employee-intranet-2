import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { provideTranslateService, provideTranslateLoader } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import brandLaraPreset from './themes/brand-theme';
import { PRIMENG_AR } from '../assets/i18n/primeng-ar';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

const lang = localStorage.getItem('app-language');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),
    MessageService,
    ConfirmationService,
    providePrimeNG({
      ripple: true,
      translation: lang === 'ar' ? PRIMENG_AR : {},
      theme: {
        preset: brandLaraPreset,
        options: {
          darkModeSelector: '.dark', // 🔥 sync with Tailwind
        },
      },
    }),
        //    providePrimeNG({
        //     unstyled: true,
        //     pt: {
        //         button: {
        //             root: 'bg-teal-500 hover:bg-teal-700 active:bg-teal-900 cursor-pointer py-2 px-4 rounded-full border-0 flex gap-2',
        //             label: 'text-white font-bold text-lg',
        //             icon: 'text-white !text-xl'
        //         }
        //     }
        // })
  ],
};
