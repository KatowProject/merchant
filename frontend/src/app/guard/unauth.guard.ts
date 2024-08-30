import { CanActivateFn, Router } from '@angular/router';

export const unauthGuard: CanActivateFn = (route, state) => {
  // if have token, redirect to login page
  const token = localStorage.getItem('token');

  if (token) {
    return false;
  }

  return true;
};
