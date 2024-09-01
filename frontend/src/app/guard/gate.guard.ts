import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const gateGuard: CanActivateFn = async (route, state) => {
  const mainService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }

  const res = await mainService.me();
  const data = await res.json();

  if (data.role === 'user') {
    router.navigateByUrl('/tabs');
  } else {
    router.navigateByUrl('/admin');
  }

  return true;
};
