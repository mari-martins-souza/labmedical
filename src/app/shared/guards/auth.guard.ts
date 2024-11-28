import { inject, Injector } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../login/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const injector = inject(Injector);
  const authService = injector.get(AuthService);
  const router = injector.get(Router);

  if(authService.getToken()) {
    return true;
  }
  
  router.navigate(['']);
  return false;
};
