import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AuthenticationStatus } from '../enum/authentication-status.enum';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.currentAuthStatus() === AuthenticationStatus.authenticated) {
    router.navigateByUrl('/main');
    return false;
  }

  return true;
};
