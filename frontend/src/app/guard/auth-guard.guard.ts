import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // check if user is logged in or not (localStorage.getItem('token'))
  const token = localStorage.getItem('token');

  console.log('authGuardGuard', token);

  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
