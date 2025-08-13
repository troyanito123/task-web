import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  return token ? router.createUrlTree(['/tasks']) : true; // o un Observable/Promise<boolean>
};
