import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  // check if user is logged in or not (localStorage.getItem('token'))
  const token = localStorage.getItem('token');

  console.log('authGuardGuard', token);

  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
