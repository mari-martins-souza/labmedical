import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const authChildGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);

  let isLogged = localStorage.getItem('isLogged') === 'true';
  let id = childRoute.params['id'];
  let isIdNumber = id ? /^\d+$/.test(id) : true;

  if(isLogged && isIdNumber) {
    return true;
  }

  router.navigate(['']);
  return false;
};