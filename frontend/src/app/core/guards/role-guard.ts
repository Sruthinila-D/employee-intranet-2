
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { User } from '../models/user';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);
  const user = authService.currentUser();

  const expectedRoles = route.data['roles'] as User['role'][];

  if (!user) {
    // This should be handled by authGuard, but it's a safe fallback.
    return router.parseUrl('/login');
  }

  if (expectedRoles && expectedRoles.includes(user.role)) {
    return true;
  }

  // If user does not have the role, redirect to a safe page.
  return router.parseUrl('/');
};