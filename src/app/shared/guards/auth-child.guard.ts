import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const authChildGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);

  let isLogged = localStorage.getItem('isLogged') === 'true';

  if(isLogged) {
    return true;
  }

  router.navigate(['']);
  return false;
};