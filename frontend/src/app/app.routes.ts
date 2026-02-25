import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login';
import { LayoutComponent } from './layout/layout';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { loginGuard } from './core/guards/login-guard';
import { ExpenseComponent } from './features/expense/expense';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/dashboard')
            .then((m) => m.DashboardComponent),
        pathMatch: 'full',
      },
      {
        path: 'announcements',
        loadComponent: () =>
          import('./features/announcements/announcements')
            .then(m => m.AnnouncementsPageComponent)
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products')
            .then(m => m.ProductsPageComponent)
      },

      
      {
        path: 'Expense',
        loadComponent: () =>
          import('./features/expense/expense')
            .then(m => m.ExpenseComponent)
      },

    ],
  },
  { path: '**', redirectTo: '' },
];