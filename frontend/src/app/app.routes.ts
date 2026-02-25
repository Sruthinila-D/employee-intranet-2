import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login';
import { LayoutComponent } from './layout/layout';
import { authGuard } from './core/guards/auth-guard';
<<<<<<< HEAD
import { roleGuard } from './core/guards/role-guard';
import { loginGuard } from './core/guards/login-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
=======
import { loginGuard } from './core/guards/login-guard';

export const routes: Routes = [

  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },

>>>>>>> 511d2f22d19f357176e376deda97ef0204290c0d
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
<<<<<<< HEAD
=======

>>>>>>> 511d2f22d19f357176e376deda97ef0204290c0d
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/dashboard')
<<<<<<< HEAD
            .then((m) => m.DashboardComponent),
        pathMatch: 'full',
      },
=======
          .then(m => m.DashboardComponent),
        pathMatch: 'full'
      },

>>>>>>> 511d2f22d19f357176e376deda97ef0204290c0d
      {
        path: 'announcements',
        loadComponent: () =>
          import('./features/announcements/announcements')
<<<<<<< HEAD
            .then(m => m.AnnouncementsPageComponent)
      },
=======
          .then(m => m.AnnouncementsPageComponent)
      },

>>>>>>> 511d2f22d19f357176e376deda97ef0204290c0d
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products')
<<<<<<< HEAD
            .then(m => m.ProductsPageComponent)
      },

      // ✅ ADD THIS
      {
        path: 'tickets',
        loadComponent: () =>
          import('./features/ticket-list/ticket-list')
            .then(m => m.TicketListComponent)
      },
      {
        path: 'tickets/create',
        loadComponent: () =>
          import('./features/ticket-create/ticket-create')
            .then(m => m.TicketCreateComponent)
      },

    ],
  },
  { path: '**', redirectTo: '' },
=======
          .then(m => m.ProductsPageComponent)
      },

      {
        path: 'leave',
        loadComponent: () =>
          import('./features/leave/leave')
          .then(m => m.LeaveComponent)
      }

    ]
  },

  { path: '**', redirectTo: '' }

>>>>>>> 511d2f22d19f357176e376deda97ef0204290c0d
];