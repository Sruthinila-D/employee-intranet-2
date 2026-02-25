import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';

import { AuthService } from '../core/services/auth';
import { LanguageService } from '../core/services/language';
import { ThemeService } from '../core/services/theme';
import { User } from '../core/models/user';

import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TooltipModule,
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  // ✅ Services
  private authService = inject(AuthService);
  private router = inject(Router);
  private languageService = inject(LanguageService);
  private themeService = inject(ThemeService);
  private confirmationService = inject(ConfirmationService);
  private translate = inject(TranslateService);

  // ✅ UI state
  isSidebarOpen = signal(true);

  // ✅ App state
  currentUser = this.authService.currentUser;
  currentLanguage = this.languageService.language;
  currentTheme = this.themeService.theme;

  // ✅ Sidebar config
  private allSidebarNavItems: {
    icon: string;
    labelKey: string;
    path: string;
    exact: boolean;
    roles?: User['role'][];
  }[] = [
    { icon: 'pi-chart-bar', labelKey: 'layout.sidebar.dashboard', path: '/', exact: true },
    {
      icon: 'pi-megaphone',
      labelKey: 'layout.sidebar.announcements',
      path: '/announcements',
      exact: false,
    },
    { icon: 'pi-book', labelKey: 'layout.sidebar.newsletters', path: '/products', exact: false },
    {
      icon: 'pi-check-square',
      labelKey: 'layout.sidebar.leave',
      path: '/leave',
      exact: false,
    },
    {
      icon: 'pi-check-square',
      labelKey: 'layout.sidebar.my_tasks',
      path: '/my-tasks',
      exact: false,
    },
    { icon: 'pi-calendar', labelKey: 'layout.sidebar.calendar', path: '/calendar', exact: false },
    { icon: 'pi-users', labelKey: 'layout.sidebar.directory', path: '/directory', exact: false },
    {
      icon: 'pi-calendar-times',
      labelKey: 'layout.sidebar.leave_management',
      path: '/hr-services',
      exact: false,
    },
    { icon: 'pi-star', labelKey: 'layout.sidebar.rewards', path: '/rewards', exact: false },
    {
      icon: 'pi-sparkles',
      labelKey: 'layout.sidebar.engagements',
      path: '/engagements',
      exact: false,
    },
    { icon: 'pi-chart-pie', labelKey: 'layout.sidebar.surveys', path: '/surveys', exact: false },
    {
      icon: 'pi-file',
      labelKey: 'layout.sidebar.policies',
      path: '/policy-documents',
      exact: false,
    },
    {
      icon: 'pi-briefcase',
      labelKey: 'layout.sidebar.project_management',
      path: '/project-management',
      exact: false,
      roles: ['Manager', 'Admin'],
    },
    {
      icon: 'pi-scale',
      labelKey: 'layout.sidebar.audit_compliance',
      path: '/audit-compliance',
      exact: false,
      roles: ['HR', 'Admin'],
    },
    {
      icon: 'pi-chart-line',
      labelKey: 'layout.sidebar.reports',
      path: '/reports',
      exact: false,
      roles: ['Manager', 'HR', 'Admin'],
    },
    {
      icon: 'pi-question-circle',
      labelKey: 'layout.sidebar.help_desk',
      path: '/help-desk',
      exact: false,
    },
    {
      icon: 'pi-cog',
      labelKey: 'layout.sidebar.system_settings',
      path: '/system-settings',
      exact: false,
      roles: ['Admin'],
    },
  ];

  // ✅ Role-based sidebar
  sidebarNavItems = computed(() => {
    const user = this.currentUser();
    if (!user) return [];
    return this.allSidebarNavItems.filter((item) => !item.roles || item.roles.includes(user.role));
  });

  // ✅ Actions
  toggleSidebar() {
    this.isSidebarOpen.update((open) => !open);
  }

  switchLanguage() {
    const nextLang = this.currentLanguage() === 'en' ? 'ar' : 'en';
    this.languageService.switchLanguage(nextLang);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  async promptLogout() {
    const confirmed = await this.confirmLogout();
    if (confirmed) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  private confirmLogout(): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmationService.confirm({
        header: this.translate.instant('layout.logout_confirm_title'),
        message: this.translate.instant('layout.logout_confirm_message'),
        acceptLabel: this.translate.instant('layout.logout_confirm_button'),
        rejectLabel: this.translate.instant('global.cancel'),
        icon: 'pi pi-sign-out',
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-text',
        accept: () => resolve(true),
        reject: () => resolve(false),
      });
    });
  }

  onSearchSubmit(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();
    if (query) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
    }
  }
}
