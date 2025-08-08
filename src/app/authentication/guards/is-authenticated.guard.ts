import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AuthenticationStatus } from '../enum/authentication-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  // authService.checkAuthStatus().subscribe();

  if (authService.currentAuthStatus() === AuthenticationStatus.authenticated) {
    return true;
  }
  router.navigateByUrl("/auth/login");
  return false;
};
