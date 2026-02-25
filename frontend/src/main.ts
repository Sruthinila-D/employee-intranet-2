import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

const lang = localStorage.getItem('app-language') ?? 'en';

document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = lang;


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
