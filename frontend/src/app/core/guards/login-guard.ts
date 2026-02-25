
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isAuthenticated()) {
    // If the user is already authenticated, redirect them to the dashboard at the root path.
    return router.parseUrl('/');
  }

  // If the user is not authenticated, allow them to access the login page.
  return true;
};