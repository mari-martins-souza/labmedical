import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../../login/auth.service';

export const authChildGuard: CanActivateChildFn = (childRoute, state) => {
 
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.getToken()) {
    return true;
  }
  
  router.navigate(['']);
  return false;
};